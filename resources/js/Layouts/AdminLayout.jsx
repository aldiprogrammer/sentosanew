import { Link, router, usePage } from '@inertiajs/react'
import React from 'react'

export default function AdminLayout({ children }) {
    const { auth } = usePage().props
    const role = String(auth?.user?.role || '').toLowerCase().trim()
    const compactRole = role.replace(/\s+/g, '')
    const isAdmin = role === 'admin'
    const isDesain = role === 'desain' || role === 'desainer'
    const isProduksi = role === 'produksi'
    const isCustomerService = role === 'customer service' || compactRole === 'customerservice' || role === 'cs'
    const showAdminMenus = isAdmin
    const showDesainMenus = isAdmin || isDesain
    const showProduksiMenus = isAdmin || isProduksi

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
                        <h1 className="text-2xl font-bold text-primaryGreen">Dashboard Admin</h1>
                    </div>

                    <div className="flex gap-3 items-center">
                        <button className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="badge badge-sm badge-success indicator-item">3</span>
                            </div>
                        </button>

                        <div className="dropdown dropdown-end">
                            <div tabindex="0" role="button" className="btn btn-ghost flex items-center gap-2">
                                <div className="avatar placeholder">
                                    <div className="bg-primaryGreen text-white rounded-full w-10">
                                        <span>{getInitial(auth?.user?.username)}</span>
                                    </div>
                                </div>
                                <span className="hidden md:block font-medium">{auth.user.use}</span>
                            </div>

                            <ul tabindex="0"
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <Link href={route('profile.edit')}>Profile</Link>
                                </li>
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
                        {showAdminMenus && (
                            <li>
                                <Link href={route('home')} className="rounded-xl">
                                    <i className="fas fa-home"></i>
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        {showAdminMenus && (
                            <li>
                                <Link href={route('pengguna')} className="rounded-xl">
                                    <i className="fas fa-users"></i>
                                    Pengguna
                                </Link>
                            </li>
                        )}
                        {showAdminMenus && (
                            <li>
                                <Link href={route('customer')} className="rounded-xl">
                                    <i className="fas fa-user-tie"></i>
                                    Data Customer
                                </Link>
                            </li>
                        )}
                        {showAdminMenus && (
                            <li>
                                <Link href={route('distributor')} className="rounded-xl">
                                    <i className="fas fa-truck"></i>
                                    Distributor
                                </Link>
                            </li>
                        )}
                        {showAdminMenus && (
                            <li>
                                <Link href={route('kurir')} className="rounded-xl">
                                    <i className="fas fa-shipping-fast"></i>
                                    Kurir
                                </Link>
                            </li>
                        )}
                        {showAdminMenus && (
                            <li>
                                <Link href={route('suplayer')} className="rounded-xl">
                                    <i className="fas fa-boxes"></i>
                                    Suplayer
                                </Link>
                            </li>

                        )}
                        {showAdminMenus && (
                            <li>
                                <details>
                                    <summary className="rounded-xl">
                                        <i className="fas fa-box"></i>
                                        Master Data
                                    </summary>
                                    <ul>
                                        <li>
                                            <Link href={route('bahan')}>Bahan</Link>
                                        </li>
                                        <li>
                                            <Link href={route('kategoridesain')}>Kategori Desain</Link>
                                        </li>
                                        <li>
                                            <Link href={route('jabatan')}>Jabatan</Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        )}
                        {showDesainMenus && (
                            <>
                                <li>
                                    <Link href={route('desain')} className="rounded-xl">
                                        <i className="fas fa-palette"></i>
                                        Menu Desain
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('produksi')} className="rounded-xl">
                                        <i className="fas fa-industry"></i>
                                        Menu Produksi
                                    </Link>
                                </li>

                                <li>
                                    <Link href={route('customer')} className="rounded-xl">
                                        <i className="fas fa-user"></i>
                                        Data Customer
                                    </Link>
                                </li>
                            </>
                        )}
                        {isCustomerService && (
                            <>
                                <li>
                                    <Link href={route('customer')} className="rounded-xl">
                                        <i className="fas fa-user"></i>
                                        Data Customer
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('desain')} className="rounded-xl">
                                        <i className="fas fa-palette"></i>
                                        Menu Desain
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('produksi')} className="rounded-xl">
                                        <i className="fas fa-industry"></i>
                                        Menu Produksi
                                    </Link>
                                </li>
                            </>
                        )}
                        {showProduksiMenus && (
                            <li>
                                <details open={isProduksi}>
                                    <summary className="rounded-xl">
                                        <i className="fas fa-print"></i>
                                        Proses Produksi
                                    </summary>
                                    <ul>
                                        <li>
                                            <Link href="/produksi/produksi">Produksi</Link>
                                        </li>
                                        <li>
                                            <Link href="/produksi/finishing">Finishing</Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        )}
                    </ul>
                </aside>
            </div>
        </div>
    )
}
