import AdminLayout from '@/Layouts/AdminLayout'
import { router } from '@inertiajs/react'
import React, { useMemo, useRef, useState, useCallback } from 'react'
import { buildFinishingReceiptHtml } from './StrukFinishingTemplate'
import KonfirmasiPassword from '@/Components/KonfirmasiPassword'

const cleanNumber = (v) => String(v || '').replace(/\D/g, '')
const formatRp = (v) => {
    const n = Number(cleanNumber(v))
    return n ? `Rp ${n.toLocaleString('id-ID')}` : '-'
}

function resolveHargaSatuan(item) {
    const bahan = item.bahan
    const customer = item.customer
    if (!bahan || !customer) return 0

    const hargaBahanList = bahan.harga_bahan || bahan.hargaBahan || []
    const sisi = (item.sisi || '').trim()
    const qty = parseFloat(item.qty) || 0
    const pakaiSisi = hargaBahanList.some((h) => (h.sisi || '').trim() !== '')

    let matched = null
    if (['QTY KHUSUS', 'QTY2'].includes(bahan.cara_perhitungan)) {
        matched = hargaBahanList
            .filter((h) => {
                const qMin = parseFloat(h.qty_min) || 0
                const qMaxRaw = (h.qty_max || '').toString().trim()
                const qMax = qMaxRaw === '' ? Infinity : parseFloat(qMaxRaw)
                const s = (h.sisi || '').trim()
                if (qMaxRaw === '' && qty !== qMin) return false
                if (qty < qMin || qty > qMax) return false
                if (pakaiSisi) return s.toLowerCase() === sisi.toLowerCase()
                return s === ''
            })
            .sort((a, b) => (parseFloat(b.qty_min) || 0) - (parseFloat(a.qty_min) || 0))[0]
    } else {
        matched = hargaBahanList
            .filter((h) => {
                const s = (h.sisi || '').trim()
                if (pakaiSisi) return s.toLowerCase() === sisi.toLowerCase()
                return s === ''
            })
            .sort((a, b) => (parseFloat(a.qty_min) || 0) - (parseFloat(b.qty_min) || 0))[0]
    }

    if (!matched) return 0

    const custId = String(customer.id)
    const hkList = matched.harga_khusus_customer || matched.hargaKhususCustomer || []
    const hk = hkList.find((r) => String(r.customer_id) === custId || String(r.id_customer) === custId)
    if (hk && hk.harga) return parseFloat(cleanNumber(hk.harga)) || 0

    const isKhusus = (customer.kategori || '').toLowerCase() === 'khusus'
    if (isKhusus && matched.harga_khusus) return parseFloat(cleanNumber(matched.harga_khusus)) || 0

    return parseFloat(cleanNumber(matched.harga_umum)) || 0
}

