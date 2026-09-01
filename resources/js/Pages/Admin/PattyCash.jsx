import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';

const typeOptions = ['MASUK', 'KELUAR'];
const jenisBiayaOptions = [
  'Biaya Produksi',
  'Biaya Umum',
  'Biaya Penjualan',
];

export default function PattyCash({ patty, saldo, kode }) {
  const [search, setSearch] = useState('');
  const [tglDari, setTglDari] = useState('');
  const [tglSampai, setTglSampai] = useState('');
  const [bulan, setBulan] = useState('');

  const formatRp = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return '-';
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const formatTgl = (val) => {
    if (!val) return '-';
    const d = new Date(val + 'T00:00:00');
    if (isNaN(d)) return val;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return dd + '-' + mm + '-' + yyyy;
  };

  const buildFilters = () => {
    const params = {};
    if (search) params.search = search;
    if (bulan) {
      params.bulan = bulan;
    } else {
      if (tglDari) params.tgl_dari = tglDari;
      if (tglSampai) params.tgl_sampai = tglSampai;
    }
    return params;
  };

  useEffect(() => {
    const t = setTimeout(() => {
      router.get('/patty-cash', buildFilters(), { preserveState: true, replace: true });
    }, 500);
    return () => clearTimeout(t);
  }, [search, tglDari, tglSampai, bulan]);

  const resetFilters = () => {
    setSearch('');
    setTglDari('');
    setTglSampai('');
    setBulan('');
    router.get('/patty-cash', {}, { preserveState: true, replace: true });
  };

  const { data, setData, post, delete: destroy, put, processing, reset } = useForm({
    id: 0,
    kode_transaksi: kode,
    tanggal_transaksi: new Date().toISOString().split('T')[0],
    type: '',
    jenis_biaya: '',
    nominal_transaksi: '',
    keterangan: '',
  });

  const modalRef = useRef(null);
  const editmodalRef = useRef(null);

  const openModal = () => {
    modalRef.current.showModal();
    setData('kode_transaksi', kode);
    setData('tanggal_transaksi', new Date().toISOString().split('T')[0]);
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const openModalEdit = (item) => {
    editmodalRef.current.showModal();
    setData({
      id: item.id,
      kode_transaksi: item.kode_transaksi,
      tanggal_transaksi: item.tanggal_transaksi,
      type: item.type,
      jenis_biaya: item.jenis_biaya,
      nominal_transaksi: item.nominal_transaksi?.toString() || '',
      keterangan: item.keterangan || '',
    });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
  };

  const save = (e) => {
    e.preventDefault();
    post('/patty-cash', {
      onSuccess: () => {
        reset();
        closeModal();
        setData('tanggal_transaksi', new Date().toISOString().split('T')[0]);
        setData('kode_transaksi', kode);
      },
    });
  };

  const hapus = (id) => {
    if (confirm('Yakin ingin menghapus transaksi ini?')) {
      destroy('/patty-cash/' + id);
      closeModalEdit();
    }
  };

  const update = (e) => {
    e.preventDefault();
    put('/patty-cash/' + data.id, {
      onSuccess: () => {
        closeModalEdit();
        reset();
      },
    });
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-base-100 shadow-md border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-sm">Saldo Petty Cash</h2>
              <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-success' : 'text-error'}`}>
                {formatRp(saldo)}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
              <h2 className="card-title">Petty Cash</h2>
              <button className="btn btn-success" onClick={openModal}>
                <i className="fas fa-plus"></i> Tambah Transaksi
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-end gap-3 mb-3">
              <label className="form-control">
                <div className="label"><span className="label-text text-xs">Cari Kode / Jenis Biaya</span></div>
                <input
                  type="text"
                  placeholder="Cari..."
                  className="input input-bordered input-success input-sm w-full max-w-xs"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text text-xs">Bulan</span></div>
                <input
                  type="month"
                  className="input input-bordered input-success input-sm"
                  value={bulan}
                  onChange={(e) => setBulan(e.target.value)}
                />
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text text-xs">Dari Tanggal</span></div>
                <input
                  type="date"
                  className="input input-bordered input-success input-sm"
                  value={tglDari}
                  onChange={(e) => setTglDari(e.target.value)}
                  disabled={!!bulan}
                />
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text text-xs">Sampai Tanggal</span></div>
                <input
                  type="date"
                  className="input input-bordered input-success input-sm"
                  value={tglSampai}
                  onChange={(e) => setTglSampai(e.target.value)}
                  disabled={!!bulan}
                />
              </label>
              <button className="btn btn-sm btn-ghost" onClick={resetFilters}>
                <i className="fas fa-times"></i> Reset
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Kode Transaksi</th>
                    <th>Tanggal</th>
                    <th>Type</th>
                    <th>Jenis Biaya</th>
                    <th>Keterangan</th>
                    <th>Nominal</th>
                    <th>Saldo Awal</th>
                    <th>Saldo Setelah</th>
                    <th>User</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {patty.data.map((item, index) => (
                    <tr key={item.id} onClick={() => openModalEdit(item)} className="cursor-pointer hover:bg-base-200">
                      <td>{patty.from + index}</td>
                      <td className="font-semibold">{item.kode_transaksi}</td>
                      <td>{formatTgl(item.tanggal_transaksi)}</td>
                      <td>
                        <span className={`badge badge-sm ${item.type === 'MASUK' ? 'badge-success' : 'badge-error'}`}>
                          {item.type}
                        </span>
                      </td>
                      <td>{item.jenis_biaya}</td>
                      <td>{item.keterangan || '-'}</td>
                      <td className={item.type === 'MASUK' ? 'text-success' : 'text-error'}>
                        {item.type === 'MASUK' ? '+' : '-'} {formatRp(item.nominal_transaksi)}
                      </td>
                      <td>{formatRp(item.saldo_awal)}</td>
                      <td>{formatRp(item.saldo_setelah_transaksi)}</td>
                      <td>{item.user?.username || '-'}</td>
                      <td>
                        <Link
                          href="#"
                          className="btn btn-xs btn-error"
                          onClick={(e) => {
                            e.stopPropagation();
                            hapus(item.id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {patty.links && (
              <div className="flex justify-center mt-4 join">
                {patty.links.map((link, i) => (
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
          </div>
        </div>
      </div>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-lg">
          <button type="button" onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="text-lg font-bold mb-4">Tambah Transaksi</h3>
          <form onSubmit={save}>
            <div className="grid grid-cols-1 gap-3">
              <label className="form-control">
                <div className="label"><span className="label-text">Kode Transaksi</span></div>
                <input type="text" value={data.kode_transaksi} className="input input-bordered input-success w-full" onChange={(e) => setData('kode_transaksi', e.target.value)} />
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text">Tanggal Transaksi</span></div>
                <input type="date" value={data.tanggal_transaksi} className="input input-bordered input-success w-full" required onChange={(e) => setData('tanggal_transaksi', e.target.value)} />
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <label className="form-control">
                  <div className="label"><span className="label-text">Type</span></div>
                  <select value={data.type} className="select select-bordered select-success w-full" required onChange={(e) => setData('type', e.target.value)}>
                    <option value="">-- Pilih Type --</option>
                    {typeOptions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">Jenis Biaya</span></div>
                  <select value={data.jenis_biaya} className="select select-bordered select-success w-full" required onChange={(e) => setData('jenis_biaya', e.target.value)}>
                    <option value="">-- Pilih Jenis Biaya --</option>
                    {jenisBiayaOptions.map((j) => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="form-control">
                <div className="label"><span className="label-text">Nominal Transaksi</span></div>
                <input type="number" min="0" step="0.01" value={data.nominal_transaksi} className="input input-bordered input-success w-full" required onChange={(e) => setData('nominal_transaksi', e.target.value)} />
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text">Keterangan</span></div>
                <textarea value={data.keterangan} className="textarea textarea-bordered textarea-success w-full" rows="2" onChange={(e) => setData('keterangan', e.target.value)} />
              </label>
            </div>
            <div className="mt-6 flex gap-2">
              <button type="submit" disabled={processing} className="btn btn-success"><i className="fas fa-save"></i> Simpan</button>
              <button type="button" onClick={closeModal} className="btn btn-error">Batal</button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog ref={editmodalRef} className="modal">
        <div className="modal-box max-w-lg">
          <button type="button" onClick={closeModalEdit} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="text-lg font-bold mb-4">Edit Transaksi</h3>
          <form onSubmit={update}>
            <div className="grid grid-cols-1 gap-3">
              <label className="form-control">
                <div className="label"><span className="label-text">Kode Transaksi</span></div>
                <input type="text" value={data.kode_transaksi} className="input input-bordered input-success w-full" onChange={(e) => setData('kode_transaksi', e.target.value)} />
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text">Tanggal Transaksi</span></div>
                <input type="date" value={data.tanggal_transaksi} className="input input-bordered input-success w-full" required onChange={(e) => setData('tanggal_transaksi', e.target.value)} />
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <label className="form-control">
                  <div className="label"><span className="label-text">Type</span></div>
                  <select value={data.type} className="select select-bordered select-success w-full" required onChange={(e) => setData('type', e.target.value)}>
                    <option value="">-- Pilih Type --</option>
                    {typeOptions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">Jenis Biaya</span></div>
                  <select value={data.jenis_biaya} className="select select-bordered select-success w-full" required onChange={(e) => setData('jenis_biaya', e.target.value)}>
                    <option value="">-- Pilih Jenis Biaya --</option>
                    {jenisBiayaOptions.map((j) => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="form-control">
                <div className="label"><span className="label-text">Nominal Transaksi</span></div>
                <input type="number" min="0" step="0.01" value={data.nominal_transaksi} className="input input-bordered input-success w-full" required onChange={(e) => setData('nominal_transaksi', e.target.value)} />
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text">Keterangan</span></div>
                <textarea value={data.keterangan} className="textarea textarea-bordered textarea-success w-full" rows="2" onChange={(e) => setData('keterangan', e.target.value)} />
              </label>
            </div>
            <div className="mt-6 flex gap-2">
              <button type="submit" disabled={processing} className="btn btn-success"><i className="fas fa-save"></i> Update</button>
              <button type="button" onClick={closeModalEdit} className="btn btn-warning">Batal</button>
              <button type="button" onClick={() => hapus(data.id)} className="btn btn-error"><i className="fas fa-trash"></i> Hapus</button>
            </div>
          </form>
        </div>
      </dialog>
    </AdminLayout>
  );
}
