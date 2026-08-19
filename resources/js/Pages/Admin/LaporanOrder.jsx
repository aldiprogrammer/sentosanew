import AdminLayout from '@/Layouts/AdminLayout'
import { Link, router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'

export default function LaporanOrder({ desain, produksi, tglAwal, tglAkhir, search, pembayaran, penggunaIds, penggunas, desainBatal, customers, customerIds, invoiceProduksiData, produksiInvoiceTotals, invoiceDesainData, desainInvoiceTotals }) {
    const { auth, flash } = usePage().props
    const canEdit = ['Admin', 'admin', 'Admin2', 'admin2', 'Admin 2', 'admin 2'].includes(auth?.user?.role)

    React.useEffect(() => {
        if (flash?.success) {
            Swal.fire({ icon: 'success', title: 'Berhasil', text: flash.success, timer: 1500, showConfirmButton: false })
        }
        if (flash?.error) {
            Swal.fire({ icon: 'error', title: 'Gagal', text: flash.error })
        }
    }, [flash])

    const [filterTglAwal, setFilterTglAwal] = useState(tglAwal || '')
    const [filterTglAkhir, setFilterTglAkhir] = useState(tglAkhir || '')
    const [filterSearch, setFilterSearch] = useState(search || '')
    const [filterPembayaran, setFilterPembayaran] = useState(pembayaran || '')
    const [filterPengguna, setFilterPengguna] = useState(
        Array.isArray(penggunaIds) ? penggunaIds.map(String) : (penggunaIds ? [String(penggunaIds)] : [])
    )
    const [tab, setTab] = useState('produksi')
    const [showPegawaiDropdown, setShowPegawaiDropdown] = useState(false)
    const pegawaiDropdownRef = React.useRef(null)
    const customerSelectRef = React.useRef(null)
    const [filterCustomer, setFilterCustomer] = useState(
        Array.isArray(customerIds) ? customerIds.map(String) : (customerIds ? [String(customerIds)] : [])
    )

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
    const groupedBatal = React.useMemo(() => groupByInvoice(desainBatal?.data || []), [desainBatal?.data])

    const csList = React.useMemo(() => {
        return Array.isArray(penggunas) ? penggunas.filter((p) => p.role === 'Customer Service') : []
    }, [penggunas])

    const [editProduksi, setEditProduksi] = React.useState(null)
    const [editDesain, setEditDesain] = React.useState(null)
    const [editPembayaran, setEditPembayaran] = React.useState('')
    const [editIdCs, setEditIdCs] = React.useState('')
    const [editKeterangan, setEditKeterangan] = React.useState('')
    const [saving, setSaving] = React.useState(false)

    const openEditProduksi = (item) => {
        setEditProduksi(item)
        setEditPembayaran(item.pembayaran || 'lunas')
        setEditIdCs(item.id_cs || '')
        setEditKeterangan(item.keterangan || '')
        document.getElementById('modalLaporanEditProduksi').showModal()
    }

    const openEditDesain = (item) => {
        setEditDesain(item)
        setEditPembayaran(item.pembayaran || 'lunas')
        setEditIdCs(item.id_cs || '')
        setEditKeterangan(item.keterangan || '')
        document.getElementById('modalLaporanEditDesain').showModal()
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
                document.getElementById('modalLaporanEditProduksi').close()
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
                document.getElementById('modalLaporanEditDesain').close()
                closeModals()
            },
            onError: () => {
                setSaving(false)
            },
        })
    }

    React.useEffect(() => {
        if (!customerSelectRef.current || !window.jQuery) return
        const $el = window.jQuery(customerSelectRef.current)
        $el.select2({
            placeholder: 'Semua Customer',
            allowClear: true,
            width: '100%',
        })
        $el.val(filterCustomer.length > 0 ? filterCustomer : null).trigger('change.select2')
        $el.on('select2:select', function (e) {
            const val = String(e.params.data.id)
            setFilterCustomer((prev) => prev.includes(val) ? prev : [...prev, val])
        })
        $el.on('select2:unselect', function (e) {
            const val = String(e.params.data.id)
            setFilterCustomer((prev) => prev.filter((x) => x !== val))
        })
        $el.on('select2:clear', function () {
            setFilterCustomer([])
        })
        return () => { if ($el.data('select2')) $el.select2('destroy') }
    }, [])

    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (pegawaiDropdownRef.current && !pegawaiDropdownRef.current.contains(e.target)) {
                setShowPegawaiDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const togglePengguna = (id) => {
        const strId = String(id)
        setFilterPengguna((prev) =>
            prev.includes(strId) ? prev.filter((x) => x !== strId) : [...prev, strId]
        )
    }

    const selectedPenggunaNames = penggunas?.filter((p) => filterPengguna.includes(String(p.id))).map((p) => p.username) || []

    const applyFilter = () => {
        const params = {
            tgl_awal: filterTglAwal,
            tgl_akhir: filterTglAkhir,
            search: filterSearch,
            pembayaran: filterPembayaran,
        }
        if (filterPengguna.length > 0) {
            params['pengguna_id[]'] = filterPengguna
        }
        if (filterCustomer.length > 0) {
            params['customer_id[]'] = filterCustomer
        }
        router.get(route('laporan-order'), params, { preserveState: true, replace: true })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') applyFilter()
    }

    const buildFilterParams = () => {
        const params = new URLSearchParams()
        if (filterTglAwal) params.set('tgl_awal', filterTglAwal)
        if (filterTglAkhir) params.set('tgl_akhir', filterTglAkhir)
        if (filterSearch) params.set('search', filterSearch)
        if (filterPembayaran) params.set('pembayaran', filterPembayaran)
        filterPengguna.forEach((id) => params.append('pengguna_id[]', id))
        filterCustomer.forEach((id) => params.append('customer_id[]', id))
        return params.toString()
    }

    const exportPDFDesain = () => {
        window.open(`/laporan-order/pdf-desain?${buildFilterParams()}`, '_blank')
    }

    const exportPDFProduksi = () => {
        window.open(`/laporan-order/pdf-produksi?${buildFilterParams()}`, '_blank')
    }

    const totalDesain = groupedDesain.reduce((sum, g) => {
        const inv = invoiceDesainData?.[g.no_invoice]
        return sum + Number(inv?.harga_akhir ?? desainInvoiceTotals?.[g.no_invoice] ?? g.total)
    }, 0)
    const totalProduksi = groupedProduksi.reduce((sum, g) => {
        const inv = invoiceProduksiData?.[g.no_invoice]
        return sum + Number(inv?.harga_akhir ?? produksiInvoiceTotals?.[g.no_invoice] ?? g.total)
    }, 0)

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 gap-4">
                <div className="card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title">Laporan Order</h2>

                        <div className="flex flex-wrap gap-2 items-end mb-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Tgl Awal</span></label>
                                <input type="date" className="input input-bordered input-sm"
                                    value={filterTglAwal} onChange={(e) => setFilterTglAwal(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Tgl Akhir</span></label>
                                <input type="date" className="input input-bordered input-sm"
                                    value={filterTglAkhir} onChange={(e) => setFilterTglAkhir(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Cari No Invoice / SPK</span></label>
                                <input type="text" className="input input-bordered input-sm w-48"
                                    placeholder="Ketik No Invoice atau SPK..."
                                    value={filterSearch} onChange={(e) => setFilterSearch(e.target.value)}
                                    onKeyDown={handleKeyDown} />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Pembayaran</span></label>
                                <select className="select select-bordered select-sm text-xs"
                                    value={filterPembayaran} onChange={(e) => setFilterPembayaran(e.target.value)}>
                                    <option value="">Semua</option>
                                    <option value="lunas">Lunas</option>
                                    <option value="transfer">Transfer</option>
                                    <option value="qris">QRIS</option>
                                    <option value="utang">Hutang</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Customer</span></label>
                                <select ref={customerSelectRef} multiple>
                                    {customers?.map((c) => (
                                        <option key={c.id} value={c.id}>{c.nama}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control" ref={pegawaiDropdownRef}>
                                <label className="label"><span className="label-text">Pegawai</span></label>
                                <div className="relative">
                                    <button type="button" className="select select-bordered select-sm text-sm text-left w-full min-w-[180px]"
                                        onClick={() => setShowPegawaiDropdown(!showPegawaiDropdown)}>
                                        {selectedPenggunaNames.length > 0
                                            ? `${selectedPenggunaNames.length} pegawai dipilih`
                                            : 'Semua Pegawai'}
                                        <i className="fas fa-chevron-down float-right mt-1 text-xs"></i>
                                    </button>
                                    {showPegawaiDropdown && (
                                        <div className="absolute z-50 mt-1 w-full bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                            <label className="flex items-center gap-2 px-3 py-2 hover:bg-base-200 cursor-pointer border-b border-base-300">
                                                <input type="checkbox" className="checkbox checkbox-xs checkbox-success"
                                                    checked={filterPengguna.length === 0}
                                                    onChange={() => setFilterPengguna([])} />
                                                <span className="text-sm font-semibold">Semua Pegawai</span>
                                            </label>
                                            {penggunas?.map((p) => (
                                                <label key={p.id} className="flex items-center gap-2 px-3 py-2 hover:bg-base-200 cursor-pointer">
                                                    <input type="checkbox" className="checkbox checkbox-xs checkbox-success"
                                                        checked={filterPengguna.includes(String(p.id))}
                                                        onChange={() => togglePengguna(p.id)} />
                                                    <span className="text-sm">{p.username}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {selectedPenggunaNames.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {selectedPenggunaNames.map((name) => (
                                            <span key={name} className="badge badge-success badge-sm gap-1">
                                                {name}
                                                <button type="button" onClick={() => togglePengguna(penggunas.find(p => p.username === name)?.id)}>
                                                    <i className="fas fa-times text-xs"></i>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button className="btn btn-primary btn-sm mt-6" onClick={applyFilter}>
                                <i className="fas fa-search"></i> Filter
                            </button>
                            <a href="/laporan-order" className="btn btn-sm btn-warning mt-6">
                                <i className="fas fa-rotate"></i> Refresh
                            </a>
                        </div>

                        <div role="tablist" className="tabs tabs-boxed mb-4">

                            <button role="tab"
                                className={`tab ${tab === 'produksi' ? 'tab-active' : ''}`}
                                onClick={() => setTab('produksi')}>
                                Laporan Produksi
                            </button>
                            <button role="tab"
                                className={`tab ${tab === 'desain' ? 'tab-active' : ''}`}
                                onClick={() => setTab('desain')}>
                                Laporan Desain
                            </button>
                            <button role="tab"
                                className={`tab ${tab === 'batal' ? 'tab-active' : ''}`}
                                onClick={() => setTab('batal')}>
                                Dibatalkan
                                {desainBatal?.data?.length > 0 && (
                                    <span className="badge badge-error badge-sm ml-1">{desainBatal.data.length}</span>
                                )}
                            </button>
                        </div>



                        {tab === 'produksi' && (
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold">
                                        Total: Rp {totalProduksi.toLocaleString('id-ID')}
                                    </span>
                                    <button className="btn btn-accent btn-sm" onClick={exportPDFProduksi}>
                                        <i className="fas fa-file-pdf"></i> Export PDF Produksi
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Tanggal</th>
                                                <th>No Invoice</th>
                                                <th>Kode SPK</th>
                                                <th>Customer</th>
                                                <th>Bahan</th>
                                                <th>Qty</th>
                                                <th>Total Harga</th>
                                                <th>Pembayaran</th>
                                                <th>Status</th>
                                                <th>CS</th>
                                                <th>Tarik Bon</th>
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
                                                                            <span className="font-bold">Inv: {group.no_invoice || '-'}</span>
                                                                            <span>Customer: {group.items[0]?.customer?.nama || '-'}</span>
                                                                            {hasDiskon ? (
                                                                                <span className="ml-auto font-bold text-success">
                                                                                    Diskon: {inv.mode_diskon === 'persen' ? `${inv.diskon}%` : `Rp ${Number(inv.diskon).toLocaleString('id-ID')}`}
                                                                                    {` | Awal: Rp ${Number(inv.harga_awal).toLocaleString('id-ID')}`}
                                                                                    {` | Akhir: Rp ${Number(fullTotal).toLocaleString('id-ID')}`}
                                                                                </span>
                                                                            ) : hasMinFaktur ? (
                                                                                <span className="ml-auto font-bold text-success">
                                                                                    Min Faktur: Rp {Number(inv.minimum_faktur).toLocaleString('id-ID')}
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
                                                            <tr key={item.id} className={`${canEdit ? 'cursor-pointer hover:bg-base-200' : ''}`} onClick={() => canEdit && openEditProduksi(item)}>
                                                                <td>{counter++}</td>
                                                                <td>{item.tanggal}</td>
                                                                <td className="font-mono">{item.no_invoice}</td>
                                                                <td className="font-mono">{item.kode_spk}</td>
                                                                <td>{item.customer?.nama}</td>
                                                                <td>{item.bahan?.bahan}</td>
                                                                <td className="text-center">{item.qty}</td>
                                                                <td className="text-right font-semibold">Rp {Number(item.total_harga || 0).toLocaleString('id-ID')}</td>
                                                                <td>
                                                                    {item.pembayaran ? (
                                                                        <span className={`badge badge-sm ${item.pembayaran === 'lunas' ? 'badge-success' : item.pembayaran === 'transfer' ? 'badge-info' : item.pembayaran === 'qris' ? 'badge-secondary' : 'badge-warning'}`}>
                                                                            {item.pembayaran === 'lunas' ? 'Lunas' : item.pembayaran === 'transfer' ? 'Transfer' : item.pembayaran === 'qris' ? 'QRIS' : 'Hutang'}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-base-content/30">-</span>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {(() => {
                                                                        if (item.status_selesai == 1) return <span className="text-success font-semibold">Selesai</span>
                                                                        if (item.status_logistik == 1) return <span className="text-info font-semibold">Logistik</span>
                                                                        if (item.status_finishing == 1) return <span className="text-warning font-semibold">Finishing</span>
                                                                        if (item.status_produksi == 1) return <span className="text-error font-semibold">Produksi</span>
                                                                        return '-'
                                                                    })()}
                                                                </td>
                                                                <td>{item.cs?.username || '-'}</td>
                                                                <td>{item.tarik_bon || item.cs?.username || '-'}</td>
                                                            </tr>
                                                        ))}
                                                    </React.Fragment>
                                                ))
                                            })()}
                                        </tbody>
                                    </table>
                                </div>
                                {produksi.links && (
                                    <div className="flex justify-center mt-4 join">
                                        {produksi.links.map((link, i) => (
                                            <Link key={i} href={link.url || '#'}
                                                className={`btn btn-sm join-item ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                                preserveState replace
                                                dangerouslySetInnerHTML={{ __html: link.label }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {tab === 'desain' && (
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold">
                                        Total: Rp {totalDesain.toLocaleString('id-ID')}
                                    </span>
                                    <button className="btn btn-accent btn-sm" onClick={exportPDFDesain}>
                                        <i className="fas fa-file-pdf"></i> Export PDF Desain
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Tanggal</th>
                                                <th>No Invoice</th>
                                                <th>No Antrian</th>
                                                <th>Customer</th>
                                                <th>Kategori Desain</th>
                                                <th>Qty</th>
                                                <th>Total Harga</th>
                                                <th>Pembayaran</th>
                                                <th>Desainer</th>
                                                <th>CS</th>
                                                <th>Tarik Bon</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs">
                                            {desain.data.length === 0 ? (
                                                <tr>
                                                    <td colSpan={12} className="text-center py-8 text-base-content/50">Tidak ada data desain</td>
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
                                                                    <td colSpan={12} className="p-2">
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
                                                                <td className="font-mono">{item.no_invoice || item.kode_spk}</td>
                                                                <td>{item.no_antrian}</td>
                                                                <td>{item.customer?.nama}</td>
                                                                <td>{item.kategoridesain?.kategori}</td>
                                                                <td className="text-center">{item.qty}</td>
                                                                <td className="text-right font-semibold">Rp {Number(item.total_harga || 0).toLocaleString('id-ID')}</td>
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
                                                                <td>{item.tarik_bon || item.cs?.username || '-'}</td>
                                                            </tr>
                                                        ))}
                                                    </React.Fragment>
                                                ))
                                            })()}
                                        </tbody>
                                    </table>
                                </div>
                                {desain.links && (
                                    <div className="flex justify-center mt-4 join">
                                        {desain.links.map((link, i) => (
                                            <Link key={i} href={link.url || '#'}
                                                className={`btn btn-sm join-item ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                                preserveState replace
                                                dangerouslySetInnerHTML={{ __html: link.label }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {tab === 'batal' && (
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-error">
                                        Total Dibatalkan: {desainBatal?.data?.length || 0} order
                                    </span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Tanggal</th>
                                                <th>No Invoice</th>
                                                <th>No Antrian</th>
                                                <th>Customer</th>
                                                <th>Kategori Desain</th>
                                                <th>Qty</th>
                                                <th>Total Harga</th>
                                                <th>Desainer</th>
                                                <th>Alasan Pembatalan</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs">
                                            {!desainBatal?.data || desainBatal.data.length === 0 ? (
                                                <tr>
                                                    <td colSpan={10} className="text-center py-8 text-base-content/50">Tidak ada data dibatalkan</td>
                                                </tr>
                                            ) : (() => {
                                                let counter = desainBatal.from
                                                return groupedBatal.map(group => (
                                                    <React.Fragment key={group.no_invoice || '__nil__'}>
                                                        <tr className="bg-red-100 font-semibold text-sm">
                                                            <td colSpan={10} className="p-2">
                                                                <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                                                                    <span className="font-bold">Inv: {group.no_invoice || '-'}</span>
                                                                    <span>Customer: {group.items[0]?.customer?.nama || '-'}</span>
                                                                    <span className="ml-auto font-bold text-error">
                                                                        Total: Rp {Number(group.total).toLocaleString('id-ID')}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        {group.items.map(item => (
                                                            <tr key={item.id} className="bg-red-50">
                                                                <td>{counter++}</td>
                                                                <td>{item.tanggal}</td>
                                                                <td className="font-mono">{item.no_invoice || item.kode_spk}</td>
                                                                <td>{item.no_antrian}</td>
                                                                <td>{item.customer?.nama}</td>
                                                                <td>{item.kategoridesain?.kategori}</td>
                                                                <td className="text-center">{item.qty}</td>
                                                                <td className="text-right font-semibold">Rp {Number(item.total_harga || 0).toLocaleString('id-ID')}</td>
                                                                <td>{item.desainer?.username || '-'}</td>
                                                                <td>
                                                                    <span className="text-error text-xs" title={item.alasan_pembatalan}>
                                                                        <i className="fas fa-ban"></i> {item.alasan_pembatalan}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </React.Fragment>
                                                ))
                                            })()}
                                        </tbody>
                                    </table>
                                </div>
                                {desainBatal?.links && (
                                    <div className="flex justify-center mt-4 join">
                                        {desainBatal.links.map((link, i) => (
                                            <Link key={i} href={link.url || '#'}
                                                className={`btn btn-sm join-item ${link.active ? 'btn-error' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                                preserveState replace
                                                dangerouslySetInnerHTML={{ __html: link.label }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <dialog id="modalLaporanEditProduksi" className="modal">
                <div className="modal-box max-w-md">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">Edit Pembayaran Produksi</h3>
                    {editProduksi && (
                        <div className="space-y-3">
                            <div className="text-sm text-base-content/70">
                                <p><span className="font-semibold">No Invoice:</span> {editProduksi.no_invoice}</p>
                                <p><span className="font-semibold">Customer:</span> {editProduksi.customer?.nama}</p>
                                <p><span className="font-semibold">Total:</span> Rp {Number(editProduksi.total_harga || 0).toLocaleString('id-ID')}</p>
                            </div>
                            <div className="divider my-2"></div>
                            <label className="form-control w-full">
                                <span className="label-text font-semibold mb-2">Pembayaran</span>
                                <div className="flex flex-wrap gap-3">
                                    {['lunas', 'utang', 'transfer', 'qris'].map((val) => (
                                        <label key={val} className="flex items-center gap-1.5 cursor-pointer">
                                            <input type="radio" name="lp_pembayaran_produksi" className="radio radio-success radio-sm" value={val} checked={editPembayaran === val} onChange={() => setEditPembayaran(val)} />
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

            <dialog id="modalLaporanEditDesain" className="modal">
                <div className="modal-box max-w-md">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">Edit Pembayaran Desain</h3>
                    {editDesain && (
                        <div className="space-y-3">
                            <div className="text-sm text-base-content/70">
                                <p><span className="font-semibold">No Invoice:</span> {editDesain.no_invoice}</p>
                                <p><span className="font-semibold">Customer:</span> {editDesain.customer?.nama}</p>
                                <p><span className="font-semibold">Total:</span> Rp {Number(editDesain.total_harga || 0).toLocaleString('id-ID')}</p>
                            </div>
                            <div className="divider my-2"></div>
                            <label className="form-control w-full">
                                <span className="label-text font-semibold mb-2">Pembayaran</span>
                                <div className="flex flex-wrap gap-3">
                                    {['lunas', 'utang', 'transfer', 'qris'].map((val) => (
                                        <label key={val} className="flex items-center gap-1.5 cursor-pointer">
                                            <input type="radio" name="lp_pembayaran_desain" className="radio radio-success radio-sm" value={val} checked={editPembayaran === val} onChange={() => setEditPembayaran(val)} />
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
        </AdminLayout>
    )
}
