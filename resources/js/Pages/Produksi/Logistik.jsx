import AdminLayout from '@/Layouts/AdminLayout'
import { router } from '@inertiajs/react'
import React, { useMemo, useRef, useState, useCallback } from 'react'
import KonfirmasiPassword from '@/Components/KonfirmasiPassword'

export default function Logistik({ produksi, kurir, bahanpakaiList, itemstokbahans, search: initialSearch, tglAwal: initialTglAwal, tglAkhir: initialTglAkhir }) {
    const [selected, setSelected] = useState(null)
    const [selectedKurir, setSelectedKurir] = useState('')
    const [search, setSearch] = useState(initialSearch || '')
    const [tgl_awal, setTglAwal] = useState(initialTglAwal || '')
    const [tgl_akhir, setTglAkhir] = useState(initialTglAkhir || '')
    const [filterKategori, setFilterKategori] = useState('')
    const [filterJenisBahan, setFilterJenisBahan] = useState('')
    const [selectedBahanpakai, setSelectedBahanpakai] = useState('')
    const [selectedItemStoks, setSelectedItemStoks] = useState([])
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

    const totalAll = useMemo(() => {
        if (!selected) return 0
        if (selected.bahan?.kategori_cetak === 'DISPLAY') {
            return parseFloat(selected.qty) || 0
        }
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
        return itemstokbahans.filter((s) => s.kode_bahan_pakai === selectedBahanpakai && parseFloat(s.total) > 0 && parseInt(s.qty) > 0)
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
            return sum + (s ? parseFloat(s.total) : 0)
        }, 0)
        return totalAvailable >= totalAll
    }, [selectedItemStoks, totalAll, qtyCount, itemstokbahans])

    const handleSearch = (e) => {
        e.preventDefault()
        router.get('/produksi/logistik', { search, tgl_awal, tgl_akhir }, { preserveState: true, replace: true })
    }

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

    const totalSemuaItem = useMemo(() =>
        Object.values(itemsByKategori).reduce((sum, groups) =>
            sum + Object.values(groups).reduce((s, items) => s + items.length, 0), 0
        ), [itemsByKategori])

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

    const buildSuratJalanHtml = (item, kurirNama) => {
        const tgl = new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })
        const namaCustomer = (item.customer?.nama || '').toUpperCase()
        const namaKurir = (kurirNama || '').toUpperCase()
        return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Surat Jalan</title>
