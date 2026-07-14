import AdminLayout from '@/Layouts/AdminLayout'
import { Link, router, usePage } from '@inertiajs/react'
import React, { useCallback, useRef } from 'react'
import { buildProductionReceiptHtml } from './StrukProduksiTemplate.jsx'
import KonfirmasiPassword from '@/Components/KonfirmasiPassword'

export default function Dataproduksi({ produksi, tglAwal, tglAkhir }) {
    const { auth } = usePage().props;
    const isDesainer = auth.user?.role === 'Desainer';
    const isCs = auth.user?.role === 'Customer Service';
    const [search, setSearch] = React.useState('')
    const [tgl_awal, setTglAwal] = React.useState(tglAwal || '')
    const [tgl_akhir, setTglAkhir] = React.useState(tglAkhir || '')
    const [selected, setSelected] = React.useState([])
    const [paymentType, setPaymentType] = React.useState('lunas')
    const [paymentError, setPaymentError] = React.useState(null)
    const [processing, setProcessing] = React.useState(false)
    const [printMode, setPrintMode] = React.useState('single')
    const [showPasswordModal, setShowPasswordModal] = React.useState(false)
    const [pendingAction, setPendingAction] = React.useState(null)
    const previewRef = useRef(null)
    const iframeRef = useRef(null)
    const paymentModalRef = useRef(null)
    const [expandedInvoices, setExpandedInvoices] = React.useState(new Set())

    const toggleExpand = (noInvoice) => {
        setExpandedInvoices(prev => {
            const next = new Set(prev)
            if (next.has(noInvoice)) next.delete(noInvoice)
            else next.add(noInvoice)
            return next
        })
    }

    const allPageItems = React.useMemo(() =>
        (Array.isArray(produksi) ? produksi : []).flatMap(group => group?.items || []),
        [produksi])

    const toggleSelectGroup = (group) => {
        const allInGroupSelected = group.items.every(item => selected.some(s => s.id === item.id))
        if (allInGroupSelected) {
            const groupIds = new Set(group.items.map(item => item.id))
            setSelected(prev => prev.filter(item => !groupIds.has(item.id)))
        } else {
            const existingIds = new Set(selected.map(item => item.id))
            const newItems = group.items.filter(item => !existingIds.has(item.id) && !(isCs && item.pembayaran))
            setSelected(prev => [...prev, ...newItems])
        }
    }

    const allSelected = allPageItems.length > 0 && allPageItems.every(item => {
        if (isCs && item.pembayaran) return true
        return selected.some(s => s.id === item.id)
    })

    const toggleSelect = (item) => {
        if (isCs && item.pembayaran) return
        setSelected((prev) => {
            const exists = prev.find(x => x.id === item.id)
            return exists ? prev.filter(x => x.id !== item.id) : [...prev, item]
        })
    }

    const toggleSelectAll = () => {
        if (allSelected) {
            const currentIds = new Set(allPageItems.map(item => item.id))
            setSelected(prev => prev.filter(item => !currentIds.has(item.id)))
        } else {
            const existingIds = new Set(selected.map(item => item.id))
            const newItems = allPageItems.filter(item => !existingIds.has(item.id) && !(isCs && item.pembayaran))
            setSelected(prev => [...prev, ...newItems])
        }
    }

    const selectedItems = selected.filter(item => !(isCs && item.pembayaran))
    const totalHarga = selectedItems.reduce((sum, item) => sum + Number(item.total_harga || 0), 0)
    const totalQty = selectedItems.reduce((sum, item) => sum + Number(item.qty || 0), 0)
    const firstCustomer = selectedItems.length > 0 ? selectedItems[0].customer : null
    const customerLimit = Number(firstCustomer?.limit || 0)
    const customerLimitAkhir = Number(firstCustomer?.limit_akhir || 0)
    const customerLimitRemaining = customerLimit - customerLimitAkhir
    const wouldExceedLimit = paymentType === 'utang' && (customerLimitAkhir + totalHarga > customerLimit)

    const handleSearch = (e) => {
        e.preventDefault()
        setSelected([])
        router.get('/dataproduksi', { search, tgl_awal, tgl_akhir }, { preserveState: true, replace: true })
    }

    const buildReceiptHtml = (items) =>
        buildProductionReceiptHtml({
            items,
            auth,
            paymentType,
        })

    const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || ''

    const buildProcessScript = (ids, paymentTypeVal) => `
        <script>
            window.addEventListener('afterprint', function() {
                fetch('/dataproduksi/proses-produksi', {
                    method: 'PUT',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-XSRF-TOKEN': decodeURIComponent('${encodeURIComponent(xsrfToken)}')
                    },
                    body: JSON.stringify({ ids: ${JSON.stringify(ids)}, payment_type: '${paymentTypeVal}' })
                }).then(function() { window.close(); });
            });
        </script>
    `

    const doPrintReceipt = (items) => {
        if (items.length === 0) return
        if (items.length === 1) {
            const w = window.open('', '_blank', 'width=420,height=640')
            if (!w) return
            const html = buildReceiptHtml(items)
            const script = buildProcessScript([items[0].id], paymentType)
            w.document.open()
            w.document.write(html.replace('</head>', script + '</head>'))
            w.document.close()
            w.addEventListener('load', () => { w.focus(); setTimeout(() => w.print(), 300) })
        } else {
            let idx = 0
            const openNext = () => {
                if (idx >= items.length) return
                const w = window.open('', '_blank', 'width=420,height=640')
                if (!w) return
                const html = buildReceiptHtml([items[idx]])
                const script = buildProcessScript([items[idx].id], paymentType)
                w.document.open()
                w.document.write(html.replace('</head>', script + '</head>'))
                w.document.close()
                w.addEventListener('load', () => { w.focus(); setTimeout(() => w.print(), 300) })
                const t = setInterval(() => { if (w.closed) { clearInterval(t); idx++; openNext() } }, 500)
            }
            openNext()
        }
    }

    const doPrintReceiptCombined = (items) => {
        if (items.length === 0) return
        const w = window.open('', '_blank', 'width=500,height=700')
        if (!w) return
        const html = buildReceiptHtml(items)
        const script = buildProcessScript(items.map(item => item.id), paymentType)
        w.document.open()
        w.document.write(html.replace('</head>', script + '</head>'))
        w.document.close()
        w.addEventListener('load', () => { w.focus(); setTimeout(() => w.print(), 300) })
    }

    const handleCetakStruk = () => {
        if (selectedItems.length === 0) return
        setPaymentType('lunas')
        setPaymentError(null)
        setPrintMode('single')
        paymentModalRef.current?.showModal()
    }

    const handleCetakGabungan = () => {
        if (selectedItems.length === 0) return
        setPaymentType('lunas')
        setPaymentError(null)
        setPrintMode('combined')
        paymentModalRef.current?.showModal()
    }

    const handlePaymentConfirm = () => {
        if (processing) return
        if (paymentType === 'utang' && wouldExceedLimit) return

        setProcessing(true)

        paymentModalRef.current?.close()
        if (printMode === 'combined') {
            doPrintReceiptCombined(selectedItems)
        } else {
            doPrintReceipt(selectedItems)
        }
        setSelected([])
        setProcessing(false)
    }

    const reviewReceipt = (items) => {
        const w = window.open('', '_blank', 'width=420,height=640')
        if (!w) return
        w.document.open()
        w.document.write(buildReceiptHtml(items))
        w.document.close()
    }

    const printReceipt = (items) => {
        const w = window.open('', '_blank', 'width=420,height=640')
        if (!w) return
        w.document.open()
        w.document.write(buildReceiptHtml(items))
        w.document.close()
        w.addEventListener('load', () => {
            w.focus()
            setTimeout(() => w.print(), 300)
        })
    }

    const requestPassword = useCallback((action) => {
        setPendingAction(action)
        setShowPasswordModal(true)
    }, [])

    const handlePasswordConfirmed = useCallback(() => {
        setShowPasswordModal(false)
        switch (pendingAction) {
            case 'review':
                reviewReceipt(selectedItems)
                paymentModalRef.current?.close()
                break
            case 'cetak':
                printReceipt(selectedItems)
                paymentModalRef.current?.close()
                break
            case 'proses':
                handlePaymentConfirm()
                break
        }
        setPendingAction(null)
    }, [pendingAction, selectedItems])

    const handlePasswordCancel = useCallback(() => {
        setShowPasswordModal(false)
        setPendingAction(null)
    }, [])

    const setPreview = (show) => {
        if (show && selectedItems.length > 0) {
            const html = buildReceiptHtml(selectedItems)
            const doc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document
            if (doc) {
                doc.open(); doc.write(html); doc.close()
            }
            previewRef.current?.showModal()
        }
    }

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 xl:grid-cols-1">
                <div className="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <h2 className="card-title">Data Produksi Saya</h2>
                        </div>

                        <div className="mb-3">
                            <form onSubmit={handleSearch} className="flex flex-wrap gap-2 items-end">
                                <input
                                    type="text"
                                    placeholder="Cari kode SPK, keterangan, customer, bahan..."
                                    className="input input-bordered input-success w-full max-w-xs input-sm"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <label className="form-control w-full max-w-[160px]">
                                    <span className="label-text text-xs">Tgl Awal</span>
                                    <input
                                        type="date"
                                        className="input input-bordered input-success input-sm"
                                        value={tgl_awal}
                                        onChange={(e) => setTglAwal(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-[160px]">
                                    <span className="label-text text-xs">Tgl Akhir</span>
                                    <input
                                        type="date"
                                        className="input input-bordered input-success input-sm"
                                        value={tgl_akhir}
                                        onChange={(e) => setTglAkhir(e.target.value)}
                                    />
                                </label>
                                <button type="submit" className="btn btn-success btn-sm">
                                    <i className="fas fa-search"></i> Cari
                                </button>
                            </form>
                        </div>

                        {selected.length > 0 && (
                            <div className="mb-3 bg-success border border-success/30 rounded-xl px-4 py-3 shadow-sm transition-all duration-300">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="badge badge-success badge-lg gap-1">
                                                <i className="fas fa-check-circle text-xs"></i>
                                                {selected.length}
                                            </div>
                                            <span className="text-white font-medium">item dipilih</span>
                                        </div>
                                        <div className="hidden sm:flex items-center gap-4">
                                            <span className="text-white">|</span>
                                            <span className="text-white">
                                                Qty : <strong className="text-white">{totalQty}</strong>
                                            </span>
                                            <span className="text-white">|</span>
                                            <span className="text-white">
                                                Total: <strong className="text-white">Rp {totalHarga.toLocaleString('id-ID')}</strong>
                                            </span>
                                        </div>
                                    </div>
                                    {!isDesainer && (
                                        <div className="flex gap-2">
                                            <button className="btn btn-white btn-sm" onClick={handleCetakStruk}>
                                                <i className="fas fa-receipt"></i> Cetak Struk
                                            </button>
                                            <div className="dropdown dropdown-end">
                                                <button className="btn btn-white btn-sm btn-outline" tabIndex={0}>
                                                    <i className="fas fa-chevron-down"></i>
                                                </button>
                                                <ul tabIndex={0} className="dropdown-content menu menu-sm bg-white rounded-xl shadow-lg border border-base-300 z-50 w-48 p-2 mt-1">
                                                    <li><button onClick={handleCetakGabungan}><i className="fas fa-layer-group"></i> Cetak Gabungan</button></li>
                                                    <li><button onClick={() => setPreview(true)}><i className="fas fa-eye"></i> Preview Struk</button></li>
                                                    <li><button onClick={() => setSelected([])}><i className="fas fa-times"></i> Batalkan Pilihan</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th className="w-10">
                                                <input type="checkbox" className="checkbox checkbox-sm checkbox-success" checked={allSelected} onChange={toggleSelectAll} />
                                            </th>
                                            <th>No</th>
                                            <th>No Inv</th>
                                            <th>Kode SPK</th>
                                            <th>Customer</th>
                                            <th>Bahan</th>
                                            <th>Keterangan</th>
                                            <th>Tinggi</th>
                                            <th>Lebar</th>
                                            <th>Qty</th>
                                            <th>Sisi</th>
                                            <th>Harga</th>
                                            <th>Total Harga</th>
                                            <th>Pembayaran</th>
                                            <th>Metode P</th>
                                            <th>Tgl Kirim</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs">
                                        {(Array.isArray(produksi) ? produksi : []).length === 0 ? (
                                            <tr>
                                                <td colSpan={16} className="text-center py-8 text-base-content/50">
                                                    Tidak ada data produksi
                                                </td>
                                            </tr>
                                        ) : (
                                            (Array.isArray(produksi) ? produksi : []).map((group, groupIndex) => {
                                                const isExpanded = expandedInvoices.has(group.no_invoice)
                                                const allInGroupSelected = group.items.every(item => selected.some(s => s.id === item.id))
                                                return (
                                                    <React.Fragment key={group.no_invoice}>
                                                        <tr className={`cursor-pointer transition-colors ${group.all_lunas ? 'bg-green-50 hover:bg-green-100' : group.all_utang ? 'bg-red-50 hover:bg-red-100' : group.has_payment ? 'bg-yellow-50 hover:bg-yellow-100' : allInGroupSelected ? 'bg-success/10 hover:bg-success/15' : 'hover:bg-base-300'}`} onClick={() => toggleExpand(group.no_invoice)}>
                                                            <td onClick={(e) => e.stopPropagation()}>
                                                                <input type="checkbox" className="checkbox checkbox-sm checkbox-success" checked={allInGroupSelected} onChange={() => toggleSelectGroup(group)} />
                                                            </td>
                                                            <td className="font-medium">{groupIndex + 1}</td>
                                                            <td className="font-mono font-semibold">{group.no_invoice}</td>
                                                            <td className="font-medium">{group.customer?.nama}</td>
                                                            <td colSpan={12}>
                                                                <div className="flex items-center justify-between gap-3">
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="badge badge-sm badge-success gap-1">
                                                                            <i className="fas fa-layer-group text-xs"></i>
                                                                            {group.item_count} item
                                                                        </span>
                                                                        <span className="text-base-content/60">Qty: <strong>{group.total_qty}</strong></span>
                                                                        <span className="text-success font-semibold">Rp {Number(group.total_harga).toLocaleString('id-ID')}</span>
                                                                    </div>
                                                                    <i className={`fas fa-chevron-${isExpanded ? 'down' : 'right'} text-xs text-base-content/40 transition-transform`}></i>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        {isExpanded && group.items.map((item) => (
                                                            <tr key={item.id} className={`hover:bg-base-200 ${item.pembayaran === 'utang' ? 'bg-red-50 text-red-700' : ['lunas','transfer','qris'].includes(item.pembayaran) ? 'bg-green-50 text-green-700' : ''}`}>
                                                                <td>
                                                                    <input type="checkbox" className="checkbox checkbox-sm checkbox-success" checked={selected.some(s => s.id === item.id)} onChange={() => toggleSelect(item)} disabled={isCs && item.pembayaran} />
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td className="font-mono font-medium">{item.kode_spk}</td>
                                                                <td>{item.customer?.nama}</td>
                                                                <td>{item.bahan?.bahan}</td>
                                                                <td>{item.keterangan}</td>
                                                                <td className="tabular-nums">{item.tinggi} {item.satuan}</td>
                                                                <td className="tabular-nums">{item.lebar} {item.satuan}</td>
                                                                <td className="tabular-nums text-center">{item.qty}</td>
                                                                <td className="text-center">{item.sisi}</td>
                                                                <td className={'tabular-nums' + (isDesainer && item.harga_bahan ? ' blur-sm select-none' : '')}>{isDesainer && item.harga_bahan ? '••••••' : (item.harga_bahan ? Number(item.harga_bahan).toLocaleString('id-ID') : '-')}</td>
                                                                <td className={'tabular-nums' + (isDesainer && item.total_harga ? ' blur-sm select-none' : '')}>{isDesainer && item.total_harga ? '••••••' : (item.total_harga ? Number(item.total_harga).toLocaleString('id-ID') : '-')}</td>
                                                                <td>
                                                                    {item.pembayaran ? (
                                                                        <span className={`badge badge-sm ${item.pembayaran === 'lunas' ? 'badge-success' : item.pembayaran === 'utang' ? 'badge-warning' : item.pembayaran === 'transfer' ? 'badge-info' : 'badge-secondary'}`}>
                                                                            {item.pembayaran === 'lunas' ? 'Lunas' : item.pembayaran === 'utang' ? 'Utang' : item.pembayaran === 'transfer' ? 'Transfer' : 'QRIS'}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-base-content/30">-</span>
                                                                    )}
                                                                </td>
                                                                <td>{item.metode_pengantaran}</td>
                                                                <td>{item.tgl_kirim}</td>
                                                            </tr>
                                                        ))}
                                                    </React.Fragment>
                                                )
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <dialog ref={previewRef} className="modal">
                <div className="modal-box w-11/12 max-w-4xl h-[90vh] p-0">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-base-300 bg-base-100 sticky top-0 z-10">
                        <h3 className="font-bold text-lg">
                            <i className="fas fa-eye text-success"></i> Preview Struk
                        </h3>
                        <div className="flex gap-2">
                            {!isDesainer && (
                                <button className="btn btn-success btn-sm" onClick={() => { previewRef.current?.close(); handleCetakStruk() }}>
                                    <i className="fas fa-print"></i> Cetak
                                </button>
                            )}
                            <button className="btn btn-ghost btn-sm btn-circle" onClick={() => previewRef.current?.close()}>✕</button>
                        </div>
                    </div>
                    <div className="w-full h-[calc(90vh-60px)]">
                        <iframe ref={iframeRef} className="w-full h-full border-none" title="Preview Struk" />
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog ref={paymentModalRef} className="modal">
                <div className="modal-box">
                    <button type="button" onClick={() => paymentModalRef.current?.close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="text-lg font-bold mb-4">Pembayaran</h3>
                    {selectedItems.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">Total Item</span>
                                <span className="font-semibold">{selectedItems.length}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">Total Harga</span>
                                <span className="font-semibold text-success">Rp {totalHarga.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">Customer</span>
                                <span className="font-medium">{firstCustomer?.nama || '-'}</span>
                            </div>
                            <div className="divider my-2"></div>
                            <p className="text-sm font-semibold mb-2">Status Pembayaran</p>
                            <div className="grid grid-cols-2 gap-3">
                                <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${paymentType === 'lunas' ? 'border-success bg-success/10' : 'border-base-300'}`}>
                                    <input type="radio" name="paymentType" className="radio radio-success" checked={paymentType === 'lunas'} onChange={() => setPaymentType('lunas')} />
                                    <div>
                                        <span className="font-semibold text-sm">Lunas</span>
                                        <p className="text-xs text-base-content/60">Tunai penuh</p>
                                    </div>
                                </label>
                                <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${paymentType === 'utang' ? 'border-warning bg-warning/10' : 'border-base-300'}`}>
                                    <input type="radio" name="paymentType" className="radio radio-warning" checked={paymentType === 'utang'} onChange={() => setPaymentType('utang')} />
                                    <div>
                                        <span className="font-semibold text-sm">Utang</span>
                                        <p className="text-xs text-base-content/60">Pembayaran sebagian</p>
                                    </div>
                                </label>
                                <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${paymentType === 'transfer' ? 'border-info bg-info/10' : 'border-base-300'}`}>
                                    <input type="radio" name="paymentType" className="radio radio-info" checked={paymentType === 'transfer'} onChange={() => setPaymentType('transfer')} />
                                    <div>
                                        <span className="font-semibold text-sm">Transfer</span>
                                        <p className="text-xs text-base-content/60">Bayar via transfer</p>
                                    </div>
                                </label>
                                <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${paymentType === 'qris' ? 'border-secondary bg-secondary/10' : 'border-base-300'}`}>
                                    <input type="radio" name="paymentType" className="radio radio-secondary" checked={paymentType === 'qris'} onChange={() => setPaymentType('qris')} />
                                    <div>
                                        <span className="font-semibold text-sm">QRIS</span>
                                        <p className="text-xs text-base-content/60">Bayar via QRIS</p>
                                    </div>
                                </label>
                            </div>
                            {paymentType === 'utang' && firstCustomer && (
                                <div className="p-3 rounded-lg bg-base-200 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-base-content/70">Limit Customer</span>
                                        <span className="font-mono">Rp {customerLimit.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-base-content/70">Limit Terpakai</span>
                                        <span className="font-mono">Rp {customerLimitAkhir.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-base-content/70">Sisa Limit</span>
                                        <span className={`font-mono font-semibold ${customerLimitRemaining >= totalHarga ? 'text-success' : 'text-error'}`}>Rp {customerLimitRemaining.toLocaleString('id-ID')}</span>
                                    </div>
                                    {wouldExceedLimit && (
                                        <div className="text-error text-xs font-medium mt-1">
                                            <i className="fas fa-exclamation-circle"></i> Melebihi limit customer!
                                        </div>
                                    )}
                                </div>
                            )}
                            {paymentError && (
                                <div className="alert alert-error text-sm py-2">
                                    <i className="fas fa-exclamation-triangle"></i> {paymentError}
                                </div>
                            )}
                        </div>
                    )}
                    <div className="modal-action flex-col gap-2">
                        <div className="flex gap-2 w-full">
                            <button className="btn btn-success flex-1" onClick={() => requestPassword('review')}>
                                <i className="fas fa-eye"></i> Review Struk
                            </button>

                            <button
                                className="btn btn-primary flex-1"
                                onClick={() => requestPassword('proses')}
                                disabled={processing || (paymentType === 'utang' && wouldExceedLimit)}
                            >
                                {processing ? <><span className="loading loading-spinner"></span> Memproses...</> : <><i className="fas fa-check"></i> Proses & Cetak Struk</>}
                            </button>
                        </div>

                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => paymentModalRef.current?.close()}>close</button>
                </form>
            </dialog>
            <KonfirmasiPassword
                show={showPasswordModal}
                onConfirmed={handlePasswordConfirmed}
                onClose={handlePasswordCancel}
            />
        </AdminLayout>
    )
}
