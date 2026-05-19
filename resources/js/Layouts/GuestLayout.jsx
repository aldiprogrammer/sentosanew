import { Link } from '@inertiajs/react'

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-700 via-green-600 to-green-800 px-4 py-12 overflow-hidden">


            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <img
                            src="/logonew.png"
                            alt="Sentosa Percetakan"
                            className="h-20 w-auto mx-auto"
                        />
                    </Link>

                </div>

                <div className="bg-white rounded-2xl shadow-2xl px-8 py-8">
                    {children}
                </div>

                <p className="mt-6 text-center text-green-200/60 text-xs">
                    &copy; {new Date().getFullYear()} Sentosa Percetakan. All rights reserved.
                </p>
            </div>
        </div>
    )
}
