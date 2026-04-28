import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React, { useRef } from "react";

export default function Produksi({ produksi, desain, bahan }) {
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
    id_desain: "",
    no_antrian: "",
    kode_spk: "",
    alamat: "",
    tanggal: "",
    id_customer: "",
    id_bahan: "",
    keterangan: "",
    satuan: "",
    tinggi: "",
    lebar: "",
    qty: "",
    catatan: "",
    metode_pengambilan: "",
    tgl_kirim: "",
    kantongan: "",
    sisa_putih: "",
    mata_ayam: "",
    potong_pas_gambar: "",
    lipat_sisa_putih: "",
    lipat_pas_gambar: "",
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
  const openModalEdit = (id, kode, kategori, harga) => {
    editmodalRef.current.showModal();
    // setData({
    //   id: id,
    //   kode: kode,
    //   kategori: kategori,
    //   harga: harga,
    // });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
  };

  const save = (e) => {
    e.preventDefault();
    post("/produksi", {
      onSuccess: () => {
        console.log("berhasil");
        reset();
        closeModal();
      },
    });
  };

  const hapus = (id) => {
    if (confirm("Yakin ingin menghapus")) {
      destroy("/kategoridesain/" + id);
    }
  };

  const update = (e) => {
    e.preventDefault();
    put("/kategoridesain/" + data.id, {
      onSuccess: () => {
        closeModalEdit();
        reset();
      },
    });
  };

  // HANDLE CHANGE UNIVERSAL
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);

    setData(name, value);
  };

  const handleCustomer = (e) => {
    const ds = desain.find((item) => item.id === Number(e));
    setData({
      id_desain: e,
      id_customer: ds.id_customer,
      no_antrian: ds.no_antrian,
      kode_spk: ds.kode_spk,
      alamat: ds.customer.alamat,
    });
  };

  return (
    <>
      <AdminLayout>
        <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
          <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
            <div class="card-body">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <h2 class="card-title">Data Produksi</h2>
                <div class="flex gap-2">
                  <button className="btn btn-success" onClick={openModal}>
                    <i className="fas fa-plus"></i>
                    Tambah Produksi
                  </button>

                  <dialog ref={modalRef} className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      ></button>

                      <h3 className="text-lg font-bold">Form Produksi</h3>

                      <form onSubmit={save}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {/* Customer */}
                          <div className="p-5 bg-base-200 rounded-lg">
                            <div className="grid  md:grid-cols-2 gap-2">
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Customer</span>
                                </div>
                                <select
                                  name="customer_id"
                                  value={data.customer_id}
                                  onChange={(e) =>
                                    handleCustomer(e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value="">Pilih Customer</option>
                                  {desain.map((ds, index) => (
                                    <option value={ds.id}>
                                      {ds.customer.nama}
                                    </option>
                                  ))}
                                </select>
                              </label>

                              {/* Kode Antrian */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">
                                    Kode Antrian
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  name="kode_antrian"
                                  value={data.no_antrian}
                                  onChange={handleChange}
                                  className="input input-bordered input-success w-full"
                                  placeholder="ANT-00001"
                                  required
                                />
                              </label>

                              {/* No SPK */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">No SPK</span>
                                </div>
                                <input
                                  type="text"
                                  name="no_spk"
                                  value={data.kode_spk}
                                  onChange={handleChange}
                                  className="input input-bordered input-success w-full"
                                  placeholder="SPK-001"
                                  required
                                />
                              </label>
                              {/* Alamat */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Alamat</span>
                                </div>
                                <textarea
                                  name="alamat"
                                  value={data.alamat}
                                  onChange={handleChange}
                                  className="textarea textarea-bordered textarea-success w-full h-10"
                                  required
                                ></textarea>
                              </label>
                            </div>
                          </div>

                          <div className="p-5 bg-base-200 rounded-lg">
                            {/* Bahan */}
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">Pinising</span>
                              </div>
                              <input
                                type="text"
                                name="bahan"
                                value={data.bahan}
                                onChange={handleChange}
                                className="input input-bordered input-success w-full"
                                placeholder="Contoh: ACP, Kaca, Besi"
                                required
                              />
                            </label>
                          </div>
                        </div>
                        {/* Keterangan */}
                        <div className="p-5 bg-base-200 rounded-lg mt-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {/* Bahan */}
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">Bahan</span>
                              </div>
                              <select
                                name="satuan"
                                onChange={(e) =>
                                  setData("id_bahan", e.target.value)
                                }
                                className="select select-bordered select-success w-full"
                                required
                              >
                                <option value="">Pilih Bahan</option>
                                {bahan.map((bh, index) => (
                                  <option value={bh.id}>
                                    {bh.bahan} - {bh.kategori}
                                  </option>
                                ))}
                              </select>
                            </label>

                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">Keterangan</span>
                              </div>
                              <textarea
                                name="keterangan"
                                value={data.keterangan}
                                onChange={(e) =>
                                  setData("keterangan", e.target.value)
                                }
                                className="textarea textarea-bordered textarea-success w-full h-10"
                              ></textarea>
                            </label>

                            {/* Satuan */}
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">Satuan</span>
                              </div>
                              <select
                                name="satuan"
                                value={data.satuan}
                                onChange={(e) =>
                                  setData("satuan", e.target.value)
                                }
                                className="select select-bordered select-success w-full"
                                required
                              >
                                <option value="">Pilih Satuan</option>
                                <option value="Meter">Meter</option>
                                <option value="Cm">Cm</option>
                                <option value="Mm">Mm</option>
                                <option value="Unit">Unit</option>
                              </select>
                            </label>

                            {/* Tinggi */}
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">Tinggi</span>
                              </div>
                              <input
                                type="number"
                                name="tinggi"
                                value={data.tinggi}
                                onChange={(e) =>
                                  setData("tinggi", e.target.value)
                                }
                                className="input input-bordered input-success w-full"
                                required
                              />
                            </label>

                            {/* Lebar */}
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">Lebar</span>
                              </div>
                              <input
                                type="number"
                                name="lebar"
                                value={data.lebar}
                                onChange={(e) =>
                                  setData("lebar", e.target.value)
                                }
                                className="input input-bordered input-success w-full"
                                required
                              />
                            </label>

                            {/* Qty */}
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">Qty</span>
                              </div>
                              <input
                                type="number"
                                name="qty"
                                value={data.qty}
                                onChange={(e) => setData("qty", e.target.value)}
                                className="input input-bordered input-success w-full"
                                required
                              />
                            </label>

                            {/* Metode Pengambilan */}
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">
                                  Metode Pengambilan
                                </span>
                              </div>
                              <select
                                name="metode_pengambilan"
                                value={data.metode_pengambilan}
                                onChange={(e) =>
                                  setData("metode_pengambilan", e.target.value)
                                }
                                className="select select-bordered select-success w-full"
                                required
                              >
                                <option value="">Pilih Metode</option>
                                <option value="Diambil Sendiri">
                                  Diambil Sendiri
                                </option>
                                <option value="Diantar">Diantar</option>
                              </select>
                            </label>

                            {/* Tanggal Ambil */}
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">
                                  Tanggal Ambil
                                </span>
                              </div>
                              <input
                                type="date"
                                name="tgl_ambil"
                                value={data.tgl_ambil}
                                onChange={(e) =>
                                  setData("tgl_ambil", e.target.value)
                                }
                                className="input input-bordered input-success w-full"
                                required
                              />
                            </label>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-success"
                          >
                            <i className="fas fa-file"></i> Simpan
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
                      <th>Tgl</th>
                      <th>No Antrian</th>
                      <th>Kode SPK</th>
                      <th>Customer</th>
                      <th>Desain</th>
                      <th>Qty</th>
                      <th>Desainer</th>
                      <th>Opsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {desain.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.tanggal}</td>
                        <td>{item.no_antrian}</td>
                        <td>{item.kode_spk}</td>
                        <td>{item.customer.nama}</td>
                        <td>{item.kategoridesain.kategori}</td>
                        <td>{item.qty}</td>
                        <td>32</td>
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
                                  item.tanggal,
                                  item.no_antrian,
                                  item.kode_spk,
                                  item.id_customer,
                                  item.customer.nama,
                                  item.id_kategori_desain,
                                  item.kategoridesain.kategori,
                                  item.kategoridesain.harga,
                                  item.qty,
                                )
                              }
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
