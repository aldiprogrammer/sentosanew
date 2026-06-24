import { router } from '@inertiajs/react'
import React, { useState, useEffect, useRef } from 'react'

export default function KonfirmasiPassword({ show, onConfirmed, onClose }) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const inputRef = useRef(null)
    const dialogRef = useRef(null)

    useEffect(() => {
        if (show) {
            dialogRef.current?.showModal()
            setTimeout(() => inputRef.current?.focus(), 100)
            setPassword('')
            setError('')
            setLoading(false)
        } else {
            dialogRef.current?.close()
        }
    }, [show])

    const handleConfirm = () => {
        if (!password) {
            setError('Password harus diisi')
            return
        }
        setLoading(true)
        setError('')

        router.post(route('verify.password'), { password }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false)
                onConfirmed()
            },
            onError: (errors) => {
                setLoading(false)
                setError(errors.password || 'Password salah')
            },
        })
    }

    return (
        <dialog ref={dialogRef} className="modal" onClose={onClose}>
            <div className="modal-box">
                <button type="button" onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <h3 className="text-lg font-bold mb-4">Konfirmasi Password</h3>
                <p className="text-sm text-base-content/70 mb-4">Masukkan password akun Anda untuk melanjutkan</p>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        ref={inputRef}
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError('') }}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleConfirm() }}
                        className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
                        placeholder="Masukkan password"
                    />
                    {error && <span className="text-error text-xs mt-1">{error}</span>}
                </div>

                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose}>Batal</button>
                    <button className="btn btn-primary" onClick={handleConfirm} disabled={loading}>
                        {loading && <span className="loading loading-spinner loading-xs"></span>}
                        Konfirmasi
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    )
}