export default function Produksi({ produksi, bahanpakaiList, itemstokbahans, search: initialSearch, tglAwal: initialTglAwal, tglAkhir: initialTglAkhir }) {
    const [selected, setSelected] = useState(null)
    const [search, setSearch] = useState(initialSearch || '')
    const [tgl_awal, setTglAwal] = useState(initialTglAwal || '')
    const [tgl_akhir, setTglAkhir] = useState(initialTglAkhir || '')
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

    const isIndoor2 = selected?.bahan?.kategori_cetak === 'INDOOR 2'

    const isSisaKurang = useMemo(() => {
        if (isIndoor2) return false
        if (selected?.bahan?.satuan == 'LEMBAR') {
            if (!selectedItemStokIds.length) return true
            const totalAvailable = selectedItemStokIds.reduce((sum, id) => {
                const stok = itemstokbahans.find(s => s.id === id)
                return sum + (parseFloat(stok?.total) || 0)
            }, 0)
            return totalAvailable < totalAll
        }
        if (!stokTerpilih) return false
        return parseFloat(stokTerpilih?.total) < totalAll
    }, [stokTerpilih, totalAll, selectedItemStokIds, selected, itemstokbahans, isIndoor2])

    const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || ''

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

    const prosesAfterPrint = (item, payload) => {
        const script = `
            <script>
                var _printed = false;
                window.addEventListener('afterprint', function() {
                    if (_printed) return;
                    _printed = true;
                    fetch('/produksi/produksi/${item.id}/proses', {
                        method: 'PUT',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'X-XSRF-TOKEN': decodeURIComponent('${encodeURIComponent(xsrfToken)}')
                        },
                        body: JSON.stringify(${JSON.stringify(payload)})
                    }).then(function() {
                        if (window.opener && !window.opener.closed) {
                            window.opener.location.reload();
                        }
                        window.close();
                    });
                });
            </script>
        `
        const w = window.open('', '_blank', 'width=420,height=640')
        if (!w) return
        w.document.open()
        w.document.write(buildFinishingReceiptHtml(item, selectedLabels).replace('</head>', script + '</head>'))
        w.document.close()
        w.addEventListener('load', () => {
            w.focus()
            setTimeout(() => w.print(), 300)
        })
    }

    const kategoriList = ['INDOOR', 'INDOOR 2', 'OUTDOOR', 'OUTDOOR2', 'DISPLAY', 'OFFSET', 'DLL']
    const jenisBahanList = ['DLL', 'DYE', 'UV', 'OFFSET', 'TONER', 'ECOSOLVENT', 'SOLVENT']

    const kategoriColors = {
        'INDOOR': 'bg-blue-500',
        'INDOOR 2': 'bg-blue-400',
        'OUTDOOR': 'bg-orange-500',
        'OUTDOOR2': 'bg-orange-400',
        'DISPLAY': 'bg-purple-500',
        'OFFSET': 'bg-emerald-500',
        'DLL': 'bg-gray-500',
    }

    const shouldShowSection = (kategori) =>
        !filterKategori || filterKategori === kategori

    const handleSearch = (e) => {
        e.preventDefault()
        router.get('/produksi/produksi', { search, tgl_awal, tgl_akhir }, { preserveState: true, replace: true })
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
        const item = selected
        const payload = {
            sisa_putih_panjang: sisaPutihPanjang,
            sisa_putih_lebar: sisaPutihLebar,
            sisa_putih_total: String(Number(totalAll.toFixed(6))),
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
        closeModal()
        prosesAfterPrint(item, payload)
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
            case 'prosesFinishing':
                router.put(`/produksi/produksi/${selected.id}/proses-finishing`, {}, {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Berhasil diproses ke finishing', timer: 1500, showConfirmButton: false })
                        closeModal()
                    },
                })
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
                            <h1 className="text-2xl font-bold">Halaman Produksi</h1>
                            <p className="text-sm text-base-content/60 mt-1">
                                {totalSemuaItem} order menunggu diproses
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
                                <p className="text-base-content/50">Tidak ada order produksi</p>
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
                                                                    <th className="py-2 text-center">Luas</th>
                                                                    <th className="py-2 text-center">QTY</th>
                                                                    <th className="py-2 text-center">Sisi</th>
                                                                    <th className="py-2 text-center">Pengantaran</th>
                                                                    <th className="py-2 text-center">Tgl Kirim</th>
                                                                    <th className="py-2 text-right">Harga Satuan</th>
                                                                    <th className="py-2 text-right">Total Harga</th>
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
                                                                        <td className="text-[11px] text-center tabular-nums">
                                                                            {(item.satuan || '').toLowerCase() === 'cm'
                                                                                ? ((parseFloat(item.tinggi) / 100) * (parseFloat(item.lebar) / 100)).toFixed(2)
                                                                                : (parseFloat(item.tinggi) * parseFloat(item.lebar)).toFixed(2)
                                                                            } m²
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
                                                                        <td className="text-[11px] text-right tabular-nums font-medium">{formatRp(resolveHargaSatuan(item))}</td>
                                                                        <td className="text-[11px] text-right tabular-nums font-bold">{formatRp(resolveHargaSatuan(item) * (parseFloat(item.qty) || 1))}</td>
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
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <i className="fas fa-cogs text-primary"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Proses Produksi</h3>
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
                                    </div>
                                </div>

                                <div className="border border-base-300 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center gap-2 text-sm font-semibold">
                                        <i className="fas fa-ruler-combined text-primary text-xs"></i>
                                        Dimensi & Perhitungan
                                    </div>

                                    {selected.bahan?.satuan == 'LEMBAR' ? (
                                        <div className="bg-base-200/50 rounded-lg p-3 flex justify-between items-center">
                                            <span className="text-sm text-base-content/70">Total Qty</span>
                                            <span className="font-bold text-lg">{selected.qty} <span className="text-sm font-normal">LEMBAR</span></span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="bg-base-200/50 rounded-lg p-3 flex justify-between items-center">
                                                <span className="text-sm text-base-content/70">Luas ({selected.satuan})</span>
                                                <span className="font-semibold text-sm">
                                                    {sisaPutihPanjang} × {sisaPutihLebar}{selected.qty > 1 ? ` × ${selected.qty} pcs` : ''} = {totalLuasM2.toFixed(2)} m²
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
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

                                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex justify-between items-center">
                                                <span className="text-sm font-medium">Total Luas</span>
                                                <span className="font-bold text-lg text-primary">{totalAll.toFixed(2)} m²</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="border border-base-300 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center gap-2 text-sm font-semibold">
                                        <i className="fas fa-boxes text-primary text-xs"></i>
                                        Pemakaian Bahan
                                    </div>

                                    <label className="form-control">
                                        <span className="label-text text-xs">Bahan Pakai</span>
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
                                                        <label key={s.id} className="flex items-center gap-2 p-1.5 bg-base-200 rounded cursor-pointer hover:bg-base-300 transition-colors">
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
                                                                className="checkbox checkbox-xs checkbox-primary"
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

                                    {selected?.bahan?.satuan == 'LEMBAR' && selectedItemStokIds.length > 0 ? (
                                        <div className="bg-base-200/50 rounded-lg p-3 space-y-1.5">
                                            <span className="text-xs text-base-content/50 font-medium">Label terpilih:</span>
                                            {selectedItemStokIds.map(id => {
                                                const s = itemstokbahans.find(st => st.id === id)
                                                if (!s) return null
                                                return (
                                                    <div key={s.id} className="flex justify-between text-xs bg-base-100 rounded px-2 py-1.5">
                                                        <span>{s.kode_label || `Stok #${s.id}`}</span>
                                                        <span className="font-semibold">Sisa: {s.total} {s.satuan}</span>
                                                    </div>
                                                )
                                            })}
                                            <div className="flex justify-between text-xs font-bold border-t border-base-300 pt-2 mt-1">
                                                <span>Total tersedia</span>
                                                <span className="text-primary">{selectedItemStokIds.reduce((sum, id) => {
                                                    const s = itemstokbahans.find(st => st.id === id)
                                                    return sum + (parseFloat(s?.total) || 0)
                                                }, 0)} LEMBAR</span>
                                            </div>
                                        </div>
                                    ) : stokTerpilih && (
                                        <div className="bg-base-200/50 rounded-lg p-3 grid grid-cols-2 gap-2 text-xs">
                                            {stokTerpilih.satuan == 'LEMBAR' ? (
                                                <div>
                                                    <span className="text-base-content/50">Sisa</span>
                                                    <p className="font-semibold">{stokTerpilih.total} {stokTerpilih.satuan}</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <div>
                                                        <span className="text-base-content/50">Panjang</span>
                                                        <p className="font-semibold">{stokTerpilih.panjang}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-base-content/50">Lebar</span>
                                                        <p className="font-semibold">{stokTerpilih.lebar}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-base-content/50">Luas awal</span>
                                                        <p className="font-semibold">{stokTerpilih.lebar * stokTerpilih.panjang} {stokTerpilih.satuan}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-base-content/50">Sisa</span>
                                                        <p className="font-semibold">{stokTerpilih.total} {stokTerpilih.satuan}</p>
                                                    </div>
                                                </>
                                            )}
                                            <div className="col-span-2">
                                                <span className="text-base-content/50">Keterangan</span>
                                                <p className="font-semibold">{stokTerpilih.keterangan || '-'}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="alert alert-info text-xs py-2">
                                    <i className="fas fa-info-circle"></i>
                                    Setelah diproses, struk akan tercetak dan data berpindah ke halaman Finishing.
                                </div>
                            </div>

                            <div className="modal-action mt-5 gap-2">
                                {isSisaKurang && (
                                    <div className="alert alert-warning text-xs w-full py-2 mb-1">
                                        <i className="fas fa-exclamation-triangle"></i>
                                        {selected?.bahan?.satuan == 'LEMBAR'
                                            ? `Total stok terpilih tidak mencukupi untuk ${totalAll} LEMBAR`
                                            : `Sisa (${parseFloat(stokTerpilih?.total || 0).toFixed(2)}) tidak mencukupi untuk total (${totalAll.toFixed(2)})`
                                        }
                                    </div>
                                )}
                                <div className="flex gap-2 w-full">
                                    <button className="btn btn-outline flex-1" disabled={isSisaKurang} onClick={() => requestPassword('review')}>
                                        <i className="fas fa-eye"></i> Review Struk
                                    </button>
                                    <button className="btn btn-warning flex-1" onClick={() => requestPassword('prosesFinishing')}>
                                        <i className="fas fa-arrow-right"></i> Proses ke Finishing
                                    </button>
                                    <button className="btn btn-primary flex-1" disabled={isSisaKurang} onClick={() => requestPassword('proses')}>
                                        <i className="fas fa-check"></i> Proses & Cetak
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
