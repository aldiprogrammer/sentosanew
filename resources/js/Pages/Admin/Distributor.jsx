import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm } from "@inertiajs/react";
import React, { useRef } from "react";

export default function Distributor({ ds }) {
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
        console.log("berhasil");
        reset();
        closeModal();
      },
    });
  };

  const hapus = (id) => {
    if (confirm("Yakin ingin menghapus")) {
      destroy("/distributor/" + id);
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

  return (
    <AdminLayout>
      <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
        <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
          <div class="card-body">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 class="card-title">Data Distributor</h2>
              <div class="flex gap-2">
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
                          <span className="label-text">Kode</span>
                        </div>
                        <input
                          type="text"
                          name="kode"
                          value={data.kode}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("kode", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">Nama</span>
                        </div>
                        <input
                          type="text"
                          name="nama"
                          value={data.nama}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("nama", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">Alamat</span>
                        </div>
                        <input
                          type="text"
                          name="nama"
                          value={data.alamat}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("alamat", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">Kota</span>
                        </div>
                        <input
                          type="text"
                          name="nama"
                          value={data.kota}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("kota", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">No Hp</span>
                        </div>
                        <input
                          type="number"
                          value={data.nohp}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("nohp", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">Bank</span>
                        </div>
                        <input
                          type="text"
                          name="nama"
                          value={data.bank}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("bank", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">No.Rek</span>
                        </div>
                        <input
                          type="text"
                          name="nama"
                          value={data.norek}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("norek", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">JT</span>
                        </div>
                        <input
                          type="text"
                          name="nama"
                          value={data.jt}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("jt", e.target.value)}
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
                          <span className="label-text">Kode</span>
                        </div>
                        <input
                          type="text"
                          name="kode"
                          value={data.kode}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("kode", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">Nama</span>
                        </div>
                        <input
                          type="text"
                          name="nama"
                          value={data.nama}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("nama", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">Alamat</span>
                        </div>
                        <input
                          type="text"
                          name="nama"
                          value={data.alamat}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("alamat", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">Kota</span>
                        </div>
                        <input
                          type="text"
                          name="nama"
                          value={data.kota}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("kota", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">No Hp</span>
                        </div>
                        <input
                          type="number"
                          value={data.nohp}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("nohp", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">Bank</span>
                        </div>
                        <input
                          type="text"
                          name="nama"
                          value={data.bank}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("bank", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">No.Rek</span>
                        </div>
                        <input
                          type="text"
                          name="nama"
                          value={data.norek}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("norek", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">JT</span>
                        </div>
                        <input
                          type="text"
                          name="nama"
                          value={data.jt}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("jt", e.target.value)}
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
                          className="btn btn-error"
                        >
                          Keluar
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
                    <th>Alamat</th>
                    <th>Kota</th>
                    <th>No Hp</th>
                    <th>Bank</th>
                    <th>No.Rek</th>
                    <th>JT</th>
                    <th>Opsi</th>
                  </tr>
                </thead>
                <tbody>
                  {ds.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.kode}</td>
                      <td>{item.nama}</td>
                      <td>{item.alamat}</td>
                      <td>{item.kota}</td>
                      <td>{item.nohp}</td>
                      <td>{item.bank}</td>
                      <td>{item.norek}</td>
                      <td>{item.jt}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-error btn-sm"
                            onClick={() => hapus(item.id)}
                          >
                            Hapus
                          </button>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => openModalEdit(item.id)}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
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
