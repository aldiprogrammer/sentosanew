import AdminLayout from '@/Layouts/AdminLayout'
import { router } from '@inertiajs/react'
import React, { useMemo, useRef, useState, useCallback } from 'react'
import { buildFinishingReceiptHtml } from './StrukFinishingTemplate'
import KonfirmasiPassword from '@/Components/KonfirmasiPassword'

export default function Produksi({ produksi, bahanpakaiList, itemstokbahans }) {
    const [selected, setSelected] = useState(null)
    const [filterKategori, setFilterKategori] = useState('')
    const [filterJenisBahan, setFilterJenisBahan] = useState('')
    const [sisaPutihPanjang, setSisaPutihPanjang] = useState('')
    const [sisaPutihLebar, setSisaPutihLebar] = useState('')
    const [selectedBahanpakai, setSelectedBahanpakai] = useState('')
    const [selectedItemStok, setSelectedItemStok] = useState('')
    const [selectedItemStokIds, setSelectedItemStokIds] = useState([])
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [pendingAction, setPendingAction] = useState(null)
    const modalRef = useRef(null)

    const emptyText = '-'

    const hitungLuasM2 = (tinggi, lebar, satuan) => {
        const t = parseFloat(tinggi) || 0
        const l = parseFloat(lebar) || 0
        return (satuan || '').toLowerCase() === 'cm'
            ? (t / 100) * (l / 100)
            : t * l
    }

    const totalLuasM2 = useMemo(() => {
        if (!selected) return 0
        const p = parseFloat(sisaPutihPanjang) || 0
        const l = parseFloat(sisaPutihLebar) || 0
        const qty = parseFloat(selected.qty) || 1
        return hitungLuasM2(p, l, selected.satuan) * qty
    }, [selected, sisaPutihPanjang, sisaPutihLebar])

    const totalAll = selected?.bahan?.satuan == 'LEMBAR' ? parseFloat(selected.qty) || 1 : totalLuasM2

    const bahanpakaiOptions = useMemo(() => {
        if (!selected) return []
        return bahanpakaiList?.filter((b) => Array.isArray(b.id_master_bahan) && b.id_master_bahan.includes(selected.bahan?.kode)) || []
    }, [selected, bahanpakaiList])

    const itemStokOptions = useMemo(() => {
        if (!selectedBahanpakai || !itemstokbahans) return []
        return itemstokbahans.filter((s) => s.kode_bahan_pakai === selectedBahanpakai && parseFloat(s.total) > 0 && parseInt(s.qty) > 0)
    }, [selectedBahanpakai, itemstokbahans])

    const stokTerpilih = useMemo(() => {
        if (!selectedItemStok || !itemstokbahans) return null
        return itemstokbahans.find((s) => s.id === selectedItemStok) || null
    }, [selectedItemStok, itemstokbahans])

    const selectedLabels = useMemo(() => {
        if (selected?.bahan?.satuan == 'LEMBAR') {
            return selectedItemStokIds
                .map(id => itemstokbahans?.find(s => s.id === id)?.kode_label)
                .filter(Boolean)
                .join(', ')
        }
        return stokTerpilih?.kode_label || ''
    }, [selected, selectedItemStokIds, itemstokbahans, stokTerpilih])

    const isSisaKurang = useMemo(() => {
        if (selected?.bahan?.satuan == 'LEMBAR') {
            if (!selectedItemStokIds.length) return true
            const totalAvailable = selectedItemStokIds.reduce((sum, id) => {
                const stok = itemstokbahans.find(s => s.id === id)
                return sum + (parseFloat(stok?.total) || 0)
            }, 0)
            return totalAvailable < totalAll
        }
        if (!stokTerpilih) return false
        return parseFloat(stokTerpilih.total) < totalAll
    }, [stokTerpilih, totalAll, selectedItemStokIds, selected, itemstokbahans])

    const reviewReceipt = (item) => {
        const w = window.open('', '_blank', 'width=420,height=640')
        if (!w) return
        w.document.open()
        w.document.write(buildFinishingReceiptHtml(item, selectedLabels))
        w.document.close()
    }

    const printReceipt = (item) => {
        const w = window.open('', '_blank', 'width=420,height=640')
        if (!w) return
        w.document.open()
        w.document.write(buildFinishingReceiptHtml(item, selectedLabels))
        w.document.close()
        w.addEventListener('load', () => {
            w.focus()
            setTimeout(() => w.print(), 300)
        })
    }

    const kategoriList = ['INDOOR', 'INDOOR 2', 'OUTDOOR', 'OUTDOOR2', 'DISPLAY', 'OFFSET', 'DLL']

    const jenisBahanList = ['DLL', 'DYE', 'UV', 'OFFSET', 'TONER', 'ECOSOLVENT', 'SOLVENT']

    const shouldShowSection = (kategori) =>
        !filterKategori || filterKategori === kategori

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

    const openModal = (item) => {
        setSelected(item)
        setSisaPutihPanjang(item.tinggi ?? '')
        setSisaPutihLebar(item.lebar ?? '')
        setSelectedBahanpakai(item.kode_bahanpakai ?? '')
        setSelectedItemStok('')
        setSelectedItemStokIds([])
        modalRef.current?.showModal()
    }

    const closeModal = () => {
        setSelected(null)
        modalRef.current?.close()
    }

    const handleProses = () => {
        if (!selected) return
        const payload = {
            sisa_putih_panjang: sisaPutihPanjang,
            sisa_putih_lebar: sisaPutihLebar,
            sisa_putih_total: String(totalAll),
            kode_bahanpakai: selectedBahanpakai,
            total_all: totalAll.toFixed(2),
            no_label: selectedLabels,
        }
        if (selected?.bahan?.satuan == 'LEMBAR') {
            payload.item_stok_ids = selectedItemStokIds
            payload.id_item_stok = null
        } else {
            payload.item_stok_ids = stokTerpilih?.id ? [stokTerpilih.id] : []
            payload.id_item_stok = stokTerpilih?.id || null
        }
        router.put(`/produksi/produksi/${selected.id}/proses`, payload, {
            preserveScroll: true,
            onSuccess: () => {
                closeModal()
                printReceipt(selected)
            },
        })
    }

    const requestPassword = useCallback((action) => {
        setPendingAction(action)
        setShowPasswordModal(true)
    }, [])

    const handlePasswordConfirmed = useCallback(() => {
        setShowPasswordModal(false)
        if (!selected) return

        switch (pendingAction) {
            case 'review':
                reviewReceipt(selected)
                closeModal()
                break
            case 'cetak':
                printReceipt(selected)
                closeModal()
                break
            case 'proses':
                handleProses()
                break
        }
        setPendingAction(null)
    }, [pendingAction, selected])

    const handlePasswordCancel = useCallback(() => {
        setShowPasswordModal(false)
        setPendingAction(null)
    }, [])

    return (
        <>
            <AdminLayout>
                <div className="grid grid-cols-1 xl:grid-cols-1">
                    <div className="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <h2 className="card-title">Halaman Produksi</h2>
                                <div className="flex gap-2">
                                    <select
                                        value={filterKategori}
                                        onChange={(e) => setFilterKategori(e.target.value)}
                                        className="select select-bordered"
                                    >
                                        <option value="">Semua Kategori Cetak</option>
                                        {kategoriList.map((k) => (
                                            <option key={k} value={k}>{k}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={filterJenisBahan}
                                        onChange={(e) => setFilterJenisBahan(e.target.value)}
                                        className="select select-bordered"
                                    >
                                        <option value="">Semua Jenis Bahan</option>
                                        {jenisBahanList.map((j) => (
                                            <option key={j} value={j}>{j}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <div className='grid lg:grid-cols-2 gap-4'>
                                    {Object.entries(itemsByKategori).map(([kategori, jenisGroups]) => (
                                        <div key={kategori}>
                                            <div className='bg-base-100 border border-base-300 rounded-xl shadow-sm overflow-hidden'>
                                                <div className='bg-primary px-4 py-3'>
                                                    <h3 className='font-bold text-white text-sm tracking-wide'>{kategori}</h3>
                                                </div>

                                                {Object.entries(jenisGroups).length === 0 ? (
                                                    <div className="px-4 py-8 text-center text-base-content/50 text-xs">
                                                        Tidak ada data produksi untuk kategori ini
                                                    </div>
                                                ) : (
                                                    Object.entries(jenisGroups).map(([jenis, items]) => (
                                                        <div key={jenis}>
                                                            <div className='bg-base-200/70 px-4 py-1.5 border-b border-base-300'>
                                                                <span className='font-semibold text-xs tracking-wider text-base-content/80'>{jenis}</span>
                                                            </div>
                                                            <div className="overflow-x-auto">
                                                                <table className="table table-xs table-zebra w-full">
                                                                    <thead>
                                                                        <tr className="bg-base-200 text-base-content/70 text-[10px] tracking-wider">
                                                                            <th className="py-3">No SPK</th>
                                                                            <th className="py-3">Kd Bahan</th>
                                                                            <th className="py-3">Customer</th>
                                                                            <th className="py-3 text-center">H</th>
                                                                            <th className="py-3 text-center">W</th>
                                                                            <th className="py-3 text-center">Luas</th>
                                                                            <th className="py-3 text-center">QTY</th>
                                                                            <th className="py-3 text-center">Sisi</th>
                                                                            <th className="py-3 text-center">Pengataran</th>
                                                                            <th className="py-3 text-center">Tgl Kirim</th>
                                                                            <th className="py-3 text-center">Catatan</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {items.map((item) => (
                                                                            <tr key={item.id} onClick={() => openModal(item)} className="hover:bg-base-200/70 transition-colors cursor-pointer">
                                                                                <td className="font-mono font-medium text-[10px]">{item.kode_spk}</td>
                                                                                <td className='text-[10px]'>{item.bahan?.kode}</td>
                                                                                <td className="font-medium text-[10px]">{item.customer?.nama}</td>
                                                                                <td className="text-[10px] text-center tabular-nums">{item.tinggi} <span className="text-[10px] text-base-content/50">{item.satuan}</span></td>
                                                                                <td className="text-[10px] text-center tabular-nums">{item.lebar} <span className="text-[10px] text-base-content/50">{item.satuan}</span></td>
                                                                                <td className="text-[10px] text-center tabular-nums">
                                                                                    {(item.satuan || '').toLowerCase() === 'cm'
                                                                                        ? ((parseFloat(item.tinggi) / 100) * (parseFloat(item.lebar) / 100)).toFixed(2)
                                                                                        : (parseFloat(item.tinggi) * parseFloat(item.lebar)).toFixed(2)
                                                                                    } m²
                                                                                </td>
                                                                                <td className="text-[10px] text-center font-semibold tabular-nums">{item.qty}</td>
                                                                                <td className="text-[10px] text-center">{item.sisi}</td>
                                                                                <td className="text-[10px] text-center font-semibold tabular-nums">{item.metode_pengantaran}</td>
                                                                                <td className="text-[10px] text-center font-semibold tabular-nums">{item.tgl_kirim}</td>
                                                                                <td className="text-[10px] text-center max-w-[100px] truncate">{item.pinising?.catatan || ''}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>

            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <button type="button" onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="text-lg font-bold mb-4">Proses Finishing</h3>
                    {selected && (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">No SPK</span>
                                <span className="font-mono font-semibold">{selected.kode_spk}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">Customer</span>
                                <span className="font-medium">{selected.customer?.nama}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">Bahan</span>
                                <span>{selected.bahan?.kode}-{selected.bahan?.bahan}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">Jenis Bahan</span>
                                <span>{selected.bahan?.jenis_bahan}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">Kategori Cetak</span>
                                <span>{selected.bahan?.kategori_cetak}</span>
                            </div>

                            {selected.bahan?.satuan == "LEMBAR" ?
                                <>
                                    <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                        <span className="text-sm text-base-content/70">Qty</span>
                                        <span className="font-semibold text-sm">
                                            {selected.qty} LEMBAR
                                        </span>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                        <span className="text-sm text-base-content/70">Luas ({selected.satuan})</span>
                                        <span className="font-semibold text-sm">
                                            {sisaPutihPanjang} × {sisaPutihLebar}{selected.qty > 1 ? ` × ${selected.qty} pcs` : ''} = {totalLuasM2.toFixed(2)} m²
                                        </span>
                                    </div>
                                </>
                            }



                            {selected.bahan?.satuan == 'LEMBAR' ?
                                <>
                                    <div className="flex justify-between items-center p-2 bg-base-200 rounded-lg">
                                        <span className="text-xs text-base-content/70">Total Qty</span>
                                        <span className="font-semibold text-sm">{selected.qty} LEMBAR</span>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="divider text-xs text-base-content/50">Sisa Putih</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <label className="form-control">
                                            <span className="label-text text-xs">Panjang ({selected.satuan})</span>
                                            <input
                                                type="number"
                                                value={sisaPutihPanjang}
                                                onChange={(e) => setSisaPutihPanjang(e.target.value)}
                                                className="input input-bordered input-sm"
                                                placeholder="0"
                                            />
                                        </label>
                                        <label className="form-control">
                                            <span className="label-text text-xs">Lebar ({selected.satuan})</span>
                                            <input
                                                type="number"
                                                value={sisaPutihLebar}
                                                onChange={(e) => setSisaPutihLebar(e.target.value)}
                                                className="input input-bordered input-sm"
                                                placeholder="0"
                                            />
                                        </label>
                                    </div>

                                    <div className="flex justify-between items-center p-2 bg-base-200 rounded-lg">
                                        <span className="text-xs text-base-content/70">Total Luas (m²)</span>
                                        <span className="font-semibold text-sm">{totalAll.toFixed(2)} m²</span>
                                    </div>
                                </>
                            }


                            {/* <div className="flex justify-between items-center p-2 bg-base-200 rounded-lg">
                                <span className="text-xs text-base-content/70">Total Sisa Putih</span>
                                <span className="font-semibold text-sm"> {totalSisaPutih || 0} cm²</span>
                            </div> */}

                            <div className="grid grid-cols-2 gap-2">
                                <label className="form-control">
                                    <span className="label-text text-xs">Kode Bahan pakai</span>
                                    <select
                                        value={selectedBahanpakai}
                                        onChange={(e) => { setSelectedBahanpakai(e.target.value); setSelectedItemStok(''); setSelectedItemStokIds([]) }}
                                        className="select select-bordered select-sm text-xs"
                                    >
                                        <option value="">Pilih Bahan Pakai</option>
                                        {bahanpakaiOptions.map((bb) => (
                                            <option key={bb.kode_bahan} value={bb.kode_bahan}>
                                                {bb.kode_bahan} - {bb.keterangan}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                {selected?.bahan?.satuan == 'LEMBAR' ? (
                                    selectedBahanpakai && itemStokOptions.length > 0 && (
                                        <div className="form-control">
                                            <span className="label-text text-xs mb-1">Pilih Label (bisa lebih dari 1)</span>
                                            <div className="space-y-1 max-h-40 overflow-y-auto border border-base-300 rounded-lg p-2">
                                                {itemStokOptions.map((s) => (
                                                    <label key={s.id} className="flex items-center gap-2 p-1.5 bg-base-200 rounded cursor-pointer hover:bg-base-300">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedItemStokIds.includes(s.id)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setSelectedItemStokIds(prev => [...prev, s.id])
                                                                } else {
                                                                    setSelectedItemStokIds(prev => prev.filter(id => id !== s.id))
                                                                }
                                                            }}
                                                            className="checkbox checkbox-xs"
                                                        />
                                                        <span className="text-xs">
                                                            {s.kode_label || s.keterangan || `Stok #${s.id}`} - Sisa: <strong>{s.total}</strong> {s.satuan}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    selectedBahanpakai && itemStokOptions.length > 0 && (
                                        <label className="form-control">
                                            <span className="label-text text-xs">Pilih Label</span>
                                            <select
                                                value={selectedItemStok}
                                                onChange={(e) => setSelectedItemStok(Number(e.target.value))}
                                                className="select select-bordered select-sm text-xs"
                                            >
                                                <option value="">Pilih Label</option>
                                                {itemStokOptions.map((s) => (
                                                    <option key={s.id} value={s.id}>
                                                        {s.kode_label || s.keterangan || `Stok #${s.id}`} - Sisa: {s.total} {s.satuan}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    )
                                )}
                            </div>

                            {selected?.bahan?.satuan == 'LEMBAR' && selectedItemStokIds.length > 0 ? (
                                <div className="p-2 bg-base-200 rounded-lg">
                                    <span className="text-xs text-base-content/70 mb-1 block">Label terpilih:</span>
                                    <div className="space-y-1">
                                        {selectedItemStokIds.map(id => {
                                            const s = itemstokbahans.find(st => st.id === id)
                                            if (!s) return null
                                            return (
                                                <div key={s.id} className="flex justify-between text-xs bg-base-100 rounded px-2 py-1">
                                                    <span>{s.kode_label || `Stok #${s.id}`}</span>
                                                    <span className="font-semibold">Sisa: {s.total} {s.satuan}</span>
                                                </div>
                                            )
                                        })}
                                        <div className="flex justify-between text-xs font-bold border-t border-base-300 pt-1 mt-1">
                                            <span>Total tersedia</span>
                                            <span>{selectedItemStokIds.reduce((sum, id) => {
                                                const s = itemstokbahans.find(st => st.id === id)
                                                return sum + (parseFloat(s?.total) || 0)
                                            }, 0)} LEMBAR</span>
                                        </div>
                                    </div>
                                </div>
                            ) : stokTerpilih && (
                                <div className="grid grid-cols-2 gap-2 p-2 bg-base-200 rounded-lg">

                                    {stokTerpilih.satuan == 'LEMBAR' ? <>
                                        <div>
                                            <span className="text-xs text-base-content/70">Sisa</span>
                                            <p className="font-semibold text-sm">{stokTerpilih.total} {stokTerpilih.satuan}</p>
                                        </div></> : <>

                                        <div>
                                            <span className="text-xs text-base-content/70">Panjang</span>
                                            <p className="font-semibold text-sm">{stokTerpilih.panjang}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-base-content/70">Lebar</span>
                                            <p className="font-semibold text-sm">{stokTerpilih.lebar}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-base-content/70">Luas awal</span>
                                            <p className="font-semibold text-sm">{stokTerpilih.lebar * stokTerpilih.panjang} {stokTerpilih.satuan}</p>
                                        </div>

                                        <div>
                                            <span className="text-xs text-base-content/70">Sisa</span>
                                            <p className="font-semibold text-sm">{stokTerpilih.total} {stokTerpilih.satuan}</p>
                                        </div>
                                    </>}

                                    <div className="col-span-2">
                                        <span className="text-xs text-base-content/70">Keterangan</span>
                                        <p className="font-semibold text-sm">{stokTerpilih.keterangan || '-'}</p>
                                    </div>
                                </div>
                            )}

                            <div className="alert alert-info text-sm">
                                <i className="fas fa-info-circle"></i>
                                Setelah diproses, struk akan tercetak dan data berpindah ke halaman Finishing.
                            </div>
                        </div>
                    )}
                    <div className="modal-action flex-col gap-2">
                        {isSisaKurang && (
                            <div className="alert alert-warning text-xs">
                                <i className="fas fa-exclamation-triangle"></i>
                                {selected?.bahan?.satuan == 'LEMBAR'
                                    ? `Total stok terpilih tidak mencukupi untuk ${totalAll} LEMBAR`
                                    : `Sisa (${parseFloat(stokTerpilih?.total || 0).toFixed(2)}) tidak mencukupi untuk total (${totalAll.toFixed(2)})`
                                }
                            </div>
                        )}
                        <div className="flex gap-2 w-full">
                            <button className="btn btn-success flex-1" disabled={isSisaKurang} onClick={() => requestPassword('review')}>
                                <i className="fas fa-eye"></i> Review Struk
                            </button>
                            <button className="btn btn-primary flex-1" disabled={isSisaKurang} onClick={() => requestPassword('proses')}>
                                <i className="fas fa-check"></i> Proses & Cetak Struk
                            </button>
                            {/* <button className="btn btn-outline flex-1" disabled={isSisaKurang} onClick={() => requestPassword('cetak')}>
                                <i className="fas fa-print"></i> Cetak Struk
                            </button> */}
                        </div>

                    </div>
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
