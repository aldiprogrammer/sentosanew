import AdminLayout from '@/Layouts/AdminLayout'
import React from 'react'

export default function Home({ totalPengguna, totalCustomer, totalKurir, totalDistributor, totalSuplayer }) {
    const stats = [
        { label: 'Total Pengguna', value: totalPengguna, color: 'text-primary' },
        { label: 'Total Customer', value: totalCustomer, color: 'text-secondary' },
        { label: 'Total Kurir', value: totalKurir, color: 'text-accent' },
        { label: 'Total Distributor', value: totalDistributor, color: 'text-info' },
        { label: 'Total Suplayer', value: totalSuplayer, color: 'text-success' },
    ]

    return (
        <>
            <AdminLayout>
                <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5">
                    {stats.map((s, i) => (
                        <div key={i} class="card bg-base-100 shadow-md border border-base-300">
                            <div class="card-body">
                                <p class="text-sm text-gray-500">{s.label}</p>
                                <h2 class={`text-3xl font-bold ${s.color}`}>{s.value}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </AdminLayout>
        </>
    )
}
