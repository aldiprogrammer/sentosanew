import AdminLayout from '@/Layouts/AdminLayout'
import { router } from '@inertiajs/react'
import React, { useMemo, useRef, useState, useCallback } from 'react'
import KonfirmasiPassword from '@/Components/KonfirmasiPassword'

export default function PengambilanStok({ itemstokbahans, bahanpakaiList }) {
    const [selectedBahanpakai, setSelectedBahanpakai] = useState('')
    const [selectedItemStok, setSelectedItemStok] = useState('')
    const [ambilLuas, setAmbilLuas] = useState('')
    const [keterangan, setKeterangan] = useState('')
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [pendingAction, setPendingAction] = useState(null)

    const itemStokOptions = useMemo(() => {
        if (!selectedBahanpakai || !itemstokbahans) return []
        return itemstokbahans.filter(
            (s) => s.kode_bahan_pakai === selectedBahanpakai && parseFloat(s.luas) > 0 && parseInt(s.qty) > 0
        )
    }, [selectedBahanpakai, itemstokbahans])

    const stokTerpilih = useMemo(() => {
        if (!selectedItemStok || !itemstokbahans) return null
        return itemstokbahans.find((s) => s.id === selectedItemStok) || null
    }, [selectedItemStok, itemstokbahans])

    const bahanPakaiCodes = useMemo(() => {
        return [...new Set(itemstokbahans.map((s) => s.kode_bahan_pakai))]
    }, [itemstokbahans])

    const groupedByBahanPakai = useMemo(() => {
        const map = {}
        for (const code of bahanPakaiCodes) {
            map[code] = itemstokbahans.filter((s) => s.kode_bahan_pakai === code)
        }
        return map
    }, [itemstokbahans, bahanPakaiCodes])

    const handleProses = () => {
        if (!stokTerpilih) return
        router.put(`/produksi/pengambilan-stok/${stokTerpilih.id}/proses`, {
            ambil_luas: ambilLuas,
            keterangan: keterangan,
            kode_bahanpakai: selectedBahanpakai,
            total_all: ambilLuas,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedBahanpakai('')
                setSelectedItemStok('')
                setAmbilLuas('')
                setKeterangan('')
            },
        })
    }

    const requestPassword = useCallback((action) => {
        setPendingAction(action)
        setShowPasswordModal(true)
    }, [])

    const handlePasswordConfirmed = useCallback(() => {
        setShowPasswordModal(false)
        switch (pendingAction) {
            case 'proses':
                handleProses()
                break
        }
        setPendingAction(null)
    }, [pendingAction, selectedItemStok, ambilLuas, keterangan, selectedBahanpakai])

    const handlePasswordCancel = useCallback(() => {
        setShowPasswordModal(false)
        setPendingAction(null)
    }, [])

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                <div className="card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Pengambilan Stok</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="form-control">
                                <span className="label-text text-sm font-medium">Kode Bahan Pakai</span>
                                <select
                                    value={selectedBahanpakai}
                                    onChange={(e) => { setSelectedBahanpakai(e.target.value); setSelectedItemStok(''); setAmbilLuas('') }}
                                    className="select select-bordered"
                                >
                                    <option value="">Pilih Bahan Pakai</option>
                                    {bahanpakaiList.map((bb) => (
                                        <option key={bb.kode_bahan} value={bb.kode_bahan}>
                                            {bb.kode_bahan} - {bb.keterangan}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {selectedBahanpakai && (
                                <label className="form-control">
                                    <span className="label-text text-sm font-medium">Pilih Label Stok</span>
                                    <select
                                        value={selectedItemStok}
                                        onChange={(e) => { setSelectedItemStok(Number(e.target.value)); setAmbilLuas('') }}
                                        className="select select-bordered"
                                    >
                                        <option value="">Pilih Label</option>
                                        {itemStokOptions.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.kode_label || s.keterangan || `Stok #${s.id}`} - Sisa: {s.luas} {s.satuan}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            )}
                        </div>

                        {stokTerpilih && (
                            <div className="mt-4 space-y-4">
                                <div className="divider text-xs text-base-content/50">Detail Stok Terpilih</div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div className="p-3 bg-base-200 rounded-lg">
                                        <span className="text-xs text-base-content/70">Kode Label</span>
                                        <p className="font-semibold">{stokTerpilih.kode_label || '-'}</p>
                                    </div>
                                    <div className="p-3 bg-base-200 rounded-lg">
                                        <span className="text-xs text-base-content/70">Ukuran</span>
                                        <p className="font-semibold">{stokTerpilih.panjang || '-'} x {stokTerpilih.lebar || '-'} {stokTerpilih.satuan || ''}</p>
                                    </div>
                                    <div className="p-3 bg-base-200 rounded-lg">
                                        <span className="text-xs text-base-content/70">Sisa Luas</span>
                                        <p className="font-semibold">{stokTerpilih.luas} {stokTerpilih.satuan}</p>
                                    </div>
                                    <div className="p-3 bg-base-200 rounded-lg">
                                        <span className="text-xs text-base-content/70">Keterangan</span>
                                        <p className="font-semibold">{stokTerpilih.keterangan || '-'}</p>
                                    </div>
                                </div>

                                <div className="divider text-xs text-base-content/50">Ambil Stok</div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="form-control">
                                        <span className="label-text text-sm font-medium">Luas yang akan diambil</span>
                                        <input
                                            type="number"
                                            value={ambilLuas}
                                            onChange={(e) => setAmbilLuas(e.target.value)}
                                            className="input input-bordered"
                                            placeholder="0"
                                            min="0"
                                            step="0.01"
                                        />
                                    </label>

                                    <label className="form-control">
                                        <span className="label-text text-sm font-medium">Keterangan pengambilan</span>
                                        <textarea
                                            value={keterangan}
                                            onChange={(e) => setKeterangan(e.target.value)}
                                            className="textarea textarea-bordered"
                                            placeholder="Catatan pengambilan stok..."
                                            rows="1"
                                        />
                                    </label>
                                </div>

                                {ambilLuas && parseFloat(ambilLuas) > parseFloat(stokTerpilih.luas) && (
                                    <div className="alert alert-warning text-xs">
                                        <i className="fas fa-exclamation-triangle"></i>
                                        Luas yang diambil ({parseFloat(ambilLuas).toFixed(2)} {stokTerpilih.satuan}) melebihi sisa luas ({parseFloat(stokTerpilih.luas).toFixed(2)} {stokTerpilih.satuan})
                                    </div>
                                )}

                                <button
                                    className="btn btn-primary w-full"
                                    disabled={!ambilLuas || parseFloat(ambilLuas) <= 0 || parseFloat(ambilLuas) > parseFloat(stokTerpilih.luas)}
                                    onClick={() => requestPassword('proses')}
                                >
                                    <i className="fas fa-check"></i> Ambil Stok
                                </button>
                            </div>
                        )}

                        {!selectedBahanpakai && (
                            <div className="mt-6">
                                <div className="divider text-xs text-base-content/50">Daftar Stok Tersedia</div>
                                <div className='grid lg:grid-cols-2 gap-4'>
                                    {Object.entries(groupedByBahanPakai).length === 0 ? (
                                        <div className="px-4 py-8 text-center text-base-content/50 text-xs">
                                            Tidak ada data stok tersedia
                                        </div>
                                    ) : (
                                        Object.entries(groupedByBahanPakai).map(([kodeBP, items]) => (
                                            <div key={kodeBP}>
                                                <div className='bg-base-100 border border-base-300 rounded-xl shadow-sm overflow-hidden'>
                                                    <div className='bg-primary px-4 py-3'>
                                                        <h3 className='font-bold text-white text-sm tracking-wide'>{kodeBP}</h3>
                                                    </div>
                                                    <div className="overflow-x-auto">
                                                        <table className="table table-xs table-zebra w-full">
                                                            <thead>
                                                                <tr className="bg-base-200 text-base-content/70 text-[10px] tracking-wider">
                                                                    <th className="py-3">Kode Label</th>
                                                                    <th className="py-3 text-center">Panjang</th>
                                                                    <th className="py-3 text-center">Lebar</th>
                                                                    <th className="py-3 text-center">Luas</th>
                                                                    <th className="py-3 text-center">Satuan</th>
                                                                    <th className="py-3">Keterangan</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {items.map((item) => (
                                                                    <tr key={item.id} className="hover:bg-base-200/70 transition-colors">
                                                                        <td className="font-mono font-medium text-[10px]">{item.kode_label || '-'}</td>
                                                                        <td className="text-[10px] text-center tabular-nums">{item.panjang || '-'}</td>
                                                                        <td className="text-[10px] text-center tabular-nums">{item.lebar || '-'}</td>
                                                                        <td className="text-[10px] text-center tabular-nums">{item.luas}</td>
                                                                        <td className="text-[10px] text-center">{item.satuan || '-'}</td>
                                                                        <td className="text-[10px] max-w-[120px] truncate">{item.keterangan || '-'}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <KonfirmasiPassword
                show={showPasswordModal}
                onConfirmed={handlePasswordConfirmed}
                onClose={handlePasswordCancel}
            />
        </AdminLayout>
    )
}
