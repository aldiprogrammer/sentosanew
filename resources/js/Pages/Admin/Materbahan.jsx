import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Materbahan({ mater, kode }) {
  const { data, setData, post, delete: destroy, put, processing, reset } = useForm({
    id: 0,
    kode_bahan_pakai: '',
    keterangan: '',
    tanggal: '',
  });

  const modalRef = useRef(null);
  const openModal = () => {
    modalRef.current.showModal();
    setData('tanggal', new Date().toISOString().slice(0, 10));
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const editmodalRef = useRef(null);
  const openModalEdit = (id) => {
    editmodalRef.current.showModal();
    const item = mater.find((i) => i.id === id);
    setData({
      id: item.id,
      kode_bahan_pakai: item.kode_bahan_pakai,
      keterangan: item.keterangan,
      tanggal: item.tanggal,
    });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
  };

  const save = (e) => {
    e.preventDefault();
    post('/materbahan', {
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  const hapus = (id) => {
    if (confirm('Yakin ingin menghapus?')) {
      destroy('/materbahan/' + id);
      closeModalEdit();
    }
  };

  const update = (e) => {
    e.preventDefault();
    put('/materbahan/' + data.id, {
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
      doc.text('Data Master Bahan', 14, 20);
      doc.setFontSize(10);
      doc.text('Tanggal: ' + new Date().toLocaleDateString('id-ID'), 14, 27);
      const rows = mater.map((item, index) => [
        index + 1,
        item.kode_bahan_pakai,
        item.keterangan,
        item.tanggal,
      ]);
      autoTable(doc, {
        startY: 32,
        head: [['No', 'Kode Bahan Pakai', 'Keterangan', 'Tanggal']],
        body: rows,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [22, 163, 74] },
        theme: 'grid',
      });
      doc.save('data_master_bahan.pdf');
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
              <h2 className="card-title">Data Master Bahan</h2>
              <div className="flex gap-2">
                <button className="btn btn-primary" onClick={exportPDF}>
                  <i className="fas fa-file-pdf"></i> Export PDF
                </button>
                <button className="btn btn-success" onClick={openModal}>
                  <i className="fas fa-plus"></i> Tambah Master Bahan
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

                    <h3 className="text-lg font-bold mb-4">Tambah Master Bahan</h3>

                    <form onSubmit={save}>
                      <div className="grid grid-cols-1 gap-3">
                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Kode Bahan Pakai</span>
                          </div>
                          <input
                            type="text"
                            value={data.kode_bahan_pakai}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData('kode_bahan_pakai', e.target.value)}
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

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Tanggal</span>
                          </div>
                          <input
                            type="date"
                            value={data.tanggal}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData('tanggal', e.target.value)}
                          />
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

                    <h3 className="text-lg font-bold mb-4">Edit Master Bahan</h3>

                    <form onSubmit={update}>
                      <div className="grid grid-cols-1 gap-3">
                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Kode Bahan Pakai</span>
                          </div>
                          <input
                            type="text"
                            value={data.kode_bahan_pakai}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData('kode_bahan_pakai', e.target.value)}
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

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Tanggal</span>
                          </div>
                          <input
                            type="date"
                            value={data.tanggal}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData('tanggal', e.target.value)}
                          />
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
                    <th>Kode Bahan Pakai</th>
                    <th>Keterangan</th>
                    <th>Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {mater.map((item, index) => (
                    <tr
                      key={item.id}
                      onClick={() => openModalEdit(item.id)}
                      className="cursor-pointer hover:bg-base-200"
                    >
                      <td>{index + 1}</td>
                      <td>{item.kode_bahan_pakai}</td>
                      <td>{item.keterangan}</td>
                      <td>{item.tanggal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
