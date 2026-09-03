import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";

export default function PoPembelianBahan({ po, no_po, suplayers }) {
  const { url } = usePage();
  const initialParams = new URLSearchParams(url.split("?")[1] || "");
  const [search, setSearch] = useState(initialParams.get("search") || "");
  const [tglDari, setTglDari] = useState(initialParams.get("tgl_dari") || "");
  const [tglSampai, setTglSampai] = useState(initialParams.get("tgl_sampai") || "");
  const [bulan, setBulan] = useState(initialParams.get("bulan") || "");
  const [page, setPage] = useState(initialParams.get("page") || "");

  const formatRp = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "-";
    return "Rp " + num.toLocaleString("id-ID");
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
    if (page) params.page = page;
    return params;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.get("/po-pembelian-bahan", buildFilters(), { preserveState: true, replace: true });
  };

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const t = setTimeout(() => {
      router.get("/po-pembelian-bahan", buildFilters(), { preserveState: true, replace: true });
    }, 500);
    return () => clearTimeout(t);
  }, [search, tglDari, tglSampai, bulan, page]);

  const resetFilters = () => {
    setSearch("");
    setTglDari("");
    setTglSampai("");
    setBulan("");
    setPage("");
    router.get("/po-pembelian-bahan", {}, { preserveState: true, replace: true });
  };

  const { data, setData, post, delete: destroy, put, processing, reset } = useForm({
    id: 0,
    tgl: new Date().toISOString().split("T")[0],
    no_po: no_po,
    id_suplayer: "",
    hal: "",
    pembayaran: "",
  });

  const modalRef = useRef(null);
  const editmodalRef = useRef(null);

  const openModal = () => {
    modalRef.current.showModal();
    setData("no_po", no_po);
    setData("tgl", new Date().toISOString().split("T")[0]);
  };

  const closeModal = () => modalRef.current.close();

  const openModalEdit = (item) => {
    editmodalRef.current.showModal();
    setData({
      id: item.id,
      tgl: item.tgl,
      no_po: item.no_po,
      id_suplayer: item.id_suplayer?.toString() || "",
      hal: item.hal || "",
      pembayaran: item.pembayaran || "",
    });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
  };

  const save = (e) => {
    e.preventDefault();
    post("/po-pembelian-bahan", {
      onSuccess: () => {
        reset();
        closeModal();
        setData("tgl", new Date().toISOString().split("T")[0]);
        setData("no_po", no_po);
      },
    });
  };

  const hapus = (id) => {
    if (confirm("Yakin ingin menghapus PO ini?")) {
      destroy("/po-pembelian-bahan/" + id);
      closeModalEdit();
    }
  };

  const update = (e) => {
    e.preventDefault();
    put("/po-pembelian-bahan/" + data.id, {
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
              <h2 className="card-title">PO Pembelian Bahan</h2>
              <div className="flex gap-2">
                <a
                  href={"/po-pembelian-bahan/pdf" + (() => {
                    const p = buildFilters();
                    const qs = new URLSearchParams(p).toString();
                    return qs ? "?" + qs : "";
                  })()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-info"
                >
                  <i className="fas fa-file-pdf"></i> Export PDF
                </a>
                <button className="btn btn-success" onClick={openModal}>
                  <i className="fas fa-plus"></i> Tambah PO
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end gap-3 mb-3">
              <label className="form-control">
                <div className="label"><span className="label-text text-xs">Cari No PO / Suplayer</span></div>
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
                  onChange={handleFilterChange(setBulan)}
                />
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text text-xs">Dari Tanggal</span></div>
                <input
                  type="date"
                  className="input input-bordered input-success input-sm"
                  value={tglDari}
                  onChange={handleFilterChange(setTglDari)}
                  disabled={!!bulan}
                />
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text text-xs">Sampai Tanggal</span></div>
                <input
                  type="date"
                  className="input input-bordered input-success input-sm"
                  value={tglSampai}
                  onChange={handleFilterChange(setTglSampai)}
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
                    <th>Tgl</th>
                    <th>No PO</th>
                    <th>Suplayer</th>
                    <th>Hal</th>
                    <th>Pembayaran</th>
                    <th>Diskon</th>
                    <th>PPN</th>
                    <th>Sub Total</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {po.data.map((item, index) => (
                    <tr key={item.id} onClick={() => openModalEdit(item)} className="cursor-pointer hover:bg-base-200">
                      <td>{po.from + index}</td>
                      <td>{item.tgl}</td>
                      <td className="font-semibold">{item.no_po}</td>
                      <td>{item.suplayer?.nama_suplayer || "-"}</td>
                      <td>{item.hal || "-"}</td>
                      <td>{item.pembayaran || "-"}</td>
                      <td>{item.diskon ? (item.diskon_type === 'rupiah' ? formatRp(item.diskon) : item.diskon + "%") : "-"}</td>
                      <td>{item.ppn ? item.ppn + "%" : "-"}</td>
                      <td>{formatRp(item.sub_total)}</td>
                      <td>
                        <Link href={"/po-pembelian-bahan/" + item.id + "/detail" + (url.includes("?") ? "?" : "") + (url.split("?")[1] || "")} preserveState className="btn btn-xs btn-info" onClick={(e) => e.stopPropagation()}>
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {po.links && (
              <div className="flex justify-center mt-4 join">
                {po.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.url || "#"}
                    className={`btn btn-sm join-item ${link.active ? "btn-success" : ""} ${!link.url ? "btn-disabled" : ""}`}
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
        <div className="modal-box max-w-xl">
          <button type="button" onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="text-lg font-bold mb-4">Tambah PO Pembelian Bahan</h3>
          <form onSubmit={save}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <label className="form-control">
                  <div className="label"><span className="label-text">Tanggal</span></div>
                  <input type="date" value={data.tgl} className="input input-bordered input-success w-full" required onChange={(e) => setData("tgl", e.target.value)} />
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">No PO</span></div>
                  <input type="text" value={data.no_po} className="input input-bordered input-success w-full" onChange={(e) => setData("no_po", e.target.value)} />
                </label>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg">
                <label className="form-control">
                  <div className="label"><span className="label-text">Suplayer</span></div>
                  <select value={data.id_suplayer} className="select select-bordered select-success w-full" onChange={(e) => setData("id_suplayer", e.target.value)}>
                    <option value="">-- Pilih Suplayer --</option>
                    {suplayers.map((s) => (
                      <option key={s.id} value={s.id}>{s.nama_suplayer}</option>
                    ))}
                  </select>
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">Hal</span></div>
                  <input type="text" value={data.hal} className="input input-bordered input-success w-full" onChange={(e) => setData("hal", e.target.value)} />
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">Pembayaran</span></div>
                  <select value={data.pembayaran} className="select select-bordered select-success w-full" onChange={(e) => setData("pembayaran", e.target.value)}>
                    <option value="">-- Pilih Pembayaran --</option>
                    <option value="CASH">CASH</option>
                    <option value="CREDIT">CREDIT</option>
                  </select>
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
        <div className="modal-box max-w-xl">
          <button type="button" onClick={closeModalEdit} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="text-lg font-bold mb-4">Edit PO Pembelian Bahan</h3>
          <form onSubmit={update}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <label className="form-control">
                  <div className="label"><span className="label-text">Tanggal</span></div>
                  <input type="date" value={data.tgl} className="input input-bordered input-success w-full" required onChange={(e) => setData("tgl", e.target.value)} />
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">No PO</span></div>
                  <input type="text" value={data.no_po} className="input input-bordered input-success w-full" onChange={(e) => setData("no_po", e.target.value)} />
                </label>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg">
                <label className="form-control">
                  <div className="label"><span className="label-text">Suplayer</span></div>
                  <select value={data.id_suplayer} className="select select-bordered select-success w-full" onChange={(e) => setData("id_suplayer", e.target.value)}>
                    <option value="">-- Pilih Suplayer --</option>
                    {suplayers.map((s) => (
                      <option key={s.id} value={s.id}>{s.nama_suplayer}</option>
                    ))}
                  </select>
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">Hal</span></div>
                  <input type="text" value={data.hal} className="input input-bordered input-success w-full" onChange={(e) => setData("hal", e.target.value)} />
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">Pembayaran</span></div>
                  <select value={data.pembayaran} className="select select-bordered select-success w-full" onChange={(e) => setData("pembayaran", e.target.value)}>
                    <option value="">-- Pilih Pembayaran --</option>
                    <option value="CASH">CASH</option>
                    <option value="CREDIT">CREDIT</option>
                  </select>
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
