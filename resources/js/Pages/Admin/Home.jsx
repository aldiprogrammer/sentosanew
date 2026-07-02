import AdminLayout from '@/Layouts/AdminLayout'
import React from 'react'

export default function Home({ totalPengguna, totalCustomer, totalKurir, totalSuplayerEksternal, totalSuplayerPembelianBahan, produksiSelesai }) {
    const stats = [
        { label: 'Total Pengguna', value: totalPengguna, bg: 'bg-gradient-to-br from-blue-600 to-blue-800', icon: 'fas fa-users' },
        { label: 'Total Customer', value: totalCustomer, bg: 'bg-gradient-to-br from-emerald-600 to-emerald-800', icon: 'fas fa-handshake' },
        { label: 'Total Kurir', value: totalKurir, bg: 'bg-gradient-to-br from-violet-600 to-violet-800', icon: 'fas fa-truck' },
        { label: 'Total Suplayer Eksternal', value: totalSuplayerEksternal, bg: 'bg-gradient-to-br from-amber-600 to-amber-800', icon: 'fas fa-box' },
        { label: 'Total Suplayer Pembelian Bahan', value: totalSuplayerPembelianBahan, bg: 'bg-gradient-to-br from-rose-600 to-rose-800', icon: 'fas fa-cubes' },
    ]

    return (
        <>
            <AdminLayout>
                <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
                    {stats.map((s, i) => (
                        <div key={i} class={`${s.bg} text-white rounded-box shadow-lg`}>
                            <div class="card-body">
                                <div class="flex items-center justify-between">
                                    <p class="text-sm text-white/80">{s.label}</p>
                                    <i class={`${s.icon} text-2xl text-white/40`}></i>
                                </div>
                                <h2 class="text-3xl font-bold mt-1">{s.value}</h2>
                            </div>
                        </div>
                    ))}
                </div>

                <div class="card bg-base-100 shadow-md border border-base-300">
                    <div class="card-body">
                        <h3 class="card-title mb-3">Produksi Selesai Hari Ini</h3>
                        <div class="overflow-x-auto">
                            <table class="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>Kode SPK</th>
                                        <th>Customer</th>
                                        <th>Tanggal</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {produksiSelesai.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} class="text-center py-4 text-base-content/50">Tidak ada data</td>
                                        </tr>
                                    ) : (
                                        produksiSelesai.map((item, i) => (
                                            <tr key={i}>
                                                <td class="font-mono font-medium">{item.kode_spk}</td>
                                                <td>{item.customer}</td>
                                                <td>{item.tanggal}</td>
                                                <td><span class="text-success font-semibold">{item.status}</span></td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
