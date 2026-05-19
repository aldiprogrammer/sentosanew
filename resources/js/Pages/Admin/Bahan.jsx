import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React, { useRef } from "react";

export default function Bahan({ bahan, kode }) {
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
      cara_perhitungan,
    });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
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

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 xl:grid-cols-1">
        <div className="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="card-title">Data Bahan</h2>
              <div className="flex gap-2">
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
                            <option value="OFSIDE">OFSIDE</option>
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
                            <option value="STANDART">STANDART</option>
                            <option value="STIKER">STIKER</option>
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

                        <label className="form-control md:col-span-2">
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
                            <option value="OFSIDE">OFSIDE</option>
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
                            <option value="STANDART">STANDART</option>
                            <option value="STIKER">STIKER</option>
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

                        <label className="form-control md:col-span-2">
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
                    <th>Kode</th>
                    <th>Bahan</th>
                    <th>Satuan</th>
                    <th>Kategori</th>
                    <th>Jenis</th>
                    <th>Kategori Cetak</th>
                    <th>Jenis Bahan</th>
                    <th>Klik</th>
                    <th>Perhitungan</th>
                  </tr>
                </thead>
                <tbody>
                  {bahan.map((item, index) => (
                    <tr
                      key={item.id}
                      onClick={() => openModalEdit(item.id, item.kode, item.bahan, item.kategori, item.satuan, item.jenis, item.kategori_cetak, item.jenis_bahan, item.klik, item.cara_perhitungan)}
                      className="cursor-pointer hover:bg-base-200"
                    >
                      <td>{index + 1}</td>
                      <td>{item.kode}</td>
                      <td>{item.bahan}</td>
                      <td>{item.satuan}</td>
                      <td>{item.kategori}</td>
                      <td>{item.jenis}</td>
                      <td>{item.kategori_cetak}</td>
                      <td>{item.jenis_bahan}</td>
                      <td>{item.klik}</td>
                      <td>{item.cara_perhitungan}</td>
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
