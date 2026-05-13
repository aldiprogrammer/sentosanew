import AdminLayout from '@/Layouts/AdminLayout'
import { router, useForm } from '@inertiajs/react';
import React, { useRef } from 'react'

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
    const { data, setData, post, delete: destroy, put, processing, reset } = useForm({
        id: 0,
        kode: kode,
        nama: '',
        alamat: '',
        nohp: '',
        kategori: '',
        limit: '',
    });
    const modalRef = useRef(null);
    const openModal = () => {
        modalRef.current.showModal();
    }

    const closeModal = () => {
        modalRef.current.close();
    };

    const editmodalRef = useRef(null);
    const openModalEdit = (id, nama, alamat, kode, nohp, kategori, limit) => {
        editmodalRef.current.showModal();
        setData({
            'id': id,
            'nama': nama,
            'alamat': alamat,
            'kode': kode,
            'nohp': nohp,
            'kategori': kategori,
            'limit': limit,
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


    return (
        <AdminLayout>
            <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
                <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div class="card-body">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <h2 class="card-title">Data Customer</h2>
                            <div class="flex gap-2">
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
                                            </label>

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
                                                    <option value="">-- Pilih Kategori --</option>
                                                    <option value="Khusus">Khusus</option>
                                                    <option value="Umum">Umum</option>
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
                                                    onChange={(e) =>
                                                        setData(
                                                            "limit",
                                                            e.target.value.replace(/\D/g, ''),
                                                        )
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
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

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
                                                    onChange={(e) =>
                                                        setData(
                                                            "limit",
                                                            e.target.value.replace(/\D/g, ''),
                                                        )
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
                                        <th>No Hp</th>
                                        <th>Kategori</th>
                                        <th>Alamat</th>
                                        <th>Limit</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customer.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.kode}</td>
                                            <td>{item.nama}</td>
                                            <td>{formatPhone(item.nohp)}</td>
                                            <td>{item.kategori}</td>
                                            <td>{item.alamat}</td>
                                            <td>{item.limit ? 'Rp ' + formatRupiah(String(item.limit)) : '-'}</td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button
                                                        className="btn btn-error btn-sm"
                                                        onClick={() =>
                                                            hapus(item.id)
                                                        }
                                                    >
                                                        Hapus
                                                    </button>
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() =>
                                                            openModalEdit(
                                                                item.id,
                                                                item.nama,
                                                                item.alamat,
                                                                item.kode,
                                                                item.nohp,
                                                                item.kategori,
                                                                item.limit,
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
    )
}
