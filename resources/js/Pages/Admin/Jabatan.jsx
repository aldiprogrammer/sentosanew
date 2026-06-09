import AdminLayout from '@/Layouts/AdminLayout'
import { router, useForm } from '@inertiajs/react';
import React, { useRef } from 'react'
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Jabatan({ jabatan, kode, daftarMenu }) {
    const { data, setData, post, delete: destroy, put, processing, reset } = useForm({
        id: 0,
        kode: '',
        jabatan: '',
        menu_akses: [],
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
            id: item.id,
            kode: item.kode,
            jabatan: item.jabatan,
            menu_akses: item.menu_akses ?? [],
        })
    }

    const closeModalEdit = () => {
        editmodalRef.current.close();
        reset()
    };

    const toggleMenu = (key) => {
        const current = data.menu_akses || [];
        if (current.includes(key)) {
            setData('menu_akses', current.filter(k => k !== key));
        } else {
            setData('menu_akses', [...current, key]);
        }
    }

    const save = (e) => {
        e.preventDefault();
        post('/jabatan', {
            onSuccess: () => {
                reset();
                closeModal();
            }
        })
    }

    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus")) {
            destroy("/jabatan/" + id);
            closeModalEdit();
        }
    }

    const update = (e) => {
        e.preventDefault();
        put('/jabatan/' + data.id, {
            onSuccess: () => {
                closeModalEdit();
                reset();
            }
        })
    }

    const exportPDF = () => {
        try {
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text("Data Jabatan", 14, 20);
            doc.setFontSize(10);
            doc.text("Tanggal: " + new Date().toLocaleDateString("id-ID"), 14, 27);
            const rows = jabatan.map((item, index) => [index + 1, item.kode, item.jabatan]);
            autoTable(doc, { startY: 32, head: [["No", "Kode", "Jabatan"]], body: rows, styles: { fontSize: 10 }, headStyles: { fillColor: [22, 163, 74] }, theme: "grid" });
            doc.save("data_jabatan.pdf");
        } catch (error) {
            console.error("Gagal export PDF:", error);
            alert("Gagal mengexport PDF: " + error.message);
        }
    };

    const MenuCheckbox = ({ item }) => (
        <label className="label cursor-pointer justify-start gap-2 py-1">
            <input
                type="checkbox"
                className="checkbox checkbox-success checkbox-sm"
                checked={(data.menu_akses || []).includes(item.key)}
                onChange={() => toggleMenu(item.key)}
            />
            <span className="label-text">{item.label}</span>
        </label>
    );

    const groups = [...new Set(daftarMenu.map(m => m.group))];

    return (
        <AdminLayout>
            <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
                <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div class="card-body">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <h2 class="card-title">Data Jabatan</h2>
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
                                                        Jabatan
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    value={data.jabatan}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "jabatan",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <div className="mt-4">
                                                <div className="label">
                                                    <span className="label-text font-semibold">Akses Menu</span>
                                                </div>
                                                <div className="border rounded-box p-3 bg-base-200 space-y-2">
                                                    {groups.map(group => (
                                                        <div key={group}>
                                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{group}</p>
                                                            <div className="grid grid-cols-2 gap-1">
                                                                {daftarMenu.filter(m => m.group === group).map(menu => (
                                                                    <MenuCheckbox key={menu.key} item={menu} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

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
                                                        Jabatan
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    value={data.jabatan}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "jabatan",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <div className="mt-4">
                                                <div className="label">
                                                    <span className="label-text font-semibold">Akses Menu</span>
                                                </div>
                                                <div className="border rounded-box p-3 bg-base-200 space-y-2">
                                                    {groups.map(group => (
                                                        <div key={group}>
                                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{group}</p>
                                                            <div className="grid grid-cols-2 gap-1">
                                                                {daftarMenu.filter(m => m.group === group).map(menu => (
                                                                    <MenuCheckbox key={menu.key} item={menu} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
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
                                        <th>Kode</th>
                                        <th>Jabatan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jabatan.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            onClick={() => openModalEdit(item)}
                                            className="cursor-pointer hover:bg-base-200"
                                        >
                                            <td>{index + 1}</td>
                                            <td>{item.kode}</td>
                                            <td>{item.jabatan}</td>
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
