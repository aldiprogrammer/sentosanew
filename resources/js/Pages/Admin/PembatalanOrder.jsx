import AdminLayout from '@/Layouts/AdminLayout'
import { Link, router } from '@inertiajs/react'
import React, { useState } from 'react'

export default function PembatalanOrder({ desainBatal, produksiBatal, tglAwal, tglAkhir, search }) {
    const [filterTglAwal, setFilterTglAwal] = useState(tglAwal || '')
    const [filterTglAkhir, setFilterTglAkhir] = useState(tglAkhir || '')
    const [filterSearch, setFilterSearch] = useState(search || '')
    const [tab, setTab] = useState('produksi')

    const applyFilter = () => {
        router.get(route('pembatalan-order'), {
            tgl_awal: filterTglAwal,
            tgl_akhir: filterTglAkhir,
            search: filterSearch,
        }, { preserveState: true, replace: true })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') applyFilter()
    }

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 gap-4">
                <div className="card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title">
                            <i className="fas fa-ban text-error"></i> Pembatalan Order
                        </h2>

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
                                <label className="label"><span className="label-text">Cari</span></label>
                                <input type="text" className="input input-bordered input-sm w-48"
                                    placeholder="No Invoice, Customer..."
                                    value={filterSearch} onChange={(e) => setFilterSearch(e.target.value)}
                                    onKeyDown={handleKeyDown} />
                            </div>
                            <button className="btn btn-primary btn-sm mt-6" onClick={applyFilter}>
                                <i className="fas fa-search"></i> Filter
                            </button>
                            <a href="/pembatalan-order" className="btn btn-sm btn-warning mt-6">
                                <i className="fas fa-rotate"></i> Refresh
                            </a>
                        </div>

                        <div role="tablist" className="tabs tabs-boxed mb-4">

                            <button role="tab"
                                className={`tab ${tab === 'produksi' ? 'tab-active' : ''}`}
                                onClick={() => setTab('produksi')}>
                                Batal Order Produksi
                                {produksiBatal?.total > 0 && (
                                    <span className="badge badge-error badge-sm ml-1">{produksiBatal.total}</span>
                                )}
                            </button>
                            <button role="tab"
                                className={`tab ${tab === 'desain' ? 'tab-active' : ''}`}
                                onClick={() => setTab('desain')}>
                                Batal Order Desain
                                {desainBatal?.total > 0 && (
                                    <span className="badge badge-error badge-sm ml-1">{desainBatal.total}</span>
                                )}
                            </button>
                        </div>

                        {tab === 'produksi' && (
                            <div>
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
                                                <th>Alasan Pembatalan</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs">
                                            {!produksiBatal?.data || produksiBatal.data.length === 0 ? (
                                                <tr>
                                                    <td colSpan={9} className="text-center py-8 text-base-content/50">
                                                        Tidak ada data pembatalan produksi
                                                    </td>
                                                </tr>
                                            ) : (
                                                produksiBatal.data.map((item, i) => (
                                                    <tr key={item.id} className="bg-red-50 hover:bg-red-100">
                                                        <td>{produksiBatal.from + i}</td>
                                                        <td>{item.tanggal}</td>
                                                        <td className="font-mono">{item.no_invoice}</td>
                                                        <td className="font-mono">{item.kode_spk}</td>
                                                        <td>{item.customer?.nama}</td>
                                                        <td>{item.bahan?.bahan}</td>
                                                        <td className="text-center">{item.qty}</td>
                                                        <td className="text-right font-semibold">
                                                            Rp {Number(item.total_harga || 0).toLocaleString('id-ID')}
                                                        </td>
                                                        <td>
                                                            <span className="text-error text-xs">
                                                                <i className="fas fa-ban"></i> {item.alasan_pembatalan}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {produksiBatal?.links && (
                                    <div className="flex justify-center mt-4 join">
                                        {produksiBatal.links.map((link, i) => (
                                            <Link key={i} href={link.url || '#'}
                                                className={`btn btn-sm join-item ${link.active ? 'btn-error' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                                preserveState replace
                                                dangerouslySetInnerHTML={{ __html: link.label }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {tab === 'desain' && (
                            <div>
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
                                                <th>Desainer</th>
                                                <th>Alasan Pembatalan</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs">
                                            {!desainBatal?.data || desainBatal.data.length === 0 ? (
                                                <tr>
                                                    <td colSpan={10} className="text-center py-8 text-base-content/50">
                                                        Tidak ada data pembatalan desain
                                                    </td>
                                                </tr>
                                            ) : (
                                                desainBatal.data.map((item, i) => (
                                                    <tr key={item.id} className="bg-red-50 hover:bg-red-100">
                                                        <td>{desainBatal.from + i}</td>
                                                        <td>{item.tanggal}</td>
                                                        <td className="font-mono">{item.no_invoice}</td>
                                                        <td>{item.no_antrian}</td>
                                                        <td>{item.customer?.nama}</td>
                                                        <td>{item.kategoridesain?.kategori}</td>
                                                        <td className="text-center">{item.qty}</td>
                                                        <td className="text-right font-semibold">
                                                            Rp {Number(item.total_harga || 0).toLocaleString('id-ID')}
                                                        </td>
                                                        <td>{item.desainer?.username || '-'}</td>
                                                        <td>
                                                            <span className="text-error text-xs">
                                                                <i className="fas fa-ban"></i> {item.alasan_pembatalan}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {desainBatal?.links && (
                                    <div className="flex justify-center mt-4 join">
                                        {desainBatal.links.map((link, i) => (
                                            <Link key={i} href={link.url || '#'}
                                                className={`btn btn-sm join-item ${link.active ? 'btn-error' : ''} ${!link.url ? 'btn-disabled' : ''}`}
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
