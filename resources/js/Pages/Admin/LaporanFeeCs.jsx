import AdminLayout from '@/Layouts/AdminLayout'
import { router, Link, usePage } from '@inertiajs/react'
import React, { useState } from 'react'

export default function LaporanFeeCs({
    transaksis, penggunas, pengguna_id,
    bulan, tahun, tgl_awal, tgl_akhir, totals
}) {
    const { auth } = usePage().props
    const [selected, setSelected] = useState([])
    const [filterPegawai, setFilterPegawai] = useState(pengguna_id || '')
    const [filterBulan, setFilterBulan] = useState(bulan || '')
    const [filterTahun, setFilterTahun] = useState(tahun || '')
    const [filterTglAwal, setFilterTglAwal] = useState(tgl_awal || '')
    const [filterTglAkhir, setFilterTglAkhir] = useState(tgl_akhir || '')
    const [processing, setProcessing] = useState(false)

    const isCs = auth?.user?.role === 'Customer Service'

    function exportPDF() {
        const params = new URLSearchParams()
        if (filterPegawai) params.set('pengguna_id', filterPegawai)
        if (filterBulan) params.set('bulan', filterBulan)
        if (filterTahun) params.set('tahun', filterTahun)
        if (filterTglAwal) params.set('tgl_awal', filterTglAwal)
        if (filterTglAkhir) params.set('tgl_akhir', filterTglAkhir)
        window.open(`/laporan-fee-cs/pdf?${params.toString()}`, '_blank')
    }

    const applyFilter = () => {
        router.get(route('laporan-fee-cs'), {
            pengguna_id: filterPegawai,
            bulan: filterBulan,
            tahun: filterTahun,
            tgl_awal: filterTglAwal,
            tgl_akhir: filterTglAkhir,
        }, { preserveState: true })
    }

    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        )
    }

    const toggleSelectAll = () => {
        const ids = transaksis.data.map((t) => t.id)
        setSelected((prev) =>
            prev.length === ids.length ? [] : ids
        )
    }

    const handleAmbilFee = (ids) => {
        if (processing) return
        setProcessing(true)
        router.put(route('laporan-fee-cs.ambil'), { ids }, {
            preserveScroll: true,
            onSuccess: () => {
                setSelected([])
                setProcessing(false)
            },
            onError: () => setProcessing(false),
            onFinish: () => setProcessing(false),
        })
    }

    const handleAmbilSemua = () => {
        if (processing) return
        setProcessing(true)
        router.put(route('laporan-fee-cs.ambil'), { pengguna_id: filterPegawai || auth?.user?.id }, {
            preserveScroll: true,
            onSuccess: () => setProcessing(false),
            onError: () => setProcessing(false),
            onFinish: () => setProcessing(false),
        })
    }

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 gap-4">
                <div className="card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title">Laporan Fee CS</h2>

                        {totals && (
                            <div className="stats shadow mb-4">
                                <div className="stat">
                                    <div className="stat-title">Total Fee CS</div>
                                    <div className="stat-value text-primary">
                                        Rp {Number(totals.total_semua || 0).toLocaleString('id-ID')}
                                    </div>
                                </div>
                                <div className="stat">
                                    <div className="stat-title">Belum Diambil</div>
                                    <div className="stat-value text-warning">
                                        Rp {Number(totals.total_belum_diambil || 0).toLocaleString('id-ID')}
                                    </div>
                                </div>
                                <div className="stat">
                                    <div className="stat-title">Sudah Diambil</div>
                                    <div className="stat-value text-success">
                                        Rp {Number(totals.total_diambil || 0).toLocaleString('id-ID')}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-4 items-end">
                            {!isCs && (
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Pegawai</span></label>
                                    <select className="select select-bordered select-sm text-sm" value={filterPegawai} onChange={(e) => setFilterPegawai(e.target.value)}>
                                        <option value="">Semua Pegawai</option>
                                        {penggunas?.map((p) => (
                                            <option key={p.id} value={p.id}>{p.username}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div className="form-control">
                                <label className="label"><span className="label-text">Bulan</span></label>
                                <select className="select select-bordered select-sm text-sm" value={filterBulan} onChange={(e) => setFilterBulan(e.target.value)}>
                                    {[
                                        { value: '1', label: 'Januari' }, { value: '2', label: 'Februari' },
                                        { value: '3', label: 'Maret' }, { value: '4', label: 'April' },
                                        { value: '5', label: 'Mei' }, { value: '6', label: 'Juni' },
                                        { value: '7', label: 'Juli' }, { value: '8', label: 'Agustus' },
                                        { value: '9', label: 'September' }, { value: '10', label: 'Oktober' },
                                        { value: '11', label: 'November' }, { value: '12', label: 'Desember' },
                                    ].map((b) => (
                                        <option key={b.value} value={b.value}>{b.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Tahun</span></label>
                                <input type="number" className="input input-bordered input-sm w-24 text-sm" value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Tgl Awal</span></label>
                                <input type="date" className="input input-bordered input-sm" value={filterTglAwal} onChange={(e) => setFilterTglAwal(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Tgl Akhir</span></label>
                                <input type="date" className="input input-bordered input-sm" value={filterTglAkhir} onChange={(e) => setFilterTglAkhir(e.target.value)} />
                            </div>
                            <button className="btn btn-primary btn-sm" onClick={applyFilter}>Filter</button>
                            <button className="btn btn-accent btn-sm" onClick={exportPDF}><i className='fas fa-file'></i>Export PDF</button>
                            <a href="/laporan-fee-cs" className='btn btn-sm btn-warning'><i className='fas fa-rotate'> </i>Refresh</a>
                        </div>

                        {!isCs && (selected.length > 0 || transaksis.data.some(t => t.status === 'belum_diambil')) && (
                            <div className="flex gap-2 mb-2">
                                {selected.length > 0 && (
                                    <button className="btn btn-success btn-sm" onClick={() => handleAmbilFee(selected)} disabled={processing}>
                                        {processing ? 'Memproses...' : `Ambil Fee (${selected.length})`}
                                    </button>
                                )}
                                {transaksis.data.some(t => t.status === 'belum_diambil') && (
                                    <button className="btn btn-warning btn-sm" onClick={handleAmbilSemua} disabled={processing}>
                                        Ambil Semua Fee
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        {!isCs && (
                                            <th>
                                                <input type="checkbox" className="checkbox checkbox-sm"
                                                    checked={transaksis.data.length > 0 && selected.length === transaksis.data.length}
                                                    onChange={toggleSelectAll} />
                                            </th>
                                        )}
                                        <th>No</th>
                                        <th>Tanggal</th>
                                        <th>No Invoice</th>
                                        <th>Customer</th>
                                        <th>Kategori Desain</th>
                                        <th>Qty</th>
                                        <th>Fee CS</th>
                                        <th>CS</th>
                                        <th>Status</th>
                                        <th>Diambil At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transaksis.data.map((item, i) => (
                                        <tr key={item.id} className={item.status === 'belum_diambil' ? 'bg-yellow-50' : 'bg-green-50'}>
                                            {!isCs && (
                                                <td>
                                                    {item.status === 'belum_diambil' && (
                                                        <input type="checkbox" className="checkbox checkbox-sm"
                                                            checked={selected.includes(item.id)}
                                                            onChange={() => toggleSelect(item.id)} />
                                                    )}
                                                </td>
                                            )}
                                            <td>{transaksis.from + i}</td>
                                            <td>{item.tanggal}</td>
                                            <td>{item.desain?.no_invoice || '-'}</td>
                                            <td>{item.desain?.customer?.nama || '-'}</td>
                                            <td>{item.kategori_desain?.kategori || '-'}</td>
                                            <td>{item.desain?.qty || '-'}</td>
                                            <td className="font-semibold">Rp {Number(item.fee_cs).toLocaleString('id-ID')}</td>
                                            <td>{item.pengguna?.username || '-'}</td>
                                            <td>
                                                <span className={`text-sm ${item.status === 'diambil' ? 'text-success' : 'text-warning'}`}>
                                                    {item.status === 'diambil' ? 'Diambil' : 'Belum diambil'}
                                                </span>
                                            </td>
                                            <td>{item.diambil_at || '-'}</td>
                                        </tr>
                                    ))}
                                    {transaksis.data.length === 0 && (
                                        <tr>
                                            <td colSpan={isCs ? 9 : 11} className="text-center text-gray-400 py-4">Tidak ada data</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {transaksis.links && (
                            <div className="flex justify-center mt-4 gap-1">
                                {transaksis.links.map((link, i) => (
                                    <Link key={i} href={link.url || '#'} className={`btn btn-sm ${link.active ? 'btn-primary' : 'btn-ghost'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }} preserveState />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
