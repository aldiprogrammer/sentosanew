import AdminLayout from '@/Layouts/AdminLayout'
import { Link, router } from '@inertiajs/react'
import React from 'react'

export default function DataOrder({ desain, produksi, tglAwal, tglAkhir, searchDesain, searchProduksi }) {
    const [searchDesainVal, setSearchDesainVal] = React.useState(searchDesain || '')
    const [searchProduksiVal, setSearchProduksiVal] = React.useState(searchProduksi || '')
    const [tgl_awal, setTglAwal] = React.useState(tglAwal || '')
    const [tgl_akhir, setTglAkhir] = React.useState(tglAkhir || '')

    const handleSearch = () => {
        router.get('/data-order', {
            search_desain: searchDesainVal,
            search_produksi: searchProduksiVal,
            tgl_awal,
            tgl_akhir,
        }, { preserveState: true, replace: true })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch()
    }

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                <div className="card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <h2 className="card-title">Data Order</h2>
                        </div>

                        <div className="flex flex-wrap gap-2 items-end mb-6">
                            <label className="form-control w-full max-w-[160px]">
                                <span className="label-text text-xs">Tgl Awal</span>
                                <input type="date" className="input input-bordered input-success input-sm" value={tgl_awal} onChange={(e) => setTglAwal(e.target.value)} />
                            </label>
                            <label className="form-control w-full max-w-[160px]">
                                <span className="label-text text-xs">Tgl Akhir</span>
                                <input type="date" className="input input-bordered input-success input-sm" value={tgl_akhir} onChange={(e) => setTglAkhir(e.target.value)} />
                            </label>
                            <button className="btn btn-success btn-sm" onClick={handleSearch}>
                                <i className="fas fa-search"></i> Cari
                            </button>
                        </div>



                        <div className="divider font-bold text-base-content/70">DATA PRODUKSI</div>

                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="Cari No Invoice, SPK atau Customer..."
                                className="input input-bordered input-success w-full max-w-xs input-sm"
                                value={searchProduksiVal}
                                onChange={(e) => setSearchProduksiVal(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Tgl</th>
                                        <th>No Inv</th>
                                        <th>Kode SPK</th>
                                        <th>Keterangan</th>
                                        <th>Customer</th>
                                        <th>Bahan</th>
                                        <th>Qty</th>
                                        <th>Total Harga</th>
                                        <th>Pembayaran</th>
                                        <th>Tgl Kirim</th>

                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs">
                                    {produksi.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={12} className="text-center py-8 text-base-content/50">Tidak ada data produksi</td>
                                        </tr>
                                    ) : (
                                        produksi.data.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{produksi.from + index}</td>
                                                <td>{item.tanggal}</td>
                                                <td>{item.no_invoice}</td>
                                                <td className="font-mono font-medium">{item.kode_spk}</td>
                                                <td>{item.keterangan}</td>
                                                <td>{item.customer?.nama}</td>
                                                <td>{item.bahan?.bahan}</td>
                                                <td className="tabular-nums text-center">{item.qty}</td>
                                                <td className="tabular-nums">Rp {Number(item.total_harga || 0).toLocaleString('id-ID')}</td>
                                                <td>
                                                    {item.pembayaran ? (
                                                        <span className={`badge badge-sm ${item.pembayaran === 'lunas' ? 'badge-success' : item.pembayaran === 'transfer' ? 'badge-info' : item.pembayaran === 'qris' ? 'badge-secondary' : 'badge-warning'}`}>
                                                            {item.pembayaran === 'lunas' ? 'Lunas' : item.pembayaran === 'transfer' ? 'Transfer' : item.pembayaran === 'qris' ? 'QRIS' : 'Hutang'}
                                                        </span>
                                                    ) : (
                                                        <span className="text-base-content/30">-</span>
                                                    )}
                                                </td>
                                                <td>{item.tgl_kirim}</td>

                                                <td>
                                                    {(() => {
                                                        if (item.status_selesai == 1) return <span className="text-success font-semibold">Selesai</span>
                                                        if (item.status_logistik == 1) return <span className="text-info font-semibold">Proses Logistik</span>
                                                        if (item.status_finishing == 1) return <span className="text-warning font-semibold">Proses Finishing</span>
                                                        if (item.status_produksi == 1) return <span className="text-error font-semibold">Proses Produksi</span>
                                                        return '-'
                                                    })()}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            {produksi.links && (
                                <div className="flex justify-center mt-4 join">
                                    {produksi.links.map((link, i) => (
                                        <Link key={i} href={link.url || '#'}
                                            className={`btn btn-sm join-item ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                            preserveState replace
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="divider font-bold text-base-content/70 mt-5">DATA DESAIN</div>

                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="Cari No Invoice atau Customer..."
                                className="input input-bordered input-success w-full max-w-xs input-sm"
                                value={searchDesainVal}
                                onChange={(e) => setSearchDesainVal(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="overflow-x-auto mb-6">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Tgl</th>
                                        <th>No Antrian</th>
                                        <th>No Inv / SPK</th>
                                        <th>Customer</th>
                                        <th>Desain</th>
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
                                        desain.data.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{desain.from + index}</td>
                                                <td>{item.tanggal}</td>
                                                <td>{item.no_antrian}</td>
                                                <td className="font-mono font-medium">{item.kode_spk || item.no_invoice}</td>
                                                <td>{item.customer?.nama}</td>
                                                <td>{item.kategoridesain?.kategori}</td>
                                                <td className="tabular-nums text-center">{item.qty}</td>
                                                <td className="tabular-nums">Rp {Number(item.total_harga || 0).toLocaleString('id-ID')}</td>
                                                <td>
                                                    {item.pembayaran ? (
                                                        <span className={`badge badge-sm ${item.pembayaran === 'lunas' ? 'badge-success' : item.pembayaran === 'transfer' ? 'badge-info' : item.pembayaran === 'qris' ? 'badge-secondary' : 'badge-warning'}`}>
                                                            {item.pembayaran === 'lunas' ? 'Lunas' : item.pembayaran === 'transfer' ? 'Transfer' : item.pembayaran === 'qris' ? 'QRIS' : 'Hutang'}
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
                            {desain.links && (
                                <div className="flex justify-center mt-4 join">
                                    {desain.links.map((link, i) => (
                                        <Link key={i} href={link.url || '#'}
                                            className={`btn btn-sm join-item ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                            preserveState replace
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
