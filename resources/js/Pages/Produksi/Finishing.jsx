import AdminLayout from '@/Layouts/AdminLayout'
import { router } from '@inertiajs/react'
import React, { useMemo, useRef, useState, useCallback } from 'react'
import KonfirmasiPassword from '@/Components/KonfirmasiPassword'

export default function Finishing({ produksi, search: initialSearch, tglAwal: initialTglAwal, tglAkhir: initialTglAkhir }) {
    const [selected, setSelected] = useState(null)
    const [search, setSearch] = useState(initialSearch || '')
    const [tgl_awal, setTglAwal] = useState(initialTglAwal || '')
    const [tgl_akhir, setTglAkhir] = useState(initialTglAkhir || '')
    const [filterKategori, setFilterKategori] = useState('')
    const [filterJenisBahan, setFilterJenisBahan] = useState('')
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [pendingAction, setPendingAction] = useState(null)
    const modalRef = useRef(null)

    const kategoriList = ['INDOOR', 'INDOOR 2', 'OUTDOOR', 'OUTDOOR 2', 'DISPLAY', 'OFFSET', 'DLL']
    const jenisBahanList = ['DLL', 'DYE', 'UV', 'OFFSET', 'TONER', 'ECOSOLVENT', 'SOLVENT']

    const kategoriColors = {
        'INDOOR': 'bg-blue-500',
        'INDOOR 2': 'bg-blue-400',
        'OUTDOOR': 'bg-orange-500',
        'OUTDOOR 2': 'bg-orange-400',
        'DISPLAY': 'bg-purple-500',
        'OFFSET': 'bg-emerald-500',
        'DLL': 'bg-gray-500',
    }

    const shouldShowSection = (kategori) =>
        !filterKategori || filterKategori === kategori

    const handleSearch = (e) => {
        e.preventDefault()
        router.get('/produksi/finishing', { search, tgl_awal, tgl_akhir }, { preserveState: true, replace: true })
    }

    const itemsByKategori = useMemo(() => {
        const map = {}
        for (const kategori of kategoriList) {
            if (!shouldShowSection(kategori)) continue
            const filtered = produksi.filter(
                (item) =>
                    item.bahan?.kategori_cetak === kategori &&
                    (!filterJenisBahan || item.bahan?.jenis_bahan === filterJenisBahan)
            )
            const grouped = {}
            for (const item of filtered) {
                const jb = item.bahan?.jenis_bahan || 'Lainnya'
                if (!grouped[jb]) grouped[jb] = []
                grouped[jb].push(item)
            }
            map[kategori] = grouped
        }
        return map
    }, [produksi, kategoriList, filterKategori, filterJenisBahan])

    const totalSemuaItem = useMemo(() =>
        Object.values(itemsByKategori).reduce((sum, groups) =>
            sum + Object.values(groups).reduce((s, items) => s + items.length, 0), 0
        ), [itemsByKategori])

    const openModal = (item) => {
        setSelected(item)
        modalRef.current?.showModal()
    }

    const closeModal = () => {
        setSelected(null)
        modalRef.current?.close()
    }

    const handleProses = () => {
        if (!selected) return

        router.put(`/finishing/finishing/${selected.id}/proses`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                closeModal()
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
            case 'selesai':
                handleProses()
                break
        }
        setPendingAction(null)
    }, [pendingAction])

    const handlePasswordCancel = useCallback(() => {
        setShowPasswordModal(false)
        setPendingAction(null)
    }, [])

    return (
        <>
            <AdminLayout>
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl font-bold">Halaman Finishing</h1>
                            <p className="text-sm text-base-content/60 mt-1">
                                {totalSemuaItem} order menunggu finishing
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSearch} className="flex flex-wrap gap-2 items-end">
                        <input
                            type="text"
                            placeholder="Cari kode SPK, customer, keterangan..."
                            className="input input-bordered input-success w-full max-w-xs input-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <label className="form-control w-full max-w-[160px]">
                            <span className="label-text text-xs">Tgl Awal</span>
                            <input
                                type="date"
                                className="input input-bordered input-success input-sm"
                                value={tgl_awal}
                                onChange={(e) => setTglAwal(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-[160px]">
                            <span className="label-text text-xs">Tgl Akhir</span>
                            <input
                                type="date"
                                className="input input-bordered input-success input-sm"
                                value={tgl_akhir}
                                onChange={(e) => setTglAkhir(e.target.value)}
                            />
                        </label>
                        <button type="submit" className="btn btn-success btn-sm">
                            <i className="fas fa-search"></i> Cari
                        </button>
                    </form>

                    <div className="flex flex-wrap gap-2">
                        <select
                            value={filterKategori}
                            onChange={(e) => setFilterKategori(e.target.value)}
                            className="select select-bordered select-sm text-sm"
                        >
                            <option value="">Semua Kategori</option>
                            {kategoriList.map((k) => (
                                <option key={k} value={k}>{k}</option>
                            ))}
                        </select>
                        <select
                            value={filterJenisBahan}
                            onChange={(e) => setFilterJenisBahan(e.target.value)}
                            className="select select-bordered select-sm text-sm"
                        >
                            <option value="">Semua Jenis Bahan</option>
                            {jenisBahanList.map((j) => (
                                <option key={j} value={j}>{j}</option>
                            ))}
                        </select>
                    </div>

                    {totalSemuaItem === 0 ? (
                        <div className="card bg-base-100 border border-base-300 shadow-sm">
                            <div className="card-body items-center py-16">
                                <i className="fas fa-inbox text-4xl text-base-content/20 mb-3"></i>
                                <p className="text-base-content/50">Tidak ada order finishing</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {Object.entries(itemsByKategori).map(([kategori, jenisGroups]) => {
                                const kategoriCount = Object.values(jenisGroups).reduce((s, items) => s + items.length, 0)
                                if (kategoriCount === 0) return null

                                return (
                                    <div key={kategori} className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
                                        <div className={`${kategoriColors[kategori] || 'bg-gray-500'} px-4 py-2.5 flex items-center justify-between`}>
                                            <h3 className="font-bold text-white text-sm">{kategori}</h3>
                                            <span className="badge badge-sm badge-white text-black border-0">{kategoriCount}</span>
                                        </div>

                                        <div className="divide-y divide-base-200">
                                            {Object.entries(jenisGroups).map(([jenis, items]) => (
                                                <div key={jenis}>
                                                    <div className="bg-base-200/50 px-4 py-1.5 flex items-center gap-2">
                                                        <i className="fas fa-layer-group text-[10px] text-base-content/40"></i>
                                                        <span className="font-semibold text-xs text-base-content/70">{jenis}</span>
                                                        <span className="badge badge-xs badge-ghost">{items.length}</span>
                                                    </div>
                                                    <div className="overflow-x-auto">
                                                        <table className="table table-xs w-full">
                                                            <thead>
                                                                <tr className="text-[10px] text-base-content/50 uppercase tracking-wider">
                                                                    <th className="py-2">No SPK</th>
                                                                    <th className="py-2">Kode Bahan</th>
                                                                    <th className="py-2">Customer</th>
                                                                    <th className="py-2 text-center">Tinggi</th>
                                                                    <th className="py-2 text-center">Lebar</th>
                                                                    <th className="py-2 text-center">QTY</th>
                                                                    <th className="py-2 text-center">Sisi</th>
                                                                    <th className="py-2 text-center">Pengantaran</th>
                                                                    <th className="py-2 text-center">Tgl Kirim</th>
                                                                    <th className="py-2">Catatan</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {items.map((item) => (
                                                                    <tr
                                                                        key={item.id}
                                                                        onClick={() => openModal(item)}
                                                                        className="hover:bg-primary/5 transition-colors cursor-pointer group"
                                                                    >
                                                                        <td className="font-mono font-medium text-[11px] group-hover:text-primary">{item.kode_spk}</td>
                                                                        <td className="text-[11px]">
                                                                            <span className="badge badge-outline badge-xs">{item.bahan?.kode}</span>
                                                                        </td>
                                                                        <td className="font-medium text-[11px]">{item.customer?.nama}</td>
                                                                        <td className="text-[11px] text-center tabular-nums">
                                                                            {item.tinggi} <span className="text-[9px] text-base-content/40">{item.satuan}</span>
                                                                        </td>
                                                                        <td className="text-[11px] text-center tabular-nums">
                                                                            {item.lebar} <span className="text-[9px] text-base-content/40">{item.satuan}</span>
                                                                        </td>
                                                                        <td className="text-[11px] text-center font-bold tabular-nums">{item.qty}</td>
                                                                        <td className="text-[11px] text-center">
                                                                            <span className={`badge badge-xs ${item.sisi === '2 SISI' ? 'badge-warning' : 'badge-ghost'}`}>
                                                                                {item.sisi}
                                                                            </span>
                                                                        </td>
                                                                        <td className="text-[11px] text-center">
                                                                            <span className={`badge badge-xs ${item.metode_pengantaran === 'KURIR' ? 'badge-info' : 'badge-success'}`}>
                                                                                {item.metode_pengantaran}
                                                                            </span>
                                                                        </td>
                                                                        <td className="text-[11px] text-center tabular-nums">{item.tgl_kirim}</td>
                                                                        <td className="text-[11px] max-w-[120px] truncate text-base-content/60" title={item.pinising?.catatan || ''}>
                                                                            {item.pinising?.catatan || '-'}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </AdminLayout>

            <dialog ref={modalRef} className="modal">
                <div className="modal-box max-w-2xl">
                    <button type="button" onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                    {selected && (
                        <>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                                    <i className="fas fa-check-double text-success"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Konfirmasi Finishing Selesai</h3>
                                    <p className="text-xs text-base-content/50">{selected.kode_spk}</p>
                                </div>
                            </div>

                            <div className="bg-base-200/50 rounded-xl p-4 space-y-2">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-xs text-base-content/50">Customer</span>
                                        <p className="font-medium">{selected.customer?.nama}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-base-content/50">Bahan</span>
                                        <p className="font-medium">{selected.bahan?.kode} - {selected.bahan?.bahan}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-base-content/50">Jenis / Kategori Cetak</span>
                                        <p className="font-medium">{selected.bahan?.jenis_bahan} / {selected.bahan?.kategori_cetak}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-base-content/50">Sisi</span>
                                        <p className="font-medium">{selected.sisi}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-base-content/50">Dimensi</span>
                                        <p className="font-medium">{selected.tinggi} × {selected.lebar} {selected.satuan}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-base-content/50">QTY</span>
                                        <p className="font-medium">{selected.qty}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-xs text-base-content/50">Catatan</span>
                                        <p className="font-medium">{selected.pinising?.catatan || '-'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-action mt-5">
                                <button className="btn btn-ghost" onClick={closeModal}>Batal</button>
                                <button className="btn btn-primary flex-1" onClick={() => requestPassword('selesai')}>
                                    <i className="fas fa-check-double"></i> Selesai Finishing
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeModal}>close</button>
                </form>
            </dialog>

            <KonfirmasiPassword
                show={showPasswordModal}
                onConfirmed={handlePasswordConfirmed}
                onClose={handlePasswordCancel}
            />
        </>
    )
}
