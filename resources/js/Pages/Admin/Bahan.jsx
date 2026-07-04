import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, useForm } from '@inertiajs/react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useEffect, useRef, useState } from 'react';

function SearchableSelect({ options, value, onChange, placeholder }) {
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
            placeholder="Cari kode bahan..."
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

const initialBahan = {
  id: '',
  kode: '',
  bahan: '',
  kategori: '',
  satuan: '',
  jenis: '',
  kategori_cetak: '',
  jenis_bahan: '',
  klik: '',
  cara_perhitungan: '',
  sisi: '',
  qty_min: '',
  qty_max: '',
  harga_po: '',
  harga_umum: '',
  harga_khusus: '',
  harga_member: '',
  harga_custome: '',
};

const initialHarga = {
  id: '',
  kode_bahan: '',
  sisi: '',
  qty_min: '',
  qty_max: '',
  harga_po: '',
  harga_umum: '',
  harga_khusus: '',
  harga_member: '',
  harga_custome: '',
};

const kategoriOptions = ['DIGITAL', 'OFFSET'];
const satuanOptions = ['BLOK', 'KOTAK', 'LEMBAR', 'M2', 'PCS', 'RIM', 'LITER'];
const jenisOptions = ['INTERNAL', 'EKSTERNAL'];
const kategoriCetakOptions = [
  'INDOOR',
  'INDOOR 2',
  'OUTDOOR',
  'OUTDOOR 2',
  'DISPLAY',
  'OFFSET',
  'DLL',
];
const jenisBahanOptions = [
  'DLL',
  'DYE',
  'ECOSOLVENT',
  'OFFSET',
  'SOLVENT',
  'TONER',
  'DISPLAY',
  'UV',
];
const perhitunganOptions = ['QTY', 'LUAS', 'QTY KHUSUS'];

const colors = [
  '#e8f5e9', '#e3f2fd', '#fff3e0', '#f3e5f5', '#e0f7fa',
  '#fbe9e7', '#f1f8e9', '#e8eaf6', '#fffde7', '#fce4ec',
  '#e0f2f1', '#efebe9', '#f9fbe7', '#ede7f6', '#ffebee',
];

const getHargaRows = (item) => item?.harga_bahan || item?.hargaBahan || [];
const cleanNumber = (value) => String(value || '').replace(/\D/g, '');
const formatRp = (value) => {
  if (!value) return '-';
  const number = Number(cleanNumber(value));
  if (!number) return '-';
  return `Rp ${number.toLocaleString('id-ID')}`;
};

export default function Bahan({ databahan, kode, materbahans }) {
  const [search, setSearch] = useState(
    new URLSearchParams(window.location.search).get('search') || '',
  );
  const [selectedBahan, setSelectedBahan] = useState(null);
  const [hargaMode, setHargaMode] = useState('create');

  const uniqueKodes = [...new Set(databahan.data.map((i) => i.kode))];
  const colorMap = {};
  uniqueKodes.forEach((k, idx) => {
    colorMap[k] = colors[idx % colors.length];
  });

  const tambahBahanRef = useRef(null);
  const editBahanRef = useRef(null);
  const hargaRef = useRef(null);

  const bahanForm = useForm(initialBahan);
  const hargaForm = useForm(initialHarga);

  useEffect(() => {
    const t = setTimeout(() => {
      router.get('/bahan', { search }, { preserveState: true, replace: true });
    }, 500);

    return () => clearTimeout(t);
  }, [search]);

  const setBahanValue = (field, value) => bahanForm.setData(field, value);
  const setHargaValue = (field, value) => hargaForm.setData(field, value);

  const fillBahan = (item, includeHarga = false) => {
    const hb = includeHarga ? getHargaRows(item)[0] || {} : {};
    bahanForm.setData({
      ...initialBahan,
      id: item.id,
      kode: item.kode || '',
      bahan: item.bahan || '',
      kategori: item.kategori || '',
      satuan: item.satuan || '',
      jenis: item.jenis || '',
      kategori_cetak: item.kategori_cetak || '',
      jenis_bahan: item.jenis_bahan || '',
      klik: item.klik || '',
      cara_perhitungan: item.cara_perhitungan || '',
      sisi: hb.sisi || '',
      qty_min: hb.qty_min || '',
      qty_max: hb.qty_max || '',
      harga_po: hb.harga_po || '',
      harga_umum: hb.harga_umum || '',
      harga_khusus: hb.harga_khusus || '',
      harga_member: hb.harga_member || '',
      harga_custome: hb.harga_custome || '',
    });
  };

  const openTambahBahan = () => {
    bahanForm.setData(initialBahan);
    tambahBahanRef.current.showModal();
  };

  const closeTambahBahan = () => {
    tambahBahanRef.current.close();
    bahanForm.setData(initialBahan);
    bahanForm.clearErrors();
  };

  const openEditBahan = (item) => {
    setSelectedBahan(item);
    fillBahan(item);
    editBahanRef.current.showModal();
  };

  const closeEditBahan = () => {
    editBahanRef.current.close();
    bahanForm.setData(initialBahan);
    bahanForm.clearErrors();
  };

  const openTambahHarga = (item) => {
    setSelectedBahan(item);
    setHargaMode('create');
    hargaForm.setData({ ...initialHarga, kode_bahan: item.kode });
    hargaRef.current.showModal();
  };

  const openEditHarga = (item, harga) => {
    setSelectedBahan(item);
    setHargaMode('edit');
    hargaForm.setData({
      id: harga.id,
      kode_bahan: harga.kode_bahan || item.kode,
      sisi: harga.sisi || '',
      qty_min: harga.qty_min || '',
      qty_max: harga.qty_max || '',
      harga_po: harga.harga_po || '',
      harga_umum: harga.harga_umum || '',
      harga_khusus: harga.harga_khusus || '',
      harga_member: harga.harga_member || '',
      harga_custome: harga.harga_custome || '',
    });
    hargaRef.current.showModal();
  };

  const closeHarga = () => {
    hargaRef.current.close();
    hargaForm.setData(initialHarga);
    hargaForm.clearErrors();
  };

  const saveBahan = (e) => {
    e.preventDefault();
    bahanForm.post('/bahan', {
      onSuccess: closeTambahBahan,
    });
  };

  const updateBahan = (e) => {
    e.preventDefault();
    bahanForm.put(`/bahan/${bahanForm.data.id}`, {
      onSuccess: closeEditBahan,
    });
  };

  const deleteBahan = (id) => {
    if (confirm('Yakin ingin menghapus bahan dan semua harganya?')) {
      bahanForm.delete(`/bahan/${id}`, {
        onSuccess: closeEditBahan,
      });
    }
  };

  const duplicateBahan = () => {
    const source = { ...bahanForm.data, id: '', kode };
    closeEditBahan();
    bahanForm.setData(source);
    tambahBahanRef.current.showModal();
  };

  const saveHarga = (e) => {
    e.preventDefault();
    if (hargaMode === 'edit') {
      hargaForm.put(`/bahan/harga/${hargaForm.data.id}`, {
        onSuccess: closeHarga,
      });
      return;
    }

    hargaForm.post(`/bahan/${selectedBahan.kode}/harga`, {
      onSuccess: closeHarga,
    });
  };

  const deleteHarga = () => {
    if (confirm('Yakin ingin menghapus harga ini?')) {
      hargaForm.delete(`/bahan/harga/${hargaForm.data.id}`, {
        onSuccess: closeHarga,
      });
    }
  };

  const exportPDF = () => {
    try {
      const doc = new jsPDF('l', 'mm', 'a4');
      doc.setFontSize(16);
      doc.text('Data Bahan', 14, 20);
      doc.setFontSize(10);
      doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 14, 27);

      const rows = databahan.data.flatMap((item, index) => {
        const hargaRows = getHargaRows(item);
        const list = hargaRows.length ? hargaRows : [{}];

        return list.map((hb, hargaIndex) => [
          hargaIndex === 0 ? index + 1 : '',
          hargaIndex === 0 ? item.kode : '',
          hargaIndex === 0 ? item.bahan : '',
          hargaIndex === 0 ? item.satuan : '',
          hargaIndex === 0 ? item.kategori : '',
          hargaIndex === 0 ? item.jenis : '',
          hb.sisi || '-',
          hb.qty_min || '-',
          hb.qty_max || '-',
          formatRp(hb.harga_po),
          formatRp(hb.harga_umum),
          formatRp(hb.harga_khusus),
          formatRp(hb.harga_member),
          formatRp(hb.harga_custome),
        ]);
      });

      autoTable(doc, {
        startY: 32,
        head: [
          [
            'No',
            'Kode',
            'Bahan',
            'Satuan',
            'Kategori',
            'Jenis',
            'Sisi',
            'Qty Min',
            'Qty Max',
            'Harga PO',
            'Harga Umum',
            'Harga Khusus',
            'Harga Member',
            'Harga Custom',
          ],
        ],
        body: rows,
        styles: { fontSize: 7 },
        headStyles: { fillColor: [22, 163, 74] },
        theme: 'grid',
      });

      doc.save('data_bahan.pdf');
    } catch (error) {
      console.error('Gagal export PDF:', error);
      alert(`Gagal mengexport PDF: ${error.message}`);
    }
  };

  const renderSelect = (label, field, options, form, setter, required = true) => (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        value={form.data[field]}
        className="select select-bordered select-success w-full"
        required={required}
        onChange={(e) => setter(field, e.target.value)}
      >
        <option value="">-- Pilih {label} --</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );

  const renderText = (
    label,
    field,
    form,
    setter,
    required = false,
    numeric = false,
  ) => (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="text"
        value={form.data[field] || ''}
        className="input input-bordered input-success w-full"
        required={required}
        onChange={(e) =>
          setter(field, numeric ? cleanNumber(e.target.value) : e.target.value)
        }
      />
    </label>
  );

  const kodeOptions = (materbahans || []).map(m => ({
    value: m.kode_bahan_jual,
    label: m.kode_bahan_jual,
    satuan: m.satuan,
  }));

  const renderBahanFields = (includeHarga = false) => (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <label className="form-control">
        <div className="label">
          <span className="label-text">Kode</span>
        </div>
        <SearchableSelect
          options={kodeOptions}
          value={bahanForm.data.kode}
          onChange={(val) => {
            setBahanValue('kode', val);
            const m = (materbahans || []).find(x => x.kode_bahan_jual === val);
            if (m) setBahanValue('satuan', m.satuan || '');
          }}
          placeholder="Pilih Kode Bahan"
        />
      </label>
      {renderText('Nama Bahan', 'bahan', bahanForm, setBahanValue, true)}
      {renderSelect(
        'Kategori',
        'kategori',
        kategoriOptions,
        bahanForm,
        setBahanValue,
      )}
      {renderSelect('Satuan', 'satuan', satuanOptions, bahanForm, setBahanValue)}
      {renderSelect('Jenis', 'jenis', jenisOptions, bahanForm, setBahanValue)}
      {renderSelect(
        'Kategori Cetak',
        'kategori_cetak',
        kategoriCetakOptions,
        bahanForm,
        setBahanValue,
      )}
      {renderSelect(
        'Jenis Bahan',
        'jenis_bahan',
        jenisBahanOptions,
        bahanForm,
        setBahanValue,
      )}
      {renderSelect(
        'Cara Perhitungan',
        'cara_perhitungan',
        perhitunganOptions,
        bahanForm,
        setBahanValue,
      )}
      {renderText('Klik', 'klik', bahanForm, setBahanValue, true)}

      {includeHarga && (
        <>
          <div className="divider col-span-full my-1">Harga Awal</div>
          {renderText('Sisi', 'sisi', bahanForm, setBahanValue)}
          {renderText('Qty Min', 'qty_min', bahanForm, setBahanValue, false, true)}
          {renderText('Qty Max', 'qty_max', bahanForm, setBahanValue, false, true)}
          {renderText('Harga PO', 'harga_po', bahanForm, setBahanValue, false, true)}
          {renderText(
            'Harga Umum',
            'harga_umum',
            bahanForm,
            setBahanValue,
            false,
            true,
          )}
          {renderText(
            'Harga Khusus',
            'harga_khusus',
            bahanForm,
            setBahanValue,
            false,
            true,
          )}
          {renderText(
            'Harga Member',
            'harga_member',
            bahanForm,
            setBahanValue,
            false,
            true,
          )}
          {renderText(
            'Harga Custom',
            'harga_custome',
            bahanForm,
            setBahanValue,
            false,
            true,
          )}
        </>
      )}
    </div>
  );

  const renderHargaFields = () => (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <label className="form-control">
        <div className="label">
          <span className="label-text">Kode Bahan</span>
        </div>
        <input
          type="text"
          value={hargaForm.data.kode_bahan || ''}
          className="input input-bordered input-success w-full"
          readOnly
          required
        />
      </label>
      {renderText('Sisi', 'sisi', hargaForm, setHargaValue)}
      {renderText('Qty Min', 'qty_min', hargaForm, setHargaValue, false, true)}
      {renderText('Qty Max', 'qty_max', hargaForm, setHargaValue, false, true)}
      {renderText('Harga PO', 'harga_po', hargaForm, setHargaValue, false, true)}
      {renderText(
        'Harga Umum',
        'harga_umum',
        hargaForm,
        setHargaValue,
        false,
        true,
      )}
      {renderText(
        'Harga Khusus',
        'harga_khusus',
        hargaForm,
        setHargaValue,
        false,
        true,
      )}
      {renderText(
        'Harga Member',
        'harga_member',
        hargaForm,
        setHargaValue,
        false,
        true,
      )}
      {renderText(
        'Harga Custom',
        'harga_custome',
        hargaForm,
        setHargaValue,
        false,
        true,
      )}
    </div>
  );

  return (
    <AdminLayout>
      <div className="grid grid-cols-1">
        <div className="card border border-base-300 bg-base-100 shadow-md">
          <div className="card-body">
            <div className="mb-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="card-title">Data Bahan</h2>
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-primary" onClick={exportPDF}>
                  <i className="fas fa-file-pdf"></i> Export PDF
                </button>
                <button className="btn btn-success" onClick={openTambahBahan}>
                  <i className="fas fa-plus"></i> Tambah Bahan
                </button>
              </div>
            </div>

            <div className="mb-3">
              <input
                type="text"
                placeholder="Cari kode, bahan, sisi, atau qty..."
                className="input input-bordered input-success w-full max-w-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Kode</th>
                    <th>Bahan</th>
                    <th>Satuan</th>
                    <th>Kategori</th>
                    <th>Jenis</th>
                    <th>Kategori Cetak</th>
                    <th>Jenis Bahan</th>
                    <th>Klik</th>
                    <th>Perhitungan</th>
                    <th>Sisi</th>
                    <th>Qty Min</th>
                    <th>Qty Max</th>
                    <th>Harga PO</th>
                    <th>Harga Umum</th>
                    <th>Harga Khusus</th>
                    <th>Harga Member</th>
                    <th>Harga Custom</th>
                    <th className="sticky right-0 z-10 bg-base-100 shadow-[-4px_0_6px_-4px_rgba(0,0,0,0.1)]">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {databahan.data.map((item, index) => {
                    const hargaRows = getHargaRows(item);
                    const rows = hargaRows.length ? hargaRows : [{}];
                    const isLastItem = index === databahan.data.length - 1;
                    const bgColor = colorMap[item.kode];

                    return rows.map((hb, hargaIndex) => {
                      const isLastRow = hargaIndex === rows.length - 1;

                      return (
                        <tr
                          key={`${item.id}-${hb.id || 'kosong'}-${hargaIndex}`}
                          className={`hover:brightness-95${!isLastItem && isLastRow ? ' border-b-2 border-b-base-content/20' : ''}`}
                          style={{ backgroundColor: bgColor }}>
                          {hargaIndex === 0 && (
                            <>
                              <td rowSpan={rows.length}>{databahan.from + index}</td>
                              <td rowSpan={rows.length} className="font-semibold">{item.kode}</td>
                              <td rowSpan={rows.length}>{item.bahan}</td>
                              <td rowSpan={rows.length}>{item.satuan}</td>
                              <td rowSpan={rows.length}>{item.kategori}</td>
                              <td rowSpan={rows.length}>{item.jenis}</td>
                              <td rowSpan={rows.length}>{item.kategori_cetak}</td>
                              <td rowSpan={rows.length}>{item.jenis_bahan}</td>
                              <td rowSpan={rows.length}>{item.klik}</td>
                              <td rowSpan={rows.length}>{item.cara_perhitungan}</td>
                            </>
                          )}
                          <td>{hb.sisi || '-'}</td>
                          <td>{hb.qty_min || '-'}</td>
                          <td>{hb.qty_max || '-'}</td>
                          <td>{formatRp(hb.harga_po)}</td>
                          <td>{formatRp(hb.harga_umum)}</td>
                          <td>{formatRp(hb.harga_khusus)}</td>
                          <td>{formatRp(hb.harga_member)}</td>
                          <td>{formatRp(hb.harga_custome)}</td>
                          <td
                            className="sticky right-0 z-10 shadow-[-4px_0_6px_-4px_rgba(0,0,0,0.1)]"
                            style={{ backgroundColor: bgColor }}>
                            <div className="flex min-w-44 flex-wrap gap-1">
                              {hargaIndex === 0 && (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-warning btn-xs"
                                    onClick={() => openEditBahan(item)}
                                  >
                                    <i className="fas fa-pen"></i> Bahan
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-xs"
                                    onClick={() => openTambahHarga(item)}
                                  >
                                    <i className="fas fa-plus"></i> Harga
                                  </button>
                                </>
                              )}
                              {hb.id && (
                                <button
                                  type="button"
                                  className="btn btn-info btn-xs"
                                  onClick={() => openEditHarga(item, hb)}
                                >
                                  <i className="fas fa-tags"></i> Harga
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    });
                  })}
                </tbody>
              </table>
            </div>

            {databahan.links && (
              <div className="join mt-4 flex justify-center">
                {databahan.links.map((link, i) => (
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

      <dialog ref={tambahBahanRef} className="modal">
        <div className="modal-box max-w-4xl">
          <button
            type="button"
            onClick={closeTambahBahan}
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          >
            x
          </button>
          <h3 className="mb-4 text-lg font-bold">Tambah Bahan</h3>
          <form onSubmit={saveBahan}>
            {renderBahanFields(true)}
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={bahanForm.processing}
                className="btn btn-success"
              >
                <i className="fas fa-save"></i> Simpan
              </button>
              <button type="button" onClick={closeTambahBahan} className="btn btn-error">
                Batal
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog ref={editBahanRef} className="modal">
        <div className="modal-box max-w-4xl">
          <button
            type="button"
            onClick={closeEditBahan}
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          >
            x
          </button>
          <h3 className="mb-4 text-lg font-bold">Edit Bahan</h3>
          <form onSubmit={updateBahan}>
            {renderBahanFields(false)}
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={bahanForm.processing}
                className="btn btn-success"
              >
                <i className="fas fa-save"></i> Update
              </button>
              <button type="button" onClick={closeEditBahan} className="btn btn-warning">
                Batal
              </button>
              <button
                type="button"
                onClick={() => deleteBahan(bahanForm.data.id)}
                className="btn btn-error"
              >
                <i className="fas fa-trash"></i> Hapus
              </button>
              <button type="button" onClick={duplicateBahan} className="btn btn-info">
                <i className="fas fa-copy"></i> Duplikat
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog ref={hargaRef} className="modal">
        <div className="modal-box max-w-3xl">
          <button
            type="button"
            onClick={closeHarga}
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          >
            x
          </button>
          <h3 className="mb-1 text-lg font-bold">
            {hargaMode === 'edit' ? 'Edit Harga Bahan' : 'Tambah Harga Bahan'}
          </h3>
          <p className="mb-4 text-sm text-base-content/70">
            {selectedBahan?.kode} - {selectedBahan?.bahan}
          </p>
          <form onSubmit={saveHarga}>
            {renderHargaFields()}
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={hargaForm.processing}
                className="btn btn-success"
              >
                <i className="fas fa-save"></i>{' '}
                {hargaMode === 'edit' ? 'Update' : 'Simpan'}
              </button>
              <button type="button" onClick={closeHarga} className="btn btn-warning">
                Batal
              </button>
              {hargaMode === 'edit' && (
                <button type="button" onClick={deleteHarga} className="btn btn-error">
                  <i className="fas fa-trash"></i> Hapus Harga
                </button>
              )}
            </div>
          </form>
        </div>
      </dialog>
    </AdminLayout>
  );
}
