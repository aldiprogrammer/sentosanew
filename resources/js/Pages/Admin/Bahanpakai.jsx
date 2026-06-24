import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const satuanOptions = ['M2', 'PCS', 'LITER', 'LEMBAR'];

export default function Bahanpakai({ bahanpakai, masterBahan, kode }) {
  const { data, setData, post, delete: destroy, put, processing, reset } = useForm({
    id: 0,
    id_master_bahan: '',
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
    return angkaP && angkaL ? String(angkaP * angkaL) : '';
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
    const item = bahanpakai.find((i) => i.id === id);
    setData({
      id: item.id,
      id_master_bahan: item.id_master_bahan,
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
      const rows = bahanpakai.map((item, index) => [
        index + 1,
        item.kode_bahan,
        item.master_bahan?.keterangan || '-',
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
                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Kode Bahan Jual</span>
                          </div>
                          <select
                            value={data.id_master_bahan}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData('id_master_bahan', e.target.value)}
                          >
                            <option value="">-- Pilih Bahan Pakai --</option>
                            {masterBahan.map((item) => (
                              <option key={item.kode_bahan_jual} value={item.kode_bahan_jual}>
                                {item.kode_bahan_jual}
                              </option>
                            ))}
                          </select>
                        </label>

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
                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Kode Bahan Jual</span>
                          </div>

                          <select
                            value={data.id_master_bahan}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData('id_master_bahan', e.target.value)}
                          >
                            <option value="">-- Pilih Bahan Pakai --</option>
                            {masterBahan.map((item) => (
                              <option key={item.kode_bahan_jual} value={item.kode_bahan_jual}>
                                {item.keterangan}
                              </option>
                            ))}
                          </select>
                        </label>

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

            <div>
              <table className="table table-zebra" id="myTable">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Kode bahan pakai</th>
                    <th>Kode Bahan</th>
                    <th>Keterangan</th>
                    <th>Panjang</th>
                    <th>Lebar</th>
                    <th>Total</th>
                    <th>Satuan</th>
                  </tr>
                </thead>
                <tbody>
                  {bahanpakai.map((item, index) => (
                    <tr
                      key={item.id}
                      onClick={() => openModalEdit(item.id)}
                      className="cursor-pointer hover:bg-base-200"
                    >
                      <td>{index + 1}</td>
                      <td>{item.master_bahan?.kode_bahan_jual || '-'}</td>
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
          </div>
        </div>
      </div >
    </AdminLayout >
  );
}
