import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
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
    customer: "",
    id_bahan: "",
    bahan: "",
    keterangan: "",
    satuan: "",
    tinggi: "",
    lebar: "",
    qty: "",
    sisi: "1 SISI",
    catatan: "",
    metode_pengambilan: "",
    tgl_kirim: "",
    pinising: {
      atas: "",
      bawah: "",
      kanan: "",
      kiri: "",
    },
    mata_ayam: [],
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
    const pd = produksi.find((item) => item.id === Number(id));
    setData({
      id: id,
      no_antrian: pd.no_antrian,
      kode_spk: pd.kode_spk,
      id_customer: pd.id_customer,
      customer: pd.customer.nama,
      bahan: pd.bahan.bahan,
      alamat: pd.customer.alamat,
      id_bahan: pd.id_bahan,
      keterangan: pd.keterangan,
      satuan: pd.satuan,
      tinggi: pd.tinggi,
      lebar: pd.lebar,
      qty: pd.qty,
      sisi: pd.sisi,
      metode_pengambilan: pd.metode_pengantaran,
      tgl_kirim: pd.tgl_kirim,
      pinising: pd.pinising
        ? {
          atas: pd.pinising.atas || "",
          bawah: pd.pinising.bawah || "",
          kanan: pd.pinising.kanan || "",
          kiri: pd.pinising.kiri || "",
        }
        : { atas: "", bawah: "", kanan: "", kiri: "" },
      mata_ayam: pd.mata_ayam
        ? [
          ...(pd.mata_ayam.atas ? ["Atas"] : []),
          ...(pd.mata_ayam.bawah ? ["Bawah"] : []),
          ...(pd.mata_ayam.kiri ? ["Kiri"] : []),
          ...(pd.mata_ayam.kanan ? ["Kanan"] : []),
        ]
        : [],
    });
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
      destroy("/produksi/" + id);
    }
  };

  const update = (e) => {
    e.preventDefault();
    put("/produksi/" + data.id, {
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
    if (!ds) return;

    setData((prev) => ({
      ...prev,
      id_desain: e,
      id_customer: ds.id_customer,
      no_antrian: ds.no_antrian,
      kode_spk: ds.kode_spk,
      alamat: ds.customer.alamat,
      customer: ds.customer.nama,
    }));
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
                      >
                        ✕
                      </button>

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
                                  name="id_customer"
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
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">Tanggal Produksi</span>
                              </div>
                              <input
                                type="date"
                                value={new Date().toISOString().split("T")[0]}
                                className="input input-bordered input-success w-full"
                                disabled
                              />
                            </label>
                            <div className="divider mt-4 mb-6">Pinising</div>
                            <div className="grid grid-cols-2 gap-2">
                              {["atas", "bawah", "kanan", "kiri"].map(
                                (sisi) => (
                                  <label key={sisi} className="form-control">
                                    <div className="label py-1">
                                      <span className="label-text capitalize">
                                        {sisi}
                                      </span>
                                    </div>
                                    <select
                                      value={data.pinising[sisi]}
                                      onChange={(e) => {
                                        const updated = {
                                          ...data.pinising,
                                          [sisi]: e.target.value,
                                        };
                                        setData("pinising", updated);
                                      }}
                                      className="select select-bordered select-success  w-full"
                                    >
                                      <option value="">--</option>
                                      <option value="Kantongan">
                                        Kantongan
                                      </option>
                                      <option value="Lipat Pas Gambar">
                                        Lipat Pas Gambar
                                      </option>
                                      <option value="Potong Pas Gambar">
                                        Potong Pas Gambar
                                      </option>
                                      <option value="Lipat Sisa Putih">
                                        Lipat Sisa Putih
                                      </option>
                                      <option value="Sisa Putih">
                                        Sisa Putih
                                      </option>
                                    </select>
                                  </label>
                                )
                              )}
                            </div>
                          </div>

                        </div>


                        <div className="grid grid-cols-2 gap-2 items-start">
                          <div className="p-5 bg-base-200 rounded-lg mt-2">
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
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

                              {/* Sisi */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Sisi</span>
                                </div>
                                <select
                                  name="sisi"
                                  value={data.sisi}
                                  onChange={(e) =>
                                    setData("sisi", e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value="">Pilih sisi</option>
                                  <option value="1 SISI">1 SISI</option>
                                  <option value="2 SISI">2 SISI</option>
                                </select>
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
                                    Tanggal Kirim / Tanggal Ambil
                                  </span>
                                </div>
                                <input
                                  type="date"
                                  name="tgl_ambil"
                                  value={data.tgl_kirim}
                                  onChange={(e) =>
                                    setData("tgl_kirim", e.target.value)
                                  }
                                  className="input input-bordered input-success w-full"
                                  required
                                />
                              </label>
                            </div>
                          </div>

                          <div className="p-5 bg-base-200 rounded-lg mt-2">
                            <div className="divider mt-4 mb-6 ">Mata Ayam</div>
                            <div className="flex flex-wrap gap-4">
                              {["Atas", "Bawah", "Kiri", "Kanan"].map(
                                (sisi) => (
                                  <label
                                    key={sisi}
                                    className="flex items-center gap-2 cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      className="checkbox checkbox-success checkbox-sm"
                                      checked={data.mata_ayam.includes(
                                        sisi
                                      )}
                                      onChange={(e) => {
                                        const updated = e.target.checked
                                          ? [...data.mata_ayam, sisi]
                                          : data.mata_ayam.filter(
                                            (s) => s !== sisi
                                          );
                                        setData("mata_ayam", updated);
                                      }}
                                    />
                                    <span className="text-sm">{sisi}</span>
                                  </label>
                                )
                              )}
                            </div>
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
                    <div className="modal-box w-11/12 max-w-5xl">
                      <button
                        type="button"
                        onClick={closeModalEdit}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      >
                        ✕
                      </button>

                      <h3 className="text-lg font-bold">Edit Produksi</h3>

                      <form onSubmit={update}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {/* Customer */}
                          <div className="p-5 bg-base-200 rounded-lg">
                            <div className="grid  md:grid-cols-2 gap-2">
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Customer</span>
                                </div>
                                <select
                                  name="id_customer"
                                  value={data.id_customer}
                                  onChange={(e) =>
                                    handleCustomer(e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value={data.id_customer}>
                                    {data.customer}
                                  </option>
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
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text">Tanggal Produksi</span>
                              </div>
                              <input
                                type="date"
                                value={new Date().toISOString().split("T")[0]}
                                className="input input-bordered input-success w-full"
                                disabled
                              />
                            </label>
                            <div className="divider mt-4 mb-6">Pinising</div>
                            <div className="grid grid-cols-2 gap-2">
                              {["atas", "bawah", "kanan", "kiri"].map(
                                (sisi) => (
                                  <label key={sisi} className="form-control">
                                    <div className="label py-1">
                                      <span className="label-text capitalize text-xs">
                                        {sisi}
                                      </span>
                                    </div>
                                    <select
                                      value={data.pinising[sisi]}
                                      onChange={(e) => {
                                        const updated = {
                                          ...data.pinising,
                                          [sisi]: e.target.value,
                                        };
                                        setData("pinising", updated);
                                      }}
                                      className="select select-bordered select-success  w-full"
                                    >
                                      <option value="">--</option>
                                      <option value="Kantongan">
                                        Kantongan
                                      </option>
                                      <option value="Lipat Pas Gambar">
                                        Lipat Pas Gambar
                                      </option>
                                      <option value="Potong Pas Gambar">
                                        Potong Pas Gambar
                                      </option>
                                      <option value="Lipat Sisa Putih">
                                        Lipat Sisa Putih
                                      </option>
                                      <option value="Sisa Putih">
                                        Sisa Putih
                                      </option>
                                    </select>
                                  </label>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 items-start">
                          <div className="p-5 bg-base-200 rounded-lg mt-2">
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                              {/* Bahan */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Bahan</span>
                                </div>
                                <select
                                  name="satuan"
                                  value={data.id_bahan}
                                  onChange={(e) =>
                                    setData("id_bahan", e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value={data.id_bahan}>
                                    {data.bahan}
                                  </option>
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

                              {/* Sisi */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">Sisi</span>
                                </div>
                                <select
                                  name="sisi"
                                  value={data.sisi}
                                  onChange={(e) =>
                                    setData("sisi", e.target.value)
                                  }
                                  className="select select-bordered select-success w-full"
                                  required
                                >
                                  <option value="">Pilih sisi</option>
                                  <option value="1 SISI">1 SISI</option>
                                  <option value="2 SISI">2 SISI</option>
                                </select>
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
                                    Tanggal Kirim / Tanggal Ambil
                                  </span>
                                </div>
                                <input
                                  type="date"
                                  name="tgl_ambil"
                                  value={data.tgl_kirim}
                                  onChange={(e) =>
                                    setData("tgl_kirim", e.target.value)
                                  }
                                  className="input input-bordered input-success w-full"
                                  required
                                />
                              </label>
                            </div>
                          </div>

                          <div className="p-5 bg-base-200 rounded-lg mt-2">
                            <div className="divider mt-4 mb-6">Mata Ayam</div>
                            <div className="flex flex-wrap gap-4">
                              {["Atas", "Bawah", "Kiri", "Kanan"].map(
                                (sisi) => (
                                  <label
                                    key={sisi}
                                    className="flex items-center gap-2 cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      className="checkbox checkbox-success checkbox-sm"
                                      checked={data.mata_ayam.includes(
                                        sisi
                                      )}
                                      onChange={(e) => {
                                        const updated = e.target.checked
                                          ? [...data.mata_ayam, sisi]
                                          : data.mata_ayam.filter(
                                            (s) => s !== sisi
                                          );
                                        setData("mata_ayam", updated);
                                      }}
                                    />
                                    <span className="text-sm">{sisi}</span>
                                  </label>
                                )
                              )}
                            </div>
                          </div>

                        </div>

                        <div className="mt-4 flex gap-2">
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
                      <th>Kode SPK</th>
                      <th>Customer</th>
                      <th>Bahan</th>
                      <th>Keterangan</th>
                      <th>Satuan</th>
                      <th>Tinggi</th>
                      <th>Lebar</th>
                      <th>Qty</th>
                      <th>Sisi</th>
                      <th>Metode P</th>
                      <th>Tgl Kirim /Ambil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produksi.map((item, index) => (
                      <tr
                        key={item.id}
                        onClick={() => openModalEdit(item.id)}
                        className="cursor-pointer hover:bg-base-200"
                      >
                        <td>{index + 1}</td>
                        <td>{item.kode_spk}</td>
                        <td>{item.customer.nama}</td>
                        <td>{item.bahan.bahan}</td>
                        <td>{item.keterangan}</td>
                        <td>{item.satuan}</td>
                        <td>{item.tinggi}</td>
                        <td>{item.lebar}</td>
                        <td>{item.qty}</td>
                        <td>{item.sisi}</td>
                        <td>{item.metode_pengantaran}</td>
                        <td>{item.tgl_kirim}</td>
                      </tr>
                    ))}
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
