import AdminLayout from '@/Layouts/AdminLayout'
import { router, useForm, usePage } from '@inertiajs/react'
import React from 'react'

export default function DataPengajuanDiskon({ pengajuan, jenis: jenisFilter }) {
    const { flash } = usePage().props
    const [search, setSearch] = React.useState('')
    const [jenis, setJenis] = React.useState(jenisFilter || '')
    const confirmRef = React.useRef(null)
    const [confirmData, setConfirmData] = React.useState({ title: '', text: '', color: '', onConfirm: null })

    const editRef = React.useRef(null)
    const [editItem, setEditItem] = React.useState(null)
    const editForm = useForm({
        harga_awal: '',
        mode_diskon: 'persen',
        diskon: '',
    })

    const detailRef = React.useRef(null)
    const [detailData, setDetailData] = React.useState(null)
    const [detailLoading, setDetailLoading] = React.useState(false)

    React.useEffect(() => {
        if (flash?.success) {
            Swal.fire({ icon: 'success', title: 'Berhasil', text: flash.success, timer: 1500, showConfirmButton: false })
        }
        if (flash?.error) {
            Swal.fire({ icon: 'error', title: 'Gagal', text: flash.error })
        }
    }, [flash])

    const openConfirm = (title, text, color, onConfirm) => {
        setConfirmData({ title, text, color, onConfirm })
        confirmRef.current?.showModal()
    }

    const handleSearch = (e) => {
        e.preventDefault()
        router.get('/pengajuan-diskon', { search, jenis }, { preserveState: true, replace: true })
    }

    const statusBadge = (status) => {
        if (status === 'disetujui') return <span className="badge badge-success badge-sm">Disetujui</span>
        if (status === 'ditolak') return <span className="badge badge-error badge-sm">Ditolak</span>
        return <span className="badge badge-warning badge-sm">Pending</span>
    }

    const jenisBadge = (itemJenis) => {
        if (itemJenis === 'desain') return <span className="badge badge-info badge-sm"><i className="fas fa-palette mr-1"></i> Desain</span>
        return <span className="badge badge-secondary badge-sm"><i className="fas fa-industry mr-1"></i> Produksi</span>
    }

    const openEdit = (item) => {
        setEditItem(item)
        editForm.setData({
            harga_awal: item.harga_awal,
            mode_diskon: item.mode_diskon,
            diskon: item.diskon,
        })
        editRef.current?.showModal()
    }

    const closeEdit = () => {
        editRef.current?.close()
        setEditItem(null)
        editForm.reset()
    }

    const submitEdit = (e) => {
        e.preventDefault()
        editForm.put(`/pengajuan-diskon/${editItem.id}`, {
            onSuccess: () => closeEdit(),
        })
    }

    const hitungHargaDiskon = () => {
        const hargaAwal = Number(editForm.data.harga_awal || 0)
        const diskon = Number(editForm.data.diskon || 0)
        if (editForm.data.mode_diskon === 'persen') {
            return Math.max(0, hargaAwal - (hargaAwal * diskon / 100))
        }
        return Math.max(0, hargaAwal - diskon)
    }

    const openDetail = async (item) => {
        detailRef.current?.showModal()
        setDetailLoading(true)
        setDetailData(null)
        try {
            const res = await fetch(`/pengajuan-diskon/${item.id}/detail`)
            const data = await res.json()
            setDetailData(data)
        } catch {
            Swal.fire({ icon: 'error', title: 'Gagal', text: 'Gagal memuat detail produksi' })
            detailRef.current?.close()
        } finally {
            setDetailLoading(false)
        }
    }

    return (
        <AdminLayout>
            <div className="card bg-base-100 shadow-md border border-base-300">
                <div className="card-body">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                        <h2 className="card-title">Data Pengajuan Diskon</h2>
                    </div>

                    <div className="mb-3">
                        <form onSubmit={handleSearch} className="flex flex-wrap gap-2 items-end">
                            <input
                                type="text"
                                placeholder="Cari no invoice, customer..."
                                className="input input-bordered input-success w-full max-w-xs input-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <select
                                className="text-sm select select-bordered select-success select-sm w-full max-w-[180px]"
                                value={jenis}
                                onChange={(e) => setJenis(e.target.value)}
                            >
                                <option value="">Semua Jenis</option>
                                <option value="desain">Desain</option>
                                <option value="produksi">Produksi</option>
                            </select>
                            <button type="submit" className="btn btn-success btn-sm">
                                <i className="fas fa-search"></i> Cari
                            </button>
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>No Invoice</th>
                                    <th>Jenis</th>
                                    <th>Customer</th>
                                    <th>Tanggal</th>
                                    <th>Harga Awal</th>
                                    <th>Mode Diskon</th>
                                    <th>Diskon</th>
                                    <th>Harga Diskon</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {pengajuan.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan={11} className="text-center py-8 text-base-content/50">
                                            Tidak ada data pengajuan diskon
                                        </td>
                                    </tr>
                                ) : (
                                    pengajuan.data?.map((item, idx) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-base-200 cursor-pointer"
                                            onClick={() => openDetail(item)}
                                        >
                                            <td>{pengajuan.from + idx}</td>
                                            <td className="font-mono font-semibold">{item.no_invoice}</td>
                                            <td>{jenisBadge(item.jenis)}</td>
                                            <td>{item.customer}</td>
                                            <td>{item.tanggal}</td>
                                            <td className="tabular-nums">Rp {Number(item.harga_awal || 0).toLocaleString('id-ID')}</td>
                                            <td>
                                                <span className={`badge badge-sm ${item.mode_diskon === 'persen' ? 'badge-info' : 'badge-warning'}`}>
                                                    {item.mode_diskon === 'persen' ? 'Persen' : 'Rupiah'}
                                                </span>
                                            </td>
                                            <td className="tabular-nums">
                                                {item.mode_diskon === 'persen' ? `${item.diskon}%` : `Rp ${Number(item.diskon).toLocaleString('id-ID')}`}
                                            </td>
                                            <td className="tabular-nums font-semibold text-success">Rp {Number(item.harga_diskon || 0).toLocaleString('id-ID')}</td>
                                            <td onClick={(e) => e.stopPropagation()}>{statusBadge(item.status)}</td>
                                            <td onClick={(e) => e.stopPropagation()}>
                                                {item.status === 'pending' && (
                                                    <div className="flex gap-1">
                                                        <button className="btn btn-warning btn-xs" onClick={() => openEdit(item)}>
                                                            <i className="fas fa-pen"></i>
                                                        </button>
                                                        <button className="btn btn-success btn-xs" onClick={() => openConfirm('Setujui Pengajuan?', 'Diskon akan diterapkan ke invoice', 'success', () => router.put(`/pengajuan-diskon/${item.id}/approve`))}>
                                                            <i className="fas fa-check"></i>
                                                        </button>
                                                        <button className="btn btn-error btn-xs" onClick={() => openConfirm('Tolak Pengajuan?', 'Pengajuan akan ditolak', 'error', () => router.put(`/pengajuan-diskon/${item.id}/reject`))}>
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                )}
                                                {item.status === 'disetujui' && (
                                                    <div className="flex gap-1">
                                                        <button className="btn btn-warning btn-xs" onClick={() => openEdit(item)}>
                                                            <i className="fas fa-pen"></i>
                                                        </button>
                                                        <button className="btn btn-warning btn-xs" onClick={() => openConfirm('Batalkan Persetujuan?', 'Status akan kembali ke pending', 'warning', () => router.put(`/pengajuan-diskon/${item.id}/cancel`))}>
                                                            Batal
                                                        </button>
                                                    </div>
                                                )}
                                                {item.status === 'ditolak' && (
                                                    <div className="flex gap-1">
                                                        <button className="btn btn-warning btn-xs" onClick={() => openEdit(item)}>
                                                            <i className="fas fa-pen"></i>
                                                        </button>
                                                        <button className="btn btn-success btn-xs" onClick={() => openConfirm('Setujui Pengajuan?', 'Diskon akan diterapkan ke invoice', 'success', () => router.put(`/pengajuan-diskon/${item.id}/approve`))}>
                                                            <i className="fas fa-check"></i> Setujui
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {pengajuan.last_page > 1 && (
                        <div className="flex justify-center mt-4">
                            <div className="join">
                                {pengajuan.links?.map((link, i) => (
                                    <button
                                        key={i}
                                        className={`join-item btn btn-sm ${link.active ? 'btn-success' : ''}`}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true, replace: true })}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Edit */}
            <dialog ref={editRef} className="modal">
                <div className="modal-box">
                    <button type="button" onClick={closeEdit} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="text-lg font-bold mb-1">Edit Pengajuan Diskon</h3>
                    <p className="text-sm text-base-content/60 mb-4">{editItem?.no_invoice} — {editItem?.customer}</p>
                    <form onSubmit={submitEdit}>
                        <div className="grid gap-3">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Harga Awal</span>
                                </div>
                                <input
                                    type="number"
                                    className="input input-bordered input-success w-full"
                                    value={editForm.data.harga_awal}
                                    onChange={(e) => editForm.setData('harga_awal', e.target.value)}
                                    required
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Mode Diskon</span>
                                </div>
                                <select
                                    className="select select-bordered select-success w-full"
                                    value={editForm.data.mode_diskon}
                                    onChange={(e) => editForm.setData('mode_diskon', e.target.value)}
                                    required
                                >
                                    <option value="persen">Persen (%)</option>
                                    <option value="rupiah">Rupiah (Rp)</option>
                                </select>
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Diskon</span>
                                </div>
                                <input
                                    type="number"
                                    className="input input-bordered input-success w-full"
                                    value={editForm.data.diskon}
                                    onChange={(e) => editForm.setData('diskon', e.target.value)}
                                    required
                                />
                            </label>
                            <div className="bg-base-200 rounded-lg p-3">
                                <span className="text-sm font-medium">Harga Setelah Diskon: </span>
                                <span className="text-sm font-bold text-success">Rp {hitungHargaDiskon().toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type="button" onClick={closeEdit} className="btn btn-sm">Batal</button>
                            <button type="submit" className="btn btn-sm btn-success" disabled={editForm.processing}>
                                <i className="fas fa-save"></i> Simpan
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* Modal Detail */}
            <dialog ref={detailRef} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <button type="button" onClick={() => detailRef.current?.close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="text-lg font-bold mb-1">Detail Invoice</h3>
                    {detailData && (
                        <p className="text-sm text-base-content/60 mb-4">{detailData.pengajuan?.no_invoice} — {detailData.pengajuan?.customer}</p>
                    )}
                    {detailLoading ? (
                        <div className="flex justify-center py-10">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : detailData ? (
                        <div>
                            {detailData.produksi?.length === 0 ? (
                                <div className="text-center py-8 text-base-content/50">
                                    Tidak ada data produksi dengan pembayaran terisi
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="table table-zebra table-sm">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Kode SPK</th>
                                                    <th>Customer</th>
                                                    <th>Bahan</th>
                                                    <th>Keterangan</th>
                                                    <th>Tinggi</th>
                                                    <th>Lebar</th>
                                                    <th>Qty</th>
                                                    <th>Sisi</th>
                                                    <th>Total Harga</th>
                                                    <th>Pembayaran</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {detailData.produksi?.map((item, idx) => (
                                                    <tr key={item.id}>
                                                        <td>{idx + 1}</td>
                                                        <td className="font-mono text-xs">{item.kode_spk}</td>
                                                        <td>{item.customer?.nama}</td>
                                                        <td>{item.bahan?.bahan}</td>
                                                        <td>{item.keterangan}</td>
                                                        <td>{item.tinggi}</td>
                                                        <td>{item.lebar}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{item.sisi}</td>
                                                        <td className="tabular-nums font-semibold">Rp {Number(item.total_harga || 0).toLocaleString('id-ID')}</td>
                                                        <td>
                                                            <span className={`badge badge-sm ${item.pembayaran === 'lunas' ? 'badge-success' : 'badge-warning'}`}>
                                                                {item.pembayaran}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="flex justify-end gap-6 text-sm">
                                        <div>
                                            <span className="font-medium">Harga Awal Invoice: </span>
                                            <span className="font-semibold">Rp {Number(detailData.pengajuan?.harga_awal || 0).toLocaleString('id-ID')}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium">Total Harga Produksi: </span>
                                            <span className="font-semibold">Rp {Number(detailData.total_harga || 0).toLocaleString('id-ID')}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium">Harga Setelah Diskon: </span>
                                            <span className="font-bold text-success">Rp {Number(detailData.pengajuan?.harga_diskon || 0).toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : null}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* Modal Confirm */}
            <dialog ref={confirmRef} className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">{confirmData.title}</h3>
                    <p className="py-2 text-base-content/70">{confirmData.text}</p>
                    <div className="modal-action">
                        <button className="btn btn-sm" onClick={() => confirmRef.current?.close()}>Batal</button>
                        <button className={`btn btn-sm ${confirmData.color === 'success' ? 'btn-success' : confirmData.color === 'error' ? 'btn-error' : 'btn-warning'}`} onClick={() => { confirmRef.current?.close(); confirmData.onConfirm?.() }}>
                            Ya
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </AdminLayout>
    )
}
