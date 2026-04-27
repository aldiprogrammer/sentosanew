import AdminLayout from '@/Layouts/AdminLayout'
import React from 'react'

export default function Home() {
    return (
        <>
            <AdminLayout>
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    <div class="card bg-base-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <p class="text-sm text-gray-500">Total User</p>
                            <h2 class="text-3xl font-bold">1,245</h2>
                            <span class="text-success text-sm">+12% bulan ini</span>
                        </div>
                    </div>

                    <div class="card bg-base-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <p class="text-sm text-gray-500">Pesanan</p>
                            <h2 class="text-3xl font-bold">320</h2>
                            <span class="text-success text-sm">+8% minggu ini</span>
                        </div>
                    </div>

                    <div class="card bg-base-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <p class="text-sm text-gray-500">Pendapatan</p>
                            <h2 class="text-3xl font-bold">Rp 18,5 Jt</h2>
                            <span class="text-success text-sm">+15% hari ini</span>
                        </div>
                    </div>

                    <div class="card bg-base-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <p class="text-sm text-gray-500">Produk</p>
                            <h2 class="text-3xl font-bold">89</h2>
                            <span class="text-warning text-sm">5 stok menipis</span>
                        </div>
                    </div>
                </div>


                <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-5">
                    <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <h2 class="card-title">Data User</h2>

                                <div class="flex gap-2">
                                    <input type="text" placeholder="Cari user..." class="input input-bordered w-full md:w-64" />
                                    <button class="btn btn-success">Tambah</button>
                                </div>
                            </div>

                            <div class="overflow-x-auto">
                                <table class="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Ahmad Fauzi</td>
                                            <td>ahmad@email.com</td>
                                            <td><span class="badge badge-success">Admin</span></td>
                                            <td><span class="badge badge-success">Aktif</span></td>
                                            <td>
                                                <div class="flex gap-2">
                                                    <button class="btn btn-sm btn-danger text-white">Edit</button>
                                                    <button class="btn btn-sm btn-success">Hapus</button>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>2</td>
                                            <td>Siti Rahma</td>
                                            <td>siti@email.com</td>
                                            <td><span class="badge badge-secondary">User</span></td>
                                            <td><span class="badge badge-success">Aktif</span></td>
                                            <td>
                                                <div class="flex gap-2">
                                                    <button class="btn btn-sm btn-info text-white">Edit</button>
                                                    <button class="btn btn-sm btn-error">Hapus</button>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>3</td>
                                            <td>Budi Santoso</td>
                                            <td>budi@email.com</td>
                                            <td><span class="badge badge-warning">Editor</span></td>
                                            <td><span class="badge badge-error">Nonaktif</span></td>
                                            <td>
                                                <div class="flex gap-2">
                                                    <button class="btn btn-sm btn-info text-white">Edit</button>
                                                    <button class="btn btn-sm btn-error">Hapus</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                    <div class="card bg-base-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <h2 class="card-title mb-4">Aktivitas Terbaru</h2>

                            <ul class="timeline timeline-vertical">
                                <li>
                                    <div class="timeline-start text-sm">08:00</div>
                                    <div class="timeline-middle">
                                        <div class="badge badge-success badge-sm"></div>
                                    </div>
                                    <div class="timeline-end timeline-box">User baru mendaftar</div>
                                </li>

                                <li>
                                    <div class="timeline-start text-sm">09:30</div>
                                    <div class="timeline-middle">
                                        <div class="badge badge-success badge-sm"></div>
                                    </div>
                                    <div class="timeline-end timeline-box">Pesanan berhasil diproses</div>
                                </li>

                                <li>
                                    <div class="timeline-start text-sm">11:15</div>
                                    <div class="timeline-middle">
                                        <div class="badge badge-warning badge-sm"></div>
                                    </div>
                                    <div class="timeline-end timeline-box">Stok produk hampir habis</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
