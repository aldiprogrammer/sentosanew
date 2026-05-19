import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm } from "@inertiajs/react";
import React, { useRef } from "react";

export default function Kurir({ kurir, kode }) {
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
    kode: kode,
    nama: "",
    nohp: "",
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

    const ls = kurir.find((item) => item.id === id);
    setData({
      id: id,
      nama: ls.nama,
      kode: ls.kode,
      nohp: ls.nohp,
    });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
  };

  const save = (e) => {
    e.preventDefault();
    post("/kurir", {
      onSuccess: () => {
        console.log("berhasil");
        reset();
        closeModal();
      },
    });
  };

  const hapus = (id) => {
    if (confirm("Yakin ingin menghapus")) {
      destroy("/kurir/" + id);
      closeModalEdit();
    }
  };

  const update = (e) => {
    e.preventDefault();
    put("/kurir/" + data.id, {
      onSuccess: () => {
        closeModalEdit();
        reset();
      },
    });
  };

  function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 13);
    if (digits.length <= 4) return digits;
    if (digits.length <= 8) return digits.slice(0, 4) + '-' + digits.slice(4);
    return digits.slice(0, 4) + '-' + digits.slice(4, 8) + '-' + digits.slice(8);
  }

  return (
    <AdminLayout>
      <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
        <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
          <div class="card-body">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 class="card-title">Data Kurir</h2>
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
                          value={kode}
                          className="input input-bordered input-success w-full"
                          required
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
                          <span className="label-text">No Hp</span>
                        </div>
                        <input
                          type="text"
                          value={formatPhone(data.nohp)}
                          className="input input-bordered input-success w-full"
                          required
                          onChange={(e) => setData("nohp", e.target.value)}
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
                    <th>Kode</th>
                    <th>Nama</th>
                    <th>No Hp</th>
                  </tr>
                </thead>
                <tbody>
                  {kurir.map((item, index) => (
                    <tr
                      key={item.id}
                      onClick={() => openModalEdit(item.id)}
                      className="cursor-pointer hover:bg-base-200"
                    >
                      <td>{index + 1}</td>
                      <td>{item.kode}</td>
                      <td>{item.nama}</td>
                      <td>{item.nohp}</td>
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
