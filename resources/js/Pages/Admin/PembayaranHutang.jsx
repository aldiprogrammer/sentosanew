import AdminLayout from '@/Layouts/AdminLayout'
import { Link, router } from '@inertiajs/react'
import React, { useState } from 'react'

export default function PembayaranHutang({ pembayaranHutangs, totalPembayaran, filters }) {
  const [tanggalAwal, setTanggalAwal] = useState(filters?.tanggal_awal || '')
  const [tanggalAkhir, setTanggalAkhir] = useState(filters?.tanggal_akhir || '')
  const [search, setSearch] = useState(filters?.search || '')

  function applyFilter() {
    router.get('/pembayaran-hutang', {
      tanggal_awal: tanggalAwal,
      tanggal_akhir: tanggalAkhir,
      search: search,
    }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') applyFilter()
  }

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-4">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <h2 className="card-title">Pembayaran Hutang</h2>

            <div className="flex flex-wrap gap-3 items-end mb-4 p-3 bg-base-200 rounded-box">
              <div className="form-control">
                <label className="label label-text">Tanggal Awal</label>
                <input type="date" className="input input-bordered input-sm" value={tanggalAwal} onChange={(e) => setTanggalAwal(e.target.value)} />
              </div>
              <div className="form-control">
                <label className="label label-text">Tanggal Akhir</label>
                <input type="date" className="input input-bordered input-sm" value={tanggalAkhir} onChange={(e) => setTanggalAkhir(e.target.value)} />
              </div>
              <div className="form-control">
                <label className="label label-text">Cari</label>
                <input
                  type="text"
                  placeholder="No Invoice / Customer..."
                  className="input input-bordered input-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <button className="btn btn-primary btn-sm" onClick={applyFilter}>
                <i className="fas fa-magnifying-glass"></i> Cari
              </button>
              <a href="/pembayaran-hutang" className="btn btn-sm btn-warning">
                <i className="fas fa-rotate"> </i> Refresh
              </a>
            </div>

            <div className="stats shadow mb-4">
              <div className="stat">
                <div className="stat-title">Total Pembayaran</div>
                <div className="stat-value text-success">
                  Rp {Number(totalPembayaran).toLocaleString('id-ID')}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Jumlah Transaksi</div>
                <div className="stat-value text-primary">
                  {pembayaranHutangs.total}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>No Invoice</th>
                    <th>Customer</th>
                    <th>Tanggal Bayar</th>
                    <th>Jenis Pembayaran</th>
                    <th>Total Pembayaran</th>
                  </tr>
                </thead>
                <tbody>
                  {pembayaranHutangs.data.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-400 py-8">
                        Belum ada pembayaran hutang
                      </td>
                    </tr>
                  ) : (
                    pembayaranHutangs.data.map((item, i) => (
                      <tr key={item.id}>
                        <td>{pembayaranHutangs.from + i}</td>
                        <td className="font-mono font-medium">{item.no_invoice}</td>
                        <td>{item.customer?.nama || '-'}</td>
                        <td>{item.tanggal_bayar}</td>
                        <td>
                          <span className={`badge badge-sm ${item.jenis_pembayaran === 'Transfer' ? 'badge-info' : 'badge-success'}`}>
                            {item.jenis_pembayaran}
                          </span>
                        </td>
                        <td className="font-semibold">
                          Rp {Number(item.total_pembayaran).toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {pembayaranHutangs.links && (
              <div className="flex justify-center mt-4 join">
                {pembayaranHutangs.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.url || '#'}
                    className={`btn btn-sm join-item ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                    preserveState
                    replace
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            )}

            <div className="mt-4 text-right font-bold text-lg">
              Total: Rp {Number(totalPembayaran).toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
