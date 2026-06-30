import AdminLayout from '@/Layouts/AdminLayout'
import { Link, router, usePage } from '@inertiajs/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'

export default function PengambilanStok({ bahanpakaiList, itemstokbahans, riwayat }) {
    const { auth } = usePage().props
    const [kodeBahanPakai, setKodeBahanPakai] = useState('')
    const [selectedItemStokIds, setSelectedItemStokIds] = useState([])
    const bahanPakaiRef = useRef(null)

    useEffect(() => {
        const $el = window.jQuery(bahanPakaiRef.current)
        $el.select2({
            placeholder: 'Pilih atau cari Bahan Pakai',
            allowClear: true,
            width: '100%',
        })
        $el.on('select2:select', function (e) {
            setKodeBahanPakai(e.params.data.id)
            setSelectedItemStokIds([])
        })
        $el.on('select2:clear', function () {
            setKodeBahanPakai('')
            setSelectedItemStokIds([])
        })
        return () => { if ($el.data('select2')) $el.select2('destroy') }
    }, [])

    useEffect(() => {
        window.jQuery(bahanPakaiRef.current).val(kodeBahanPakai).trigger('change.select2')
    }, [kodeBahanPakai])
    const [qtyDiambil, setQtyDiambil] = useState('')
    const [satuanUkur, setSatuanUkur] = useState('M')
    const [panjang, setPanjang] = useState('')
    const [lebar, setLebar] = useState('')
    const [keterangan, setKeterangan] = useState('')
    const [loading, setLoading] = useState(false)

    const itemStokOptions = useMemo(() => {
        if (!kodeBahanPakai || !itemstokbahans) return []
        return itemstokbahans.filter((s) => s.kode_bahan_pakai === kodeBahanPakai && parseFloat(s.total) > 0 && parseInt(s.qty) > 0)
    }, [kodeBahanPakai, itemstokbahans])

    const selectedSatuan = useMemo(() => {
        if (!selectedItemStokIds.length || !itemstokbahans) return null
        const first = itemstokbahans.find(s => s.id === selectedItemStokIds[0])
        return first?.satuan || 'PCS'
    }, [selectedItemStokIds, itemstokbahans])

    const totalTersedia = useMemo(() => {
        return selectedItemStokIds.reduce((sum, id) => {
            const s = itemstokbahans.find(st => st.id === id)
            return sum + (parseFloat(s?.total) || 0)
        }, 0)
    }, [selectedItemStokIds, itemstokbahans])

    const totalQty = useMemo(() => {
        if (selectedSatuan === 'M2') {
            const p = parseFloat(panjang) || 0
            const l = parseFloat(lebar) || 0
            const luas = satuanUkur === 'CM' ? (p / 100) * (l / 100) : p * l
            return luas
        }
        return parseFloat(qtyDiambil) || 0
    }, [selectedSatuan, panjang, lebar, satuanUkur, qtyDiambil])

    const isQtyKurang = totalQty > totalTersedia

    const toggleStok = (id) => {
        setSelectedItemStokIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const resetForm = () => {
        setKodeBahanPakai('')
        setSelectedItemStokIds([])
        setQtyDiambil('')
        setSatuanUkur('M')
        setPanjang('')
        setLebar('')
        setKeterangan('')
    }

    const handleAmbil = () => {
        if (!kodeBahanPakai || !selectedItemStokIds.length || !totalQty || isQtyKurang) return
        setLoading(true)
        router.post('/produksi/pengambilan-stok/proses', {
            kode_bahan_pakai: kodeBahanPakai,
            item_stok_ids: selectedItemStokIds,
            total_qty: totalQty.toFixed(2),
            keterangan,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                resetForm()
                setLoading(false)
            },
            onError: () => setLoading(false),
            onFinish: () => setLoading(false),
        })
    }

    const renderQtyInput = () => {
        if (selectedSatuan === 'M2') {
            return (
                <div className="space-y-3">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Satuan Ukur</span>
                        </label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setSatuanUkur('M')}
                                className={`btn btn-sm flex-1 ${satuanUkur === 'M' ? 'btn-primary' : 'btn-outline'}`}
                            >METER</button>
                            <button
                                type="button"
                                onClick={() => setSatuanUkur('CM')}
                                className={`btn btn-sm flex-1 ${satuanUkur === 'CM' ? 'btn-primary' : 'btn-outline'}`}
                            >CM</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Panjang ({satuanUkur === 'CM' ? 'cm' : 'm'})</span>
                            </label>
                            <input
                                type="number"
                                value={panjang}
                                onChange={(e) => setPanjang(e.target.value)}
                                className="input input-bordered"
                                placeholder="0"
                                min="0"
                                step="any"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Lebar ({satuanUkur === 'CM' ? 'cm' : 'm'})</span>
                            </label>
                            <input
                                type="number"
                                value={lebar}
                                onChange={(e) => setLebar(e.target.value)}
                                className="input input-bordered"
                                placeholder="0"
                                min="0"
                                step="any"
                            />
                        </div>
                    </div>
                    {totalQty > 0 && (
                        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                            <div className="flex justify-between text-sm">
                                <span>Total Luas:</span>
                                <span className="font-bold">{totalQty.toFixed(2)} m²</span>
                            </div>
                        </div>
                    )}
                </div>
            )
        }

        if (selectedSatuan === 'LEMBAR') {
            return (
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Jumlah Kertas</span>
                    </label>
                    <input
                        type="number"
                        value={qtyDiambil}
                        onChange={(e) => setQtyDiambil(e.target.value)}
                        className="input input-bordered"
                        placeholder="0"
                        min="0"
                    />
                </div>
            )
        }

        return (
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-medium">QTY</span>
                </label>
                <input
                    type="number"
                    value={qtyDiambil}
                    onChange={(e) => setQtyDiambil(e.target.value)}
                    className="input input-bordered"
                    placeholder="0"
                    min="0"
                />
            </div>
        )
    }

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Halaman Pengambilan Stok</h2>

                        <div className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Kode Bahan Pakai</span>
                                </label>
                                <select ref={bahanPakaiRef} className="select select-bordered">
                                    <option value=""></option>
                                    {bahanpakaiList?.map((b) => (
                                        <option key={b.kode_bahan} value={b.kode_bahan}>
                                            {b.kode_bahan} - {b.keterangan}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {kodeBahanPakai && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Pilih Label</span>
                                    </label>
                                    {itemStokOptions.length === 0 ? (
                                        <div className="p-4 text-center text-base-content/50 text-sm bg-base-200 rounded-lg">
                                            Tidak ada stok tersedia untuk bahan ini
                                        </div>
                                    ) : (
                                        <div className="space-y-1 max-h-60 overflow-y-auto border border-base-300 rounded-lg p-2">
                                            {itemStokOptions.map((s) => (
                                                <label key={s.id} className="flex items-center gap-2 p-2 bg-base-200 rounded cursor-pointer hover:bg-base-300 transition-colors">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItemStokIds.includes(s.id)}
                                                        onChange={() => toggleStok(s.id)}
                                                        className="checkbox checkbox-sm"
                                                    />
                                                    <div className="flex-1 flex justify-between items-center text-sm">
                                                        <span className="font-medium">{s.kode_label || `Stok #${s.id}`}</span>
                                                        <span className="text-base-content/70">
                                                            Sisa: <strong>{s.total}</strong> {s.satuan || 'pcs'}
                                                            {s.keterangan ? ` - ${s.keterangan}` : ''}
                                                        </span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {selectedItemStokIds.length > 0 && (
                                        <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
                                            <div className="flex justify-between text-sm">
                                                <span>Total tersedia:</span>
                                                <span className="font-bold">{totalTersedia} {selectedSatuan || ''}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {selectedItemStokIds.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        {renderQtyInput()}
                                        {isQtyKurang && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">Jumlah melebihi total stok tersedia ({totalTersedia} {selectedSatuan})</span>
                                            </label>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Pengambil</span>
                                        </label>
                                        <div className="input input-bordered flex items-center gap-2">
                                            <i className="fas fa-user text-base-content/50"></i>
                                            <span className="font-medium">{auth?.user?.username || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedItemStokIds.length > 0 && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Keterangan</span>
                                    </label>
                                    <textarea
                                        value={keterangan}
                                        onChange={(e) => setKeterangan(e.target.value)}
                                        className="textarea textarea-bordered"
                                        placeholder="Catatan pengambilan stok..."
                                        rows="3"
                                    />
                                </div>
                            )}

                            <button
                                className="btn btn-primary w-full"
                                onClick={handleAmbil}
                                disabled={!kodeBahanPakai || !selectedItemStokIds.length || !totalQty || isQtyKurang || loading}
                            >
                                {loading ? <><span className="loading loading-spinner"></span> Memproses...</> : <><i className="fas fa-box-open"></i> Ambil Stok</>}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="card-title text-sm">Riwayat Pengambilan</h3>
                            {riwayat?.length > 0 && (
                                <Link href={route('riwayat-pengambilan-stok')} className="btn btn-ghost btn-xs text-primary">
                                    Lihat Semua
                                </Link>
                            )}
                        </div>
                        <div className="space-y-2 max-h-[600px] overflow-y-auto">
                            {riwayat?.length === 0 ? (
                                <p className="text-sm text-base-content/50 text-center py-8">Belum ada riwayat</p>
                            ) : (
                                riwayat?.map((r) => (
                                    <div key={r.id} className="p-3 bg-base-200 rounded-lg text-xs space-y-1">
                                        <div className="flex justify-between">
                                            <span className="font-semibold">{r.kode_bahan_pakai}</span>
                                            <span className="text-error font-bold">-{r.total_qty} {r.bahan_pakai?.satuan || ''}</span>
                                        </div>
                                        {r.item_stok_data?.map((d, i) => (
                                            <div key={i} className="text-base-content/60 pl-2">
                                                {d.kode_label || `Stok #${d.id}`}: {d.qty}
                                            </div>
                                        ))}
                                        <div className="text-base-content/50 flex justify-between pt-1 border-t border-base-300">
                                            <span>{r.user?.username || '-'}</span>
                                            <span>{new Date(r.created_at).toLocaleDateString('id-ID')}</span>
                                        </div>
                                        {r.keterangan && (
                                            <div className="italic text-base-content/60">"{r.keterangan}"</div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
