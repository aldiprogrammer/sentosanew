import AdminLayout from "@/Layouts/AdminLayout";
import NewCustomerModal from "@/Components/NewCustomerModal";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Desain({
  customer,
  kategoridesain,
  kodespk,
  kode_antrian,
  tanggal,
  desain,
}) {
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
    kodespk: kodespk,
    kodeantiran: kode_antrian,
    tanggal: "",
    id_customer: "",
    customer: "",
    kategori: "",
    id_kategori_desain: "",
    harga: "",
    qty: 0,
    tanggal: tanggal,
  });
  const modalRef = useRef(null);
  const customerModalRef = useRef(null);
  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const openCustomerModal = () => {
    modalRef.current.close();
    customerModalRef.current.showModal();
  };

  const reopenModal = () => {
    modalRef.current.showModal();
  };

  const editmodalRef = useRef(null);
  const openModalEdit = (
    id,
    tanggal,
    noantrian,
    kodespk,
    idcustomer,
    customer,
    idkategoridesain,
    kategori,
    harga,
    qty,
    total_harga,
  ) => {
    editmodalRef.current.showModal();
    setData({
      id: id,
      tanggal: tanggal,
      kodespk: kodespk,
      kodeantiran: noantrian,
      id_customer: idcustomer,
      customer: customer,
      id_kategori_desain: idkategoridesain,
      kategori: kategori,
      harga: harga,
      qty: qty,
      total_harga: total_harga,
    });
  };

  const closeModalEdit = () => {
    editmodalRef.current.close();
    reset();
  };

  const save = (e) => {
    e.preventDefault();
    post("/desain", {
      onSuccess: () => {
        console.log("berhasil");
        reset();
        closeModal();
      },
    });
  };

  const hapus = (id) => {
    if (confirm("Yakin ingin menghapus")) {
      destroy("/desain/" + id);
      closeModalEdit();
    }
  };

  const update = (e) => {
    e.preventDefault();
    put("/desain/" + data.id, {
      onSuccess: () => {
        closeModalEdit();
        reset();
      },
    });
  };

  const handleCustomer = async (id) => {
    setData("id_customer", id);
    try {
      const response = await axios.get("/customer/" + id);
      setData("kategori", response.data.kategori);
    } catch (error) { }
  };

  const handleKategori = async (id) => {
    setData("id_kategori_desain", id);
    try {
      const response = await axios.get("/kategoridesain/" + id);
      console.log(response.data);
      setData("harga", response.data.harga);
    } catch (error) { }
  };

  function formatRupiah(value) {
    const digits = String(value).replace(/\D/g, "");
    if (!digits) return "";
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const exportPDF = () => {
    try {
      const doc = new jsPDF("l", "mm", "a4");
      doc.setFontSize(16);
      doc.text("Data Desain", 14, 20);
      doc.setFontSize(10);
      doc.text("Tanggal: " + new Date().toLocaleDateString("id-ID"), 14, 27);
      const rows = desain.map((item, index) => [index + 1, item.tanggal, item.no_antrian, item.kode_spk, item.customer.nama, item.kategoridesain.kategori, item.qty, item.total_harga ? "Rp " + formatRupiah(String(item.total_harga)) : "-"]);
      autoTable(doc, { startY: 32, head: [["No", "Tgl", "No Antrian", "Kode SPK", "Customer", "Desain", "Qty", "Total Harga"]], body: rows, styles: { fontSize: 8 }, headStyles: { fillColor: [22, 163, 74] }, theme: "grid" });
      doc.save("data_desain.pdf");
    } catch (error) {
      console.error("Gagal export PDF:", error);
      alert("Gagal mengexport PDF: " + error.message);
    }
  };

  return (
    <>
      <AdminLayout>
        <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
          <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
            <div class="card-body">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <h2 class="card-title">Data Desain</h2>
                <div class="flex gap-2">
                  <button className="btn btn-primary" onClick={exportPDF}>
                    <i className="fas fa-file-pdf"></i> Export PDF
                  </button>
                  <button className="btn btn-success" onClick={openModal}>
                    <i className="fas fa-plus"></i>
                    Tambah Desain
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

                      <h3 className="text-lg font-bold">Form Desain</h3>

                      <form onSubmit={save}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">Tanggal</span>
                            </div>
                            <input
                              type="text"
                              name="kode"
                              value={tanggal}
                              className="input input-bordered input-success w-full"
                              required
                            />
                          </label>
                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">No Antrian</span>
                            </div>
                            <input
                              type="text"
                              name="kode"
                              value={kode_antrian}
                              className="input input-bordered input-success w-full"
                              required
                            />
                          </label>

                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">Customer</span>
                            </div>
                            <select
                              name=""
                              id=""
                              className="input input-bordered input-success"
                              required
                              onChange={(e) => handleCustomer(e.target.value)}
                            >
                              <option value="">-- Pilih Customer --</option>
                              {customer.map((cs, index) => (
                                <option value={cs.id}>{cs.nama}</option>
                              ))}
                            </select>
                          </label>

                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">Kategori Customer</span>
                            </div>
                            <input
                              type="text"
                              name="nama"
                              value={data.kategori}
                              className="input input-bordered input-success w-full"
                              required
                            />
                          </label>

                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">
                                Kategori Desain
                              </span>
                            </div>
                            <select
                              name=""
                              id=""
                              className="input input-bordered input-success"
                              required
                              onChange={(e) => handleKategori(e.target.value)}
                            >
                              <option value="">
                                -- Pilih Kategori Desain --
                              </option>
                              {kategoridesain.map((kd, index) => (
                                <option value={kd.id}>{kd.kategori}</option>
                              ))}
                            </select>
                          </label>

                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">Harga</span>
                            </div>
                            <input
                              type="text"
                              name="nama"
                              value={data.harga ? formatRupiah(data.harga) : ""}
                              className="input input-bordered input-success w-full"
                              required
                            />
                          </label>

                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">QTY</span>
                            </div>
                            <input
                              type="number"
                              value={data.qty}
                              className="input input-bordered input-success w-full"
                              required
                              onChange={(e) => setData("qty", e.target.value)}
                            />
                          </label>

                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">Total Harga</span>
                            </div>
                            <input
                              type="text"
                              value={
                                data.harga && data.qty
                                  ? "Rp " + formatRupiah(String(Number(data.harga) * Number(data.qty)))
                                  : "Rp 0"
                              }
                              className="input input-bordered input-success w-full font-bold"
                              readOnly
                            />
                          </label>
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
                            onClick={openCustomerModal}
                            className="btn btn-warning"
                          >
                            Tambah Customer
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

                  <NewCustomerModal
                    modalRef={customerModalRef}
                    onCancel={reopenModal}
                    onSuccess={reopenModal}
                  />

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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">Tanggal</span>
                            </div>
                            <input
                              type="text"
                              name="kode"
                              value={data.tanggal}
                              className="input input-bordered input-success w-full"
                              required
                            />
                          </label>
                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">Kode Antrian</span>
                            </div>
                            <input
                              type="text"
                              name="kode"
                              value={data.kodeantiran}
                              className="input input-bordered input-success w-full"
                              required
                            />
                          </label>

                          {/* <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">Kode SPK</span>
                            </div>
                            <input
                              type="text"
                              name="kode"
                              value={data.kodespk}
                              className="input input-bordered input-success w-full"
                              required
                            />
                          </label> */}

                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">Customer</span>
                            </div>
                            <select
                              name=""
                              id=""
                              className="input input-bordered input-success"
                              required
                              onChange={(e) => handleCustomer(e.target.value)}
                            >
                              <option value={data.id_customer}>
                                {data.customer}
                              </option>
                              {customer.map((cs, index) => (
                                <option value={cs.id}>{cs.nama}</option>
                              ))}
                            </select>
                          </label>

                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">Kategori</span>
                            </div>
                            <input
                              type="text"
                              name="nama"
                              value={data.kategori}
                              className="input input-bordered input-success w-full"
                              required
                            />
                          </label>

                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">
                                Kategori Desain
                              </span>
                            </div>
                            <select
                              name=""
                              id=""
                              className="input input-bordered input-success"
                              required
                              onChange={(e) => handleKategori(e.target.value)}
                            >
                              <option value={data.id_kategori_desain}>
                                {data.kategori}
                              </option>
                              {kategoridesain.map((kd, index) => (
                                <option value={kd.id}>{kd.kategori}</option>
                              ))}
                            </select>
                          </label>

                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">Harga</span>
                            </div>
                            <input
                              type="text"
                              name="nama"
                              value={data.harga ? formatRupiah(data.harga) : ""}
                              className="input input-bordered input-success w-full"
                              required
                            />
                          </label>

                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">QTY</span>
                            </div>
                            <input
                              type="number"
                              value={data.qty}
                              className="input input-bordered input-success w-full"
                              required
                              onChange={(e) => setData("qty", e.target.value)}
                            />
                          </label>

                          <label className="form-control w-full mt-2">
                            <div className="label">
                              <span className="label-text">Total Harga</span>
                            </div>
                            <input
                              type="text"
                              value={
                                data.harga && data.qty
                                  ? "Rp " + formatRupiah(String(Number(data.harga) * Number(data.qty)))
                                  : "Rp 0"
                              }
                              className="input input-bordered input-success w-full font-bold"
                              readOnly
                            />
                          </label>
                        </div>

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
                      <th>Tgl</th>
                      <th>No Antrian</th>
                      {/* <th>Kode SPK</th> */}
                      <th>Customer</th>
                      <th>Desain</th>
                      <th>Qty</th>
                      <th>Total Harga</th>
                      <th>Desainer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {desain.map((item, index) => (
                      <tr
                        key={item.id}
                        onClick={() => openModalEdit(item.id, item.tanggal, item.no_antrian, item.kode_spk, item.id_customer, item.customer.nama, item.id_kategori_desain, item.kategoridesain.kategori, item.kategoridesain.harga, item.qty, item.total_harga)}
                        className="cursor-pointer hover:bg-base-200"
                      >
                        <td>{index + 1}</td>
                        <td>{item.tanggal}</td>
                        <td>{item.no_antrian}</td>
                        {/* <td>{item.kode_spk}</td> */}
                        <td>{item.customer.nama}</td>
                        <td>{item.kategoridesain.kategori}</td>
                        <td>{item.qty}</td>
                        <td>Rp {formatRupiah(item.total_harga)}</td>
                        <td>{item.desainer?.username || item.desainer?.username || '-'}</td>
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
