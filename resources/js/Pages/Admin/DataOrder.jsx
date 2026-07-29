import AdminLayout from '@/Layouts/AdminLayout'
import { Link, router, usePage } from '@inertiajs/react'
import React from 'react'

export default function DataOrder({ desain, produksi, tglAwal, tglAkhir, searchDesain, searchProduksi, penggunas }) {
    const { auth } = usePage().props
    const canEdit = ['Admin', 'admin', 'Admin2', 'admin2'].includes(auth?.user?.role)
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
                                    ) : (
                                        produksi.data.map((item, index) => (
                                            <tr key={item.id} className={`${canEdit ? 'cursor-pointer hover:bg-base-200' : ''}`} onClick={() => canEdit && openEditProduksi(item)}>
                                                <td>{produksi.from + index}</td>
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
                                        ))
                                    )}
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
                                    ) : (
                                        desain.data.map((item, index) => (
                                            <tr key={item.id} className={`${canEdit ? 'cursor-pointer hover:bg-base-200' : ''}`} onClick={() => canEdit && openEditDesain(item)}>
                                                <td>{desain.from + index}</td>
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
                                        ))
                                    )}
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
        </AdminLayout>
    )
}
