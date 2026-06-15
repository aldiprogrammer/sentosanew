import AdminLayout from '@/Layouts/AdminLayout'
import { router } from '@inertiajs/react'
import React, { useMemo, useRef, useState } from 'react'
import { buildFinishingReceiptHtml } from './StrukFinishingTemplate'

export default function Produksi({ produksi }) {
    const [selected, setSelected] = useState(null)
    const [filterKategori, setFilterKategori] = useState('')
    const [filterJenisBahan, setFilterJenisBahan] = useState('')
    const modalRef = useRef(null)

    const emptyText = '-'

    const reviewReceipt = (item) => {
        const w = window.open('', '_blank', 'width=420,height=640')
        if (!w) return
        w.document.open()
        w.document.write(buildFinishingReceiptHtml(item))
        w.document.close()
    }

    const printReceipt = (item) => {
        const w = window.open('', '_blank', 'width=420,height=640')
        if (!w) return
        w.document.open()
        w.document.write(buildFinishingReceiptHtml(item))
        w.document.close()
        w.addEventListener('load', () => {
            w.focus()
            setTimeout(() => w.print(), 300)
        })
    }

    const kategoriList = ['INDOOR', 'INDOOR2', 'OUTDOOR', 'OUTDOOR2', 'DISPLAY', 'OFFSET', 'DLL']

    const jenisBahanList = ['DLL', 'DYE', 'UV', 'OFFSET', 'TONER', 'ECOSOLVENT', 'SOLVENT']

    const shouldShowSection = (kategori) =>
        !filterKategori || filterKategori === kategori

    const itemsByKategori = useMemo(() => {
        const map = {}
        for (const kategori of kategoriList) {
            if (!shouldShowSection(kategori)) continue
            const filtered = produksi.filter(
                (item) =>
                    item.bahan?.kategori_cetak === kategori &&
                    (!filterJenisBahan || item.bahan?.jenis_bahan === filterJenisBahan)
            )
            const grouped = {}
            for (const item of filtered) {
                const jb = item.bahan?.jenis_bahan || 'Lainnya'
                if (!grouped[jb]) grouped[jb] = []
                grouped[jb].push(item)
            }
            map[kategori] = grouped
        }
        return map
    }, [produksi, kategoriList, filterKategori, filterJenisBahan])

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
            preserveScroll: true,
            onSuccess: () => {
                closeModal()
                printReceipt(selected)
            },
        })
    }

    return (
        <>
            <AdminLayout>
                <div className="grid grid-cols-1 xl:grid-cols-1">
                    <div className="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <h2 className="card-title">Halaman Produksi</h2>
                                <div className="flex gap-2">
                                    <select
                                        value={filterKategori}
                                        onChange={(e) => setFilterKategori(e.target.value)}
                                        className="select select-bordered"
                                    >
                                        <option value="">Semua Kategori Cetak</option>
                                        {kategoriList.map((k) => (
                                            <option key={k} value={k}>{k}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={filterJenisBahan}
                                        onChange={(e) => setFilterJenisBahan(e.target.value)}
                                        className="select select-bordered"
                                    >
                                        <option value="">Semua Jenis Bahan</option>
                                        {jenisBahanList.map((j) => (
                                            <option key={j} value={j}>{j}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <div className='grid lg:grid-cols-2 gap-4'>
                                    {Object.entries(itemsByKategori).map(([kategori, jenisGroups]) => (
                                        <div key={kategori}>
                                            <div className='bg-base-100 border border-base-300 rounded-xl shadow-sm overflow-hidden'>
                                                <div className='bg-primary px-4 py-3'>
                                                    <h3 className='font-bold text-white text-sm tracking-wide'>{kategori}</h3>
                                                </div>

                                                {Object.entries(jenisGroups).length === 0 ? (
                                                    <div className="px-4 py-8 text-center text-base-content/50 text-xs">
                                                        Tidak ada data produksi untuk kategori ini
                                                    </div>
                                                ) : (
                                                    Object.entries(jenisGroups).map(([jenis, items]) => (
                                                        <div key={jenis}>
                                                            <div className='bg-base-200/70 px-4 py-1.5 border-b border-base-300'>
                                                                <span className='font-semibold text-xs tracking-wider text-base-content/80'>{jenis}</span>
                                                            </div>
                                                            <div className="overflow-x-auto">
                                                                <table className="table table-xs table-zebra w-full">
                                                                    <thead>
                                                                        <tr className="bg-base-200 text-base-content/70 text-[10px] tracking-wider">
                                                                            <th className="py-3">No SPK</th>
                                                                            <th className="py-3">Kd Bahan</th>
                                                                            <th className="py-3">Customer</th>
                                                                            <th className="py-3 text-center">H</th>
                                                                            <th className="py-3 text-center">W</th>
                                                                            <th className="py-3 text-center">QTY</th>
                                                                            <th className="py-3 text-center">Sisi</th>
                                                                            <th className="py-3 text-center">Pengataran</th>
                                                                            <th className="py-3 text-center">Tgl Kirim</th>
                                                                            <th className="py-3 text-center">Catatan</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {items.map((item) => (
                                                                            <tr key={item.id} onClick={() => openModal(item)} className="hover:bg-base-200/70 transition-colors cursor-pointer">
                                                                                <td className="font-mono font-medium text-[10px]">{item.kode_spk}</td>
                                                                                <td className='text-[10px]'>{item.bahan?.kode}</td>
                                                                                <td className="font-medium text-[10px]">{item.customer?.nama}</td>
                                                                                <td className="text-[10px] text-center tabular-nums">{item.tinggi} <span className="text-[10px] text-base-content/50">{item.satuan}</span></td>
                                                                                <td className="text-[10px] text-center tabular-nums">{item.lebar} <span className="text-[10px] text-base-content/50">{item.satuan}</span></td>
                                                                                <td className="text-[10px] text-center font-semibold tabular-nums">{item.qty}</td>
                                                                                <td className="text-[10px] text-center">{item.sisi}</td>
                                                                                <td className="text-[10px] text-center font-semibold tabular-nums">{item.metode_pengantaran}</td>
                                                                                <td className="text-[10px] text-center font-semibold tabular-nums">{item.tgl_kirim}</td>
                                                                                <td className="text-[10px] text-center max-w-[100px] truncate">{item.pinising?.catatan || ''}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>

            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <button type="button" onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="text-lg font-bold mb-4">Proses Finishing</h3>
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
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">Jenis Bahan</span>
                                <span>{selected.bahan?.jenis_bahan}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                                <span className="text-sm text-base-content/70">Kategori Cetak</span>
                                <span>{selected.bahan?.kategori_cetak}</span>
                            </div>
                            <div className="alert alert-info text-sm">
                                <i className="fas fa-info-circle"></i>
                                Setelah diproses, struk akan tercetak dan data berpindah ke halaman Finishing.
                            </div>
                        </div>
                    )}
                    <div className="modal-action flex-col gap-2">
                        <div className="flex gap-2 w-full">
                            <button className="btn btn-ghost flex-1" onClick={() => { reviewReceipt(selected); closeModal() }}>
                                <i className="fas fa-eye"></i> Review Struk
                            </button>
                            <button className="btn btn-outline flex-1" onClick={() => { printReceipt(selected); closeModal() }}>
                                <i className="fas fa-print"></i> Cetak Struk
                            </button>
                        </div>
                        <button className="btn btn-primary w-full" onClick={handleProses}>
                            <i className="fas fa-check"></i> Proses & Cetak Struk
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeModal}>close</button>
                </form>
            </dialog>
        </>
    )
}
