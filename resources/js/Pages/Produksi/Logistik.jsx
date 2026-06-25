import AdminLayout from '@/Layouts/AdminLayout'
import { router } from '@inertiajs/react'
import React, { useMemo, useRef, useState, useCallback } from 'react'
import KonfirmasiPassword from '@/Components/KonfirmasiPassword'

export default function Logistik({ produksi, kurir, bahanpakaiList, itemstokbahans }) {
    const [selected, setSelected] = useState(null)
    const [selectedKurir, setSelectedKurir] = useState('')
    const [filterKategori, setFilterKategori] = useState('')
    const [filterJenisBahan, setFilterJenisBahan] = useState('')
    const [selectedBahanpakai, setSelectedBahanpakai] = useState('')
    const [selectedItemStoks, setSelectedItemStoks] = useState([])
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [pendingAction, setPendingAction] = useState(null)
    const modalRef = useRef(null)

    const kategoriList = ['INDOOR', 'INDOOR 2', 'OUTDOOR', 'OUTDOOR 2', 'DISPLAY', 'OFFSET', 'DLL']

    const jenisBahanList = ['DLL', 'DYE', 'UV', 'OFFSET', 'TONER', 'ECOSOLVENT', 'SOLVENT']

    const totalAll = useMemo(() => {
        if (!selected) return 0
        const t = parseFloat(selected.tinggi) || 0
        const l = parseFloat(selected.lebar) || 0
        const qty = parseFloat(selected.qty) || 1
        const luas = (selected.satuan || '').toLowerCase() === 'cm'
            ? (t / 100) * (l / 100)
            : t * l
        return luas * qty
    }, [selected])

    const isDisplay = selected?.bahan?.kategori_cetak === 'DISPLAY'

    const bahanpakaiOptions = useMemo(() => {
        if (!selected) return []
        return bahanpakaiList?.filter((b) => Array.isArray(b.id_master_bahan) && b.id_master_bahan.includes(selected.bahan?.kode)) || []
    }, [selected, bahanpakaiList])

    const itemStokOptions = useMemo(() => {
        if (!selectedBahanpakai || !itemstokbahans) return []
        return itemstokbahans.filter((s) => s.kode_bahan_pakai === selectedBahanpakai && parseFloat(s.luas) > 0 && parseInt(s.qty) > 0)
    }, [selectedBahanpakai, itemstokbahans])

    const qtyCount = parseInt(selected?.qty) || 1

    const stokTerpilihSemua = useMemo(() => {
        return selectedItemStoks.map((id) => itemstokbahans?.find((s) => s.id === id) || null).filter(Boolean)
    }, [selectedItemStoks, itemstokbahans])

    const availableOptions = useMemo(() => {
        const usedIds = selectedItemStoks.filter(Boolean)
        return itemStokOptions.filter((s) => !usedIds.includes(s.id))
    }, [itemStokOptions, selectedItemStoks])

    const semuaCukup = useMemo(() => {
        if (selectedItemStoks.length !== qtyCount) return false
        const totalAvailable = selectedItemStoks.reduce((sum, id) => {
            const s = itemstokbahans?.find((st) => st.id === id)
            return sum + (s ? parseFloat(s.luas) : 0)
        }, 0)
        return totalAvailable >= totalAll
    }, [selectedItemStoks, totalAll, qtyCount, itemstokbahans])

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
        setSelectedKurir('')
        setSelectedBahanpakai(item.kode_bahanpakai ?? '')
        setSelectedItemStoks(Array(parseInt(item.qty) || 1).fill(''))
        modalRef.current?.showModal()
    }

    const closeModal = () => {
        setSelected(null)
        modalRef.current?.close()
    }

    const formatRp = (val) => {
        const num = parseFloat(val)
        if (isNaN(num)) return "-"
        return "Rp " + num.toLocaleString("id-ID")
    }

    const buildSuratJalanHtml = (item, kurirNama) => {
        const tgl = new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })
        const namaCustomer = (item.customer?.nama || '').toUpperCase()
        const namaKurir = (kurirNama || '').toUpperCase()
        return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Surat Jalan</title>
