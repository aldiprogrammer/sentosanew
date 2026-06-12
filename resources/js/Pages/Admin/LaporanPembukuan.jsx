import AdminLayout from '@/Layouts/AdminLayout'
import { Link, usePage } from '@inertiajs/react'
import React, { useState } from 'react'

export default function LaporanPembukuan({ data, totalLunas, totalHutang, today }) {
  const [tab, setTab] = useState('semua')

  const filtered = data.filter((item) => {
    if (tab === 'lunas') return item.pembayaran === 'lunas'
    if (tab === 'hutang') return item.pembayaran === 'utang'
    return true
  })

  const total = filtered.reduce((sum, item) => sum + Number(item.total_harga), 0)

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-4">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <h2 className="card-title">Laporan Pembukuan</h2>

            <div className="stats shadow mb-4">
              <div className="stat">
                <div className="stat-title">Total Semua</div>
                <div className="stat-value text-primary">
                  Rp {Number(totalLunas + totalHutang).toLocaleString('id-ID')}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Lunas</div>
                <div className="stat-value text-success">
                  Rp {Number(totalLunas).toLocaleString('id-ID')}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Hutang</div>
                <div className="stat-value text-error">
                  Rp {Number(totalHutang).toLocaleString('id-ID')}
                </div>
              </div>
            </div>

            <div className="tabs tabs-boxed mb-4">
              <button className={`tab ${tab === 'semua' ? 'tab-active' : ''}`} onClick={() => setTab('semua')}>
                Semua Data ({data.length})
              </button>
              <button className={`tab ${tab === 'lunas' ? 'tab-active' : ''}`} onClick={() => setTab('lunas')}>
                Lunas ({data.filter((d) => d.pembayaran === 'lunas').length})
              </button>
              <button className={`tab ${tab === 'hutang' ? 'tab-active' : ''}`} onClick={() => setTab('hutang')}>
                Hutang ({data.filter((d) => d.pembayaran === 'utang').length})
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th>Customer</th>
                    <th>Kode SPK</th>
                    <th>Jenis</th>
                    <th>Total Harga</th>
                    <th>Pembayaran</th>
                    <th>Jatuh Tempo</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <tr key={`${item.jenis}-${item.id}`} className={item.overdue ? 'bg-red-100 text-red-800' : ''}>
                      <td>{i + 1}</td>
                      <td>{item.tanggal}</td>
                      <td>{item.customer}</td>
                      <td>{item.kode_spk}</td>
                      <td>{item.jenis}</td>
                      <td className="font-semibold">Rp {Number(item.total_harga).toLocaleString('id-ID')}</td>
                      <td>
                        <span className={`badge badge-sm ${item.pembayaran === 'lunas' ? 'badge-success' : 'badge-error'}`}>
                          {item.pembayaran === 'lunas' ? 'Lunas' : 'Hutang'}
                        </span>
                      </td>
                      <td>
                        {item.jatuh_tempo ? (
                          <span className={item.overdue ? 'font-bold text-error' : ''}>
                            {item.jatuh_tempo}
                            {item.overdue && ' (Telat)'}
                          </span>
                        ) : '-'}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center text-gray-400 py-4">Tidak ada data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-right font-bold text-lg">
              Total Tampil: Rp {Number(total).toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
