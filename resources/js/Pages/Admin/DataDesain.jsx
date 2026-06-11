import AdminLayout from '@/Layouts/AdminLayout'
import { Link, router } from '@inertiajs/react'
import React, { useRef } from 'react'

export default function DataDesain({ desain, tglAwal, tglAkhir }) {
    const [search, setSearch] = React.useState('')
    const [tgl_awal, setTglAwal] = React.useState(tglAwal || '')
    const [tgl_akhir, setTglAkhir] = React.useState(tglAkhir || '')
    const [selected, setSelected] = React.useState([])
    const [paymentType, setPaymentType] = React.useState('lunas')
    const [paymentError, setPaymentError] = React.useState(null)
    const [processing, setProcessing] = React.useState(false)
    const [printMode, setPrintMode] = React.useState('single')
    const previewRef = useRef(null)
    const iframeRef = useRef(null)
    const paymentModalRef = useRef(null)

    const allIds = desain.data.map((item) => item.id)
    const allSelected = allIds.length > 0 && selected.length === allIds.length

    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        )
    }

    const toggleSelectAll = () => {
        setSelected(allSelected ? [] : [...allIds])
    }

    const selectedItems = desain.data.filter((item) => selected.includes(item.id))
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
        router.get('/data-desain', { search, tgl_awal, tgl_akhir }, { preserveState: true, replace: true })
    }

    const escapeHtml = (value) =>
        String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')

    const formatReceiptDate = (date = new Date()) =>
        new Intl.DateTimeFormat('id-ID', {
            day: '2-digit', month: 'short', year: 'numeric',
        }).format(date)

    const formatReceiptTime = (date = new Date()) =>
        new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit', minute: '2-digit', hour12: false,
        }).format(date)

    const buildReceiptHtml = (items) => {
        const printedAt = new Date()
        const isMultiple = items.length > 1
        const gtHarga = items.reduce((s, it) => s + Number(it.total_harga || 0), 0)
        const gtQty = items.reduce((s, it) => s + Number(it.qty || 0), 0)

        const itemRows = items.map((item, i) => `
            <tr${i % 2 === 1 ? ' class="alt"' : ''}>
                <td>${escapeHtml(item.kode_order)}</td>
                <td>${escapeHtml(item.customer?.nama)}</td>
                <td>${escapeHtml(item.kategoridesain?.kategori)}</td>
                <td class="num">${escapeHtml(item.qty)}</td>
                <td class="num">Rp ${Number(item.total_harga || 0).toLocaleString('id-ID')}</td>
            </tr>
        `).join('')

        return `
            <!doctype html>
            <html>
                <head>
                    <title>Struk Desain - ${isMultiple ? items.length + ' item' : escapeHtml(items[0].kode_order)}</title>
                    <style>
                        @page { size: 75mm auto; margin: 3mm; }
                        * { box-sizing: border-box; margin: 0; padding: 0; }
                        body { width: 69mm; margin: 0; color: #000; font-family: 'Courier New', monospace; font-size: 10px; line-height: 1.3; }
                        .receipt { width: 69mm; padding: 2mm 2mm; }
                        .header { text-align: center; margin-bottom: 6px; }
                        .header .brand { font-size: 20px; font-weight: 900; letter-spacing: 2px; }
                        .header .sub { font-size: 11px; font-weight: 700; }
                        .header .contact { font-size: 10px; }
                        .divider { border-top: 1px dashed #000; margin: 6px 0; }
                        .divider-solid { border-top: 1px solid #000; margin: 6px 0; }
                        .info-row { display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 2px; }
                        .info-row .label { font-weight: 700; }
                        .section-title { font-weight: 700; font-size: 11px; margin: 4px 0 3px; }
                        table { width: 100%; border-collapse: collapse; font-size: 9px; }
                        th, td { padding: 2px 3px; text-align: left; vertical-align: top; }
                        thead th { border-bottom: 1px solid #000; font-weight: 700; }
                        tbody td { border-bottom: 1px dotted #ccc; }
                        .num { text-align: right; font-variant-numeric: tabular-nums; }
                        .total-row td { font-weight: 700; border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 3px; }
                        .total-row .num { font-size: 11px; }
                        .footer { text-align: center; margin-top: 8px; font-size: 9px; }
                        .signature { display: flex; justify-content: space-between; margin-top: 16px; font-size: 10px; }
                        .signature div { text-align: center; }
                        .signature .line { margin-top: 24px; width: 80px; border-top: 1px solid #000; }
                        @media print { body { margin: 0; } }
                    </style>
                </head>
                <body>
                    <div class="receipt">
                        <div class="header">
                            <div class="brand">SENTOSA</div>
                            <div class="sub">DIGITAL PRINTING</div>
                            <div class="contact">081 - 7368007</div>
                        </div>
                        <div class="divider"></div>
                        <div class="info-row">
                            <span class="label">Tanggal</span>
                            <span>${escapeHtml(formatReceiptDate(printedAt))} ${escapeHtml(formatReceiptTime(printedAt))}</span>
                        </div>
                        ${isMultiple ? `
                            <div class="section-title">STRUK DESAIN (${items.length} item)</div>
                        ` : `
                            <div class="info-row"><span class="label">Kode Order</span><span>${escapeHtml(items[0].kode_order)}</span></div>
                            <div class="info-row"><span class="label">Customer</span><span>${escapeHtml(items[0].customer?.nama)}</span></div>
                            <div class="info-row"><span class="label">Desain</span><span>${escapeHtml(items[0].kategoridesain?.kategori)}</span></div>
                        `}
                        <div class="divider"></div>
                        <table>
                            <thead><tr>
                                <th>Kode</th><th>Customer</th><th>Desain</th><th class="num">Qty</th><th class="num">Total</th>
                            </tr></thead>
                            <tbody>${itemRows}</tbody>
                            ${isMultiple ? `<tfoot><tr class="total-row">
                                <td colspan="2">${items.length} item</td>
                                <td></td><td class="num">${gtQty}</td>
                                <td class="num">Rp ${gtHarga.toLocaleString('id-ID')}</td>
                            </tr></tfoot>` : ''}
                        </table>
                        <div class="divider"></div>
                        <div class="info-row"><span class="label">Total Item</span><span>${items.length}</span></div>
                        <div class="info-row"><span class="label">Total Qty</span><span>${gtQty}</span></div>
                        <div class="info-row" style="font-size:13px;font-weight:900;margin-top:2px;">
                            <span>GRAND TOTAL</span>
                            <span>Rp ${gtHarga.toLocaleString('id-ID')}</span>
                        </div>
                        <div class="divider-solid"></div>
                        <div class="signature">
                            <div><div>Hormat Kami</div><div class="line"></div></div>
                            <div><div>Penerima</div><div class="line"></div></div>
                        </div>
                        <div class="footer">Terima Kasih Atas Kepercayaan Anda<br>Barang yang sudah dibeli tidak dapat dikembalikan</div>
                    </div>
                    <script>
                        window.addEventListener('load',function(){window.focus();setTimeout(function(){window.print()},300)});
                        window.addEventListener('afterprint',function(){window.close()});
                    </script>
                </body>
            </html>
        `
    }

    const doPrintReceipt = (items) => {
        if (items.length === 0) return
        if (items.length === 1) {
            const w = window.open('', '_blank', 'width=420,height=640')
            w.document.open(); w.document.write(buildReceiptHtml(items)); w.document.close()
        } else {
            let idx = 0
            const openNext = () => {
                if (idx >= items.length) return
                const w = window.open('', '_blank', 'width=420,height=640')
                w.document.open(); w.document.write(buildReceiptHtml([items[idx]])); w.document.close()
                const t = setInterval(() => { if (w.closed) { clearInterval(t); idx++; openNext() } }, 500)
            }
            openNext()
        }
    }

    const doPrintReceiptCombined = (items) => {
        if (items.length === 0) return
        const w = window.open('', '_blank', 'width=500,height=700')
        w.document.open(); w.document.write(buildReceiptHtml(items)); w.document.close()
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
        setPaymentError(null)

        router.put(route('proses.pembayaran.desain'), { ids: selected, payment_type: paymentType }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setProcessing(false)
                paymentModalRef.current?.close()
                if (printMode === 'combined') {
                    doPrintReceiptCombined(selectedItems)
                } else {
                    doPrintReceipt(selectedItems)
                }
                setSelected([])
            },
            onError: (errors) => {
                setProcessing(false)
                setPaymentError(errors.payment || 'Terjadi kesalahan')
            },
        })
    }

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
                            <h2 className="card-title">Data Desain</h2>
                        </div>

                        <div className="mb-3">
                            <form onSubmit={handleSearch} className="flex flex-wrap gap-2 items-end">
                                <input
                                    type="text"
                                    placeholder="Cari kode order, customer, desain, desainer..."
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
                            <div className="mb-3 bg-gradient-to-r from-success/10 to-success/5 border border-success/30 rounded-xl px-4 py-3 shadow-sm transition-all duration-300">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="badge badge-success badge-lg gap-1">
                                                <i className="fas fa-check-circle text-xs"></i>
                                                {selected.length}
                                            </div>
                                            <span className="text-base-content/70 font-medium">item dipilih</span>
                                        </div>
                                        <div className="hidden sm:flex items-center gap-4">
                                            <span className="text-base-content/40">|</span>
                                            <span className="text-base-content/70">
                                                Qty: <strong className="text-base-content">{totalQty}</strong>
                                            </span>
                                            <span className="text-base-content/40">|</span>
                                            <span className="text-base-content/70">
                                                Total: <strong className="text-success text-sm">Rp {totalHarga.toLocaleString('id-ID')}</strong>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="btn btn-success btn-sm" onClick={handleCetakStruk}>
                                            <i className="fas fa-receipt"></i> Cetak Struk
                                        </button>
                                        <div className="dropdown dropdown-end">
                                            <button className="btn btn-success btn-sm btn-outline" tabIndex={0}>
                                                <i className="fas fa-chevron-down"></i>
                                            </button>
                                            <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-100 rounded-xl shadow-lg border border-base-300 z-50 w-48 p-2 mt-1">
                                                <li><button onClick={handleCetakGabungan}><i className="fas fa-layer-group"></i> Cetak Gabungan</button></li>
                                                <li><button onClick={() => setPreview(true)}><i className="fas fa-eye"></i> Preview Struk</button></li>
                                                <li><button onClick={() => setSelected([])}><i className="fas fa-times"></i> Batalkan Pilihan</button></li>
                                            </ul>
                                        </div>
                                    </div>
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
                                            <th>Tgl</th>
                                            <th>No Antrian</th>
                                            <th>Kode Order</th>
                                            <th>Customer</th>
                                            <th>Desain</th>
                                            <th>Qty</th>
                                            <th>Total Harga</th>
                                            <th>Pembayaran</th>
                                            <th>Desainer</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs">
                                        {desain.data.length === 0 ? (
                                            <tr>
                                                <td colSpan={11} className="text-center py-8 text-base-content/50">
                                                    Tidak ada data desain
                                                </td>
                                            </tr>
                                        ) : (
                                            desain.data.map((item, index) => (
                                                <tr key={item.id} className={`hover:bg-base-200 ${item.pembayaran === 'utang' ? 'bg-red-50 text-red-700' : item.pembayaran === 'lunas' ? 'bg-green-50 text-green-700' : ''}`}>
                                                    <td>
                                                        <input type="checkbox" className="checkbox checkbox-sm checkbox-success" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} />
                                                    </td>
                                                    <td>{desain.from + index}</td>
                                                    <td>{item.tanggal}</td>
                                                    <td>{item.no_antrian}</td>
                                                    <td className="font-mono font-medium">{item.kode_order}</td>
                                                    <td>{item.customer?.nama}</td>
                                                    <td>{item.kategoridesain?.kategori}</td>
                                                    <td className="tabular-nums text-center">{item.qty}</td>
                                                    <td className="tabular-nums">Rp {Number(item.total_harga || 0).toLocaleString('id-ID')}</td>
                                                    <td>
                                                        {item.pembayaran ? (
                                                            <span className={`badge badge-sm ${item.pembayaran === 'lunas' ? 'badge-success' : 'badge-warning'}`}>
                                                                {item.pembayaran === 'lunas' ? 'Lunas' : 'Utang'}
                                                            </span>
                                                        ) : (
                                                            <span className="text-base-content/30">-</span>
                                                        )}
                                                    </td>
                                                    <td>{item.desainer?.username || '-'}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {desain.links && (
                                <div className="flex justify-center mt-4 join">
                                    {desain.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            className={`btn btn-sm join-item ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                            preserveState
                                            replace
                                            onClick={() => setSelected([])}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
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
                            <button className="btn btn-success btn-sm" onClick={() => { previewRef.current?.close(); handleCetakStruk() }}>
                                <i className="fas fa-print"></i> Cetak
                            </button>
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
                            <div className="flex gap-3">
                                <label className={`flex-1 flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${paymentType === 'lunas' ? 'border-success bg-success/10' : 'border-base-300'}`}>
                                    <input type="radio" name="paymentType" className="radio radio-success" checked={paymentType === 'lunas'} onChange={() => setPaymentType('lunas')} />
                                    <div>
                                        <span className="font-semibold text-sm">Lunas</span>
                                        <p className="text-xs text-base-content/60">Pembayaran penuh</p>
                                    </div>
                                </label>
                                <label className={`flex-1 flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${paymentType === 'utang' ? 'border-warning bg-warning/10' : 'border-base-300'}`}>
                                    <input type="radio" name="paymentType" className="radio radio-warning" checked={paymentType === 'utang'} onChange={() => setPaymentType('utang')} />
                                    <div>
                                        <span className="font-semibold text-sm">Utang</span>
                                        <p className="text-xs text-base-content/60">Pembayaran sebagian</p>
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
                    <div className="modal-action">
                        <button className="btn btn-ghost" onClick={() => paymentModalRef.current?.close()}>Batal</button>
                        <button
                            className="btn btn-primary w-full"
                            onClick={handlePaymentConfirm}
                            disabled={processing || (paymentType === 'utang' && wouldExceedLimit)}
                        >
                            {processing ? <><span className="loading loading-spinner"></span> Memproses...</> : <><i className="fas fa-print"></i> Proses & Cetak Struk</>}
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => paymentModalRef.current?.close()}>close</button>
                </form>
            </dialog>
        </AdminLayout>
    )
}
