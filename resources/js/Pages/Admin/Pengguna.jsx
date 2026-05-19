import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Pengguna({ pengguna, jabatan }) {
  const {
    data,
    setData,
    post,
    delete: destroy,
    put,
    processing,
    reset,
  } = useForm({
    username: "",
    password: "",
    role: "",
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
  const openModalEdit = (id, username, role, password) => {
    editmodalRef.current.showModal();
    setData({
      id: id,
      username: username,
      role: role,
      password: password,
    });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
  };

  const save = (e) => {
    e.preventDefault();
    post("/pengguna", {
      onSuccess: () => {
        console.log("berhasil");
        reset();
        closeModal();
      },
    });
  };

  const hapus = (id) => {
    if (confirm("Yakin ingin menghapus")) {
      destroy("/pengguna/" + id);
      closeModalEdit();
    }
  };

  const update = (e) => {
    e.preventDefault();
    put("/pengguna/" + data.id, {
      onSuccess: () => {
        closeModalEdit();
        reset();
      },
    });
  };

  const exportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Data Pengguna", 14, 20);
      doc.setFontSize(10);
      doc.text("Tanggal: " + new Date().toLocaleDateString("id-ID"), 14, 27);
      const rows = pengguna.map((item, index) => [index + 1, item.username, item.role]);
      autoTable(doc, { startY: 32, head: [["No", "Username", "Role"]], body: rows, styles: { fontSize: 10 }, headStyles: { fillColor: [22, 163, 74] }, theme: "grid" });
      doc.save("data_pengguna.pdf");
    } catch (error) {
      console.error("Gagal export PDF:", error);
      alert("Gagal mengexport PDF: " + error.message);
    }
  };

  return (
    <AdminLayout>
      <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
        <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
          <div class="card-body">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 class="card-title">Data Pengguna</h2>
              <div class="flex gap-2">
                <button className="btn btn-primary" onClick={exportPDF}>
                  <i className="fas fa-file-pdf"></i> Export PDF
                </button>
                <button className="btn btn-success" onClick={openModal}>
                  <i className="fas fa-plus"></i>
                  Tambah data
                </button>

                <dialog ref={modalRef} className="modal ">
                  <div className="modal-box">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                      ✕
                    </button>

                    <h3 className="text-lg font-bold">Tambah data</h3>

                    <form onSubmit={save}>
                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">Username</span>
                        </div>
                        <input
                          type="text"
                          name="kode"
                          value={data.username}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("username", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">Role </span>
                        </div>
                        <select
                          name=""
                          className="input input-bordered iput-success"
                          id=""
                          required
                          onChange={(e) => setData("role", e.target.value)}
                        >
                          <option>-- Pilih Role --</option>
                          {jabatan.map((rr, index) => (
                            <option>{rr.jabatan}</option>
                          ))}
                        </select>
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">Password</span>
                        </div>
                        <input
                          type="password"
                          name="kode"
                          value={data.password}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("password", e.target.value)}
                        />
                      </label>

                      <div className="mt-4 flex gap-2">
                        <button
                          type="submit"
                          disabled={processing}
                          className="btn btn-success"
                        >
                          Tambah data
                        </button>

                        <button
                          type="button"
                          onClick={closeModal}
                          className="btn btn-error"
                        >
                          Keluar
                        </button>
                      </div>
                    </form>
                  </div>
                </dialog>

                {/* Dialog Edi */}
                <dialog ref={editmodalRef} className="modal">
                  <div className="modal-box">
                    <button
                      type="button"
                      onClick={closeModalEdit}
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                      ✕
                    </button>

                    <h3 className="text-lg font-bold">Edit data</h3>

                    <form onSubmit={update}>
                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">Username</span>
                        </div>
                        <input
                          type="text"
                          name="kode"
                          value={data.username}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("username", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">Role</span>
                        </div>

                        <select
                          name=""
                          className="input input-bordered iput-success"
                          id=""
                          required
                        >
                          <option value={data.role}>{data.role}</option>
                          {jabatan.map((rr, index) => (
                            <option key={index}>{rr.jabatan}</option>
                          ))}
                        </select>
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">New Password</span>
                        </div>
                        <input
                          type="password"
                          name="kode"
                          className="input input-bordered input-success w-full"
                          onChange={(e) => setData("password", e.target.value)}
                        />
                      </label>

                      <div className="mt-4 flex gap-2">
                        <button
                          type="submit"
                          disabled={processing}
                          className="btn btn-success"
                        >
                          Edit data
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
                    <th>Username</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {pengguna.map((item, index) => (
                    <tr
                      key={item.id}
                      onClick={() => openModalEdit(item.id, item.username, item.role, item.password)}
                      className="cursor-pointer hover:bg-base-200"
                    >
                      <td>{index + 1}</td>
                      <td>{item.username}</td>
                      <td>{item.role}</td>
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
