import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Distributor({ ds, kode }) {
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
    nama: "",
    alamat: "",
    nohp: "",
    kota: "",
    bank: "",
    norek: "",
    jt: "",
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
  const openModalEdit = (id) => {
    editmodalRef.current.showModal();
    const ls = ds.find((item) => item.id === id);

    setData({
      id: id,
      kode: ls.kode,
      nama: ls.nama,
      alamat: ls.alamat,
      nohp: ls.nohp,
      kota: ls.kota,
      bank: ls.bank,
      norek: ls.norek,
      jt: ls.jt,
    });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
  };

  const save = (e) => {
    e.preventDefault();
    post("/distributor", {
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  const hapus = (id) => {
    if (confirm("Yakin ingin menghapus")) {
      destroy("/distributor/" + id);
      closeModalEdit();
    }
  };

  const update = (e) => {
    e.preventDefault();
    put("/distributor/" + data.id, {
      onSuccess: () => {
        closeModalEdit();
        reset();
      },
    });
  };

  function formatNoHP(value) {
    const digits = String(value).replace(/\D/g, "");
    if (!digits) return "";
    return digits.match(/.{1,4}/g)?.join("-") || digits;
  }

  function parseNoHP(value) {
    return String(value).replace(/\D/g, "");
  }

  const exportPDF = () => {
    try {
      const doc = new jsPDF("l", "mm", "a4");
      doc.setFontSize(16);
      doc.text("Data Distributor", 14, 20);
      doc.setFontSize(10);
      doc.text("Tanggal: " + new Date().toLocaleDateString("id-ID"), 14, 27);
      const rows = ds.map((item, index) => [index + 1, item.kode, item.nama, formatNoHP(item.nohp), item.kota, item.bank, item.norek, item.jt]);
      autoTable(doc, { startY: 32, head: [["No", "Kode", "Nama", "No HP", "Kota", "Bank", "No. Rek", "JT"]], body: rows, styles: { fontSize: 8 }, headStyles: { fillColor: [22, 163, 74] }, theme: "grid" });
      doc.save("data_distributor.pdf");
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="card-title">Data Distributor</h2>
              <div className="flex gap-2">
                <button className="btn btn-primary" onClick={exportPDF}>
                  <i className="fas fa-file-pdf"></i> Export PDF
                </button>
                <button className="btn btn-success" onClick={openModal}>
                  <i className="fas fa-plus"></i> Tambah Distributor
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

                    <h3 className="text-lg font-bold mb-4">Tambah Distributor</h3>

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
                            <span className="label-text">Nama</span>
                          </div>
                          <input
                            type="text"
                            value={data.nama}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("nama", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">No HP</span>
                          </div>
                          <input
                            type="text"
                            placeholder="0812-3456-7890"
                            value={data.nohp ? formatNoHP(data.nohp) : ""}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) =>
                              setData("nohp", parseNoHP(e.target.value))
                            }
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Kota</span>
                          </div>
                          <input
                            type="text"
                            value={data.kota}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("kota", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Bank</span>
                          </div>
                          <input
                            type="text"
                            value={data.bank}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("bank", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">No. Rekening</span>
                          </div>
                          <input
                            type="text"
                            value={data.norek}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("norek", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Jatuh Tempo (JT)</span>
                          </div>
                          <input
                            type="text"
                            placeholder="misal: 14 atau NET 14"
                            value={data.jt}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("jt", e.target.value)}
                          />
                        </label>

                        <label className="form-control md:col-span-2">
                          <div className="label">
                            <span className="label-text">Alamat</span>
                          </div>
                          <input
                            type="text"
                            value={data.alamat}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("alamat", e.target.value)}
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

                    <h3 className="text-lg font-bold mb-4">Edit Distributor</h3>

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
                            <span className="label-text">Nama</span>
                          </div>
                          <input
                            type="text"
                            value={data.nama}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("nama", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">No HP</span>
                          </div>
                          <input
                            type="text"
                            placeholder="0812-3456-7890"
                            value={data.nohp ? formatNoHP(data.nohp) : ""}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) =>
                              setData("nohp", parseNoHP(e.target.value))
                            }
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Kota</span>
                          </div>
                          <input
                            type="text"
                            value={data.kota}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("kota", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Bank</span>
                          </div>
                          <input
                            type="text"
                            value={data.bank}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("bank", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">No. Rekening</span>
                          </div>
                          <input
                            type="text"
                            value={data.norek}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("norek", e.target.value)}
                          />
                        </label>

                        <label className="form-control">
                          <div className="label">
                            <span className="label-text">Jatuh Tempo (JT)</span>
                          </div>
                          <input
                            type="text"
                            value={data.jt}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("jt", e.target.value)}
                          />
                        </label>

                        <label className="form-control md:col-span-2">
                          <div className="label">
                            <span className="label-text">Alamat</span>
                          </div>
                          <input
                            type="text"
                            value={data.alamat}
                            className="input input-bordered input-success w-full"
                            required
                            onChange={(e) => setData("alamat", e.target.value)}
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
                    <th>Nama</th>
                    <th>No HP</th>
                    <th>Kota</th>
                    <th>Bank</th>
                    <th>No. Rek</th>
                    <th>JT</th>
                  </tr>
                </thead>
                <tbody>
                  {ds.map((item, index) => (
                    <tr
                      key={item.id}
                      onClick={() => openModalEdit(item.id)}
                      className="cursor-pointer hover:bg-base-200"
                    >
                      <td>{index + 1}</td>
                      <td>{item.kode}</td>
                      <td>{item.nama}</td>
                      <td>{formatNoHP(item.nohp)}</td>
                      <td>{item.kota}</td>
                      <td>{item.bank}</td>
                      <td>{item.norek}</td>
                      <td>{item.jt}</td>
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