<style>
body { font-family: Arial, sans-serif; font-size: 13px; margin: 0; padding: 20px; font-weight: 700; }
.header { text-align: center; border-bottom: 3px solid #16a34a; padding-bottom: 12px; margin-bottom: 18px; }
.header .title { text-align: center; }
.header .title h1 { margin: 0; font-size: 24px; color: #16a34a; letter-spacing: 3px; font-weight: 900; }
.header .title p { margin: 3px 0; font-size: 12px; color: #333; font-weight: 700; }
.info { margin-bottom: 15px; }
.info table { width: 100%; font-size: 12px; }
.info td { padding: 4px 5px; font-weight: 700; }
table.items { width: 100%; border-collapse: collapse; font-size: 11px; }
table.items th { background: #16a34a; color: #000; padding: 8px 6px; text-align: center; font-weight: 900; font-size: 12px; }
table.items td { padding: 6px 6px; border: 2px solid #000; font-weight: 700; }
table.items tr:nth-child(even) { background: #f0fdf4; }
.signatures { margin-top: 50px; display: flex; justify-content: space-between; text-align: center; }
.signatures .sig-block { width: 30%; }
.signatures .sig-block p.label { font-size: 12px; font-weight: 900; margin: 0 0 8px 0; text-transform: uppercase; }
.signatures .sig-block .line { margin-top: 35px; border-top: 2px solid #000; padding-top: 8px; font-size: 13px; font-weight: 900; letter-spacing: 1px; }
.total-row { font-weight: bold; background: #e8f5e9 !important; }
@media print { body { padding: 10px; } @page { size: 21cm 18cm; margin: 10mm; } }
</style>
</head>
<body>
<div class="header">
    <div class="title">
        <h1>SURAT JALAN</h1>
        <p>SENTOSA PRINTING & DIGITAL SOLUTIONS</p>
        <p>Jl. Laksana No.75/73 A Medan | Telp: (061) 7359007</p>
    </div>
</div>
<div class="info">
    <table>
        <tr><td style="width:100px"><strong>No Invoice</strong></td><td>: ${item.no_invoice || '-'}</td></tr>
        <tr><td><strong>Tanggal Produksi</strong></td><td>: ${item.tanggal ? new Date(item.tanggal).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }) : '-'}</td></tr>
        <tr><td><strong>Tanggal Antar</strong></td><td>: ${tgl}</td></tr>
        <tr><td><strong>Customer</strong></td><td>: ${item.customer?.nama || '-'}</td></tr>
    </table>
</div>
<table class="items">
    <tr>
        <th style="width:30px">No</th>
        <th>Bahan produksi</th>
        <th style="width:50px">Qty</th>
        <th>Keterangan</th>
    </tr>
    <tr>
        <td style="text-align:center">1</td>
        <td>${item.bahan?.bahan || '-'}</td>
        <td style="text-align:center">${item.qty}</td>
        <td>${item.keterangan || '-'}</td>
    </tr>
</table>
<div class="signatures">
    <div class="sig-block">
        <p class="label">PENERIMA</p>
        <br />
        <div class="line">${namaCustomer || '( _____________________ )'}</div>
    </div>
    <div class="sig-block">
        <p class="label">PENGIRIM</p>
        <br />
        <div class="line">${namaKurir || '( _____________________ )'}</div>
    </div>
    <div class="sig-block">
        <p class="label">MENGETAHUI</p>
        <br />
        <div class="line">SENTOSA</div>
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
            total_all: totalAll,
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
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl font-bold">Halaman Logistik</h1>
                            <p className="text-sm text-base-content/60 mt-1">
                                {totalSemuaItem} order menunggu pengiriman
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
                                <p className="text-base-content/50">Tidak ada order logistik</p>
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
                                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                    <i className="fas fa-truck text-secondary"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Konfirmasi Logistik</h3>
                                    <p className="text-xs text-base-content/50">{selected.kode_spk}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
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
                                        <div>
                                            <span className="text-xs text-base-content/50">Pengantaran</span>
                                            <p className="font-medium">{selected.metode_pengantaran}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-base-content/50">Tgl Kirim</span>
                                            <p className="font-medium">{selected.tgl_kirim}</p>
                                        </div>
                                    </div>
                                </div>

                                {isDisplay && (
                                    <div className="border border-base-300 rounded-xl p-4 space-y-3">
                                        <div className="flex items-center gap-2 text-sm font-semibold">
                                            <i className="fas fa-boxes text-secondary text-xs"></i>
                                            Pemakaian Bahan
                                        </div>

                                        <label className="form-control">
                                            <span className="label-text text-xs">Kode Bahan Pakai</span>
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
                                                <span className="text-xs font-medium">Pilih Kode Label ({qtyCount} item)</span>
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
                                                            <option value="">Pilih</option>
                                                            {currentOpts.map((s) => (
                                                                <option key={s.id} value={s.id}>
                                                                    {s.kode_label || '-'}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="border border-base-300 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center gap-2 text-sm font-semibold">
                                        <i className="fas fa-shipping-fast text-secondary text-xs"></i>
                                        Pengiriman
                                    </div>

                                    <label className="form-control">
                                        <span className="label-text text-xs">Kurir Pengirim</span>
                                        <select
                                            value={selectedKurir}
                                            onChange={(e) => setSelectedKurir(e.target.value)}
                                            className="select select-bordered select-sm text-xs"
                                        >
                                            <option value="">-- Pilih Kurir --</option>
                                            {kurir.map((k) => (
                                                <option key={k.id} value={k.id}>{k.nama}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            </div>

                            <div className="modal-action mt-5 gap-2">
                                <div className="flex gap-2 w-full">
                                    <button className="btn btn-ghost" onClick={closeModal}>Batal</button>
                                    <button className="btn btn-secondary flex-1" onClick={() => requestPassword('cetak_surat')}>
                                        <i className="fas fa-truck"></i> Cetak Surat Jalan
                                    </button>
                                    <button className="btn btn-primary flex-1" onClick={() => requestPassword('selesai')}>
                                        <i className="fas fa-check"></i> Selesai
                                    </button>
                                </div>
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
