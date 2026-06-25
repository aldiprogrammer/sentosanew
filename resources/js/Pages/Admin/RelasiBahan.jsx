import AdminLayout from '@/Layouts/AdminLayout';
import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

export default function RelasiBahan({ mater, semuaBahanpakai }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      router.get('/relasi-bahan', { search }, { preserveState: true, replace: true });
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.get('/relasi-bahan', { search }, { preserveState: true, replace: true });
  };

  const [selectedMater, setSelectedMater] = useState(null);
  const [modalSearch, setModalSearch] = useState('');

  const { data, setData, put, processing } = useForm({
    bahanpakai_ids: [],
  });

  const openRelasi = (item) => {
    setSelectedMater(item);
    setModalSearch('');
    const terkait = item.bahanpakais.map((bp) => bp.id);
    setData('bahanpakai_ids', terkait);
  };

  const toggleBahanpakai = (id) => {
    setData('bahanpakai_ids',
      data.bahanpakai_ids.includes(id)
        ? data.bahanpakai_ids.filter((i) => i !== id)
        : [...data.bahanpakai_ids, id]
    );
  };

  const save = (e) => {
    e.preventDefault();
    if (!selectedMater) return;
    put('/materbahan/' + selectedMater.id + '/relasi', {
      onSuccess: () => setSelectedMater(null),
    });
  };

  const filteredBahanpakai = semuaBahanpakai.filter((bp) => {
    if (!modalSearch) return true;
    const q = modalSearch.toLowerCase();
    return bp.kode_bahan.toLowerCase().includes(q) || bp.keterangan.toLowerCase().includes(q);
  });

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 xl:grid-cols-1">
        <div className="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="card-title">Relasi Master Bahan ke Bahan Pakai</h2>
              <form onSubmit={handleSearch} className="join">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari master bahan..."
                  className="input input-bordered input-sm join-item"
                />
                <button type="submit" className="btn btn-sm join-item">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Kode Master Bahan</th>
                    <th>Satuan</th>
                    <th>Bahan Pakai Terkait</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {mater.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-base-content/50 py-4">Tidak ada data</td>
                    </tr>
                  )}
                  {mater.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td className="font-medium">{item.kode_bahan_jual}</td>
                      <td>{item.satuan || '-'}</td>
                      <td>
                        {item.bahanpakais.length > 0
                          ? item.bahanpakais.map((bp) => bp.kode_bahan).join(', ')
                          : '-'}
                      </td>
                      <td>
                        <button className="btn btn-sm btn-info" onClick={() => openRelasi(item)}>
                          Atur Relasi
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <dialog className="modal" open={!!selectedMater}>
        {selectedMater && (
          <div className="modal-box">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setSelectedMater(null)}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg mb-1">Relasi Bahan Pakai</h3>
            <p className="text-sm text-base-content/70 mb-4">
              Master Bahan: <strong>{selectedMater.kode_bahan_jual}</strong> - {selectedMater.keterangan}
            </p>
            <form onSubmit={save}>
              <div className="mb-3">
                <input
                  type="text"
                  value={modalSearch}
                  onChange={(e) => setModalSearch(e.target.value)}
                  placeholder="Cari bahan pakai..."
                  className="input input-bordered input-sm w-full"
                />
              </div>
              <div className="overflow-y-auto max-h-72 border rounded-lg p-2">
                {filteredBahanpakai.length === 0 && (
                  <p className="text-sm text-base-content/50 text-center py-4">Tidak ada data bahan pakai</p>
                )}
                {filteredBahanpakai.map((bp) => (
                  <label key={bp.id} className="flex items-center gap-3 p-2 hover:bg-base-200 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={data.bahanpakai_ids.includes(bp.id)}
                      onChange={() => toggleBahanpakai(bp.id)}
                    />
                    <span className="font-medium text-sm">{bp.kode_bahan}</span>
                    <span className="text-xs text-base-content/60">{bp.keterangan}</span>
                  </label>
                ))}
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setSelectedMater(null)}>Batal</button>
                <button type="submit" className="btn btn-primary" disabled={processing}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        )}
      </dialog>
    </AdminLayout>
  );
}
