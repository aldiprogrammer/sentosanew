import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Materbahan({ mater, kode }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      router.get('/materbahan', { search }, { preserveState: true, replace: true });
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.get('/materbahan', { search }, { preserveState: true, replace: true });
  };

  const { data, setData, post, delete: destroy, put, processing, reset } = useForm({
    id: 0,
    kode_bahan_jual: '',
    keterangan: '',
    satuan: '',
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
    const item = mater.data.find((i) => i.id === id);
    setData({
      id: item.id,
      kode_bahan_jual: item.kode_bahan_jual,
      keterangan: item.keterangan,
      satuan: item.satuan || '',
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
      const rows = mater.data.map((item, index) => [
        index + 1,
        item.kode_bahan_jual,
        item.keterangan,
        item.satuan || '-',
        item.tanggal,
      ]);
      autoTable(doc, {
        startY: 32,
        head: [['No', 'Kode Bahan Jual', 'Keterangan', 'Satuan', 'Tanggal']],
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
                <button className="btn btn-primary btn-sm" onClick={exportPDF}>
                  <i className="fas fa-file-pdf"></i> Export PDF
                </button>
                <button className="btn btn-success btn-sm" onClick={openModal}>
                  <i className="fas fa-plus"></i> Tambah Master Bahan
                </button>
              </div>
            </div>

            <div className="mb-3">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari kode bahan jual, keterangan, atau satuan..."
                  className="input input-bordered input-success w-full max-w-xs"
                />
              </form>
            </div>

            <div>
              <table className="table table-zebra" id="myTable">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Kode Bahan Jual</th>
                    <th>Keterangan</th>
                    <th>Satuan</th>

                  </tr>
                </thead>
                <tbody>
                  {mater.data.map((item, index) => (
                    <tr
                      key={item.id}
                      onClick={() => openModalEdit(item.id)}
                      className="cursor-pointer hover:bg-base-200"
                    >
                      <td>{mater.from + index}</td>
                      <td>{item.kode_bahan_jual}</td>
                      <td>{item.keterangan}</td>
                      <td>{item.satuan || '-'}</td>

                    </tr>
                  ))}
                </tbody>
              </table>

              {mater.links && (
                <div className="flex justify-center mt-4 join">
                  {mater.links.map((link, i) => (
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
      </div>

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
                  <span className="label-text">Kode Bahan Jual</span>
                </div>
                <input
                  type="text"
                  value={data.kode_bahan_jual}
                  className="input input-bordered input-success w-full"
                  required
                  onChange={(e) => setData('kode_bahan_jual', e.target.value)}
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
                  <span className="label-text">Satuan</span>
                </div>
                <select
                  value={data.satuan}
                  className="select select-bordered select-success w-full"
                  onChange={(e) => setData('satuan', e.target.value)}
                >
                  <option value="">-- Pilih Satuan --</option>
                  <option value="M2">M2</option>
                  <option value="PCS">PCS</option>
                  <option value="LITER">LITER</option>
                  <option value="LEMBAR">LEMBAR</option>
                  <option value="ROLL">ROLL</option>
                  <option value="BOCK">BOCK</option>
                  <option value="BLOK">BLOK</option>
                  <option value="RIM">RIM</option>
                  <option value="KOTAK">KOTAK</option>
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

          <h3 className="text-lg font-bold mb-4">Edit Master Bahan</h3>

          <form onSubmit={update}>
            <div className="grid grid-cols-1 gap-3">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Kode Bahan Jual</span>
                </div>
                <input
                  type="text"
                  value={data.kode_bahan_jual}
                  className="input input-bordered input-success w-full"
                  required
                  onChange={(e) => setData('kode_bahan_jual', e.target.value)}
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
                  <span className="label-text">Satuan</span>
                </div>
                <select
                  value={data.satuan}
                  className="select select-bordered select-success w-full"
                  onChange={(e) => setData('satuan', e.target.value)}
                >
                  <option value="">-- Pilih Satuan --</option>
                  <option value="M2">M2</option>
                  <option value="PCS">PCS</option>
                  <option value="LITER">LITER</option>
                  <option value="LEMBAR">LEMBAR</option>
                  <option value="ROLL">ROLL</option>
                  <option value="BOCK">BOCK</option>
                  <option value="BLOK">BLOK</option>
                  <option value="RIM">RIM</option>
                  <option value="KOTAK">KOTAK</option>


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
    </AdminLayout>
  );
}
