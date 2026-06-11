import AdminLayout from '@/Layouts/AdminLayout'
import { router, useForm, usePage } from '@inertiajs/react';
import React, { useRef, useEffect, useState } from 'react'
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Otorisasi({ otorisasi }) {
    const { auth } = usePage().props;
    const role = auth.user?.role;
    const canProses = ['admin', 'super admin', 'store manager'].includes(role);
    const { data, setData, post, delete: destroy, put, processing, reset } = useForm({
        id: 0,
        kode_spk: '',
        id_customer: '',
    });

    const [spkData, setSpkData] = useState(null);
    const [loadingSpk, setLoadingSpk] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);

        if (!data.kode_spk || data.kode_spk.length < 3) {
            setSpkData(null);
            setData('id_customer', '');
            return;
        }

        setLoadingSpk(true);
        timerRef.current = setTimeout(async () => {
            try {
                const res = await fetch('/otorisasi/cari/' + encodeURIComponent(data.kode_spk));
                const json = await res.json();
                if (json) {
                    setSpkData(json);
                    setData('id_customer', json.id_customer);
                } else {
                    setSpkData(null);
                    setData('id_customer', '');
                }
            } catch {
                setSpkData(null);
            } finally {
                setLoadingSpk(false);
            }
        }, 500);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [data.kode_spk]);

    const modalRef = useRef(null);
    const openModal = () => {
        modalRef.current.showModal();
        setData('kode_spk', '');
        setSpkData(null);
    }

    const closeModal = () => {
        modalRef.current.close();
    };

    const editmodalRef = useRef(null);
    const openModalEdit = async (item) => {
        editmodalRef.current.showModal();
        setData({
            id: item.id,
            kode_spk: item.kode_spk,
            id_customer: item.id_customer,
        });
        try {
            const res = await fetch('/otorisasi/cari/' + encodeURIComponent(item.kode_spk));
            const json = await res.json();
            setSpkData(json);
        } catch {
            setSpkData(null);
        }
    }

    const closeModalEdit = () => {
        editmodalRef.current.close();
        reset();
        setSpkData(null);
    };

    const save = (e) => {
        e.preventDefault();
        post('/otorisasi', {
            onSuccess: () => {
                reset();
                setSpkData(null);
                closeModal();
            }
        })
    }

    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus")) {
            destroy("/otorisasi/" + id);
            closeModalEdit();
        }
    }

    const update = (e) => {
        e.preventDefault();
        put('/otorisasi/' + data.id, {
            onSuccess: () => {
                closeModalEdit();
                reset();
                setSpkData(null);
            }
        })
    }

    const [loadingProses, setLoadingProses] = useState(false);

    const handleProses = () => {
        if (!confirm('Setujui otorisasi ini?')) return;
        setLoadingProses(true);
        put('/otorisasi/' + data.id + '/proses', {
            onSuccess: () => {
                closeModalEdit();
                setLoadingProses(false);
                setSpkData(null);
            },
            onError: () => {
                setLoadingProses(false);
            }
        })
    }

    const formatRupiah = (num) => {
        return new Intl.NumberFormat('id-ID').format(num);
    };

    const exportPDF = () => {
        try {
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text("Data Otorisasi", 14, 20);
            doc.setFontSize(10);
            doc.text("Tanggal: " + new Date().toLocaleDateString("id-ID"), 14, 27);
            const rows = otorisasi.map((item, index) => [index + 1, item.kode_spk, item.customer?.nama, item.customer?.no_hp, item.tanggal_pengajuan, item.tanggal_disetujui ?? '-']);
            autoTable(doc, { startY: 32, head: [["No", "Kode SPK", "Customer", "No HP", "Tgl Pengajuan", "Tgl Disetujui"]], body: rows, styles: { fontSize: 10 }, headStyles: { fillColor: [22, 163, 74] }, theme: "grid" });
            doc.save("data_otorisasi.pdf");
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
                            <h2 class="card-title">Data Otorisasi</h2>
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
                                    <div className="modal-box max-w-2xl">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                        >
                                            ✕
                                        </button>

                                        <h3 className="text-lg font-bold">
                                            Pengajuan Otorisasi
                                        </h3>

                                        <form onSubmit={save} >
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Kode SPK
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.kode_spk}
                                                    className="input input-bordered input-success w-full"
                                                    placeholder="Masukkan kode SPK"
                                                    required
                                                    onChange={(e) =>
                                                        setData("kode_spk", e.target.value)
                                                    }
                                                />
                                            </label>

                                            {loadingSpk && (
                                                <div className="mt-2 text-sm text-gray-500">
                                                    Mencari SPK...
                                                </div>
                                            )}

                                            {spkData && !loadingSpk && (
                                                <div className="mt-3 p-3 border border-success rounded-box bg-success/5">
                                                    <p className="text-sm font-semibold text-success">Data ditemukan:</p>
                                                    <p className="text-sm mt-1">Customer: {spkData.nama}</p>
                                                    {/* <p className="text-sm">No HP: {spkData.nohp}</p> */}
                                                    <p className="text-sm">Total Harga: Rp {formatRupiah(spkData.total_harga)}</p>
                                                </div>
                                            )}

                                            <div className="mt-4 flex gap-2">
                                                <button
                                                    type="submit"
                                                    disabled={processing || !spkData}
                                                    className="btn btn-success"
                                                >
                                                    Ajukan otorisasi
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

                                <dialog ref={editmodalRef} className="modal">
                                    <div className="modal-box max-w-2xl">
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
                                                        Kode SPK
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.kode_spk}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData("kode_spk", e.target.value)
                                                    }
                                                />
                                            </label>

                                            {loadingSpk && (
                                                <div className="mt-2 text-sm text-gray-500">
                                                    Mencari SPK...
                                                </div>
                                            )}

                                            {spkData && !loadingSpk && (
                                                <div className="mt-3 p-3 border border-success rounded-box bg-success/5">
                                                    <p className="text-sm font-semibold text-success">Data ditemukan:</p>
                                                    <p className="text-sm mt-1">Customer: {spkData.nama}</p>
                                                    {/* <p className="text-sm">No HP: {spkData.nohp}</p> */}
                                                    <p className="text-sm">Total Harga: Rp {formatRupiah(spkData.total_harga)}</p>
                                                </div>
                                            )}

                                            <div className="mt-4 flex gap-2">
                                                <button
                                                    type="submit"
                                                    disabled={processing || !spkData}
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
                                                {canProses && (
                                                    <button
                                                        type="button"
                                                        onClick={handleProses}
                                                        disabled={loadingProses}
                                                        className="btn btn-info"
                                                    >
                                                        {loadingProses ? 'Memproses...' : <><i className="fas fa-check-circle"></i> Proses</>}
                                                    </button>
                                                )}
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
                                        <th>No HP</th>
                                        <th>Tgl Pengajuan</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {otorisasi.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            onClick={() => openModalEdit(item)}
                                            className="cursor-pointer hover:bg-base-200"
                                        >
                                            <td>{index + 1}</td>
                                            <td>{item.kode_spk}</td>
                                            <td>{item.customer?.nama}</td>
                                            <td>{item.customer?.nohp}</td>
                                            <td>{item.tanggal_pengajuan}</td>
                                            <td>{item.status == '0' ? 'Menunggu' : 'Disetujui'}</td>
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
