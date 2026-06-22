import { Link, router, usePage } from '@inertiajs/react'
import React from 'react'

export default function AdminLayout({ children }) {
    const { auth } = usePage().props
    const menuAkses = auth?.menu_akses || []

    const hasMenu = (key) => menuAkses.includes(key)

    const getInitial = (name) => {
        return name?.charAt(0).toUpperCase() || 'U'
    }

    const handleLogout = () => {
        router.post(route('logout'))
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="sidebar" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                <div className="navbar bg-base-100 border-b border-base-300 px-4 shadow-sm">
                    <div className="flex-none lg:hidden">
                        <label for="sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 w-5 stroke-current"
                                fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>

                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-primaryGreen"></h1>
                    </div>

                    <div className="flex gap-3 items-center">
                        <button className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="badge badge-sm badge-success indicator-item">0</span>
                            </div>
                        </button>

                        <div className="dropdown dropdown-end">
                            <div tabindex="0" role="button" className="btn btn-ghost flex items-center gap-2">
                                <div className="avatar placeholder">
                                    <div className="bg-green-700 text-white rounded-full w-10">
                                        <span>{getInitial(auth?.user?.username)}</span>
                                    </div>
                                </div>
                                <span className="hidden md:block font-medium">{auth.user.username}</span>
                            </div>

                            <ul tabindex="0"
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button onClick={handleLogout} className="text-error w-full text-left">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <main className="p-6">{children}</main>
            </div>

            <div className="drawer-side z-50">
                <label for="sidebar" className="drawer-overlay"></label>

                <aside className="w-72 min-h-full bg-base-100 border-r border-base-300">
                    <div className="p-6 border-b border-base-300">
                        <h2 className="text-2xl font-bold text-primaryGreen">Sentosa</h2>
                        <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
                    </div>

                    <ul className="menu p-4 text-base-content w-full gap-1">
                        {hasMenu('dashboard') && (
                            <li>
                                <Link href={route('home')} className="rounded-xl">
                                    <i className="fas fa-home"></i>
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        {hasMenu('customer') && (
                            <li>
                                <Link href={route('customer')} className="rounded-xl">
                                    <i className="fas fa-user-tie"></i>
                                    Data Customer
                                </Link>
                            </li>
                        )}
                        {hasMenu('otorisasi') && (
                            <li>
                                <Link href={route('otorisasi')} className="rounded-xl">
                                    <i className="fas fa-check-circle"></i>
                                    Otorisasi
                                </Link>
                            </li>
                        )}
                        {(hasMenu('pengguna') || hasMenu('distributor') || hasMenu('kurir') || hasMenu('suplayer') || hasMenu('suplayer-pembelian-bahan') || hasMenu('master-bahan') || hasMenu('master-materbahan') || hasMenu('master-bahanbeli') || hasMenu('master-kategoridesain') || hasMenu('master-jabatan')) && (
                            <li>
                                <details>
                                    <summary className="rounded-xl">
                                        <i className="fas fa-box"></i>
                                        Master Data
                                    </summary>
                                    <ul>
                                        {hasMenu('master-bahan') && (
                                            <li>
                                                <Link href={route('bahan')}>Bahan</Link>
                                            </li>
                                        )}
                                        {hasMenu('master-materbahan') && (
                                            <li>
                                                <Link href={route('materbahan')}>Master Bahan</Link>
                                            </li>
                                        )}
                                        {hasMenu('master-bahanbeli') && (
                                            <li>
                                                <Link href={route('bahanbeli')}>Bahan Beli</Link>
                                            </li>
                                        )}
                                        {hasMenu('master-kategoridesain') && (
                                            <li>
                                                <Link href={route('kategoridesain')}>Kategori Desain</Link>
                                            </li>
                                        )}
                                        {hasMenu('master-jabatan') && (
                                            <li>
                                                <Link href={route('jabatan')}>Jabatan</Link>
                                            </li>
                                        )}
                                        {hasMenu('pengguna') && (
                                            <li>
                                                <Link href={route('pengguna')}>Pengguna</Link>
                                            </li>
                                        )}
                                        {hasMenu('distributor') && (
                                            <li>
                                                <Link href={route('distributor')}>Distributor</Link>
                                            </li>
                                        )}
                                        {hasMenu('kurir') && (
                                            <li>
                                                <Link href={route('kurir')}>Kurir</Link>
                                            </li>
                                        )}
                                        {hasMenu('suplayer') && (
                                            <li>
                                                <Link href={route('suplayer')}>Suplayer Eksternal</Link>
                                            </li>
                                        )}
                                        {hasMenu('suplayer-pembelian-bahan') && (
                                            <li>
                                                <Link href={route('suplayer-pembelian-bahan')}>Suplayer Pembelian Bahan</Link>
                                            </li>
                                        )}
                                    </ul>
                                </details>
                            </li>
                        )}
                        {(hasMenu('tambah-desain') || hasMenu('data-desain')) && (
                            <li>
                                <details>
                                    <summary className="rounded-xl">
                                        <i className="fas fa-palette"></i>
                                        Menu Desain
                                    </summary>
                                    <ul>
                                        {hasMenu('tambah-desain') && (
                                            <li>
                                                <Link href={route('desain')}>Tambah Desain</Link>
                                            </li>
                                        )}
                                        {hasMenu('data-desain') && (
                                            <li>
                                                <Link href={route('data-desain')}>Data Desain</Link>
                                            </li>
                                        )}
                                    </ul>
                                </details>
                            </li>
                        )}
                        {(hasMenu('tambah-produksi') || hasMenu('data-produksi')) && (
                            <li>
                                <details>
                                    <summary className="rounded-xl">
                                        <i className="fas fa-industry"></i>
                                        Menu Produksi
                                    </summary>
                                    <ul>
                                        {hasMenu('tambah-produksi') && (
                                            <li>
                                                <Link href={route('produksi')}>Tambah Produksi</Link>
                                            </li>
                                        )}
                                        {hasMenu('data-produksi') && (
                                            <li>
                                                <Link href={route('dataproduksi')}>Data Produksi</Link>
                                            </li>
                                        )}
                                    </ul>
                                </details>
                            </li>
                        )}
                        {(hasMenu('proses-produksi') || hasMenu('proses-finishing') || hasMenu('proses-logistik') || hasMenu('logistik')) && (
                            <li>
                                <details>
                                    <summary className="rounded-xl">
                                        <i className="fas fa-print"></i>
                                        Proses Produksi
                                    </summary>
                                    <ul>
                                        {hasMenu('proses-produksi') && (
                                            <li>
                                                <Link href="/produksi/produksi">Produksi</Link>
                                            </li>
                                        )}
                                        {hasMenu('proses-finishing') && (
                                            <li>
                                                <Link href="/produksi/finishing">Finishing</Link>
                                            </li>
                                        )}
                                        {(hasMenu('proses-logistik') || hasMenu('logistik')) && (
                                            <li>
                                                <Link href="/produksi/logistik">Logistik</Link>
                                            </li>
                                        )}
                                    </ul>
                                </details>
                            </li>
                        )}
                        {hasMenu('data-order') && (
                            <li>
                                <Link href={route('data-order')} className="rounded-xl">
                                    <i className="fas fa-clipboard-list"></i>
                                    Data Order
                                </Link>
                            </li>
                        )}
                        {hasMenu('laporan-pembukuan') && (
                            <li>
                                <Link href={route('laporan-pembukuan')} className="rounded-xl">
                                    <i className="fas fa-book"></i>
                                    Laporan Pembukuan
                                </Link>
                            </li>
                        )}
                        {hasMenu('po-eksternal') && (
                            <li>
                                <Link href={route('po-eksternal')} className="rounded-xl">
                                    <i className="fas fa-shopping-cart"></i>
                                    PO Eksternal
                                </Link>
                            </li>
                        )}
                        {hasMenu('po-pembelian-bahan') && (
                            <li>
                                <Link href={route('po-pembelian-bahan')} className="rounded-xl">
                                    <i className="fas fa-truck-loading"></i>
                                    PO Pembelian Bahan
                                </Link>
                            </li>
                        )}
                    </ul>
                </aside>
            </div>
        </div>
    )
}