<style>
body { font-family: Arial, sans-serif; font-size: 12px; margin: 0; padding: 20px; }
.header { display: flex; align-items: center; gap: 20px; border-bottom: 2px solid #16a34a; padding-bottom: 12px; margin-bottom: 18px; }
.header img { width: 90px; }
.header .title { flex: 1; text-align: center; }
.header .title h1 { margin: 0; font-size: 20px; color: #16a34a; letter-spacing: 2px; }
.header .title p { margin: 3px 0; font-size: 11px; color: #555; }
.info { margin-bottom: 15px; }
.info table { width: 100%; font-size: 11px; }
.info td { padding: 3px 5px; }
table.items { width: 100%; border-collapse: collapse; font-size: 10px; }
table.items th { background: #16a34a; color: #fff; padding: 7px 4px; text-align: center; }
table.items td { padding: 5px 4px; border: 1px solid #ddd; }
table.items tr:nth-child(even) { background: #f9f9f9; }
.signatures { margin-top: 50px; display: flex; justify-content: space-between; text-align: center; }
.signatures .sig-block { width: 30%; }
.signatures .sig-block p.label { font-size: 11px; font-weight: bold; margin: 0 0 8px 0; }
.signatures .sig-block .line { margin-top: 35px; border-top: 1px solid #000; padding-top: 8px; font-size: 12px; font-weight: bold; letter-spacing: 1px; }
.total-row { font-weight: bold; background: #e8f5e9 !important; }
@media print { body { padding: 10px; } @page { margin: 10mm; } }
</style>
</head>
<body>
<div class="header">
    <img src="/logo.png" alt="Logo">
    <div class="title">
        <h1>SURAT JALAN</h1>
        <p>SENTOSA PRINTING & DIGITAL SOLUTIONS</p>
        <p>Jl. Laksana No.75/73 A Medan | Telp: (061) 7359007</p>
    </div>
</div>
<div class="info">
    <table>
        <tr><td style="width:100px"><strong>No Invoice</strong></td><td>: ${item.no_invoice || '-'}</td></tr>
        <tr><td><strong>Tanggal</strong></td><td>: ${tgl}</td></tr>
        <tr><td><strong>Customer</strong></td><td>: ${item.customer?.nama || '-'}</td></tr>
    </table>
</div>
<table class="items">
    <tr>
        <th style="width:30px">No</th>
        <th>Kode Bahan</th>
        <th style="width:50px">Qty</th>
        <th style="width:90px">Harga</th>
        <th style="width:100px">Total Harga</th>
        <th>Keterangan</th>
    </tr>
    <tr>
        <td style="text-align:center">1</td>
        <td>${item.bahan?.kode || '-'}</td>
        <td style="text-align:center">${item.qty}</td>
        <td style="text-align:right">${formatRp(item.harga_bahan)}</td>
        <td style="text-align:right">${formatRp(item.total_harga)}</td>
        <td>${item.keterangan || '-'}</td>
    </tr>
</table>
<div class="signatures">
    <div class="sig-block">
        <p class="label">PENERIMA</p>
        <div class="line">${namaCustomer || '( _____________________ )'}</div>
    </div>
    <div class="sig-block">
        <p class="label">PENGIRIM</p>
        <div class="line">${namaKurir || '( _____________________ )'}</div>
    </div>
    <div class="sig-block">
        <p class="label">MENGETAHUI</p>
        <div class="line"></div>
    </div>
</div>
</body>
</html>`
    }

    const cetakSuratJalan = (item) => {
        if (!selectedKurir) {
            Swal.fire('Pilih Kurir', 'Silakan pilih kurir pengirim terlebih dahulu', 'warning')
            return
        }
        const namaKurir = kurir.find((k) => k.id == selectedKurir)?.nama || ''
        const w = window.open('', '_blank', 'width=600,height=800')
        if (!w) return
        w.document.open()
        w.document.write(buildSuratJalanHtml(item, namaKurir))
        w.document.close()
        w.addEventListener('load', () => {
            w.focus()
            setTimeout(() => w.print(), 300)
        })
    }

    const handleProses = () => {
        if (!selected) return

        router.put(`/logistik/logistik/${selected.id}/proses`, {
            kode_bahanpakai: selectedBahanpakai,
            id_item_stoks: selectedItemStoks.filter(Boolean),
            total_all: totalAll.toFixed(2),
        }, {
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
            case 'cetak_surat':
                cetakSuratJalan(selected)
                break
            case 'selesai':
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
                                <h2 className="card-title">Halaman Logistik</h2>
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
                                                        Tidak ada data logistik untuk kategori ini
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
                                                                            <th className="py-3 text-center">QTY</th>
                                                                            <th className="py-3 text-center">Sisi</th>
                                                                            <th className="py-3 text-center">Pengataran</th>
                                                                            <th className="py-3 text-center">Tgl Kirim</th>
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
                                                                                <td className="text-[10px] text-center font-semibold tabular-nums">{item.qty}</td>
                                                                                <td className="text-[10px] text-center">{item.sisi}</td>
                                                                                <td className="text-[10px] text-center font-semibold tabular-nums">{item.metode_pengantaran}</td>
                                                                                <td className="text-[10px] text-center font-semibold tabular-nums">{item.tgl_kirim}</td>
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
                    <h3 className="text-lg font-bold mb-4">Konfirmasi Logistik Selesai</h3>
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
                                <span>{selected.bahan?.bahan}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">Jenis Bahan</span>
                                <span>{selected.bahan?.jenis_bahan}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">Kategori Cetak</span>
                                <span>{selected.bahan?.kategori_cetak}</span>
                            </div>

                            {isDisplay && (
                                <div className="space-y-3 mt-3">
                                    <label className="form-control">
                                        <span className="label-text text-xs">Kode Bahan pakai</span>
                                        <select
                                            value={selectedBahanpakai}
                                            onChange={(e) => {
                                                setSelectedBahanpakai(e.target.value)
                                                setSelectedItemStoks(Array(qtyCount).fill(''))
                                            }}
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
                                    {selectedBahanpakai && (
                                        <div className="space-y-2">
                                            <span className="text-xs font-medium">Pilih Label ({qtyCount} item)</span>
                                            {Array.from({ length: qtyCount }).map((_, i) => {
                                                const currentOpts = selectedItemStoks[i]
                                                    ? [itemstokbahans?.find((s) => s.id === selectedItemStoks[i]), ...availableOptions].filter(Boolean)
                                                    : availableOptions
                                                return (
                                                    <select
                                                        key={i}
                                                        value={selectedItemStoks[i] || ''}
                                                        onChange={(e) => {
                                                            const next = [...selectedItemStoks]
                                                            next[i] = e.target.value ? Number(e.target.value) : ''
                                                            setSelectedItemStoks(next)
                                                        }}
                                                        className="select select-bordered select-sm text-xs w-full"
                                                    >
                                                        <option value="">Label ke-{i + 1}</option>
                                                        {currentOpts.map((s) => (
                                                            <option key={s.id} value={s.id}>
                                                                {s.kode_label || s.keterangan || `Stok #${s.id}`} - Sisa: {s.luas} {s.satuan}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    <div className="form-control mt-4">
                        <label className="label"><span className="label-text font-medium">Pilih Kurir Pengirim</span></label>
                        <select
                            value={selectedKurir}
                            onChange={(e) => setSelectedKurir(e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option value="">-- Pilih Kurir --</option>
                            {kurir.map((k) => (
                                <option key={k.id} value={k.id}>{k.nama}</option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-action flex-wrap gap-2">
                        <button className="btn btn-ghost" onClick={closeModal}>Batal</button>
                        <button className="btn btn-secondary" onClick={() => requestPassword('cetak_surat')}>
                            <i className="fas fa-truck"></i> Cetak Surat Jalan
                        </button>
                        <button className="btn btn-primary" disabled={isDisplay && (!semuaCukup || selectedItemStoks.filter(Boolean).length < qtyCount)} onClick={() => requestPassword('selesai')}>
                            <i className="fas fa-check"></i> Selesai Logistik
                        </button>
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
