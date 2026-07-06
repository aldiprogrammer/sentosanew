import AdminLayout from '@/Layouts/AdminLayout'
import { router, useForm } from '@inertiajs/react';
import React, { useRef } from 'react'
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Kategoridesain({ kategori, kode }) {
    const { data, setData, post, delete: destroy, put, processing, reset } = useForm({
        id: 0,
        kode: '',
        kategori: '',
        harga: '',
        qty: '',
        fee: '',
        fee_cs: '',
        status_point: 0,
    });
    const modalRef = useRef(null);
    const openModal = () => {
        modalRef.current.showModal();
        setData('kode', kode);
    }

    const closeModal = () => {
        modalRef.current.close();
    };

    const editmodalRef = useRef(null);
    const openModalEdit = (item) => {
        editmodalRef.current.showModal();
        setData({
            'id': item.id,
            'kode': item.kode,
            'kategori': item.kategori,
            'harga': item.harga,
            'qty': item.qty,
            'fee': item.fee,
            'fee_cs': item.fee_cs,
            'status_point': item.status_point,
        })
    }

    const closeModalEdit = () => {
        editmodalRef.current.close();
        reset()
    };


    const save = (e) => {
        e.preventDefault();
        post('/kategoridesain', {
            onSuccess: () => {
                console.log('berhasil');
                reset();
                closeModal();

            }
        })
    }

    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus")) {
            destroy("/kategoridesain/" + id);
            closeModalEdit();
        }
    }

    const update = (e) => {
        e.preventDefault();
        put('/kategoridesain/' + data.id, {
            onSuccess: () => {
                closeModalEdit();
                reset();
            }
        })
    }

    function formatRupiah(value) {
        const digits = value.replace(/\D/g, '');
        if (!digits) return '';
        return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const exportPDF = () => {
        try {
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text("Data Kategori Desain", 14, 20);
            doc.setFontSize(10);
            doc.text("Tanggal: " + new Date().toLocaleDateString("id-ID"), 14, 27);
            const rows = kategori.map((item, index) => [index + 1, item.kode, item.kategori, item.harga ? "Rp " + formatRupiah(String(item.harga)) : "-", item.qty || '-', item.fee ? "Rp " + formatRupiah(String(item.fee)) : "-", item.fee_cs ? "Rp " + formatRupiah(String(item.fee_cs)) : "-", item.status_point == 1 ? "Aktif" : "Tidak Aktif"]);
            autoTable(doc, { startY: 32, head: [["No", "Kode", "Kategori", "Harga", "Qty", "Fee", "Fee CS", "Status Point"]], body: rows, styles: { fontSize: 8 }, headStyles: { fillColor: [22, 163, 74] }, theme: "grid" });
            doc.save("data_kategori_desain.pdf");
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
                            <h2 class="card-title">Data Kategori Desain</h2>
                            <div class="flex gap-2">
                                <button className="btn btn-primary" onClick={exportPDF}>
                                    <i className="fas fa-file-pdf"></i> Export PDF
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={openModal}
                                >
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

                                        <h3 className="text-lg font-bold">
                                            Tambah data
                                        </h3>

                                        <form onSubmit={save} >
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Kode
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="kode"
                                                    value={kode}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "kode",
                                                            kode
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Kategori
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    value={data.kategori}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "kategori",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Harga
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    value={data.harga ? formatRupiah(String(data.harga)) : ''}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "harga",
                                                            e.target.value.replace(/\D/g, ''),
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Qty</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.qty}
                                                    className="input input-bordered input-success w-full"
                                                    placeholder="0"
                                                    onChange={(e) => setData("qty", e.target.value)}
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Fee</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.fee ? formatRupiah(String(data.fee)) : ''}
                                                    className="input input-bordered input-success w-full"
                                                    placeholder="Rp 0"
                                                    onChange={(e) => setData("fee", e.target.value.replace(/\D/g, ''))}
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Fee CS</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.fee_cs ? formatRupiah(String(data.fee_cs)) : ''}
                                                    className="input input-bordered input-success w-full"
                                                    placeholder="Rp 0"
                                                    onChange={(e) => setData("fee_cs", e.target.value.replace(/\D/g, ''))}
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Status Point</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="status_point"
                                                            value="1"
                                                            checked={data.status_point == 1}
                                                            onChange={() => setData('status_point', 1)}
                                                            className="radio radio-success"
                                                        />
                                                        Aktif
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="status_point"
                                                            value="0"
                                                            checked={data.status_point == 0}
                                                            onChange={() => setData('status_point', 0)}
                                                            className="radio radio-error"
                                                        />
                                                        Tidak Aktif
                                                    </label>
                                                </div>
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

                                        <h3 className="text-lg font-bold">
                                            Edit data
                                        </h3>

                                        <form onSubmit={update} >
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Kode
                                                    </span>
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
                                                    <span className="label-text">
                                                        Kategori
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    value={data.kategori}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "kategori",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>


                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Harga
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    value={data.harga ? formatRupiah(String(data.harga)) : ''}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "harga",
                                                            e.target.value.replace(/\D/g, ''),
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Qty</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.qty}
                                                    className="input input-bordered input-success w-full"
                                                    placeholder="0"
                                                    onChange={(e) => setData("qty", e.target.value)}
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Fee</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.fee ? formatRupiah(String(data.fee)) : ''}
                                                    className="input input-bordered input-success w-full"
                                                    placeholder="Rp 0"
                                                    onChange={(e) => setData("fee", e.target.value.replace(/\D/g, ''))}
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Fee CS</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.fee_cs ? formatRupiah(String(data.fee_cs)) : ''}
                                                    className="input input-bordered input-success w-full"
                                                    placeholder="Rp 0"
                                                    onChange={(e) => setData("fee_cs", e.target.value.replace(/\D/g, ''))}
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Status Point</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="status_point_edit"
                                                            value="1"
                                                            checked={data.status_point == 1}
                                                            onChange={() => setData('status_point', 1)}
                                                            className="radio radio-success"
                                                        />
                                                        Aktif
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="status_point_edit"
                                                            value="0"
                                                            checked={data.status_point == 0}
                                                            onChange={() => setData('status_point', 0)}
                                                            className="radio radio-error"
                                                        />
                                                        Tidak Aktif
                                                    </label>
                                                </div>
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
                                        <th>Kategori</th>
                                        <th>Harga</th>
                                        <th>Qty</th>
                                        <th>Fee</th>
                                        <th>Fee CS</th>
                                        <th>Status Point</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kategori.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            onClick={() => openModalEdit(item)}
                                            className="cursor-pointer hover:bg-base-200"
                                        >
                                            <td>{index + 1}</td>
                                            <td>{item.kode}</td>
                                            <td>{item.kategori}</td>
                                            <td>{Number(item.harga).toLocaleString('id-ID')}</td>
                                            <td>{item.qty || '-'}</td>
                                            <td>{item.fee ? 'Rp ' + Number(item.fee).toLocaleString('id-ID') : '-'}</td>
                                            <td>{item.fee_cs ? 'Rp ' + Number(item.fee_cs).toLocaleString('id-ID') : '-'}</td>
                                            <td>
                                                {item.status_point == 1 ? (
                                                    <span className="badge badge-success">Aktif</span>
                                                ) : (
                                                    <span className="badge badge-error">Tidak Aktif</span>
                                                )}
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
    )
}
