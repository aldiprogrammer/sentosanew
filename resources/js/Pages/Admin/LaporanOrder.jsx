import AdminLayout from '@/Layouts/AdminLayout'
import { Link, router } from '@inertiajs/react'
import React, { useState } from 'react'

export default function LaporanOrder({ desain, produksi, tglAwal, tglAkhir, search, pembayaran }) {
    const [filterTglAwal, setFilterTglAwal] = useState(tglAwal || '')
    const [filterTglAkhir, setFilterTglAkhir] = useState(tglAkhir || '')
    const [filterSearch, setFilterSearch] = useState(search || '')
    const [filterPembayaran, setFilterPembayaran] = useState(pembayaran || '')
    const [tab, setTab] = useState('desain')

    const applyFilter = () => {
        router.get(route('laporan-order'), {
            tgl_awal: filterTglAwal,
            tgl_akhir: filterTglAkhir,
            search: filterSearch,
            pembayaran: filterPembayaran,
        }, { preserveState: true, replace: true })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') applyFilter()
    }

    const exportPDFDesain = () => {
        const params = new URLSearchParams()
        if (filterTglAwal) params.set('tgl_awal', filterTglAwal)
        if (filterTglAkhir) params.set('tgl_akhir', filterTglAkhir)
        if (filterSearch) params.set('search', filterSearch)
        if (filterPembayaran) params.set('pembayaran', filterPembayaran)
        window.open(`/laporan-order/pdf-desain?${params.toString()}`, '_blank')
    }

    const exportPDFProduksi = () => {
        const params = new URLSearchParams()
        if (filterTglAwal) params.set('tgl_awal', filterTglAwal)
        if (filterTglAkhir) params.set('tgl_akhir', filterTglAkhir)
        if (filterSearch) params.set('search', filterSearch)
        if (filterPembayaran) params.set('pembayaran', filterPembayaran)
        window.open(`/laporan-order/pdf-produksi?${params.toString()}`, '_blank')
    }

    const totalDesain = desain.data.reduce((sum, item) => sum + Number(item.total_harga || 0), 0)
    const totalProduksi = produksi.data.reduce((sum, item) => sum + Number(item.total_harga || 0), 0)

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 gap-4">
                <div className="card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title">Laporan Order</h2>

                        <div className="flex flex-wrap gap-2 items-end mb-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Tgl Awal</span></label>
                                <input type="date" className="input input-bordered input-sm"
                                    value={filterTglAwal} onChange={(e) => setFilterTglAwal(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Tgl Akhir</span></label>
                                <input type="date" className="input input-bordered input-sm"
                                    value={filterTglAkhir} onChange={(e) => setFilterTglAkhir(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Cari No Invoice / SPK</span></label>
                                <input type="text" className="input input-bordered input-sm w-48"
                                    placeholder="Ketik No Invoice atau SPK..."
                                    value={filterSearch} onChange={(e) => setFilterSearch(e.target.value)}
                                    onKeyDown={handleKeyDown} />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Pembayaran</span></label>
                                <select className="select select-bordered select-sm text-sm"
                                    value={filterPembayaran} onChange={(e) => setFilterPembayaran(e.target.value)}>
                                    <option value="">Semua</option>
                                    <option value="lunas">Lunas</option>
                                    <option value="utang">Hutang</option>
                                </select>
                            </div>
                            <button className="btn btn-primary btn-sm mt-6" onClick={applyFilter}>
                                <i className="fas fa-search"></i> Filter
                            </button>
                            <a href="/laporan-order" className="btn btn-sm btn-warning mt-6">
                                <i className="fas fa-rotate"></i> Refresh
                            </a>
                        </div>

                        <div role="tablist" className="tabs tabs-boxed mb-4">
                            <button role="tab"
                                className={`tab ${tab === 'desain' ? 'tab-active' : ''}`}
                                onClick={() => setTab('desain')}>
                                Laporan Desain
                            </button>
                            <button role="tab"
                                className={`tab ${tab === 'produksi' ? 'tab-active' : ''}`}
                                onClick={() => setTab('produksi')}>
                                Laporan Produksi
                            </button>
                        </div>

                        {tab === 'desain' && (
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold">
                                        Total: Rp {totalDesain.toLocaleString('id-ID')}
                                    </span>
                                    <button className="btn btn-accent btn-sm" onClick={exportPDFDesain}>
                                        <i className="fas fa-file-pdf"></i> Export PDF Desain
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Tanggal</th>
                                                <th>No Invoice</th>
                                                <th>No Antrian</th>
                                                <th>Customer</th>
                                                <th>Kategori Desain</th>
                                                <th>Qty</th>
                                                <th>Total Harga</th>
                                                <th>Pembayaran</th>
                                                <th>Desainer</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs">
                                            {desain.data.length === 0 ? (
                                                <tr>
                                                    <td colSpan={10} className="text-center py-8 text-base-content/50">Tidak ada data desain</td>
                                                </tr>
                                            ) : (
                                                desain.data.map((item, i) => (
                                                    <tr key={item.id}>
                                                        <td>{desain.from + i}</td>
                                                        <td>{item.tanggal}</td>
                                                        <td className="font-mono">{item.no_invoice || item.kode_spk}</td>
                                                        <td>{item.no_antrian}</td>
                                                        <td>{item.customer?.nama}</td>
                                                        <td>{item.kategoridesain?.kategori}</td>
                                                        <td className="text-center">{item.qty}</td>
                                                        <td className="text-right font-semibold">Rp {Number(item.total_harga || 0).toLocaleString('id-ID')}</td>
                                                        <td>
                                                            {item.pembayaran ? (
                                                                <span className={`badge badge-sm ${item.pembayaran === 'lunas' ? 'badge-success' : 'badge-warning'}`}>
                                                                    {item.pembayaran === 'lunas' ? 'Lunas' : 'Hutang'}
                                                                </span>
                                                            ) : (
                                                                <span className="text-base-content/30">-</span>
                                                            )}
                                                        </td>
                                                        <td>{item.desainer?.username || '-'}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {desain.links && (
                                    <div className="flex justify-center mt-4 join">
                                        {desain.links.map((link, i) => (
                                            <Link key={i} href={link.url || '#'}
                                                className={`btn btn-sm join-item ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                                preserveState replace
                                                dangerouslySetInnerHTML={{ __html: link.label }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {tab === 'produksi' && (
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold">
                                        Total: Rp {totalProduksi.toLocaleString('id-ID')}
                                    </span>
                                    <button className="btn btn-accent btn-sm" onClick={exportPDFProduksi}>
                                        <i className="fas fa-file-pdf"></i> Export PDF Produksi
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Tanggal</th>
                                                <th>No Invoice</th>
                                                <th>Kode SPK</th>
                                                <th>Customer</th>
                                                <th>Bahan</th>
                                                <th>Qty</th>
                                                <th>Total Harga</th>
                                                <th>Pembayaran</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs">
                                            {produksi.data.length === 0 ? (
                                                <tr>
                                                    <td colSpan={10} className="text-center py-8 text-base-content/50">Tidak ada data produksi</td>
                                                </tr>
                                            ) : (
                                                produksi.data.map((item, i) => (
                                                    <tr key={item.id}>
                                                        <td>{produksi.from + i}</td>
                                                        <td>{item.tanggal}</td>
                                                        <td className="font-mono">{item.no_invoice}</td>
                                                        <td className="font-mono">{item.kode_spk}</td>
                                                        <td>{item.customer?.nama}</td>
                                                        <td>{item.bahan?.bahan}</td>
                                                        <td className="text-center">{item.qty}</td>
                                                        <td className="text-right font-semibold">Rp {Number(item.total_harga || 0).toLocaleString('id-ID')}</td>
                                                        <td>
                                                            {item.pembayaran ? (
                                                                <span className={`badge badge-sm ${item.pembayaran === 'lunas' ? 'badge-success' : 'badge-warning'}`}>
                                                                    {item.pembayaran === 'lunas' ? 'Lunas' : 'Hutang'}
                                                                </span>
                                                            ) : (
                                                                <span className="text-base-content/30">-</span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {(() => {
                                                                if (item.status_selesai == 1) return <span className="text-success font-semibold">Selesai</span>
                                                                if (item.status_logistik == 1) return <span className="text-info font-semibold">Logistik</span>
                                                                if (item.status_finishing == 1) return <span className="text-warning font-semibold">Finishing</span>
                                                                if (item.status_produksi == 1) return <span className="text-error font-semibold">Produksi</span>
                                                                return '-'
                                                            })()}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {produksi.links && (
                                    <div className="flex justify-center mt-4 join">
                                        {produksi.links.map((link, i) => (
                                            <Link key={i} href={link.url || '#'}
                                                className={`btn btn-sm join-item ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                                preserveState replace
                                                dangerouslySetInnerHTML={{ __html: link.label }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
