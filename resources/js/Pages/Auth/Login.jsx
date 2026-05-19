import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm } from '@inertiajs/react'

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('login'), {
            onFinish: () => reset('password'),
        })
    }

    return (
        <GuestLayout>
            <Head title="Login" />

            <div className="mb-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                    Selamat Datang
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Silakan masuk untuk melanjutkan
                </p>
            </div>

            {status && (
                <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm font-medium text-green-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="username" value="Username" className="text-gray-700 font-medium" />
                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-1.5 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('username', e.target.value)}
                        placeholder="Masukkan username"
                    />
                    <InputError message={errors.username} className="mt-1.5" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-medium" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1.5 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Masukkan password"
                    />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                >
                    {processing ? 'Memproses...' : 'Masuk'}
                </button>
            </form>
        </GuestLayout>
    )
}
