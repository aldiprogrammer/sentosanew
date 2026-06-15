import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function PoEksternal({ poEksternal, no_po, bahans, suplayers, distributors }) {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    router.get('/po-eksternal', { search }, { preserveState: true, replace: true });
  };

  useEffect(() => {
    const t = setTimeout(() => {
      router.get('/po-eksternal', { search }, { preserveState: true, replace: true });
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  const {
    data,
    setData,
    post,
    delete: destroy,
    put,
    processing,
    reset,
  } = useForm({
    id: 0,
    tgl: new Date().toISOString().split('T')[0],
    no_po: no_po,
    hal: "",
    id_distributor: "",
    mata_uang: "",
    batas_bayar: "",
    id_suplayer: "",
    invoice: "",
    id_bahan: "",
    spk: "",
    tinggi: "",
    lebar: "",
    luas: "",
    qty: "",
    harga: "",
    total: "",
    keterangan: "",
  });

  const modalRef = useRef(null);
  const editmodalRef = useRef(null);

  const openModal = () => {
    modalRef.current.showModal();
    setData("no_po", no_po);
    setData("tgl", new Date().toISOString().split('T')[0]);
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const hitungBatasBayar = (idSuplayer, tgl) => {
    const sup = suplayers.find((s) => s.id === parseInt(idSuplayer));
    if (!sup?.jatuh_tempo) return "";
    const days = parseInt(sup.jatuh_tempo);
    if (isNaN(days)) return "";
    const date = new Date(tgl || new Date());
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  const cariInvoice = async (invoice) => {
    if (!invoice) return;
    try {
      const res = await axios.get("/po-eksternal/cari-invoice", { params: { invoice } });
      const d = res.data.data;
      if (d) {
        setData("id_bahan", d.id_bahan);
        setData("spk", d.kode_spk);
        setData("lebar", d.lebar);
        setData("tinggi", d.tinggi);
        setData("harga", d.harga);
        setData("qty", d.qty);
      }
    } catch { }
  };

  const hitungLuas = (tinggi, lebar) => {
    const t = parseFloat(tinggi) || 0;
    const l = parseFloat(lebar) || 0;
    return t * l;
  };

  const hitungTotal = (luas, qty, harga) => {
    const l = parseFloat(luas) || 0;
    const q = parseFloat(qty) || 0;
    const h = parseFloat(harga) || 0;
    return l * q * h;
  };

  useEffect(() => {
    const luas = hitungLuas(data.tinggi, data.lebar);
    setData("luas", luas);
    const total = hitungTotal(luas, data.qty, data.harga);
    setData("total", total);
  }, [data.tinggi, data.lebar, data.qty, data.harga]);

  const openModalEdit = (item) => {
    editmodalRef.current.showModal();
    setData({
      id: item.id,
      tgl: item.tgl,
      no_po: item.no_po,
      hal: item.hal || "",
      id_distributor: item.id_distributor?.toString() || "",
      mata_uang: item.mata_uang || "",
      batas_bayar: item.batas_bayar || "",
      id_suplayer: item.id_suplayer?.toString() || "",
      invoice: item.invoice || "",
      id_bahan: item.id_bahan?.toString() || "",
      spk: item.spk || "",
      tinggi: item.tinggi?.toString() || "",
      lebar: item.lebar?.toString() || "",
      luas: item.luas?.toString() || "",
      qty: item.qty?.toString() || "",
      harga: item.harga?.toString() || "",
      total: item.total?.toString() || "",
      keterangan: item.keterangan || "",
    });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
  };

  const save = (e) => {
    e.preventDefault();
    post("/po-eksternal", {
      onSuccess: () => {
        reset();
        closeModal();
        setData("tgl", new Date().toISOString().split('T')[0]);
        setData("no_po", no_po);
      },
    });
  };

  const hapus = (id) => {
    if (confirm("Yakin ingin menghapus PO ini?")) {
      destroy("/po-eksternal/" + id);
      closeModalEdit();
    }
  };

  const update = (e) => {
    e.preventDefault();
    put("/po-eksternal/" + data.id, {
      onSuccess: () => {
        closeModalEdit();
        reset();
      },
    });
  };

  const formatRp = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "-";
    return "Rp " + num.toLocaleString("id-ID");
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-4">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
              <h2 className="card-title">PO Eksternal</h2>
              <button className="btn btn-success" onClick={openModal}>
                <i className="fas fa-plus"></i> Tambah PO
              </button>
            </div>

            <div className="mb-3">
              <input
                type="text"
                placeholder="Cari No PO / Invoice / SPK..."
                className="input input-bordered input-success w-full max-w-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Tgl</th>
                    <th>No PO</th>
                    <th>Hal</th>

                    <th>Mata Uang</th>
                    <th>Batas Bayar</th>
                    <th>Suplayer</th>
                    <th>Invoice</th>
                    <th>Bahan</th>
                    <th>SPK</th>
                    <th>Tinggi</th>
                    <th>Lebar</th>
                    <th>Luas</th>
                    <th>Qty</th>
                    <th>Harga</th>
                    <th>Total</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {poEksternal.data.map((item, index) => (
                    <tr
                      key={item.id}
                      onClick={() => openModalEdit(item)}
                      className="cursor-pointer hover:bg-base-200"
                    >
                      <td>{poEksternal.from + index}</td>
                      <td>{item.tgl}</td>
                      <td className="font-semibold">{item.no_po}</td>
                      <td>{item.hal || "-"}</td>

                      <td>{item.mata_uang || "-"}</td>
                      <td>{item.batas_bayar || "-"}</td>
                      <td>{item.suplayer?.nama_suplayer || "-"}</td>
                      <td>{item.invoice || "-"}</td>
                      <td>{item.bahan?.bahan || "-"}</td>
                      <td>{item.spk || "-"}</td>
                      <td>{item.tinggi}</td>
                      <td>{item.lebar}</td>
                      <td>{item.luas}</td>
                      <td>{item.qty}</td>
                      <td>{formatRp(item.harga)}</td>
                      <td>{formatRp(item.total)}</td>
                      <td>{item.keterangan || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {poEksternal.links && (
              <div className="flex justify-center mt-4 join">
                {poEksternal.links.map((link, i) => (
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
        <div className="modal-box max-w-3xl">
          <button type="button" onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="text-lg font-bold mb-4">Tambah PO Eksternal</h3>
          <form onSubmit={save}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-100 px-2 py-2 rounded-lg">
                <label className="form-control">
                  <div className="label"><span className="label-text">Tanggal</span></div>
                  <input type="date" value={data.tgl} className="input input-bordered input-success w-full" required onChange={(e) => setData("tgl", e.target.value)} />
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">No PO</span></div>
                  <input type="text" value={data.no_po} className="input input-bordered w-full bg-base-200" readOnly />
                </label>
              </div>
              <div className="bg-gray-100 px-2 rounded-lg py-2" >
                <label className="form-control">
                  <div className="label"><span className="label-text">Hal</span></div>
                  <input type="text" value={data.hal} className="input input-bordered input-success w-full" onChange={(e) => setData("hal", e.target.value)} />
                </label>
                <div className="grid lg:grid-cols-2 gap-2">
                  <label className="form-control">
                    <div className="label"><span className="label-text">Suplayer</span></div>
                    <select value={data.id_suplayer} className="select select-bordered select-success w-full" onChange={(e) => {
                      setData("id_suplayer", e.target.value);
                      setData("batas_bayar", hitungBatasBayar(e.target.value, data.tgl));
                    }}>
                      <option value="">-- Pilih Suplayer --</option>
                      {suplayers.map((s) => (
                        <option key={s.id} value={s.id}>{s.nama_suplayer}</option>
                      ))}
                    </select>
                  </label>
                  {/* <label className="form-control">
                    <div className="label"><span className="label-text">Distributor</span></div>
                    <select value={data.id_distributor} className="select select-bordered select-success w-full" onChange={(e) => setData("id_distributor", e.target.value)}>
                      <option value="">-- Pilih Distributor --</option>
                      {distributors.map((d) => (
                        <option key={d.id} value={d.id}>{d.nama}</option>
                      ))}
                    </select>
                  </label> */}
                  <label className="form-control">
                    <div className="label"><span className="label-text">Mata Uang</span></div>
                    <select value={data.mata_uang} className="select select-bordered select-success w-full" onChange={(e) => setData("mata_uang", e.target.value)}>
                      <option value="">-- Pilih Mata Uang --</option>
                      <option value="IDR">IDR</option>
                      <option value="USD">USD</option>
                    </select>
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Batas Bayar</span></div>
                    <input type="date" value={data.batas_bayar} className="input input-bordered input-success w-full" onChange={(e) => setData("batas_bayar", e.target.value)} />
                  </label>
                </div>
              </div>
            </div>

            <div className="divider mt-6">Detail Item</div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="bg-gray-100 p-2 rounded-lg">
                <label className="form-control">
                  <div className="label"><span className="label-text">Invoice</span></div>
                  <input type="text" value={data.invoice} className="input input-bordered input-success w-full" onChange={(e) => setData("invoice", e.target.value)} onBlur={(e) => cariInvoice(e.target.value)} />
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">Bahan</span></div>
                  <select value={data.id_bahan} className="select select-bordered select-success w-full" onChange={(e) => setData("id_bahan", e.target.value)}>
                    <option value="">-- Pilih Bahan --</option>
                    {bahans.map((b) => (
                      <option key={b.id} value={b.id}>{b.bahan}</option>
                    ))}
                  </select>
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">SPK</span></div>
                  <input type="text" value={data.spk} className="input input-bordered input-success w-full" onChange={(e) => setData("spk", e.target.value)} />
                </label>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  <label className="form-control">
                    <div className="label"><span className="label-text">Lebar</span></div>
                    <input type="number" step="0.01" value={data.lebar} className="input input-bordered input-success w-full" onChange={(e) => setData("lebar", e.target.value)} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Tinggi</span></div>
                    <input type="number" step="0.01" value={data.tinggi} className="input input-bordered input-success w-full" onChange={(e) => setData("tinggi", e.target.value)} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Luas</span></div>
                    <input type="text" value={data.luas} className="input input-bordered w-full bg-base-200" readOnly />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Qty</span></div>
                    <input type="number" step="0.01" value={data.qty} className="input input-bordered input-success w-full" onChange={(e) => setData("qty", e.target.value)} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Harga</span></div>
                    <input type="number" step="0.01" value={data.harga} className="input input-bordered input-success w-full" onChange={(e) => setData("harga", e.target.value)} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Total</span></div>
                    <input type="text" value={data.total} className="input input-bordered w-full bg-base-200" readOnly />
                  </label>
                </div>
                <label className="form-control mt-2">
                  <div className="label"><span className="label-text">Keterangan</span></div>
                  <textarea value={data.keterangan} className="textarea textarea-bordered textarea-success w-full" rows="2" onChange={(e) => setData("keterangan", e.target.value)}></textarea>
                </label>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button type="submit" disabled={processing} className="btn btn-success"><i className="fas fa-save"></i> Simpan</button>
              <button type="button" onClick={closeModal} className="btn btn-error">Batal</button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog ref={editmodalRef} className="modal">
        <div className="modal-box max-w-3xl">
          <button type="button" onClick={closeModalEdit} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="text-lg font-bold mb-4">Edit PO Eksternal</h3>
          <form onSubmit={update}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-100 px-2 py-2 rounded-lg">
                <label className="form-control">
                  <div className="label"><span className="label-text">Tanggal</span></div>
                  <input type="date" value={data.tgl} className="input input-bordered input-success w-full" required onChange={(e) => setData("tgl", e.target.value)} />
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">No PO</span></div>
                  <input type="text" value={data.no_po} className="input input-bordered w-full bg-base-200" readOnly />
                </label>
              </div>
              <div className="bg-gray-100 px-2 py-2 rounded-lg">
                <label className="form-control">
                  <div className="label"><span className="label-text">Hal</span></div>
                  <input type="text" value={data.hal} className="input input-bordered input-success w-full" onChange={(e) => setData("hal", e.target.value)} />
                </label>
                <div className="grid lg:grid-cols-2 gap-2">
                  <label className="form-control">
                    <div className="label"><span className="label-text">Suplayer</span></div>
                    <select value={data.id_suplayer} className="select select-bordered select-success w-full" onChange={(e) => {
                      setData("id_suplayer", e.target.value);
                      setData("batas_bayar", hitungBatasBayar(e.target.value, data.tgl));
                    }}>
                      <option value="">-- Pilih Suplayer --</option>
                      {suplayers.map((s) => (
                        <option key={s.id} value={s.id}>{s.nama_suplayer}</option>
                      ))}
                    </select>
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Distributor</span></div>
                    <select value={data.id_distributor} className="select select-bordered select-success w-full" onChange={(e) => setData("id_distributor", e.target.value)}>
                      <option value="">-- Pilih Distributor --</option>
                      {distributors.map((d) => (
                        <option key={d.id} value={d.id}>{d.nama}</option>
                      ))}
                    </select>
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Mata Uang</span></div>
                    <select value={data.mata_uang} className="select select-bordered select-success w-full" onChange={(e) => setData("mata_uang", e.target.value)}>
                      <option value="">-- Pilih Mata Uang --</option>
                      <option value="IDR">IDR</option>
                      <option value="USD">USD</option>
                    </select>
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Batas Bayar</span></div>
                    <input type="date" value={data.batas_bayar} className="input input-bordered input-success w-full" onChange={(e) => setData("batas_bayar", e.target.value)} />
                  </label>
                </div>
              </div>
            </div>

            <div className="divider mt-6">Detail Item</div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="bg-gray-100 p-2 rounded-lg">
                <label className="form-control">
                  <div className="label"><span className="label-text">Invoice</span></div>
                  <input type="text" value={data.invoice} className="input input-bordered input-success w-full" onChange={(e) => setData("invoice", e.target.value)} onBlur={(e) => cariInvoice(e.target.value)} />
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">Bahan</span></div>
                  <select value={data.id_bahan} className="select select-bordered select-success w-full" onChange={(e) => setData("id_bahan", e.target.value)}>
                    <option value="">-- Pilih Bahan --</option>
                    {bahans.map((b) => (
                      <option key={b.id} value={b.id}>{b.bahan}</option>
                    ))}
                  </select>
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">SPK</span></div>
                  <input type="text" value={data.spk} className="input input-bordered input-success w-full" onChange={(e) => setData("spk", e.target.value)} />
                </label>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  <label className="form-control">
                    <div className="label"><span className="label-text">Lebar</span></div>
                    <input type="number" step="0.01" value={data.lebar} className="input input-bordered input-success w-full" onChange={(e) => setData("lebar", e.target.value)} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Tinggi</span></div>
                    <input type="number" step="0.01" value={data.tinggi} className="input input-bordered input-success w-full" onChange={(e) => setData("tinggi", e.target.value)} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Luas</span></div>
                    <input type="text" value={data.luas} className="input input-bordered w-full bg-base-200" readOnly />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Qty</span></div>
                    <input type="number" step="0.01" value={data.qty} className="input input-bordered input-success w-full" onChange={(e) => setData("qty", e.target.value)} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Harga</span></div>
                    <input type="number" step="0.01" value={data.harga} className="input input-bordered input-success w-full" onChange={(e) => setData("harga", e.target.value)} />
                  </label>
                  <label className="form-control">
                    <div className="label"><span className="label-text">Total</span></div>
                    <input type="text" value={data.total} className="input input-bordered w-full bg-base-200" readOnly />
                  </label>
                </div>
                <label className="form-control mt-2">
                  <div className="label"><span className="label-text">Keterangan</span></div>
                  <textarea value={data.keterangan} className="textarea textarea-bordered textarea-success w-full" rows="2" onChange={(e) => setData("keterangan", e.target.value)}></textarea>
                </label>
              </div>
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
