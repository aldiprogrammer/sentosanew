import AdminLayout from '@/Layouts/AdminLayout'
import { router } from '@inertiajs/react'
import React, { useRef, useState } from 'react'

export default function Produksi({ produksi }) {
    const [selected, setSelected] = useState(null)
    const [filterKategori, setFilterKategori] = useState('')
    const [filterJenisBahan, setFilterJenisBahan] = useState('')
    const modalRef = useRef(null)

    const filterItems = (kategori) =>
        produksi.filter(
            (item) =>
                item.bahan.kategori_cetak === kategori &&
                (!filterJenisBahan || item.bahan.jenis_bahan === filterJenisBahan)
        )

    const shouldShowSection = (kategori) =>
        !filterKategori || filterKategori === kategori

    const openModal = (item) => {
        setSelected(item)
        modalRef.current?.showModal()
    }

    const closeModal = () => {
        setSelected(null)
        modalRef.current?.close()
    }

    const handleProses = () => {
        if (!selected) return
        router.put(`/produksi/produksi/${selected.id}/proses`, {}, {
            onSuccess: () => closeModal(),
        })
    }

    return (
        <>
            <AdminLayout>
                <div className="grid grid-cols-1 xl:grid-cols-1">
                    <div className="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <h2 className="card-title">Produksi</h2>
                                <div className="flex gap-2">
                                    <select
                                        value={filterKategori}
                                        onChange={(e) => setFilterKategori(e.target.value)}
                                        className="select select-bordered"
                                    >
                                        <option value="">Semua Kategori</option>
                                        <option value="STANDART">STANDART</option>
                                        <option value="STIKER">STIKER</option>
                                        <option value="INDOOR">INDOOR</option>
                                        <option value="DLL">Dll</option>
                                    </select>
                                    <select
                                        value={filterJenisBahan}
                                        onChange={(e) => setFilterJenisBahan(e.target.value)}
                                        className="select select-bordered"
                                    >
                                        <option value="">Semua Jenis Bahan</option>
                                        <option value="DLL">Dll</option>
                                        <option value="DYE">DYE</option>
                                        <option value="TONER">TONER</option>
                                        <option value="OFFSET">OFFSET</option>
                                        <option value="SOLVENT">SOLVENT</option>
                                        <option value="ECOSOLVENT">ECOSILVENT</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <div className='grid lg:grid-cols-2 gap-2'>
                                    {shouldShowSection('STANDART') && (
                                        <div>
                                            <div className='bg-base-100 border border-base-300 rounded-xl shadow-sm overflow-hidden'>
                                                <div className='bg-primary px-4 py-3'>
                                                    <h3 className='font-bold text-white text-sm tracking-wide'>BAHAN STANDART</h3>
                                                </div>

                                                <div className="overflow-x-auto">
                                                    <table className="table table-xs table-zebra" id="myTable">
                                                        <thead>
                                                            <tr className="bg-base-200 text-base-content/70 text-[10px]  tracking-wider">
                                                                <th className="py-3">No SPK</th>
                                                                <th className="py-3">Kd Bahan</th>
                                                                <th className="py-3">Customer</th>
                                                                <th className="py-3 text-center">H</th>
                                                                <th className="py-3 text-center">W</th>
                                                                <th className="py-3 text-center">QTY</th>
                                                                <th className="py-3 text-center">Sisi</th>
                                                                <th className="py-3 text-center">Pengataran</th>
                                                                <th className="py-3 text-center">Tgl Kirim</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filterItems('STANDART').map((item) => (
                                                                <tr key={item.id} onClick={() => openModal(item)} className={`hover:bg-base-200/70 transition-colors cursor-pointer ${item.status_finishing == '1' ? 'bg-green-400' : ''} `}>
                                                                    <td className="font-mono font-medium text-[10px]">{item.kode_spk}</td>
                                                                    <td className='text-[10px]'>
                                                                        {item.bahan.kode}
                                                                    </td>
                                                                    <td className="font-medium  text-[10px]">{item.customer.nama}</td>
                                                                    <td className=" text-[10px] text-center tabular-nums">{item.tinggi} <span className="text-[10px] text-base-content/50">{item.satuan}</span></td>
                                                                    <td className="text-[10px] text-center tabular-nums">{item.lebar} <span className="text-[10px] text-base-content/50">{item.satuan}</span></td>
                                                                    <td className="text-[10px] text-center font-semibold tabular-nums">{item.qty}</td>
                                                                    <td className=" text-[10px] text-center">
                                                                        {item.sisi}
                                                                    </td>
                                                                    <td className="text-[10px] text-center font-semibold tabular-nums">{item.metode_pengantaran}</td>
                                                                    <td className=" text-[10px] text-center font-semibold tabular-nums">{item.tgl_kirim}</td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                    {shouldShowSection('STIKER') && (
                                        <div>
                                            <div className='bg-base-100 border border-base-300 rounded-xl shadow-sm overflow-hidden'>
                                                <div className='bg-secondary px-4 py-3'>
                                                    <h3 className='font-bold text-white text-sm tracking-wide'>BAHAN STIKER</h3>
                                                </div>
                                                <div className="overflow-x-auto">
                                                    <table className="table table-xs table-zebra" id="myTable">
                                                        <thead>
                                                            <tr className="bg-base-200 text-base-content/70 text-[10px]  tracking-wider">
                                                                <th className="py-3">No SPK</th>
                                                                <th className="py-3">Kd Bahan</th>
                                                                <th className="py-3">Customer</th>
                                                                <th className="py-3 text-center">H</th>
                                                                <th className="py-3 text-center">W</th>
                                                                <th className="py-3 text-center">QTY</th>
                                                                <th className="py-3 text-center">Sisi</th>
                                                                <th className="py-3 text-center">Pengataran</th>
                                                                <th className="py-3 text-center">Tgl Kirim</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filterItems('STIKER').map((item) => (
                                                                <tr key={item.id} onClick={() => openModal(item)} className={`hover:bg-base-200/70 transition-colors cursor-pointer ${item.status_finishing == '1' ? 'bg-green-400' : ''} `}>
                                                                    <td className="font-mono font-medium text-[10px]">{item.kode_spk}</td>
                                                                    <td className='text-[10px]'>
                                                                        {item.bahan.kode}
                                                                    </td>
                                                                    <td className="font-medium  text-[10px]">{item.customer.nama}</td>
                                                                    <td className=" text-[10px] text-center tabular-nums">{item.tinggi} <span className="text-[10px] text-base-content/50">{item.satuan}</span></td>
                                                                    <td className="text-[10px] text-center tabular-nums">{item.lebar} <span className="text-[10px] text-base-content/50">{item.satuan}</span></td>
                                                                    <td className="text-[10px] text-center font-semibold tabular-nums">{item.qty}</td>
                                                                    <td className=" text-[10px] text-center">
                                                                        {item.sisi}
                                                                    </td>
                                                                    <td className="text-[10px] text-center font-semibold tabular-nums">{item.metode_pengantaran}</td>
                                                                    <td className=" text-[10px] text-center font-semibold tabular-nums">{item.tgl_kirim}</td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                    {shouldShowSection('INDOOR') && (
                                        <div>
                                            <div className='bg-base-100 border border-base-300 rounded-xl shadow-sm overflow-hidden'>
                                                <div className='bg-accent px-4 py-3'>
                                                    <h3 className='font-bold text-white text-sm tracking-wide'>BAHAN INDOOR</h3>
                                                </div>
                                                <div className="overflow-x-auto">
                                                    <table className="table table-xs table-zebra" id="myTable">
                                                        <thead>
                                                            <tr className="bg-base-200 text-base-content/70 text-[10px]  tracking-wider">
                                                                <th className="py-3">No SPK</th>
                                                                <th className="py-3">Kd Bahan</th>
                                                                <th className="py-3">Customer</th>
                                                                <th className="py-3 text-center">H</th>
                                                                <th className="py-3 text-center">W</th>
                                                                <th className="py-3 text-center">QTY</th>
                                                                <th className="py-3 text-center">Sisi</th>
                                                                <th className="py-3 text-center">Pengataran</th>
                                                                <th className="py-3 text-center">Tgl Kirim</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filterItems('INDOOR').map((item) => (
                                                                <tr key={item.id} onClick={() => openModal(item)} className={`hover:bg-base-200/70 transition-colors cursor-pointer ${item.status_finishing == '1' ? 'bg-green-400' : ''} `}>
                                                                    <td className="font-mono font-medium text-[10px]">{item.kode_spk}</td>
                                                                    <td className='text-[10px]'>
                                                                        {item.bahan.kode}
                                                                    </td>
                                                                    <td className="font-medium  text-[10px]">{item.customer.nama}</td>
                                                                    <td className=" text-[10px] text-center tabular-nums">{item.tinggi} <span className="text-[10px] text-base-content/50">{item.satuan}</span></td>
                                                                    <td className="text-[10px] text-center tabular-nums">{item.lebar} <span className="text-[10px] text-base-content/50">{item.satuan}</span></td>
                                                                    <td className="text-[10px] text-center font-semibold tabular-nums">{item.qty}</td>
                                                                    <td className=" text-[10px] text-center">
                                                                        {item.sisi}
                                                                    </td>
                                                                    <td className="text-[10px] text-center font-semibold tabular-nums">{item.metode_pengantaran}</td>
                                                                    <td className=" text-[10px] text-center font-semibold tabular-nums">{item.tgl_kirim}</td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                    {shouldShowSection('DLL') && (
                                        <div>
                                            <div className='bg-base-100 border border-base-300 rounded-xl shadow-sm overflow-hidden'>
                                                <div className='bg-neutral px-4 py-3'>
                                                    <h3 className='font-bold text-white text-sm tracking-wide'>BAHAN DLL</h3>
                                                </div>
                                                <div className="overflow-x-auto">
                                                    <table className="table table-xs table-zebra" id="myTable">
                                                        <thead>
                                                            <tr className="bg-base-200 text-base-content/70 text-[10px]  tracking-wider">
                                                                <th className="py-3">No SPK</th>
                                                                <th className="py-3">Kd Bahan</th>
                                                                <th className="py-3">Customer</th>
                                                                <th className="py-3 text-center">H</th>
                                                                <th className="py-3 text-center">W</th>
                                                                <th className="py-3 text-center">QTY</th>
                                                                <th className="py-3 text-center">Sisi</th>
                                                                <th className="py-3 text-center">Pengataran</th>
                                                                <th className="py-3 text-center">Tgl Kirim</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filterItems('DLL').map((item) => (
                                                                <tr key={item.id} onClick={() => openModal(item)} className={`hover:bg-base-200/70 transition-colors cursor-pointer ${item.status_finishing == '1' ? 'bg-green-400' : ''} `}>
                                                                    <td className="font-mono font-medium text-[10px]">{item.kode_spk}</td>
                                                                    <td className='text-[10px]'>
                                                                        {item.bahan.kode}
                                                                    </td>
                                                                    <td className="font-medium  text-[10px]">{item.customer.nama}</td>
                                                                    <td className=" text-[10px] text-center tabular-nums">{item.tinggi} <span className="text-[10px] text-base-content/50">{item.satuan}</span></td>
                                                                    <td className="text-[10px] text-center tabular-nums">{item.lebar} <span className="text-[10px] text-base-content/50">{item.satuan}</span></td>
                                                                    <td className="text-[10px] text-center font-semibold tabular-nums">{item.qty}</td>
                                                                    <td className=" text-[10px] text-center">
                                                                        {item.sisi}
                                                                    </td>
                                                                    <td className="text-[10px] text-center font-semibold tabular-nums">{item.metode_pengantaran}</td>
                                                                    <td className=" text-[10px] text-center font-semibold tabular-nums">{item.tgl_kirim}</td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout >

            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <button type="button" onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="text-lg font-bold mb-4">Konfirmasi Proses</h3>
                    {selected && (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">No SPK</span>
                                <span className="font-mono font-semibold">{selected.kode_spk}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">Customer</span>
                                <span className="font-medium">{selected.customer?.nama}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">Bahan</span>
                                <span>{selected.bahan?.bahan}</span>
                            </div>
                        </div>
                    )}
                    <div className="modal-action">
                        <button className="btn btn-ghost" onClick={closeModal}>Batal</button>
                        {selected && selected.status_produksi == 1 ?
                            < button className="btn btn-primary w-full" onClick={handleProses}>
                                Batal Proses Finishing
                            </button>
                            :
                            <button className="btn btn-primary w-full" onClick={handleProses}>
                                Proses Finishing
                            </button>
                        }
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeModal}>close</button>
                </form>
            </dialog >
        </>
    )
}
