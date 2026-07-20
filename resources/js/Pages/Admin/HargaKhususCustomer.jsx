import AdminLayout from '@/Layouts/AdminLayout';
import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';

function SearchableSelect({ options, value, onChange, placeholder, searchPlaceholder }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);
  const selected = options.find(o => String(o.value) === String(value));

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={ref}>
      <div
        className="input input-bordered input-success w-full flex items-center cursor-pointer justify-between h-auto min-h-[2.5rem] py-1.5"
        onClick={() => { setOpen(!open); setSearch(''); }}
      >
        <span className={`text-xs ${selected ? '' : 'text-gray-400'}`}>{selected ? selected.label : placeholder}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
        </svg>
      </div>
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-box shadow-lg max-h-60 overflow-auto">
          <input
            className="input input-bordered input-sm w-full mb-1 sticky top-0 bg-base-100"
            placeholder={searchPlaceholder || 'Cari...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          {filtered.length === 0 && <p className="p-2 text-sm text-gray-400">Tidak ditemukan</p>}
          {filtered.map(o => (
            <div
              key={o.value}
              className={`px-3 py-2 cursor-pointer text-sm hover:bg-base-300 ${String(o.value) === String(value) ? 'bg-base-300 font-semibold' : ''}`}
              onClick={() => { onChange(o.value); setOpen(false); }}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const cleanNumber = (value) => String(value || '').replace(/\D/g, '');
const formatRp = (value) => {
  if (!value) return '-';
  const number = Number(cleanNumber(value));
  if (!number) return '-';
  return `Rp ${number.toLocaleString('id-ID')}`;
};

export default function HargaKhususCustomer({ data, customers, bahan }) {
  const [search, setSearch] = useState(
    new URLSearchParams(window.location.search).get('search') || '',
  );

  const { delete: destroy } = useForm();
  const modalRef = useRef(null);
  const form = useForm({
    customer_id: '',
    id_bahan: '',
    hargabahan_id: '',
    harga: '',
  });

  const [selectedBahanId, setSelectedBahanId] = useState('');
  const selectedDatabahan = bahan.find((b) => String(b.id) === String(selectedBahanId));
  const hargaRows = selectedDatabahan?.harga_bahan || selectedDatabahan?.hargaBahan || [];

  useEffect(() => {
    const t = setTimeout(() => {
      router.get('/harga-khusus-customer', { search }, { preserveState: true, replace: true });
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  const openModal = () => {
    form.setData({ customer_id: '', id_bahan: '', hargabahan_id: '', harga: '' });
    form.clearErrors();
    setSelectedBahanId('');
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
    form.setData({ customer_id: '', id_bahan: '', hargabahan_id: '', harga: '' });
    form.clearErrors();
    setSelectedBahanId('');
  };

  const handleBahanSelect = (id) => {
    setSelectedBahanId(id);
    form.setData('id_bahan', id);
    form.setData('hargabahan_id', '');
  };

  const handleHargaRowSelect = (id) => {
    form.setData('hargabahan_id', id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.post('/harga-khusus-customer', {
      onSuccess: closeModal,
    });
  };

  const hapus = (id) => {
    if (confirm('Yakin ingin menghapus data harga khusus ini?')) {
      destroy('/harga-khusus-customer/' + id);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Harga Khusus Customer</h1>
          <p className="text-sm text-gray-500 mt-1">Daftar customer yang memiliki harga khusus pada bahan tertentu</p>
        </div>
        <button className="btn btn-success" onClick={openModal}>
          <i className="fas fa-plus"></i> Tambah Harga Khusus
        </button>
      </div>

      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body p-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              className="input input-bordered input-success w-full sm:w-80"
              placeholder="Cari nama customer / kode bahan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra table-sm w-full">
              <thead>
                <tr className="bg-base-200 text-sm">
                  <th>No</th>
                  <th>Customer</th>
                  <th>Kode Bahan</th>
                  <th>Nama Bahan</th>
                  <th>Sisi</th>
                  <th>Qty Min</th>
                  <th>Qty Max</th>
                  <th>Harga Umum</th>
                  <th>Harga Khusus</th>
                  <th>Selisih</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.data.length === 0 && (
                  <tr>
                    <td colSpan={11} className="text-center text-gray-400 py-8">
                      Tidak ada data harga khusus customer
                    </td>
                  </tr>
                )}
                {data.data.map((item, index) => {
                  const hargaUmum = Number(cleanNumber(item.hargabahan?.harga_umum)) || 0;
                  const hargaKhusus = Number(cleanNumber(item.harga)) || 0;
                  const selisih = hargaUmum - hargaKhusus;

                  return (
                    <tr key={item.id} className="hover">
                      <td>{data.from + index}</td>
                      <td>
                        <div className="font-medium">{item.customer?.nama || '-'}</div>
                        <div className="text-xs text-gray-400">{item.customer?.kode || ''}</div>
                      </td>
                      <td>
                        <span className="badge badge-outline badge-sm">{item.hargabahan?.kode_bahan || '-'}</span>
                      </td>
                      <td className="text-sm">{item.hargabahan?.databahan?.bahan || '-'}</td>
                      <td className="text-sm">{item.hargabahan?.sisi || '-'}</td>
                      <td className="text-sm">{item.hargabahan?.qty_min || '-'}</td>
                      <td className="text-sm">{item.hargabahan?.qty_max || '-'}</td>
                      <td className="text-sm">{formatRp(item.hargabahan?.harga_umum)}</td>
                      <td className="text-sm font-semibold text-success">{formatRp(item.harga)}</td>
                      <td className="text-sm">
                        {selisih > 0 ? (
                          <span className="text-success">-{formatRp(selisih)}</span>
                        ) : selisih < 0 ? (
                          <span className="text-error">+{formatRp(Math.abs(selisih))}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-error btn-xs"
                          onClick={() => hapus(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {data.last_page > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {data.links.map((link, i) => (
                <button
                  key={i}
                  className={`btn btn-xs ${link.active ? 'btn-success' : 'btn-ghost'} ${!link.url ? 'btn-disabled' : ''}`}
                  onClick={() => link.url && router.get(link.url)}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-2xl">
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          >
            x
          </button>
          <h3 className="text-lg font-bold mb-4">Tambah Harga Khusus Customer</h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Customer</span>
                </div>
                <SearchableSelect
                  options={customers.map((c) => ({ value: c.id, label: `${c.nama} (${c.kode}) - ${c.kategori}` }))}
                  value={form.data.customer_id}
                  onChange={(val) => form.setData('customer_id', val)}
                  placeholder="-- Pilih Customer --"
                  searchPlaceholder="Cari nama / kode customer..."
                />
                {form.errors.customer_id && (
                  <div className="label">
                    <span className="label-text-alt text-error">{form.errors.customer_id}</span>
                  </div>
                )}
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Kode Bahan</span>
                </div>
                <SearchableSelect
                  options={bahan.map((b) => ({ value: b.id, label: `${b.kode} - ${b.bahan}` }))}
                  value={selectedBahanId}
                  onChange={(val) => handleBahanSelect(val)}
                  placeholder="-- Pilih Bahan --"
                  searchPlaceholder="Cari kode / nama bahan..."
                />
              </label>

              {hargaRows.length > 0 && (
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Pilih Harga (Sisi / Qty)</span>
                  </div>
                  <SearchableSelect
                    options={hargaRows.map((hr) => ({
                      value: hr.id,
                      label: `${hr.sisi || 'Tanpa Sisi'} | Qty ${hr.qty_min || '0'}${hr.qty_max ? ` - ${hr.qty_max}` : ''} | Umum: ${formatRp(hr.harga_umum)}`,
                    }))}
                    value={form.data.hargabahan_id}
                    onChange={(val) => handleHargaRowSelect(val)}
                    placeholder="-- Pilih Harga --"
                    searchPlaceholder="Cari sisi / qty..."
                  />
                  {form.errors.hargabahan_id && (
                    <div className="label">
                      <span className="label-text-alt text-error">{form.errors.hargabahan_id}</span>
                    </div>
                  )}
                </label>
              )}

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Harga Khusus</span>
                </div>
                <input
                  type="text"
                  value={form.data.harga || ''}
                  className={`input input-bordered w-full ${form.errors.harga ? 'input-error' : 'input-success'}`}
                  placeholder="Masukkan harga khusus"
                  required
                  onChange={(e) => form.setData('harga', cleanNumber(e.target.value))}
                />
                {form.errors.harga && (
                  <div className="label">
                    <span className="label-text-alt text-error">{form.errors.harga}</span>
                  </div>
                )}
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={form.processing}
                className="btn btn-success"
              >
                <i className="fas fa-save"></i> Simpan
              </button>
              <button type="button" onClick={closeModal} className="btn btn-warning">
                Batal
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </AdminLayout>
  );
}
