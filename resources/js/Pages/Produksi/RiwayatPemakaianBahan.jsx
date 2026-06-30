import AdminLayout from '@/Layouts/AdminLayout'
import { Link, router } from '@inertiajs/react'
import React, { useMemo, useState } from 'react'

export default function RiwayatPemakaianBahan({ masterBahan, produksi, kode, totalProduksi, totalStok }) {
    const [search, setSearch] = useState('')

    const filteredMaster = useMemo(() => {
        if (!search) return masterBahan || []
        const s = search.toLowerCase()
        return (masterBahan || []).filter(m =>
            (m.kode_bahan_jual || '').toLowerCase().includes(s) ||
            (m.keterangan || '').toLowerCase().includes(s)
        )
    }, [masterBahan, search])

    const selectBahan = (kd) => {
        router.get('/produksi/riwayat-pemakaian-bahan', { kode: kd }, { preserveState: true, replace: true })
    }

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title text-sm mb-3">Master Bahan</h2>
                        <input
                            type="text"
                            placeholder="Cari kode atau keterangan..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered input-sm mb-3"
                        />
                        <div className="space-y-1 max-h-[600px] overflow-y-auto">
                            {filteredMaster.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => selectBahan(m.kode_bahan_jual)}
                                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${kode === m.kode_bahan_jual
                                        ? 'bg-primary text-primary-content'
                                        : 'bg-base-200 hover:bg-base-300'
                                        }`}
                                >
                                    <div className="font-semibold">{m.kode_bahan_jual}</div>
                                    <div className="text-[10px] opacity-70 truncate">{m.keterangan}</div>
                                    <div className="text-[10px] opacity-50">{m.satuan}</div>
                                </button>
                            ))}
                            {filteredMaster.length === 0 && (
                                <p className="text-xs text-base-content/50 text-center py-4">Tidak ditemukan</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="card-title">
                                {kode ? `Pemakaian Bahan: ${kode}` : 'Riwayat Pemakaian Bahan'}
                            </h2>
                            {kode && (
                                <Link href={route('pengambilan-stok')} className="btn btn-sm btn-outline">
                                    <i className="fas fa-arrow-left"></i> Kembali
                                </Link>
                            )}
                        </div>

                        {!kode ? (
                            <div className="text-center text-base-content/50 py-16">
                                <i className="fas fa-hand-pointer text-4xl mb-3"></i>
                                <p className="text-sm">Pilih kode master bahan di samping untuk melihat riwayat pemakaian</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex gap-4 mb-4">
                                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                                        <span className="text-xs text-base-content/70">Total Produksi</span>
                                        <p className="font-bold text-lg">{totalProduksi}</p>
                                    </div>
                                    <div className="p-3 bg-success/5 rounded-lg border border-success/20">
                                        <span className="text-xs text-base-content/70">Total Stok (Bahan Pakai)</span>
                                        <p className="font-bold text-lg">{parseFloat(totalStok || 0).toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="table table-zebra table-xs w-full">
                                        <thead>
                                            <tr className="bg-base-200 text-base-content/70 text-xs tracking-wider">
                                                <th>#</th>
                                                <th>No SPK</th>
                                                <th>Customer</th>
                                                <th>Bahan</th>
                                                <th>Ukuran</th>
                                                <th>Sisa Pitih</th>
                                                <th>QTY</th>
                                                <th>Total</th>
                                                <th>Tanggal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {produksi?.data?.length === 0 ? (
                                                <tr>
                                                    <td colSpan="9" className="text-center text-base-content/50 py-8">
                                                        Belum ada produksi untuk bahan ini
                                                    </td>
                                                </tr>
                                            ) : (
                                                produksi?.data?.map((p, i) => {
                                                    return (
                                                        <tr key={p.id}>
                                                            <td className="text-xs">{produksi.from + i}</td>
                                                            <td className="font-mono font-semibold text-xs">{p.kode_spk}</td>
                                                            <td className="text-xs">{p.customer?.nama || '-'}</td>
                                                            <td className="text-xs">{p.bahan?.bahan || '-'}</td>
                                                            <td className="text-xs tabular-nums">
                                                                {p.tinggi} x {p.lebar} {p.satuan}
                                                            </td>
                                                            <td className="text-xs tabular-nums font-semibold">
                                                                {p.sisa_pitih_total != null ? `Rp ${parseInt(p.sisa_pitih_total).toLocaleString('id-ID')}` : '-'}
                                                            </td>
                                                            <td className="text-xs text-center">{p.qty} {p.bahan?.satuan || '-'}</td>
                                                            <td className="text-xs font-semibold">
                                                                {p.total_harga ? `Rp ${parseInt(p.total_harga).toLocaleString('id-ID')}` : '-'}
                                                            </td>
                                                            <td className="text-xs">{p.tanggal}</td>
                                                        </tr>
                                                    )
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {produksi?.last_page > 1 && (
                                    <div className="mt-4 flex justify-center">
                                        <div className="join">
                                            {[...Array(produksi.last_page)].map((_, i) => (
                                                <Link
                                                    key={i}
                                                    href={route('riwayat-pemakaian-bahan', { page: i + 1, kode })}
                                                    className={`join-item btn btn-sm ${produksi.current_page === i + 1 ? 'btn-primary' : ''}`}
                                                >{i + 1}</Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
