import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react';
import React, { useRef } from 'react'
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function formatPhone(value) {
    const digits = String(value).replace(/\D/g, '').slice(0, 13);
    if (digits.length <= 4) return digits;
    if (digits.length <= 8) return digits.slice(0, 4) + '-' + digits.slice(4);
    return digits.slice(0, 4) + '-' + digits.slice(4, 8) + '-' + digits.slice(8);
}

function formatRupiah(value) {
    const digits = String(value).replace(/\D/g, '');
    if (!digits) return '';
    return 'Rp ' + digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default function Suplayer({ suplayer, kode }) {
    const { data, setData, post, delete: destroy, put, processing, reset } = useForm({
        id: 0,
        kode: '',
        nama_suplayer: '',
        alamat: '',
        nohp: '',
        produk: '',
        harga: '',
        jatuh_tempo: '',
        rekening: [
            { nama_bank: '', no_rekening: '', nama_rekening: '' },
            { nama_bank: '', no_rekening: '', nama_rekening: '' },
        ],
    });

    const modalRef = useRef(null);
    const openModal = () => {
        modalRef.current.showModal();
        setData('kode', kode);
        setData('rekening', [
            { nama_bank: '', no_rekening: '', nama_rekening: '' },
            { nama_bank: '', no_rekening: '', nama_rekening: '' },
        ]);
    };

    const closeModal = () => {
        modalRef.current.close();
        reset();
    };

    const editmodalRef = useRef(null);
    const openModalEdit = (item) => {
        editmodalRef.current.showModal();
        const rek = item.rekening || [];
        setData({
            id: item.id,
            kode: item.kode,
            nama_suplayer: item.nama_suplayer,
            alamat: item.alamat,
            nohp: item.nohp,
            produk: item.produk,
            harga: item.harga,
            jatuh_tempo: item.jatuh_tempo || '',
            rekening: [
                { nama_bank: rek[0]?.nama_bank || '', no_rekening: rek[0]?.no_rekening || '', nama_rekening: rek[0]?.nama_rekening || '' },
                { nama_bank: rek[1]?.nama_bank || '', no_rekening: rek[1]?.no_rekening || '', nama_rekening: rek[1]?.nama_rekening || '' },
            ],
        });
    };

    const closeModalEdit = () => {
        editmodalRef.current.close();
        reset();
    };

    const save = (e) => {
        e.preventDefault();
        post('/suplayer', {
            onSuccess: () => {
                reset();
                closeModal();
            },
        });
    };

    const hapus = (id) => {
        if (confirm('Yakin ingin menghapus')) {
            destroy('/suplayer/' + id);
            closeModalEdit();
        }
    };

    const update = (e) => {
        e.preventDefault();
        put('/suplayer/' + data.id, {
            onSuccess: () => {
                closeModalEdit();
                reset();
            },
        });
    };

    const handleRekeningChange = (index, field, value) => {
        const rek = [...data.rekening];
        rek[index] = { ...rek[index], [field]: value };
        setData('rekening', rek);
    };

    const formFields = (prefix = '') => (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="form-control w-full mt-2">
                    <div className="label"><span className="label-text">Kode</span></div>
                    <input type="text" value={prefix === 'edit' ? data.kode : kode} className="input input-bordered input-success w-full" required readOnly />
                </label>
                <label className="form-control w-full mt-2">
                    <div className="label"><span className="label-text">Nama Suplayer</span></div>
                    <input type="text" value={data.nama_suplayer} className="input input-bordered input-success w-full" required onChange={(e) => setData('nama_suplayer', e.target.value)} />
                </label>
                <label className="form-control w-full mt-2 md:col-span-2">
                    <div className="label"><span className="label-text">Alamat</span></div>
                    <textarea value={data.alamat} className="textarea textarea-bordered textarea-success w-full" required onChange={(e) => setData('alamat', e.target.value)} />
                </label>
                <label className="form-control w-full mt-2">
                    <div className="label"><span className="label-text">No HP</span></div>
                    <input type="text" value={formatPhone(data.nohp)} className="input input-bordered input-success w-full" required onChange={(e) => setData('nohp', formatPhone(e.target.value))} placeholder="0000-0000-000" />
                </label>
                <label className="form-control w-full mt-2">
                    <div className="label"><span className="label-text">Produk</span></div>
                    <input type="text" value={data.produk} className="input input-bordered input-success w-full" required onChange={(e) => setData('produk', e.target.value)} />
                </label>
                <label className="form-control w-full mt-2">
                    <div className="label"><span className="label-text">Harga</span></div>
                    <input type="text" value={formatRupiah(data.harga)} className="input input-bordered input-success w-full" required onChange={(e) => setData('harga', e.target.value.replace(/\D/g, ''))} placeholder="Rp 0" />
                </label>
                <label className="form-control w-full mt-2">
                    <div className="label"><span className="label-text">Jatuh Tempo</span></div>
                    <input type="text" value={data.jatuh_tempo} className="input input-bordered input-success w-full" onChange={(e) => setData('jatuh_tempo', e.target.value)} placeholder="cth: 30 Hari" />
                </label>
            </div>

            <div className="divider mt-4">Data Rekening (Maksimal 2)</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.rekening.map((rek, i) => (
                    <div key={i} className="border border-base-300 rounded-lg p-3">
                        <h4 className="font-medium mb-2 text-sm">Rekening {i + 1}</h4>
                        <label className="form-control w-full">
                            <div className="label"><span className="label-text">Nama Bank</span></div>
                            <input type="text" value={rek.nama_bank} className="input input-bordered input-success w-full input-sm" onChange={(e) => handleRekeningChange(i, 'nama_bank', e.target.value)} />
                        </label>
                        <label className="form-control w-full mt-1">
                            <div className="label"><span className="label-text">No Rekening</span></div>
                            <input type="text" value={rek.no_rekening} className="input input-bordered input-success w-full input-sm" onChange={(e) => handleRekeningChange(i, 'no_rekening', e.target.value)} />
                        </label>
                        <label className="form-control w-full mt-1">
                            <div className="label"><span className="label-text">Nama Rekening</span></div>
                            <input type="text" value={rek.nama_rekening} className="input input-bordered input-success w-full input-sm" onChange={(e) => handleRekeningChange(i, 'nama_rekening', e.target.value)} />
                        </label>
                    </div>
                ))}
            </div>
        </>
    );

    const exportPDF = () => {
        try {
            const doc = new jsPDF("l", "mm", "a4");
            doc.setFontSize(16);
            doc.text("Data Suplayer", 14, 20);
            doc.setFontSize(10);
            doc.text("Tanggal: " + new Date().toLocaleDateString("id-ID"), 14, 27);
            const rows = suplayer.map((item, index) => [index + 1, item.kode, item.nama_suplayer, item.alamat, formatPhone(item.nohp), item.produk, formatRupiah(item.harga), item.jatuh_tempo || '-', item.rekening ? item.rekening.map(r => r.nama_bank).join(", ") : "-"]);
            autoTable(doc, { startY: 32, head: [["No", "Kode", "Nama Suplayer", "Alamat", "No HP", "Produk", "Harga", "Jatuh Tempo", "Rekening"]], body: rows, styles: { fontSize: 7 }, headStyles: { fillColor: [22, 163, 74] }, theme: "grid" });
            doc.save("data_suplayer.pdf");
        } catch (error) {
            console.error("Gagal export PDF:", error);
            alert("Gagal mengexport PDF: " + error.message);
        }
    };

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 xl:grid-cols-1 gap-">
                <div className="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <h2 className="card-title">Data Suplayer</h2>
                            <div className="flex gap-2">
                                <button className="btn btn-primary" onClick={exportPDF}>
                                    <i className="fas fa-file-pdf"></i> Export PDF
                                </button>
                                <button className="btn btn-success" onClick={openModal}>
                                    <i className="fas fa-plus"></i>
                                    Tambah data
                                </button>

                                <dialog ref={modalRef} className="modal">
                                    <div className="modal-box max-w-2xl">
                                        <button type="button" onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        <h3 className="text-lg font-bold">Tambah data</h3>
                                        <form onSubmit={save}>
                                            {formFields()}
                                            <div className="mt-4 flex gap-2">
                                                <button type="submit" disabled={processing} className="btn btn-success">Tambah data</button>
                                                <button type="button" onClick={closeModal} className="btn btn-error">Keluar</button>
                                            </div>
                                        </form>
                                    </div>
                                </dialog>

                                <dialog ref={editmodalRef} className="modal">
                                    <div className="modal-box max-w-2xl">
                                        <button type="button" onClick={closeModalEdit} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        <h3 className="text-lg font-bold">Edit data</h3>
                                        <form onSubmit={update}>
                                            {formFields('edit')}
                                            <div className="mt-4 flex gap-2">
                                                <button type="submit" disabled={processing} className="btn btn-success">Edit data</button>
                                                <button type="button" onClick={closeModalEdit} className="btn btn-warning">Batal</button>
                                                <button type="button" onClick={() => hapus(data.id)} className="btn btn-error"><i className="fas fa-trash"></i> Hapus</button>
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
                                        <th>Nama Suplayer</th>
                                        <th>Alamat</th>
                                        <th>No HP</th>
                                        <th>Produk</th>
                                        <th>Harga</th>
                                        <th>Jatuh Tempo</th>
                                        <th>Rekening</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {suplayer.map((item, index) => (
                                        <tr key={item.id} onClick={() => openModalEdit(item)} className="cursor-pointer hover:bg-base-200">
                                            <td>{index + 1}</td>
                                            <td>{item.kode}</td>
                                            <td>{item.nama_suplayer}</td>
                                            <td>{item.alamat}</td>
                                            <td>{formatPhone(item.nohp)}</td>
                                            <td>{item.produk}</td>
                                            <td>{formatRupiah(item.harga)}</td>
                                            <td>{item.jatuh_tempo || '-'}</td>
                                            <td>
                                                {item.rekening && item.rekening.length > 0
                                                    ? item.rekening.map((r, i) => (
                                                        <span key={i} className="badge badge-outline badge-sm mr-1">{r.nama_bank}</span>
                                                    ))
                                                    : '-'}
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
