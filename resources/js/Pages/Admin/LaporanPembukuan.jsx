import AdminLayout from '@/Layouts/AdminLayout'
import { router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'

export default function LaporanPembukuan({ data, totalLunas, totalHutang, pembayaranHutangs, today, filters }) {
  const { flash } = usePage().props
  const [tab, setTab] = useState('semua')
  const [processing, setProcessing] = useState(false)
  const [tanggalAwal, setTanggalAwal] = useState(filters?.tanggal_awal || '')
  const [tanggalAkhir, setTanggalAkhir] = useState(filters?.tanggal_akhir || '')
  const [bulan, setBulan] = useState(filters?.bulan || '')
  const [jenis, setJenis] = useState(filters?.jenis || '')

  const [showBayarModal, setShowBayarModal] = useState(false)
  const [bayarItem, setBayarItem] = useState(null)
  const [tanggalBayar, setTanggalBayar] = useState(today || '')
  const [jenisBayar, setJenisBayar] = useState('Cash')

  const filtered = data.filter((item) => {
    if (tab === 'lunas') return item.pembayaran === 'lunas'
    if (tab === 'hutang') return item.pembayaran === 'utang'
    return true
  })

  const total = filtered.reduce((sum, item) => sum + Number(item.total_harga), 0)

  function applyFilter() {
    router.get('/laporan-pembukuan', {
      tanggal_awal: tanggalAwal,
      tanggal_akhir: tanggalAkhir,
      bulan: bulan,
      jenis: jenis,
    }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  function exportPDF() {
    const params = new URLSearchParams()
    if (tanggalAwal) params.set('tanggal_awal', tanggalAwal)
    if (tanggalAkhir) params.set('tanggal_akhir', tanggalAkhir)
    if (bulan) params.set('bulan', bulan)
    if (jenis) params.set('jenis', jenis)
    window.open(`/laporan-pembukuan/pdf?${params.toString()}`, '_blank')
  }

  function openBayarModal(item) {
    setBayarItem(item)
    setTanggalBayar(today || '')
    setJenisBayar('Cash')
    setShowBayarModal(true)
  }

  function closeBayarModal() {
    setShowBayarModal(false)
    setBayarItem(null)
  }

  function handleBayar() {
    if (!bayarItem || processing) return
    setProcessing(true)
    router.put(route('laporan-pembukuan.bayar'), {
      id: bayarItem.id,
      jenis: bayarItem.jenis,
      tanggal_bayar: tanggalBayar,
      jenis_pembayaran: jenisBayar,
    }, {
      preserveScroll: true,
      onFinish: () => {
        setProcessing(false)
        closeBayarModal()
      },
    })
  }

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-4">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <h2 className="card-title">Laporan Pembukuan</h2>

            {/* Filter */}
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
                <label className="label label-text">Bulan</label>
                <select className="select select-bordered select-sm text-sm" value={bulan} onChange={(e) => setBulan(e.target.value)}>
                  <option value="">Semua Bulan</option>
                  <option value="1">Januari</option>
                  <option value="2">Februari</option>
                  <option value="3">Maret</option>
                  <option value="4">April</option>
                  <option value="5">Mei</option>
                  <option value="6">Juni</option>
                  <option value="7">Juli</option>
                  <option value="8">Agustus</option>
                  <option value="9">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label label-text">Jenis</label>
                <select className="select select-bordered select-sm text-sm" value={jenis} onChange={(e) => setJenis(e.target.value)}>
                  <option value="">Semua</option>
                  <option value="Desain">Desain</option>
                  <option value="Produksi">Produksi</option>
                </select>
              </div>
              <button className="btn btn-primary btn-sm" onClick={applyFilter}><i className='fas fa-magnifying-glass'></i>Cari</button>
              <button className="btn btn-accent btn-sm" onClick={exportPDF}><i className='fas fa-file'></i>Export PDF</button>
              <a href="/laporan-pembukuan" className='btn btn-sm btn-warning'><i className='fas fa-rotate'> </i>Refresh</a>
            </div>

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
                    <th>Kode SPK/Invoice</th>
                    <th>Jenis</th>
                    <th>Total Harga</th>
                    <th>Pembayaran</th>
                    <th>Jatuh Tempo</th>
                    {tab === 'hutang' && <th>Aksi</th>}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <tr key={`${item.jenis}-${item.id}`} className={item.overdue ? 'bg-red-100 text-red-800' : ''}>
                      <td>{i + 1}</td>
                      <td>{item.tanggal}</td>
                      <td>{item.customer}</td>
                      <td>{item.jenis == 'Desain' ? item.no_invoice : item.kode_spk}</td>
                      <td>{item.jenis}</td>
                      <td className="font-semibold">Rp {Number(item.total_harga).toLocaleString('id-ID')}</td>
                      <td>
                        <span className={`badge badge-sm ${item.pembayaran === 'lunas' ? 'badge-success' : 'badge-error'}`}>
                          {item.pembayaran === 'lunas' ? 'Lunas' : 'Hutang'}
                        </span>
                      </td>
                      <td>
                        {item.pembayaran != 'lunas' && item.jatuh_tempo ? (
                          <span className={item.overdue ? 'font-bold text-error' : ''}>
                            {item.jatuh_tempo}
                            {item.overdue && ' (Telat)'}
                          </span>
                        ) : '-'}
                      </td>
                      {tab === 'hutang' && (
                        <td>
                          <button
                            className="inline-flex items-center gap-1 rounded bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700"
                            onClick={() => openBayarModal(item)}
                            disabled={processing}
                          >
                            <i className="fas fa-check"></i> Bayar
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={tab === 'hutang' ? 9 : 8} className="text-center text-gray-400 py-4">Tidak ada data</td>
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

        {/* Tabel Pembayaran Hutang */}
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <h2 className="card-title">Pembayaran Hutang</h2>
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
                  {pembayaranHutangs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-400 py-4">Belum ada pembayaran hutang</td>
                    </tr>
                  ) : (
                    pembayaranHutangs.map((item, i) => (
                      <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td>{item.no_invoice}</td>
                        <td>{item.customer?.nama || '-'}</td>
                        <td>{item.tanggal_bayar}</td>
                        <td>
                          <span className={`badge badge-sm ${item.jenis_pembayaran === 'Transfer' ? 'badge-info' : 'badge-success'}`}>
                            {item.jenis_pembayaran}
                          </span>
                        </td>
                        <td className="font-semibold">Rp {Number(item.total_pembayaran).toLocaleString('id-ID')}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Bayar */}
      {showBayarModal && bayarItem && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Pembayaran Hutang</h3>
            <div className="py-4 space-y-4">
              <div>
                <p className="text-sm text-base-content/70">Customer</p>
                <p className="font-semibold">{bayarItem.customer}</p>
              </div>
              <div>
                <p className="text-sm text-base-content/70">Total Harga</p>
                <p className="font-semibold text-lg">Rp {Number(bayarItem.total_harga).toLocaleString('id-ID')}</p>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Tanggal Bayar</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered input-sm"
                  value={tanggalBayar}
                  onChange={(e) => setTanggalBayar(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Jenis Pembayaran</span>
                </label>
                <select
                  className="select select-bordered select-sm"
                  value={jenisBayar}
                  onChange={(e) => setJenisBayar(e.target.value)}
                >
                  <option value="Cash">Cash</option>
                  <option value="Transfer">Transfer</option>
                </select>
              </div>

              {jenisBayar === 'Transfer' && (
                <div className="alert alert-info text-sm">
                  <i className="fas fa-university"></i>
                  <div>
                    <p className="font-semibold">Rekening Tujuan</p>
                    <p>BCA — No. Rek: <span className="font-mono font-bold">837 521 6007</span></p>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-action">
              <button className="btn btn-ghost btn-sm" onClick={closeBayarModal} disabled={processing}>Batal</button>
              <button
                className="btn btn-success btn-sm"
                onClick={handleBayar}
                disabled={processing || !tanggalBayar}
              >
                {processing ? <span className="loading loading-spinner loading-sm"></span> : <i className="fas fa-check"></i>}
                Lunas
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop" onClick={closeBayarModal}></form>
        </dialog>
      )}
    </AdminLayout>
  )
}
