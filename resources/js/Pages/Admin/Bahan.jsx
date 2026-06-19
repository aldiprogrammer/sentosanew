import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Bahan({ bahan, kode }) {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    router.get('/bahan', { search }, { preserveState: true, replace: true });
  };

  useEffect(() => {
    const t = setTimeout(() => {
      router.get('/bahan', { search }, { preserveState: true, replace: true });
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
    kode: "",
    bahan: "",
    kategori: "",
    satuan: "",
    jenis: "",
    kategori_cetak: "",
    jenis_bahan: "",
    klik: "",
    qty: "",
    harga: "",
    harga_beli: "",
    harga_umum: "",
    harga_khusus: "",
    harga_member: "",
    harga_custom: "",
    cara_perhitungan: "",
  });

  const modalRef = useRef(null);
  const openModal = () => {
    modalRef.current.showModal();
    setData("kode", kode);
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const editmodalRef = useRef(null);
  function handleHargaInput(e) {
    const raw = e.target.value.replace(/\D/g, "");
    setData("harga", raw);
  }

  const openModalEdit = (
    id,
    kode,
    bahan,
    kategori,
    satuan,
    jenis,
    kategori_cetak,
    jenis_bahan,
    klik,
    qty,
    harga,
    harga_beli,
    harga_umum,
    harga_khusus,
    harga_member,
    harga_custom,
    cara_perhitungan
  ) => {
    editmodalRef.current.showModal();
    setData({
      id,
      kode,
      bahan,
      kategori,
      satuan,
      jenis,
      kategori_cetak,
      jenis_bahan,
      klik,
      qty,
      harga,
      harga_beli,
      harga_umum,
      harga_khusus,
      harga_member,
      harga_custom,
      cara_perhitungan,
    });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
  };

  const duplicate = (item) => {
    editmodalRef.current.close();
    openModal();
    setData({
      id: 0,
      kode: kode,
      bahan: item.bahan,
      kategori: item.kategori,
      satuan: item.satuan,
      jenis: item.jenis,
      kategori_cetak: item.kategori_cetak,
      jenis_bahan: item.jenis_bahan,
      klik: item.klik,
      qty: item.qty,
      harga: item.harga,
      harga_beli: item.harga_beli,
      harga_umum: item.harga_umum,
      harga_khusus: item.harga_khusus,
      harga_member: item.harga_member,
      harga_custom: item.harga_custom,
      cara_perhitungan: item.cara_perhitungan,
    });
  };

  const save = (e) => {
    e.preventDefault();
    post("/bahan", {
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  const hapus = (id) => {
    if (confirm("Yakin ingin menghapus")) {
      destroy("/bahan/" + id);
      closeModalEdit();
    }
  };

  const update = (e) => {
    e.preventDefault();
    put("/bahan/" + data.id, {
      onSuccess: () => {
        closeModalEdit();
        reset();
      },
    });
  };

  const exportPDF = () => {
    try {
      const doc = new jsPDF("l", "mm", "a4");
      doc.setFontSize(16);
      doc.text("Data Bahan", 14, 20);
      doc.setFontSize(10);
      doc.text("Tanggal: " + new Date().toLocaleDateString("id-ID"), 14, 27);

      const rows = bahan.data.map((item, index) => [
        index + 1,
        item.kode,
        item.bahan,
        item.satuan,
        item.kategori,
        item.jenis,
        item.kategori_cetak,
        item.jenis_bahan,
        item.klik,
        item.qty,
        item.harga ? "Rp " + item.harga : "-",
        item.harga_beli ? "Rp " + item.harga_beli : "-",
                        item.harga_umum ? "Rp " + String(item.harga_umum).replace(/\./g, '') : "-",
                        item.harga_khusus ? "Rp " + String(item.harga_khusus).replace(/\./g, '') : "-",
                        item.harga_member ? "Rp " + String(item.harga_member).replace(/\./g, '') : "-",
        item.harga_custom ? "Rp " + item.harga_custom : "-",
        item.cara_perhitungan,
      ]);

      autoTable(doc, {
        startY: 32,
        head: [["No", "Kode", "Bahan", "Satuan", "Kategori", "Jenis", "Kat. Cetak", "Jenis Bahan", "Klik", "Qty", "Harga", "Hrg Beli", "Hrg Umum", "Hrg Khusus", "Hrg Member", "Hrg Custom", "Perhitungan"]],
        body: rows,
        styles: { fontSize: 7 },
        headStyles: { fillColor: [22, 163, 74] },
        theme: "grid",
      });

      doc.save("data_bahan.pdf");
    } catch (error) {
      console.error("Gagal export PDF:", error);
      alert("Gagal mengexport PDF: " + error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 xl:grid-cols-1">
        <div className="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
              <h2 className="card-title">Data Bahan</h2>
              <div className="flex gap-2">
                <button className="btn btn-primary" onClick={exportPDF}>
                  <i className="fas fa-file-pdf"></i> Export PDF
                </button>
                <button className="btn btn-success" onClick={openModal}>
                  <i className="fas fa-plus"></i> Tambah Bahan
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

                    <h3 className="text-lg font-bold mb-4">Tambah Bahan</h3>

                    <form onSubmit={save}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Kode</span>
                          </div>
                          <input
                            type="text"
                            value={data.kode}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("kode", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Nama Bahan</span>
                          </div>
                          <input
                            type="text"
                            value={data.bahan}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("bahan", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Kategori</span>
                          </div>
                          <select
                            value={data.kategori}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData("kategori", e.target.value)}
                          >
                            <option value="">-- Pilih Kategori --</option>
                            <option value="DIGITAL">DIGITAL</option>
                            <option value="OFFSET">OFFSET</option>
                          </select>
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Satuan</span>
                          </div>
                          <select
                            value={data.satuan}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData("satuan", e.target.value)}
                          >
                            <option value="">-- Pilih Satuan --</option>
                            <option value="BLOCK">BLOCK</option>
                            <option value="BOX">BOX</option>
                            <option value="LEMBAR">LEMBAR</option>
                            <option value="M2">M2</option>
                            <option value="PCS">PCS</option>
                            <option value="RIM">RIM</option>
                          </select>
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Jenis</span>
                          </div>
                          <select
                            value={data.jenis}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData("jenis", e.target.value)}
                          >
                            <option value="">-- Pilih Jenis --</option>
                            <option value="INTERNAL">INTERNAL</option>
                            <option value="EKSTERNAL">EKSTERNAL</option>
                          </select>
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Kategori Cetak</span>
                          </div>
                          <select
                            value={data.kategori_cetak}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData("kategori_cetak", e.target.value)}
                          >
                            <option value="">-- Pilih Kategori Cetak --</option>
                            {/* <option value="STANDART">STANDART</option>
                            <option value="STIKER">STIKER</option>
                            <option value="DLL">DLL</option> */}
                            <option value="INDOOR">INDOOR</option>
                            <option value="INDOOR 2">INDOOR 2</option>
                            <option value="OUTDOOR">OUTDOOR</option>
                            <option value="OUTDOOR 2">OUTDOOR 2</option>
                            <option value="DISPLAY">DISPLAY</option>
                            <option value="OFFSET">OFFSET</option>
                            <option value="DLL">DLL</option>
                          </select>
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Jenis Bahan</span>
                          </div>
                          <select
                            value={data.jenis_bahan}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData("jenis_bahan", e.target.value)}
                          >
                            <option value="">-- Pilih Jenis Bahan --</option>
                            <option value="DLL">DLL</option>
                            <option value="DYE">DYE</option>
                            <option value="ECOSOLVENT">ECOSOLVENT</option>
                            <option value="OFFSET">OFFSET</option>
                            <option value="SOLVENT">SOLVENT</option>
                            <option value="TONER">TONER</option>
                            <option value="UV">UV</option>

                          </select>
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Cara Perhitungan</span>
                          </div>
                          <select
                            value={data.cara_perhitungan}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData("cara_perhitungan", e.target.value)}
                          >
                            <option value="">-- Pilih Perhitungan --</option>
                            <option value="QTY">QTY</option>
                            <option value="LUAS">LUAS</option>
                            <option value="QTY KHUSUS">QTY KHUSUS</option>
                          </select>
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Klik</span>
                          </div>
                          <input
                            type="text"
                            value={data.klik}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("klik", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Qty</span>
                          </div>
                          <input
                            type="text"
                            value={data.qty}
                            className="input input-bordered input-success w-full"
                            onChange={(e) => setData("qty", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Harga Beli</span>
                          </div>
                          <input
                            type="text"
                            value={data.harga_beli || ""}
                            className="input input-bordered input-success w-full"
                            placeholder="Rp 0 (opsional)"
                            onChange={(e) => setData("harga_beli", e.target.value.replace(/\D/g, ""))}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Harga Umum</span>
                          </div>
                          <input
                            type="text"
                            value={data.harga_umum || ""}
                            className="input input-bordered input-success w-full"
                            placeholder="Rp 0"
                            onChange={(e) => setData("harga_umum", e.target.value.replace(/\D/g, ""))}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Harga Khusus</span>
                          </div>
                          <input
                            type="text"
                            value={data.harga_khusus || ""}
                            className="input input-bordered input-success w-full"
                            placeholder="Rp 0"
                            onChange={(e) => setData("harga_khusus", e.target.value.replace(/\D/g, ""))}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Harga Member</span>
                          </div>
                          <input
                            type="text"
                            value={data.harga_member || ""}
                            className="input input-bordered input-success w-full"
                            placeholder="Rp 0"
                            onChange={(e) => setData("harga_member", e.target.value.replace(/\D/g, ""))}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Harga Custom</span>
                          </div>
                          <input
                            type="text"
                            value={data.harga_custom || ""}
                            className="input input-bordered input-success w-full"
                            placeholder="Rp 0"
                            onChange={(e) => setData("harga_custom", e.target.value.replace(/\D/g, ""))}
                          />
                        </label>
                      </div>

                      <div className="mt-6 flex gap-2">
                        <button
                          type="submit"
                          disabled={processing}
                          className="btn btn-success"
                        >
                          <i className="fas fa-save"></i> Simpan
                        </button>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="btn btn-error"
                        >
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

                    <h3 className="text-lg font-bold mb-4">Edit Bahan</h3>

                    <form onSubmit={update}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Kode</span>
                          </div>
                          <input
                            type="text"
                            value={data.kode}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("kode", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Nama Bahan</span>
                          </div>
                          <input
                            type="text"
                            value={data.bahan}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("bahan", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Kategori</span>
                          </div>
                          <select
                            value={data.kategori}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData("kategori", e.target.value)}
                          >
                            <option value="">-- Pilih Kategori --</option>
                            <option value="DIGITAL">DIGITAL</option>
                            <option value="OFFSET">OFFSET</option>
                          </select>
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Satuan</span>
                          </div>
                          <select
                            value={data.satuan}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData("satuan", e.target.value)}
                          >
                            <option value="">-- Pilih Satuan --</option>
                            <option value="BLOCK">BLOCK</option>
                            <option value="BOX">BOX</option>
                            <option value="LEMBAR">LEMBAR</option>
                            <option value="M2">M2</option>
                            <option value="PCS">PCS</option>
                            <option value="RIM">RIM</option>
                          </select>
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Jenis</span>
                          </div>
                          <select
                            value={data.jenis}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData("jenis", e.target.value)}
                          >
                            <option value="">-- Pilih Jenis --</option>
                            <option value="INTERNAL">INTERNAL</option>
                            <option value="EKSTERNAL">EKSTERNAL</option>
                          </select>
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Kategori Cetak</span>
                          </div>
                          <select
                            value={data.kategori_cetak}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData("kategori_cetak", e.target.value)}
                          >
                            <option value="">-- Pilih Kategori Cetak --</option>
                            {/* <option value="STANDART">STANDART</option>
                            <option value="STIKER">STIKER</option>
                            <option value="DLL">DLL</option> */}

                            <option value="INDOOR">INDOOR</option>
                            <option value="INDOOR2">INDOOR2</option>
                            <option value="OUTDOOR">OUTDOOR</option>
                            <option value="OUTDOOR2">OUTDOOR2</option>
                            <option value="DISPLAY">DISPLAY</option>
                            <option value="OFFSET">OFFSET</option>
                            <option value="DLL">DLL</option>

                          </select>
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Jenis Bahan</span>
                          </div>
                          <select
                            value={data.jenis_bahan}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData("jenis_bahan", e.target.value)}
                          >
                            <option value="">-- Pilih Jenis Bahan --</option>
                            <option value="DLL">DLL</option>
                            <option value="DYE">DYE</option>
                            <option value="ECOSOLVENT">ECOSOLVENT</option>
                            <option value="OFFSET">OFFSET</option>
                            <option value="SOLVENT">SOLVENT</option>
                            <option value="TONER">TONER</option>
                            <option value="UV">UV</option>

                          </select>
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Cara Perhitungan</span>
                          </div>
                          <select
                            value={data.cara_perhitungan}
                            className="select select-bordered select-success w-full"
                            required
                            onChange={(e) => setData("cara_perhitungan", e.target.value)}
                          >
                            <option value="">-- Pilih Perhitungan --</option>
                            <option value="QTY">QTY</option>
                            <option value="LUAS">LUAS</option>
                            <option value="QTY KHUSUS">QTY KHUSUS</option>
                          </select>
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Klik</span>
                          </div>
                          <input
                            type="text"
                            value={data.klik}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("klik", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Qty</span>
                          </div>
                          <input
                            type="text"
                            value={data.qty}
                            className="input input-bordered input-success w-full"
                            onChange={(e) => setData("qty", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Harga Beli</span>
                          </div>
                          <input
                            type="text"
                            value={data.harga_beli || ""}
                            className="input input-bordered input-success w-full"
                            placeholder="Rp 0 (opsional)"
                            onChange={(e) => setData("harga_beli", e.target.value.replace(/\D/g, ""))}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Harga Umum</span>
                          </div>
                          <input
                            type="text"
                            value={data.harga_umum || ""}
                            className="input input-bordered input-success w-full"
                            placeholder="Rp 0"
                            onChange={(e) => setData("harga_umum", e.target.value.replace(/\D/g, ""))}
                          />
                        </label>


                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Harga Khusus</span>
                          </div>
                          <input
                            type="text"
                            value={data.harga_khusus || ""}
                            className="input input-bordered input-success w-full"
                            placeholder="Rp 0"
                            onChange={(e) => setData("harga_khusus", e.target.value.replace(/\D/g, ""))}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Harga Member</span>
                          </div>
                          <input
                            type="text"
                            value={data.harga_member || ""}
                            className="input input-bordered input-success w-full"
                            placeholder="Rp 0"
                            onChange={(e) => setData("harga_member", e.target.value.replace(/\D/g, ""))}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Harga Custom</span>
                          </div>
                          <input
                            type="text"
                            value={data.harga_custom || ""}
                            className="input input-bordered input-success w-full"
                            placeholder="Rp 0"
                            onChange={(e) => setData("harga_custom", e.target.value.replace(/\D/g, ""))}
                          />
                        </label>
                      </div>

                      <div className="mt-6 flex gap-2">
                        <button
                          type="submit"
                          disabled={processing}
                          className="btn btn-success"
                        >
                          <i className="fas fa-save"></i> Update
                        </button>
                        <button
                          type="button"
                          onClick={closeModalEdit}
                          className="btn btn-warning"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={() => hapus(data.id)}
                          className="btn btn-error"
                        >
                          <i className="fas fa-trash"></i> Hapus
                        </button>
                        <button
                          type="button"
                          onClick={() => duplicate(data)}
                          className="btn btn-info"
                        >
                          <i className="fas fa-copy"></i> Duplikat
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
                placeholder="Cari bahan..."
                className="input input-bordered input-success w-full max-w-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra" id="myTable">
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
                    <th>Qty</th>
                    <th>Perhitungan</th>
                    {/* <th>Harga</th> */}
                    <th>Harga Beli</th>
                    <th>Harga Umum</th>
                    <th>Harga Khusus</th>
                    <th>Harga Member</th>
                    <th>Harga Custom</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {bahan.data.map((item, index) => (
                    <tr
                      key={item.id}
                      onClick={() => openModalEdit(item.id, item.kode, item.bahan, item.kategori, item.satuan, item.jenis, item.kategori_cetak, item.jenis_bahan, item.klik, item.qty, item.harga, item.harga_beli, item.harga_umum, item.harga_khusus, item.harga_member, item.harga_custom, item.cara_perhitungan)}
                      className="cursor-pointer hover:bg-base-200"
                    >
                      <td>{bahan.from + index}</td>
                      <td>{item.kode}</td>
                      <td>{item.bahan}</td>
                      <td>{item.satuan}</td>
                      <td>{item.kategori}</td>
                      <td>{item.jenis}</td>
                      <td>{item.kategori_cetak}</td>
                      <td>{item.jenis_bahan}</td>
                      <td>{item.klik}</td>
                      <td>{item.qty}</td>
                      <td>{item.cara_perhitungan}</td>
                      <td>{item.harga_beli ? 'Rp ' + item.harga_beli : '-'}</td>
                      <td>{item.harga_umum ? 'Rp ' + String(item.harga_umum).replace(/\./g, '') : '-'}</td>
                      <td>{item.harga_khusus ? 'Rp ' + String(item.harga_khusus).replace(/\./g, '') : '-'}</td>
                      <td>{item.harga_member ? 'Rp ' + String(item.harga_member).replace(/\./g, '') : '-'}</td>
                      <td>{item.harga_custom ? 'Rp ' + item.harga_custom : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {bahan.links && (
              <div className="flex justify-center mt-4 join">
                {bahan.links.map((link, i) => (
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
    </AdminLayout>
  );
}
