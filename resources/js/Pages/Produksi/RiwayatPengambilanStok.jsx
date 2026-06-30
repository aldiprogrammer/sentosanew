import AdminLayout from '@/Layouts/AdminLayout'
import { Link, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

export default function RiwayatPengambilanStok({ riwayat, search: initialSearch }) {
    const [search, setSearch] = useState(initialSearch || '')

    useEffect(() => {
        const t = setTimeout(() => {
            router.get('/produksi/riwayat-pengambilan-stok', { search }, { preserveState: true, replace: true })
        }, 500)
        return () => clearTimeout(t)
    }, [search])

    const handleSearch = (e) => {
        e.preventDefault()
        router.get('/produksi/riwayat-pengambilan-stok', { search }, { preserveState: true, replace: true })
    }

    return (
        <AdminLayout>
            <div className="card bg-base-100 shadow-md border border-base-300">
                <div className="card-body">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                        <h2 className="card-title">Riwayat Pengambilan Stok</h2>
                        <Link href={route('pengambilan-stok')} className="btn btn-sm btn-outline">
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </div>

                    <form onSubmit={handleSearch} className="mb-4">
                        <input
                            type="text"
                            placeholder="Cari kode bahan, keterangan, atau pengambil..."
                            className="input input-bordered input-sm w-full max-w-xs"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra table-xs w-full">
                            <thead>
                                <tr className="bg-base-200 text-base-content/70 text-xs tracking-wider">
                                    <th>#</th>
                                    <th>Kode Bahan Pakai</th>

                                    <th>Jumlah</th>
                                    <th>Label</th>
                                    <th>Pengambil</th>
                                    <th>Keterangan</th>
                                    <th>Tanggal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riwayat?.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center text-base-content/50 py-8">Belum ada riwayat</td>
                                    </tr>
                                ) : (
                                    riwayat?.data?.map((r, i) => (
                                        <tr key={r.id}>
                                            <td className="text-xs">{riwayat.from + i}</td>
                                            <td className="font-mono font-semibold text-xs">{r.kode_bahan_pakai}</td>
                                            <td className="text-error font-bold text-xs">{r.total_qty} {r.bahan_pakai?.satuan || '-'}</td>
                                            <td className="text-xs">
                                                {r.item_stok_data?.map((d, j) => (
                                                    <span key={j} className="block">{d.kode_label || `Stok #${d.id}`}</span>
                                                ))}
                                            </td>
                                            <td className="text-xs">{r.user?.username || '-'}</td>
                                            <td className="text-xs italic text-base-content/60 max-w-[200px] truncate">{r.keterangan || '-'}</td>
                                            <td className="text-xs">{new Date(r.created_at).toLocaleDateString('id-ID')}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {riwayat?.last_page > 1 && (
                        <div className="mt-4 flex justify-center">
                            <div className="join">
                                {[...Array(riwayat.last_page)].map((_, i) => (
                                    <Link
                                        key={i}
                                        href={route('riwayat-pengambilan-stok', { page: i + 1, search })}
                                        className={`join-item btn btn-sm ${riwayat.current_page === i + 1 ? 'btn-primary' : ''}`}
                                    >{i + 1}</Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}
