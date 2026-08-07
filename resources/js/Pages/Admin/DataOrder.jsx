import AdminLayout from '@/Layouts/AdminLayout'
import { Link, router, usePage } from '@inertiajs/react'
import React from 'react'

export default function DataOrder({ desain, produksi, tglAwal, tglAkhir, searchDesain, searchProduksi, penggunas, invoiceProduksiData, produksiInvoiceTotals, invoiceDesainData, desainInvoiceTotals }) {
    const { auth } = usePage().props
    const canEdit = ['Admin', 'admin', 'Admin2', 'admin2', 'Admin 2', 'admin 2'].includes(auth?.user?.role)
    const [searchDesainVal, setSearchDesainVal] = React.useState(searchDesain || '')
    const [searchProduksiVal, setSearchProduksiVal] = React.useState(searchProduksi || '')
    const [tgl_awal, setTglAwal] = React.useState(tglAwal || '')
    const [tgl_akhir, setTglAkhir] = React.useState(tglAkhir || '')

    const { flash } = usePage().props

    React.useEffect(() => {
        if (flash?.success) {
            Swal.fire({ icon: 'success', title: 'Berhasil', text: flash.success, timer: 1500, showConfirmButton: false })
        }
        if (flash?.error) {
            Swal.fire({ icon: 'error', title: 'Gagal', text: flash.error })
        }
    }, [flash])

    const groupByInvoice = (items) => {
        const map = new Map()
        items.forEach(item => {
            const key = item.no_invoice || ''
            if (!map.has(key)) {
                map.set(key, { no_invoice: item.no_invoice, items: [], total: 0 })
            }
            const g = map.get(key)
            g.items.push(item)
            g.total += Number(item.total_harga || 0)
        })
        return Array.from(map.values())
    }

    const groupedProduksi = React.useMemo(() => groupByInvoice(produksi.data), [produksi.data])
    const groupedDesain = React.useMemo(() => groupByInvoice(desain.data), [desain.data])

    const csList = React.useMemo(() => {
        return Array.isArray(penggunas) ? penggunas.filter((p) => p.role === 'Customer Service') : []
    }, [penggunas])

    const [editProduksi, setEditProduksi] = React.useState(null)
    const [editDesain, setEditDesain] = React.useState(null)
    const [editPembayaran, setEditPembayaran] = React.useState('')
    const [editIdCs, setEditIdCs] = React.useState('')
    const [editKeterangan, setEditKeterangan] = React.useState('')
    const [saving, setSaving] = React.useState(false)
    const [diskonModal, setDiskonModal] = React.useState(null)
    const [diskonForm, setDiskonForm] = React.useState({ mode_diskon: 'persen', diskon: '' })
    const [minModal, setMinModal] = React.useState(null)
    const [minValue, setMinValue] = React.useState('')
    const [submitting, setSubmitting] = React.useState(false)

    const openEditProduksi = (item) => {
        setEditProduksi(item)
        setEditPembayaran(item.pembayaran || 'lunas')
        setEditIdCs(item.id_cs || '')
        setEditKeterangan(item.keterangan || '')
        document.getElementById('modalEditProduksi').showModal()
    }

    const openEditDesain = (item) => {
        setEditDesain(item)
        setEditPembayaran(item.pembayaran || 'lunas')
        setEditIdCs(item.id_cs || '')
        setEditKeterangan(item.keterangan || '')
        document.getElementById('modalEditDesain').showModal()
    }

    const closeModals = () => {
        setEditProduksi(null)
        setEditDesain(null)
        setEditPembayaran('')
        setEditIdCs('')
        setEditKeterangan('')
        setSaving(false)
    }

    const saveProduksi = () => {
        if (!editProduksi) return
        setSaving(true)
        router.put(`/data-order/produksi/${editProduksi.id}/payment`, {
            pembayaran: editPembayaran,
            id_cs: editIdCs || null,
            keterangan: editKeterangan,
        }, {
            replace: true,
            onSuccess: () => {
                document.getElementById('modalEditProduksi').close()
                closeModals()
            },
            onError: () => {
                setSaving(false)
            },
        })
    }

    const saveDesain = () => {
        if (!editDesain) return
        setSaving(true)
        router.put(`/data-order/desain/${editDesain.id}/payment`, {
            pembayaran: editPembayaran,
            id_cs: editIdCs || null,
            keterangan: editKeterangan,
        }, {
            replace: true,
            onSuccess: () => {
                document.getElementById('modalEditDesain').close()
                closeModals()
            },
            onError: () => {
                setSaving(false)
            },
        })
    }

    const handleSearch = () => {
        router.get('/data-order', {
            search_desain: searchDesainVal,
            search_produksi: searchProduksiVal,
            tgl_awal,
            tgl_akhir,
        }, { preserveState: true, replace: true })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch()
    }

    const openDiskonModal = (group) => {
        const inv = invoiceProduksiData?.[group.no_invoice]
        const hargaAwal = inv?.harga_awal ?? produksiInvoiceTotals?.[group.no_invoice] ?? group.total
        const isEdit = inv?.diskon != null && Number(inv.diskon) !== 0 && inv?.harga_awal != null && inv?.harga_akhir != null
        setDiskonModal({
            no_invoice: group.no_invoice,
            id_customer: group.items[0]?.customer?.id,
            customer: group.items[0]?.customer?.nama || '-',
            harga_awal: hargaAwal,
            isEdit,
        })
        setDiskonForm({
            mode_diskon: inv?.mode_diskon || 'persen',
            diskon: inv?.diskon ?? '',
        })
        document.getElementById('modalDiskon').showModal()
    }

    const openMinModal = (group) => {
        setMinModal({
            no_invoice: group.no_invoice,
            id_customer: group.items[0]?.customer?.id,
            customer: group.items[0]?.customer?.nama || '-',
        })
        setMinValue('')
        document.getElementById('modalMinimum').showModal()
    }

    const submitDiskon = (e) => {
        e.preventDefault()
        if (!diskonModal) return
        setSubmitting(true)
        router.post('/data-order/diskon', {
            no_invoice: diskonModal.no_invoice,
            id_customer: diskonModal.id_customer,
            harga_awal: diskonModal.harga_awal,
            mode_diskon: diskonForm.mode_diskon,
            diskon: diskonForm.diskon,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                document.getElementById('modalDiskon').close()
                setDiskonModal(null)
                setDiskonForm({ mode_diskon: 'persen', diskon: '' })
                setSubmitting(false)
            },
            onError: () => setSubmitting(false),
        })
    }

    const submitMinimum = (e) => {
        e.preventDefault()
        if (!minModal) return
        setSubmitting(true)
        router.post('/data-order/minimum', {
            no_invoice: minModal.no_invoice,
            id_customer: minModal.id_customer,
            minimum_faktur: minValue,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                document.getElementById('modalMinimum').close()
                setMinModal(null)
                setMinValue('')
                setSubmitting(false)
            },
            onError: () => setSubmitting(false),
        })
    }

    const batalDiskon = (group) => {
        Swal.fire({
            title: 'Batalkan Diskon?',
            text: `Diskon untuk invoice ${group.no_invoice || '-'} akan dihapus dan total kembali semula.`,
            icon: 'warning',
            showCancelButton: true,
            customClass: {
                confirmButton: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded',
                cancelButton: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded',
            },
            confirmButtonText: 'Ya, Batalkan',
            cancelButtonText: 'Tidak',
        }).then((result) => {
            if (result.isConfirmed) {
                router.put(`/data-order/diskon/${encodeURIComponent(group.no_invoice)}/batal`, {}, {
                    preserveScroll: true,
                })
            }
        })
    }

    const batalMinimum = (group) => {
        Swal.fire({
            title: 'Batalkan Minimum Harga?',
            text: `Minimum harga untuk invoice ${group.no_invoice || '-'} akan dihapus dan total kembali semula.`,
            icon: 'warning',
            showCancelButton: true,
            customClass: {
                confirmButton: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded',
                cancelButton: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded',
            },
            confirmButtonText: 'Ya, Batalkan',
            cancelButtonText: 'Tidak',
        }).then((result) => {
            if (result.isConfirmed) {
                router.put(`/data-order/minimum/${encodeURIComponent(group.no_invoice)}/batal`, {}, {
                    preserveScroll: true,
                })
            }
        })
    }

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                <div className="card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <h2 className="card-title">Data Order</h2>
                        </div>

                        <div className="flex flex-wrap gap-2 items-end mb-6">
                            <label className="form-control w-full max-w-[160px]">
                                <span className="label-text text-xs">Tgl Awal</span>
                                <input type="date" className="input input-bordered input-success input-sm" value={tgl_awal} onChange={(e) => setTglAwal(e.target.value)} />
                            </label>
                            <label className="form-control w-full max-w-[160px]">
                                <span className="label-text text-xs">Tgl Akhir</span>
                                <input type="date" className="input input-bordered input-success input-sm" value={tgl_akhir} onChange={(e) => setTglAkhir(e.target.value)} />
                            </label>
                            <button className="btn btn-success btn-sm" onClick={handleSearch}>
                                <i className="fas fa-search"></i> Cari
                            </button>
                        </div>

                        <div className="divider font-bold text-base-content/70">DATA PRODUKSI</div>

                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="Cari No Invoice, SPK atau Customer..."
                                className="input input-bordered input-success w-full max-w-xs input-sm"
                                value={searchProduksiVal}
                                onChange={(e) => setSearchProduksiVal(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Tgl</th>
                                        <th>Tgl Kirim</th>
                                        <th>No Inv</th>
                                        <th>No SPK</th>
                                        <th>Customer</th>
                                        <th>Bahan</th>
                                        <th>Keterangan</th>
                                        <th>Qty</th>
                                        <th>Harga</th>
                                        <th>Pembayaran</th>
                                        <th>CS</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs">
                                    {produksi.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={12} className="text-center py-8 text-base-content/50">Tidak ada data produksi</td>
                                        </tr>
                                    ) : (() => {
                                        let counter = produksi.from
                                        return groupedProduksi.map(group => (
                                            <React.Fragment key={group.no_invoice || '__nil__'}>
                                                {(() => {
                                                    const inv = invoiceProduksiData?.[group.no_invoice]
                                                    const fullTotal = inv?.harga_akhir ?? produksiInvoiceTotals?.[group.no_invoice] ?? group.total
                                                    const hasDiskon = inv?.diskon != null && Number(inv.diskon) !== 0 && inv?.harga_awal != null && inv?.harga_akhir != null
                                                    const hasMinFaktur = !hasDiskon && inv?.minimum_faktur != null && Number(inv.minimum_faktur) > 0 && inv?.harga_awal != null && inv?.harga_akhir != null
                                                    const headerBg = hasDiskon ? 'bg-orange-100' : hasMinFaktur ? 'bg-blue-100' : 'bg-base-300'
                                                    return (
                                                        <tr className={`${headerBg} font-semibold text-sm`}>
                                                            <td colSpan={12} className="p-2">
                                                                <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                                                                    <span className="font-bold">{group.no_invoice || '-'}</span>
                                                                    <span>Customer: {group.items[0]?.customer?.nama || '-'}</span>
                                                                    {hasDiskon ? (
                                                                        <span className="font-bold text-success">
                                                                            Diskon: {inv.mode_diskon === 'persen' ? `${inv.diskon}%` : `Rp ${Number(inv.diskon).toLocaleString('id-ID')}`}
                                                                            {` | Awal: Rp ${Number(inv.harga_awal).toLocaleString('id-ID')}`}
                                                                            {` | Akhir: Rp ${Number(fullTotal).toLocaleString('id-ID')}`}
                                                                        </span>
                                                                    ) : hasMinFaktur ? (
                                                                        <span className="font-bold text-success">
                                                                            Min Faktur: Rp {Number(inv.minimum_faktur).toLocaleString('id-ID')}
                                                                            {` | Awal: Rp ${Number(inv.harga_awal).toLocaleString('id-ID')}`}
                                                                            {` | Akhir: Rp ${Number(fullTotal).toLocaleString('id-ID')}`}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="font-bold text-success">
                                                                            Total: Rp {Number(fullTotal).toLocaleString('id-ID')}
                                                                        </span>
                                                                    )}
                                                                    {canEdit && (
                                                                        <div className="dropdown dropdown-end ml-auto">
                                                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-xs text-primary">

                                                                                Diskon & Min Harga <i className="fas fa-ellipsis-vertical"></i>
                                                                            </div>
                                                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-56 p-2 shadow">
                                                                                <li>
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={(e) => { e.stopPropagation(); document.activeElement?.blur(); openDiskonModal(group) }}
                                                                                    >
                                                                                        <i className={`fas ${hasDiskon ? 'fa-pen' : 'fa-percent'}`}></i>
                                                                                        {hasDiskon ? 'Edit Diskon' : 'Tambah Diskon'}
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={(e) => { e.stopPropagation(); document.activeElement?.blur(); openMinModal(group) }}
                                                                                    >
                                                                                        <i className="fas fa-arrow-up"></i> Tambah Minimum
                                                                                    </button>
                                                                                </li>
                                                                                {hasDiskon && (
                                                                                    <li>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="text-error"
                                                                                            onClick={(e) => { e.stopPropagation(); document.activeElement?.blur(); batalDiskon(group) }}
                                                                                        >
                                                                                            <i className="fas fa-times"></i> Batalkan Diskon
                                                                                        </button>
                                                                                    </li>
                                                                                )}
                                                                                {hasMinFaktur && (
                                                                                    <li>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="text-error"
                                                                                            onClick={(e) => { e.stopPropagation(); document.activeElement?.blur(); batalMinimum(group) }}
                                                                                        >
                                                                                            <i className="fas fa-times"></i> Batalkan Minimum
                                                                                        </button>
                                                                                    </li>
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })()}
                                                {group.items.map(item => (
                                                    <tr key={item.id} className={`${canEdit ? 'cursor-pointer hover:bg-base-200' : ''}`} onClick={() => canEdit && openEditProduksi(item)}>
                                                        <td>{counter++}</td>
                                                        <td>{item.tanggal}</td>
                                                        <td>{item.tgl_kirim}</td>
                                                        <td className="font-mono font-medium">{item.no_invoice}</td>
                                                        <td className="font-mono">{item.kode_spk}</td>
                                                        <td>{item.customer?.nama}</td>
                                                        <td>{item.bahan?.bahan}</td>
                                                        <td>{item.keterangan}</td>
                                                        <td className="tabular-nums text-center">{item.qty}</td>
                                                        <td className="tabular-nums">Rp {Number(item.total_harga || 0).toLocaleString('id-ID')}</td>
                                                        <td>
                                                            {item.pembayaran ? (
                                                                <span className={`badge badge-sm ${item.pembayaran === 'lunas' ? 'badge-success' : item.pembayaran === 'utang' ? 'badge-warning' : item.pembayaran === 'transfer' ? 'badge-info' : 'badge-secondary'}`}>
                                                                    {item.pembayaran === 'lunas' ? 'Lunas' : item.pembayaran === 'utang' ? 'Utang' : item.pembayaran === 'transfer' ? 'Transfer' : 'QRIS'}
                                                                </span>
                                                            ) : (
                                                                <span className="text-base-content/30">-</span>
                                                            )}
                                                        </td>
                                                        <td>{item.cs?.username || '-'}</td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))
                                    })()}
                                </tbody>
                            </table>
                            {produksi.links && (
                                <div className="flex justify-center mt-4 join">
                                    {produksi.links.map((link, i) => (
                                        <Link key={i} href={link.url || '#'}
                                            className={`btn btn-sm join-item ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                            preserveState replace
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="divider font-bold text-base-content/70 mt-5">DATA DESAIN</div>

                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="Cari No Invoice atau Customer..."
                                className="input input-bordered input-success w-full max-w-xs input-sm"
                                value={searchDesainVal}
                                onChange={(e) => setSearchDesainVal(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="overflow-x-auto mb-6">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Tgl</th>
                                        <th>No Antrian</th>
                                        <th>No Inv / SPK</th>
                                        <th>Customer</th>
                                        <th>Desain</th>
                                        <th>Qty</th>
                                        <th>Total Harga</th>
                                        <th>Pembayaran</th>
                                        <th>Desainer</th>
                                        <th>CS</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs">
                                    {desain.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={11} className="text-center py-8 text-base-content/50">Tidak ada data desain</td>
                                        </tr>
                                    ) : (() => {
                                        let counter = desain.from
                                        return groupedDesain.map(group => (
                                            <React.Fragment key={group.no_invoice || '__nil__'}>
                                                {(() => {
                                                    const inv = invoiceDesainData?.[group.no_invoice]
                                                    const fullTotal = inv?.harga_akhir ?? desainInvoiceTotals?.[group.no_invoice] ?? group.total
                                                    const hasDiskon = inv?.diskon != null && Number(inv.diskon) !== 0 && inv?.harga_awal != null && inv?.harga_akhir != null
                                                    const headerBg = hasDiskon ? 'bg-orange-100' : 'bg-base-300'
                                                    return (
                                                        <tr className={`${headerBg} font-semibold text-sm`}>
                                                            <td colSpan={11} className="p-2">
                                                                <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                                                                    <span className="font-bold">Inv: {group.no_invoice || '-'}</span>
                                                                    <span>Customer: {group.items[0]?.customer?.nama || '-'}</span>
                                                                    {hasDiskon ? (
                                                                        <span className="ml-auto font-bold text-success">
                                                                            Diskon: {inv.mode_diskon === 'persen' ? `${inv.diskon}%` : `Rp ${Number(inv.diskon).toLocaleString('id-ID')}`}
                                                                            {` | Awal: Rp ${Number(inv.harga_awal).toLocaleString('id-ID')}`}
                                                                            {` | Akhir: Rp ${Number(fullTotal).toLocaleString('id-ID')}`}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="ml-auto font-bold text-success">
                                                                            Total: Rp {Number(fullTotal).toLocaleString('id-ID')}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })()}
                                                {group.items.map(item => (
                                                    <tr key={item.id} className={`${canEdit ? 'cursor-pointer hover:bg-base-200' : ''}`} onClick={() => canEdit && openEditDesain(item)}>
                                                        <td>{counter++}</td>
                                                        <td>{item.tanggal}</td>
                                                        <td>{item.no_antrian}</td>
                                                        <td className="font-mono font-medium">{item.kode_spk || item.no_invoice}</td>
                                                        <td>{item.customer?.nama}</td>
                                                        <td>{item.kategoridesain?.kategori}</td>
                                                        <td className="tabular-nums text-center">{item.qty}</td>
                                                        <td className="tabular-nums">Rp {Number(item.total_harga || 0).toLocaleString('id-ID')}</td>
                                                        <td>
                                                            {item.pembayaran ? (
                                                                <span className={`badge badge-sm ${item.pembayaran === 'lunas' ? 'badge-success' : item.pembayaran === 'transfer' ? 'badge-info' : item.pembayaran === 'qris' ? 'badge-secondary' : 'badge-warning'}`}>
                                                                    {item.pembayaran === 'lunas' ? 'Lunas' : item.pembayaran === 'transfer' ? 'Transfer' : item.pembayaran === 'qris' ? 'QRIS' : 'Hutang'}
                                                                </span>
                                                            ) : (
                                                                <span className="text-base-content/30">-</span>
                                                            )}
                                                        </td>
                                                        <td>{item.desainer?.username || '-'}</td>
                                                        <td>{item.cs?.username || '-'}</td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))
                                    })()}
                                </tbody>
                            </table>
                            {desain.links && (
                                <div className="flex justify-center mt-4 join">
                                    {desain.links.map((link, i) => (
                                        <Link key={i} href={link.url || '#'}
                                            className={`btn btn-sm join-item ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                            preserveState replace
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <dialog id="modalEditProduksi" className="modal">
                <div className="modal-box max-w-md">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">Edit Pembayaran Produksi</h3>
                    {editProduksi && (
                        <div className="space-y-3">
                            <div className="text-sm text-base-content/70">
                                <p><span className="font-semibold">No Invoice:</span> {editProduksi.no_invoice}</p>
                                <p><span className="font-semibold">Kode SPK:</span> {editProduksi.kode_spk || '-'}</p>
                                <p><span className="font-semibold">Customer:</span> {editProduksi.customer?.nama}</p>
                                <p><span className="font-semibold">Total:</span> Rp {Number(editProduksi.total_harga || 0).toLocaleString('id-ID')}</p>
                            </div>
                            <div className="divider my-2"></div>
                            <label className="form-control w-full">
                                <span className="label-text font-semibold mb-2">Pembayaran</span>
                                <div className="flex flex-wrap gap-3">
                                    {['lunas', 'utang', 'transfer', 'qris'].map((val) => (
                                        <label key={val} className="flex items-center gap-1.5 cursor-pointer">
                                            <input type="radio" name="pembayaran_produksi" className="radio radio-success radio-sm" value={val} checked={editPembayaran === val} onChange={() => setEditPembayaran(val)} />
                                            <span className="text-sm capitalize">{val === 'utang' ? 'Hutang' : val === 'qris' ? 'QRIS' : val}</span>
                                        </label>
                                    ))}
                                </div>
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text font-semibold">CS</span>
                                <select className="select select-bordered select-sm w-full text-sm" value={editIdCs} onChange={(e) => setEditIdCs(e.target.value)}>
                                    <option value="">Pilih CS</option>
                                    {csList.map((cs) => (
                                        <option key={cs.id} value={cs.id}>{cs.username}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text font-semibold">Keterangan</span>
                                <textarea className="textarea textarea-bordered textarea-sm w-full" rows={2} value={editKeterangan} onChange={(e) => setEditKeterangan(e.target.value)}></textarea>
                            </label>
                            <div className="modal-action">
                                <button className="btn btn-success btn-sm" onClick={saveProduksi} disabled={saving}>
                                    {saving ? <span className="loading loading-spinner loading-xs"></span> : 'Simpan'}
                                </button>
                                <form method="dialog">
                                    <button className="btn btn-ghost btn-sm" onClick={closeModals}>Batal</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </dialog>

            <dialog id="modalEditDesain" className="modal">
                <div className="modal-box max-w-md">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">Edit Pembayaran Desain</h3>
                    {editDesain && (
                        <div className="space-y-3">
                            <div className="text-sm text-base-content/70">
                                <p><span className="font-semibold">No Invoice:</span> {editDesain.no_invoice}</p>
                                <p><span className="font-semibold">Kode SPK:</span> {editDesain.kode_spk || editDesain.no_invoice || '-'}</p>
                                <p><span className="font-semibold">Customer:</span> {editDesain.customer?.nama}</p>
                                <p><span className="font-semibold">Total:</span> Rp {Number(editDesain.total_harga || 0).toLocaleString('id-ID')}</p>
                            </div>
                            <div className="divider my-2"></div>
                            <label className="form-control w-full">
                                <span className="label-text font-semibold mb-2">Pembayaran</span>
                                <div className="flex flex-wrap gap-3">
                                    {['lunas', 'utang', 'transfer', 'qris'].map((val) => (
                                        <label key={val} className="flex items-center gap-1.5 cursor-pointer">
                                            <input type="radio" name="pembayaran_desain" className="radio radio-success radio-sm" value={val} checked={editPembayaran === val} onChange={() => setEditPembayaran(val)} />
                                            <span className="text-sm capitalize">{val === 'utang' ? 'Hutang' : val === 'qris' ? 'QRIS' : val}</span>
                                        </label>
                                    ))}
                                </div>
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text font-semibold">CS</span>
                                <select className="select select-bordered select-sm text-sm w-full" value={editIdCs} onChange={(e) => setEditIdCs(e.target.value)}>
                                    <option value="">Pilih CS</option>
                                    {csList.map((cs) => (
                                        <option key={cs.id} value={cs.id}>{cs.username}</option>
                                    ))}
                                </select>
                            </label>
                            <div className="modal-action">
                                <button className="btn btn-success btn-sm" onClick={saveDesain} disabled={saving}>
                                    {saving ? <span className="loading loading-spinner loading-xs"></span> : 'Simpan'}
                                </button>
                                <form method="dialog">
                                    <button className="btn btn-ghost btn-sm" onClick={closeModals}>Batal</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </dialog>

            <dialog id="modalDiskon" className="modal">
                <div className="modal-box max-w-md">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">{diskonModal?.isEdit ? 'Edit Diskon Produksi' : 'Tambah Diskon Produksi'}</h3>
                    {diskonModal && (
                        <form onSubmit={submitDiskon} className="space-y-3">
                            <div className="text-sm text-base-content/70">
                                <p><span className="font-semibold">No Invoice:</span> {diskonModal.no_invoice || '-'}</p>
                                <p><span className="font-semibold">Customer:</span> {diskonModal.customer}</p>
                                <p><span className="font-semibold">Harga Awal:</span> Rp {Number(diskonModal.harga_awal || 0).toLocaleString('id-ID')}</p>
                            </div>
                            <div className="divider my-2"></div>
                            <label className="form-control w-full">
                                <span className="label-text font-semibold mb-2">Mode Diskon</span>
                                <div className="flex gap-3">
                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                        <input type="radio" name="mode_diskon" className="radio radio-success radio-sm" checked={diskonForm.mode_diskon === 'persen'} onChange={() => setDiskonForm({ ...diskonForm, mode_diskon: 'persen' })} />
                                        <span className="text-sm">Persen (%)</span>
                                    </label>
                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                        <input type="radio" name="mode_diskon" className="radio radio-success radio-sm" checked={diskonForm.mode_diskon === 'rupiah'} onChange={() => setDiskonForm({ ...diskonForm, mode_diskon: 'rupiah' })} />
                                        <span className="text-sm">Rupiah (Rp)</span>
                                    </label>
                                </div>
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text font-semibold">Diskon</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="any"
                                    className="input input-bordered input-sm w-full"
                                    value={diskonForm.diskon}
                                    onChange={(e) => setDiskonForm({ ...diskonForm, diskon: e.target.value })}
                                    placeholder={diskonForm.mode_diskon === 'persen' ? 'Contoh: 10' : 'Contoh: 50000'}
                                    required
                                />
                            </label>
                            <div className="modal-action">
                                <button className="btn btn-success btn-sm" disabled={submitting}>
                                    {submitting ? <span className="loading loading-spinner loading-xs"></span> : 'Simpan'}
                                </button>
                                <form method="dialog">
                                    <button className="btn btn-ghost btn-sm">Batal</button>
                                </form>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>

            <dialog id="modalMinimum" className="modal">
                <div className="modal-box max-w-md">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">Tambah Minimum Harga</h3>
                    {minModal && (
                        <form onSubmit={submitMinimum} className="space-y-3">
                            <div className="text-sm text-base-content/70">
                                <p><span className="font-semibold">No Invoice:</span> {minModal.no_invoice || '-'}</p>
                                <p><span className="font-semibold">Customer:</span> {minModal.customer}</p>
                            </div>
                            <div className="divider my-2"></div>
                            <label className="form-control w-full">
                                <span className="label-text font-semibold">Minimum Harga</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="any"
                                    className="input input-bordered input-sm w-full"
                                    value={minValue}
                                    onChange={(e) => setMinValue(e.target.value)}
                                    placeholder="Masukkan nominal minimum harga..."
                                    required
                                />
                            </label>
                            <div className="modal-action">
                                <button className="btn btn-success btn-sm" disabled={submitting}>
                                    {submitting ? <span className="loading loading-spinner loading-xs"></span> : 'Simpan'}
                                </button>
                                <form method="dialog">
                                    <button className="btn btn-ghost btn-sm">Batal</button>
                                </form>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </AdminLayout>
    )
}
