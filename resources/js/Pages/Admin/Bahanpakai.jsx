import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const satuanOptions = ['M2', 'PCS', 'LITER', 'LEMBAR'];

export default function Bahanpakai({ bahanpakai, masterBahan, kode }) {
  const [search, setSearch] = useState(
    new URLSearchParams(window.location.search).get('search') || '',
  );

  useEffect(() => {
    const t = setTimeout(() => {
      router.get('/bahanpakai', { search }, { preserveState: true, replace: true });
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  const { data, setData, post, delete: destroy, put, processing, reset } = useForm({
    id: 0,
    id_master_bahan: [],
    kode_bahan: '',
    keterangan: '',
    panjang: '',
    lebar: '',
    total: '',
    satuan: '',
  });

  const modalRef = useRef(null);
  const openModal = () => {
    reset();
    modalRef.current.showModal();
    setData('kode_bahan', kode);
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const hitungTotal = (p, l) => {
    const angkaP = parseFloat(p) || 0;
    const angkaL = parseFloat(l) || 0;
    return angkaP && angkaL ? String(Math.round(angkaP * angkaL)) : '';
  };

  const setPanjang = (value) => {
    setData('panjang', value);
    setData('total', hitungTotal(value, data.lebar));
  };

  const setLebar = (value) => {
    setData('lebar', value);
    setData('total', hitungTotal(data.panjang, value));
  };

  const editmodalRef = useRef(null);
  const openModalEdit = (id) => {
    editmodalRef.current.showModal();
    const items = bahanpakai.data || bahanpakai;
    const item = items.find((i) => i.id === id);
    setData({
      id: item.id,
      id_master_bahan: item.id_master_bahan || [],
      kode_bahan: item.kode_bahan,
      keterangan: item.keterangan,
      panjang: item.panjang,
      lebar: item.lebar,
      total: item.total,
      satuan: item.satuan,
    });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
  };

  const save = (e) => {
    e.preventDefault();
    post('/bahanpakai', {
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  const hapus = (id) => {
    if (confirm('Yakin ingin menghapus?')) {
      destroy('/bahanpakai/' + id);
      closeModalEdit();
    }
  };

  const update = (e) => {
    e.preventDefault();
    put('/bahanpakai/' + data.id, {
      onSuccess: () => {
        closeModalEdit();
        reset();
      },
    });
  };

  const exportPDF = () => {
    try {
      const doc = new jsPDF('l', 'mm', 'a4');
      doc.setFontSize(16);
      doc.text('Data Bahan Beli', 14, 20);
      doc.setFontSize(10);
      doc.text('Tanggal: ' + new Date().toLocaleDateString('id-ID'), 14, 27);
      const items = bahanpakai.data || bahanpakai;
      const rows = items.map((item, index) => [
        index + 1,
        item.kode_bahan,
        Array.isArray(item.id_master_bahan) ? item.id_master_bahan.join(', ') : '-',
        item.keterangan,
        item.panjang,
        item.lebar,
        item.total,
        item.satuan,
      ]);
      autoTable(doc, {
        startY: 32,
        head: [['No', 'Kode Bahan', 'Master Bahan', 'Keterangan', 'Panjang', 'Lebar', 'Total', 'Satuan']],
        body: rows,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [22, 163, 74] },
        theme: 'grid',
      });
      doc.save('data_bahan_pakai.pdf');
    } catch (error) {
      console.error('Gagal export PDF:', error);
      alert('Gagal mengexport PDF: ' + error.message);
    }
  };




  return (
    <AdminLayout>
      <div className="grid grid-cols-1 xl:grid-cols-1">
        <div className="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="card-title">Data Bahan Pakai</h2>
              <div className="flex gap-2">
                <button className="btn btn-primary" onClick={exportPDF}>
                  <i className="fas fa-file-pdf"></i> Export PDF
                </button>
                <button className="btn btn-success" onClick={openModal}>
                  <i className="fas fa-plus"></i> Tambah Bahan Pakai
                </button>

                <dialog ref={modalRef} className="modal">
                  <div className="modal-box">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                      ✕
                    </button>

                    <h3 className="text-lg font-bold mb-4">Tambah Bahan Pakai</h3>

                    <form onSubmit={save}>
                      <div className="grid grid-cols-1 gap-3">
                        {/* <label className="form-control">
                          <div className="label">
                            <span className="label-text">Master Bahan</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1 max-h-40 overflow-y-auto border rounded-lg p-2">
                            {masterBahan.map((item) => (
                              <label key={item.kode_bahan_jual} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-xs"
                                  checked={data.id_master_bahan.includes(item.kode_bahan_jual)}
                                  onChange={() =>
                                    setData('id_master_bahan',
                                      data.id_master_bahan.includes(item.kode_bahan_jual)
                                        ? data.id_master_bahan.filter((v) => v !== item.kode_bahan_jual)
                                        : [...data.id_master_bahan, item.kode_bahan_jual]
                                    )
                                  }
                                />
                                <span className="text-sm">{item.kode_bahan_jual}</span>
                              </label>
                            ))}
                          </div>
                        </label> */}

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Kode Bahan</span>
                          </div>
                          <input
                            type="text"
                            value={data.kode_bahan}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData('kode_bahan', e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Keterangan</span>
                          </div>
                          <textarea
                            value={data.keterangan}
                            className="textarea textarea-bordered textarea-success w-full"
                            required
                            onChange={(e) => setData('keterangan', e.target.value)}
                          />
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                          <label className="form-control">
                            <div className="label">
                              <span className="label-text">Panjang</span>
                            </div>
                            <input
                              type="text"
                              value={data.panjang}
                              className="input input-bordered input-success w-full"
                              required
                              onChange={(e) => setPanjang(e.target.value)}
                            />
                          </label>

                          <label className="form-control">
                            <div className="label">
                              <span className="label-text">Lebar</span>
                            </div>
                            <input
                              type="text"
                              value={data.lebar}
                              className="input input-bordered input-success w-full"
                              required
                              onChange={(e) => setLebar(e.target.value)}
                            />
                          </label>
                        </div>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Total</span>
                          </div>
                          <input
                            type="text"
                            value={data.total}
                            className="input input-bordered input-success w-full"
                            readOnly
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Satuan</span>
                          </div>
                          <select
                            value={data.satuan}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData('satuan', e.target.value)}
                          >
                            <option value="">-- Pilih Satuan --</option>
                            {satuanOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <div className="mt-6 flex gap-2">
                        <button type="submit" disabled={processing} className="btn btn-success">
                          <i className="fas fa-save"></i> Simpan
                        </button>
                        <button type="button" onClick={closeModal} className="btn btn-error">
                          Batal
                        </button>
                      </div>
                    </form>
                  </div>
                </dialog>

                <dialog ref={editmodalRef} className="modal">
                  <div className="modal-box">
                    <button
                      type="button"
                      onClick={closeModalEdit}
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                      ✕
                    </button>

                    <h3 className="text-lg font-bold mb-4">Edit Bahan Pakai</h3>

                    <form onSubmit={update}>
                      <div className="grid grid-cols-1 gap-3">
                        {/* <label className="form-control">
                          <div className="label">
                            <span className="label-text">Master Bahan</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1 max-h-40 overflow-y-auto border rounded-lg p-2">
                            {masterBahan.map((item) => (
                              <label key={item.kode_bahan_jual} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-xs"
                                  checked={data.id_master_bahan.includes(item.kode_bahan_jual)}
                                  onChange={() =>
                                    setData('id_master_bahan',
                                      data.id_master_bahan.includes(item.kode_bahan_jual)
                                        ? data.id_master_bahan.filter((v) => v !== item.kode_bahan_jual)
                                        : [...data.id_master_bahan, item.kode_bahan_jual]
                                    )
                                  }
                                />
                                <span className="text-sm">{item.kode_bahan_jual}</span>
                              </label>
                            ))}
                          </div>
                        </label> */}

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Kode Bahan</span>
                          </div>
                          <input
                            type="text"
                            value={data.kode_bahan}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData('kode_bahan', e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Keterangan</span>
                          </div>
                          <textarea
                            value={data.keterangan}
                            className="textarea textarea-bordered textarea-success w-full"
                            required
                            onChange={(e) => setData('keterangan', e.target.value)}
                          />
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                          <label className="form-control">
                            <div className="label">
                              <span className="label-text">Panjang</span>
                            </div>
                            <input
                              type="text"
                              value={data.panjang}
                              className="input input-bordered input-success w-full"
                              required
                              onChange={(e) => setPanjang(e.target.value)}
                            />
                          </label>

                          <label className="form-control">
                            <div className="label">
                              <span className="label-text">Lebar</span>
                            </div>
                            <input
                              type="text"
                              value={data.lebar}
                              className="input input-bordered input-success w-full"
                              required
                              onChange={(e) => setLebar(e.target.value)}
                            />
                          </label>
                        </div>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Total</span>
                          </div>
                          <input
                            type="text"
                            value={data.total}
                            className="input input-bordered input-success w-full"
                            readOnly
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Satuan</span>
                          </div>
                          <select
                            value={data.satuan}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData('satuan', e.target.value)}
                          >
                            <option value="">-- Pilih Satuan --</option>
                            {satuanOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <div className="mt-6 flex gap-2">
                        <button type="submit" disabled={processing} className="btn btn-success">
                          <i className="fas fa-save"></i> Update
                        </button>
                        <button type="button" onClick={closeModalEdit} className="btn btn-warning">
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={() => hapus(data.id)}
                          className="btn btn-error"
                        >
                          <i className="fas fa-trash"></i> Hapus
                        </button>
                      </div>
                    </form>
                  </div>
                </dialog>
              </div>
            </div>

            <div className="mb-3">
              <input
                type="text"
                placeholder="Cari kode bahan, keterangan, atau satuan..."
                className="input input-bordered input-success w-full max-w-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <table className="table table-zebra" id="myTable">
                <thead>
                  <tr>
                    <th>No</th>
                    {/* <th>Kode Master Bahan</th> */}
                    <th>Kode Bahan</th>
                    <th>Keterangan</th>
                    <th>Panjang</th>
                    <th>Lebar</th>
                    <th>Total</th>
                    <th>Satuan</th>
                  </tr>
                </thead>
                <tbody>
                  {(bahanpakai.data || bahanpakai).map((item, index) => (
                    <tr
                      key={item.id}
                      onClick={() => openModalEdit(item.id)}
                      className="cursor-pointer hover:bg-base-200"
                    >
                      <td>{bahanpakai.from ? bahanpakai.from + index : index + 1}</td>
                      {/* <td>
                        {Array.isArray(item.id_master_bahan)
                          ? item.id_master_bahan.join(', ')
                          : '-'}
                      </td> */}
                      <td>{item.kode_bahan}</td>
                      <td>{item.keterangan}</td>
                      <td>{item.panjang}</td>
                      <td>{item.lebar}</td>
                      <td>{item.total}</td>
                      <td>{item.satuan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {bahanpakai.links && (
              <div className="join mt-4 flex justify-center">
                {bahanpakai.links.map((link, i) => (
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
      </div >
    </AdminLayout >
  );
}
