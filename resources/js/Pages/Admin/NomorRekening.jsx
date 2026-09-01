import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';

export default function NomorRekening({ rekening }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      router.get('/nomor-rekening', { search }, { preserveState: true, replace: true });
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  const { data, setData, post, delete: destroy, put, processing, reset } = useForm({
    id: 0,
    nama_bank: '',
    nomor_rekening: '',
    atas_nama: '',
  });

  const modalRef = useRef(null);
  const editmodalRef = useRef(null);

  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const openModalEdit = (item) => {
    editmodalRef.current.showModal();
    setData({
      id: item.id,
      nama_bank: item.nama_bank,
      nomor_rekening: item.nomor_rekening,
      atas_nama: item.atas_nama,
    });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
  };

  const save = (e) => {
    e.preventDefault();
    post('/nomor-rekening', {
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  const hapus = (id) => {
    if (confirm('Yakin ingin menghapus nomor rekening ini?')) {
      destroy('/nomor-rekening/' + id);
      closeModalEdit();
    }
  };

  const update = (e) => {
    e.preventDefault();
    put('/nomor-rekening/' + data.id, {
      onSuccess: () => {
        closeModalEdit();
        reset();
      },
    });
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-4">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
              <h2 className="card-title">Nomor Rekening</h2>
              <button className="btn btn-success" onClick={openModal}>
                <i className="fas fa-plus"></i> Tambah Rekening
              </button>
            </div>

            <div className="mb-3">
              <input
                type="text"
                placeholder="Cari nama bank, nomor rekening, atas nama..."
                className="input input-bordered input-success input-sm w-full max-w-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Bank</th>
                    <th>Nomor Rekening</th>
                    <th>Atas Nama</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {rekening.data.map((item, index) => (
                    <tr key={item.id} onClick={() => openModalEdit(item)} className="cursor-pointer hover:bg-base-200">
                      <td>{rekening.from + index}</td>
                      <td>{item.nama_bank}</td>
                      <td className="font-semibold">{item.nomor_rekening}</td>
                      <td>{item.atas_nama}</td>
                      <td>
                        <button
                          className="btn btn-xs btn-error"
                          onClick={(e) => {
                            e.stopPropagation();
                            hapus(item.id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {rekening.links && (
              <div className="flex justify-center mt-4 join">
                {rekening.links.map((link, i) => (
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
        <div className="modal-box">
          <button type="button" onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="text-lg font-bold mb-4">Tambah Nomor Rekening</h3>
          <form onSubmit={save}>
            <div className="grid grid-cols-1 gap-3">
              <label className="form-control">
                <div className="label"><span className="label-text">Nama Bank</span></div>
                <input type="text" value={data.nama_bank} className="input input-bordered input-success w-full" required onChange={(e) => setData('nama_bank', e.target.value)} />
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text">Nomor Rekening</span></div>
                <input type="text" value={data.nomor_rekening} className="input input-bordered input-success w-full" required onChange={(e) => setData('nomor_rekening', e.target.value)} />
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text">Atas Nama</span></div>
                <input type="text" value={data.atas_nama} className="input input-bordered input-success w-full" required onChange={(e) => setData('atas_nama', e.target.value)} />
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
        <div className="modal-box">
          <button type="button" onClick={closeModalEdit} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="text-lg font-bold mb-4">Edit Nomor Rekening</h3>
          <form onSubmit={update}>
            <div className="grid grid-cols-1 gap-3">
              <label className="form-control">
                <div className="label"><span className="label-text">Nama Bank</span></div>
                <input type="text" value={data.nama_bank} className="input input-bordered input-success w-full" required onChange={(e) => setData('nama_bank', e.target.value)} />
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text">Nomor Rekening</span></div>
                <input type="text" value={data.nomor_rekening} className="input input-bordered input-success w-full" required onChange={(e) => setData('nomor_rekening', e.target.value)} />
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text">Atas Nama</span></div>
                <input type="text" value={data.atas_nama} className="input input-bordered input-success w-full" required onChange={(e) => setData('atas_nama', e.target.value)} />
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
