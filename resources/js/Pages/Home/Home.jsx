import { Head, Link } from '@inertiajs/react'

const menus = [
    { name: 'Customer Service', icon: 'fas fa-headset', route: 'customer', desc: 'Kelola data pelanggan' },
    { name: 'Desain', icon: 'fas fa-palette', route: 'desain', desc: 'Manajemen desain grafis' },
    { name: 'Produksi', icon: 'fas fa-industry', route: 'produksi', desc: 'Proses produksi percetakan' },
    { name: 'Admin', icon: 'fas fa-user-shield', route: 'home', desc: 'Panel administrasi' },
    { name: 'Super Admin', icon: 'fas fa-crown', route: 'pengguna', desc: 'Manajemen pengguna sistem' },
]

export default function Home() {
    return (
        <>
            <Head title="Beranda" />

            <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-700 via-green-600 to-green-800 overflow-hidden">


                <div className="relative z-10 text-center mb-12 px-4 mt-10">
                    <img src="logonew.png" alt="" className='h-[100px]' />
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-6 max-w-7xl w-full">
                    {menus.map((menu) => (
                        <Link
                            key={menu.name}
                            href={route(menu.route)}
                            className="group flex flex-col items-center text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl hover:bg-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors mb-4">
                                <i className={`${menu.icon} text-2xl text-white`}></i>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1">
                                {menu.name}
                            </h3>
                            <p className="text-sm text-green-100/80">
                                {menu.desc}
                            </p>
                        </Link>
                    ))}
                </div>

                <div className="relative z-10 mt-12 text-center pb-8">
                    <p className="text-green-200/60 text-sm">
                        &copy; {new Date().getFullYear()} Sentosa Percetakan. All rights reserved.
                    </p>
                </div>
            </div>
        </>
    )
}
