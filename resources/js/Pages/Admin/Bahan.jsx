import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm } from "@inertiajs/react";
import React, { useRef } from "react";

export default function Bahan({ bahan }) {
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
  });
  const modalRef = useRef(null);
  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const editmodalRef = useRef(null);
  const openModalEdit = (id, kode, bahan, kategori) => {
    editmodalRef.current.showModal();
    // setData({
    //   id: id,
    //   kode: kode,
    //   bahan: bahan,
    //   kategori: kategori,
    // });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
  };

  const save = (e) => {
    e.preventDefault();
    post("/bahan", {
      onSuccess: () => {
        console.log("berhasil");
        reset();
        closeModal();
      },
    });
  };

  const hapus = (id) => {
    if (confirm("Yakin ingin menghapus")) {
      destroy("/bahan/" + id);
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
      <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
        <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
          <div class="card-body">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 class="card-title">Data Bahan</h2>
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
                          <span className="label-text">Bahan</span>
                        </div>
                        <input
                          type="text"
                          name="nama"
                          value={data.bahan}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("bahan", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">Kategori</span>
                        </div>
                        <select
                          name=""
                          className="input input-bordered input-success"
                          id=""
                          required
                          onChange={(e) => setData("kategori", e.target.value)}
                        >
                          <option value=""> -- Pilih Kategori --</option>
                          <option value="DIGITAL">DIGITAL</option>
                          <option value="OFSIDE">OFSIDE</option>
                        </select>
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
                          <span className="label-text">Bahan</span>
                        </div>
                        <input
                          type="text"
                          name="nama"
                          value={data.bahan}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("bahan", e.target.value)}
                        />
                      </label>

                      <label className="form-control w-full mt-2">
                        <div className="label">
                          <span className="label-text">
                            Kategori {data.kategori}
                          </span>
                        </div>
                        <select
                          name=""
                          className="input input-bordered input-success"
                          id=""
                          required
                          onChange={(e) => setData("kategori", e.target.value)}
                        >
                          <option value={data.kategori}>{data.kategori}</option>
                          <option value="DIGITAL">DIGITAL</option>
                          <option value="OFSIDE">OFSIDE</option>
                        </select>
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
                    <th>Bahan</th>
                    <th>Kategori</th>
                    <th>Opsi</th>
                  </tr>
                </thead>
                <tbody>
                  {bahan.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.kode}</td>
                      <td>{item.bahan}</td>
                      <td>{item.kategori}</td>
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
                            onClick={() =>
                              openModalEdit(
                                item.id,
                                item.kode,
                                item.bahan,
                                item.kategori,
                              )
                            }
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
