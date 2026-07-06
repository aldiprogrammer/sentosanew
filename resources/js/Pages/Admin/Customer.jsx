import AdminLayout from '@/Layouts/AdminLayout'
import { Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react'
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 13);
    if (digits.length <= 4) return digits;
    if (digits.length <= 8) return digits.slice(0, 4) + '-' + digits.slice(4);
    return digits.slice(0, 4) + '-' + digits.slice(4, 8) + '-' + digits.slice(8);
}

function formatRupiah(value) {
    const digits = value.replace(/\D/g, '');
    if (!digits) return '';
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default function Customer({ customer, kode }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState('');

    useEffect(() => {
        const t = setTimeout(() => {
            router.get('/customer', { search }, { preserveState: true, replace: true });
        }, 500);
        return () => clearTimeout(t);
    }, [search]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/customer', { search }, { preserveState: true, replace: true });
    };
    const restrictedRoles = ['customer service', 'desain', 'gudang', 'finishing', 'logistik'];
    const isEditable = !restrictedRoles.includes(auth.user?.role);
    const { data, setData, post, delete: destroy, put, processing, reset } = useForm({
        id: 0,
        kode: kode,
        sapaan: '',
        nama: '',
        alamat: '',
        nohp: '',
        kategori: '',
        limit: '',
        limit_akhir: '',
        jatuh_tempo: '',
    });

    const capitalizeFirst = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };
    const modalRef = useRef(null);
    const openModal = () => {
        modalRef.current.showModal();
    }

    const closeModal = () => {
        modalRef.current.close();
    };

    const editmodalRef = useRef(null);
    const openModalEdit = (id, nama, alamat, kode, nohp, kategori, limit, sapaan, limit_akhir, jatuh_tempo) => {
        editmodalRef.current.showModal();
        setData({
            'id': id,
            'nama': nama,
            'alamat': alamat,
            'kode': kode,
            'nohp': nohp,
            'kategori': kategori,
            'limit': limit,
            'sapaan': sapaan || '',
            'limit_akhir': limit_akhir || '',
            'jatuh_tempo': jatuh_tempo || '',
        })
    }

    const closeModalEdit = () => {
        editmodalRef.current.close();
        reset()
    };


    const save = (e) => {
        e.preventDefault();
        post('/customer', {
            onSuccess: () => {
                console.log('berhasil');
                reset();
                closeModal();

            }
        })
    }

    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus")) {
            destroy("/customer/" + id);
            closeModalEdit();
        }

    }

    const update = (e) => {
        e.preventDefault();
        put('/customer/' + data.id, {
            onSuccess: () => {
                closeModalEdit();
                reset();

            }
        })
    }


    const exportPDF = () => {
        try {
            const doc = new jsPDF("l", "mm", "a4");
            doc.setFontSize(16);
            doc.text("Data Customer", 14, 20);
            doc.setFontSize(10);
            doc.text("Tanggal: " + new Date().toLocaleDateString("id-ID"), 14, 27);
            const items = customer.data || customer;
            const rows = items.map((item, index) => [index + 1, item.kode, item.sapaan, item.nama, item.nohp, item.kategori, item.alamat, item.limit ? "Rp " + formatRupiah(String(item.limit)) : "-", item.limit_akhir ? "Rp " + formatRupiah(String(item.limit_akhir)) : "-", item.jatuh_tempo || "-"]);
            autoTable(doc, { startY: 32, head: [["No", "Kode", "Sapaan", "Nama", "No Hp", "Kategori", "Alamat", "Limit", "Limit Akhir", "Jatuh Tempo"]], body: rows, styles: { fontSize: 8 }, headStyles: { fillColor: [22, 163, 74] }, theme: "grid" });
            doc.save("data_customer.pdf");
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
                            <h2 class="card-title">Data Customer</h2>
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
                                                        Nama
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    value={data.nama}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "nama",
                                                            capitalizeFirst(e.target.value),
                                                        )
                                                    }
                                                />
                                            </label>

                                            <div className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Sapaan</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="sapaan"
                                                            className="radio radio-success"
                                                            value="Bapak"
                                                            checked={data.sapaan === 'Bapak'}
                                                            onChange={(e) => setData('sapaan', e.target.value)}
                                                        />
                                                        Bapak
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="sapaan"
                                                            className="radio radio-success"
                                                            value="Ibu"
                                                            checked={data.sapaan === 'Ibu'}
                                                            onChange={(e) => setData('sapaan', e.target.value)}
                                                        />
                                                        Ibu
                                                    </label>
                                                </div>
                                            </div>


                                            {/* <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Nama
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    value={data.nama}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "nama",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label> */}

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        No Hp
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formatPhone(data.nohp)}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "nohp",
                                                            e.target.value.replace(/-/g, ''),
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
                                                <select name="" id="" value={data.kategori} className='input input-bordered input-success' required onChange={(e) => setData('kategori', e.target.value)}>
                                                    <option value="">-- Pilih Kategori --</option>
                                                    <option value="Khusus">Khusus</option>
                                                    <option value="Umum">Umum</option>
                                                    <option value="Member">Member</option>

                                                </select>
                                            </label>


                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Alamat
                                                    </span>
                                                </div>
                                                <textarea className='input input-bordered input-succcess' id="" required value={data.alamat} onChange={(e) => setData('alamat', e.target.value)}></textarea>
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Limit
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.limit ? formatRupiah(String(data.limit)) : ''}
                                                    className="input input-bordered input-success w-full"
                                                    readOnly={!isEditable}
                                                    onChange={(e) =>
                                                        setData(
                                                            "limit",
                                                            e.target.value.replace(/\D/g, ''),
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Limit Akhir
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.limit_akhir ? formatRupiah(String(data.limit_akhir)) : ''}
                                                    className="input input-bordered input-success w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "limit_akhir",
                                                            e.target.value.replace(/\D/g, ''),
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Jatuh Tempo
                                                    </span>
                                                </div>
                                                <input
                                                    type="number"
                                                    value={data.jatuh_tempo}
                                                    className="input input-bordered input-success w-full"
                                                    placeholder="Jumlah hari"
                                                    readOnly={!isEditable}
                                                    onChange={(e) =>
                                                        setData("jatuh_tempo", e.target.value)
                                                    }
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
                                                        Nama
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    value={data.nama}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "nama",
                                                            capitalizeFirst(e.target.value),
                                                        )
                                                    }
                                                />
                                            </label>

                                            <div className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Sapaan</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="sapaan"
                                                            className="radio radio-success"
                                                            value="Bapak"
                                                            checked={data.sapaan === 'Bapak'}
                                                            onChange={(e) => setData('sapaan', e.target.value)}
                                                        />
                                                        Bapak
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="sapaan"
                                                            className="radio radio-success"
                                                            value="Ibu"
                                                            checked={data.sapaan === 'Ibu'}
                                                            onChange={(e) => setData('sapaan', e.target.value)}
                                                        />
                                                        Ibu
                                                    </label>
                                                </div>
                                            </div>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        No Hp
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formatPhone(data.nohp)}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "nohp",
                                                            e.target.value.replace(/-/g, ''),
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
                                                <select name="" id="" className='input input-bordered input-success' required onChange={(e) => setData('kategori', e.target.value)}>
                                                    <option value={data.kategori}>{data.kategori}</option>
                                                    <option value="Khusus">Khusus</option>
                                                    <option value="Umum">Umum</option>
                                                    <option value="Member">Member</option>
                                                </select>
                                            </label>


                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Alamat
                                                    </span>
                                                </div>
                                                <textarea className='input input-bordered input-succcess' id="" required value={data.alamat} onChange={(e) => setData('alamat', e.target.value)}></textarea>
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Limit
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.limit ? formatRupiah(String(data.limit)) : ''}
                                                    className="input input-bordered input-success w-full"
                                                    readOnly={!isEditable}
                                                    onChange={(e) =>
                                                        setData(
                                                            "limit",
                                                            e.target.value.replace(/\D/g, ''),
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Jatuh Tempo
                                                    </span>
                                                </div>
                                                <input
                                                    type="number"
                                                    value={data.jatuh_tempo}
                                                    className="input input-bordered input-success w-full"
                                                    placeholder="Jumlah hari"
                                                    readOnly={!isEditable}
                                                    onChange={(e) =>
                                                        setData("jatuh_tempo", e.target.value)
                                                    }
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

                        <div className="mb-3">
                            <form onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Cari nama atau no hp..."
                                    className="input input-bordered input-success w-full max-w-xs"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </form>
                        </div>

                        <div>
                            <table className="table table-zebra" id="myTable">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Kode</th>
                                        <th>Sapaan</th>
                                        <th>Nama</th>
                                        <th>No Hp</th>
                                        <th>Kategori</th>
                                        <th>Alamat</th>
                                        <th>Limit</th>
                                        <th>Limit Akhir</th>
                                        <th>Jatuh Tempo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(customer.data || customer).map((item, index) => (
                                        <tr
                                            key={item.id}
                                            onClick={() => openModalEdit(item.id, item.nama, item.alamat, item.kode, item.nohp, item.kategori, item.limit, item.sapaan, item.limit_akhir, item.jatuh_tempo)}
                                            className={`cursor-pointer hover:bg-base-200 ${item.jatuh_tempo && Number(item.limit_akhir) === 0 ? 'bg-error/20' : ''}`}
                                        >
                                            <td>{customer.from ? customer.from + index : index + 1}</td>
                                            <td>{item.kode}</td>
                                            <td>{item.sapaan}</td>
                                            <td>{item.sapaan ? item.sapaan + '. ' : ''}{item.nama}</td>
                                            <td>{formatPhone(item.nohp)}</td>
                                            <td>{item.kategori}</td>
                                            <td>{item.alamat}</td>
                                            <td>{item.limit ? 'Rp ' + formatRupiah(String(item.limit)) : '-'}</td>
                                            <td>{item.limit_akhir ? 'Rp ' + formatRupiah(String(item.limit_akhir)) : '-'}</td>
                                            <td>{item.jatuh_tempo || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {customer.links && (
                                <div className="flex justify-center mt-4 join">
                                    {customer.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            className={`btn btn-sm join-item ${link.active ? 'btn-success' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                            preserveState
                                            replace
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
