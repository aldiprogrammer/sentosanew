import AdminLayout from '@/Layouts/AdminLayout'
import { router } from '@inertiajs/react'
import React, { useMemo, useRef, useState } from 'react'

export default function Finishing({ produksi }) {
    const [selected, setSelected] = useState(null)
    const [filterKategori, setFilterKategori] = useState('')
    const [filterJenisBahan, setFilterJenisBahan] = useState('')
    const modalRef = useRef(null)

    const emptyText = '-'

    const displayText = (value) =>
        value === null || value === undefined || value === '' ? emptyText : value

    const escapeHtml = (value) =>
        String(displayText(value))
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')

    const formatReceiptDate = (date = new Date()) =>
        new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date)

    const formatReceiptTime = (date = new Date()) =>
        new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(date)

    const normalizeFinishing = (value) =>
        String(value || '')
            .toLowerCase()
            .replace(/\s/g, '')

    const isSameFinishing = (value, target) =>
        normalizeFinishing(value) === normalizeFinishing(target)

    const getFinishingTableRows = (item) => {
        const pinising = item.pinising || {}
        const mataAyam = item.mata_ayam || item.mataAyam || {}
        const sides = [
            ['atas', 'A'],
            ['bawah', 'B'],
            ['kanan', 'Ka'],
            ['kiri', 'Ki'],
        ]
        const rows = [
            ['Kentering', 'Kentering'],
            ['Lipat Pas Gbr', 'Lipat Pas Gambar'],
            ['Potong Pas Gbr', 'Potong Pas Gambar'],
            ['Lipat Sisa Putih', 'Lipat Sisa Putih'],
        ].map(([label, target]) => [
            label,
            ...sides.map(([key]) => (isSameFinishing(pinising[key], target) ? 'v' : '')),
        ])

        rows.push([
            'Mata Ayam',
            ...sides.map(([key]) => (mataAyam[key] ? 'v' : '')),
        ])

        return rows
    }

    const buildReceiptHtml = (item) => {
        const printedAt = new Date()
        const finishingRows = getFinishingTableRows(item)
            .map(
                ([label, atas, bawah, kanan, kiri]) => `
                    <tr>
                        <td class="finish-label">${escapeHtml(label)}</td>
                        <td>${escapeHtml(atas)}</td>
                        <td>${escapeHtml(bawah)}</td>
                        <td>${escapeHtml(kanan)}</td>
                        <td>${escapeHtml(kiri)}</td>
                    </tr>
                `
            )
            .join('')

        return `
            <!doctype html>
            <html>
                <head>
                    <title>Struk Finishing ${escapeHtml(item.kode_spk)}</title>
                    <style>
                        @page {
                            size: 76mm auto;
                            margin: 2mm;
                        }

                        * {
                            box-sizing: border-box;
                        }

                        body {
                            width: 72mm;
                            margin: 0;
                            color: #000;
                            font-family: "Courier New", monospace;
                            font-size: 10.5px;
                            line-height: 1.2;
                        }

                        .receipt {
                            width: 72mm;
                            padding: 0 1mm;
                        }

                        .brand {
                            text-align: center;
                            font-size: 18px;
                            font-weight: 700;
                            letter-spacing: 1px;
                            line-height: 1;
                        }

                        .tagline,
                        .phone {
                            text-align: center;
                            font-size: 10px;
                            font-weight: 700;
                        }

                        .spk-row {
                            display: flex;
                            justify-content: space-between;
                            gap: 4mm;
                            margin-top: 8px;
                            font-size: 15px;
                            font-weight: 700;
                        }

                        .section-title {
                            margin-top: 6px;
                            font-size: 12px;
                            font-weight: 700;
                        }

                        .line {
                            border-top: 1px solid #000;
                            margin: 5px 0 4px;
                        }

                        .row {
                            display: grid;
                            grid-template-columns: 9mm 3mm 18mm 9mm 3mm 1fr;
                            gap: 0;
                            margin-bottom: 3px;
                        }

                        .customer,
                        .description,
                        .note {
                            overflow-wrap: anywhere;
                            font-size: 12px;
                            font-weight: 700;
                        }

                        .material {
                            overflow-wrap: anywhere;
                            font-weight: 700;
                        }

                        .design {
                            margin: 4px 0;
                            padding-left: 4mm;
                            overflow-wrap: anywhere;
                        }

                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 3px;
                            table-layout: fixed;
                        }

                        th,
                        td {
                            border: 1px solid #000;
                            padding: 3px 2px;
                            text-align: center;
                            vertical-align: top;
                            overflow-wrap: anywhere;
                        }

                        th {
                            font-weight: 700;
                        }

                        .finish-label {
                            width: 32mm;
                            text-align: left;
                        }

                        .footer {
                            display: flex;
                            justify-content: space-between;
                            margin-top: 20px;
                            font-size: 10px;
                        }

                        .bottom-spk {
                            margin-top: 12px;
                            font-size: 15px;
                            font-weight: 700;
                        }

                        .label-row {
                            margin-top: 6px;
                            font-size: 12px;
                            font-weight: 700;
                        }
                    </style>
                </head>
                <body>
                    <div class="receipt">
                        <div class="brand">SENTOSA</div>
                        <div class="tagline">DIGITAL PRINTING</div>
                        <div class="phone">081 - 7368007</div>

                        <div class="spk-row">
                            <span>${escapeHtml(item.kode_spk)}</span>
                            <span>${escapeHtml(formatReceiptDate(printedAt))}</span>
                        </div>

                        <div class="section-title">Pelanggan :</div>
                        <div class="customer">${escapeHtml(item.customer?.nama)}</div>

                        <div class="section-title">Keterangan</div>
                        <div class="line"></div>
                        <div class="material">${escapeHtml(item.bahan?.kode)} ${escapeHtml(item.bahan?.bahan)}</div>
                        <div class="design">Desain : ${escapeHtml(item.keterangan)}</div>
                        <div class="row">
                            <span>W</span><span>:</span><strong>${escapeHtml(item.lebar)}</strong>
                            <span>H</span><span>:</span><strong>${escapeHtml(item.tinggi)} ${escapeHtml(item.satuan)}</strong>
                        </div>
                        <div class="row">
                            <span>Qty</span><span>:</span><strong>${escapeHtml(item.qty)}</strong>
                            <span></span><span></span><strong></strong>
                        </div>

                        <div class="section-title">Finishingan :</div>
                        <table>
                            <thead>
                                <tr>
                                    <th class="finish-label"></th>
                                    <th>A</th>
                                    <th>B</th>
                                    <th>Ka</th>
                                    <th>Ki</th>
                                </tr>
                            </thead>
                            <tbody>${finishingRows}</tbody>
                        </table>
                        <div class="section-title">Catatan :</div>
                        <div class="note">${escapeHtml(item.catatan || '')}</div>
                        <div class="footer">
                            <span>${escapeHtml(formatReceiptDate(printedAt))}</span>
                            <span>${escapeHtml(formatReceiptTime(printedAt))}</span>
                        </div>
                        <div class="line"></div>
                        <div class="bottom-spk">${escapeHtml(item.kode_spk)}</div>
                        <div class="label-row">No Label :</div>
                        <div class="line" style="margin-top: 28px;"></div>
                    </div>
                    <script>
                        window.addEventListener('load', function () {
                            window.focus();
                            setTimeout(function () {
                                window.print();
                            }, 300);
                        });

                        window.addEventListener('afterprint', function () {
                            window.close();
                        });
                    </script>
                </body>
            </html>
        `
    }

    const printReceipt = (item, receiptWindow) => {
        if (!receiptWindow) return

        receiptWindow.document.open()
        receiptWindow.document.write(buildReceiptHtml(item))
        receiptWindow.document.close()
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
        const shouldPrint = selected.selesai != 1
        const receiptWindow = shouldPrint
            ? window.open('', '_blank', 'width=420,height=640')
            : null

        router.put(`/finishing/finishing/${selected.id}/proses`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                closeModal()
                if (shouldPrint) {
                    printReceipt(selected, receiptWindow)
                }
            },
            onError: () => receiptWindow?.close(),
        })
    }

    return (
        <>
            <AdminLayout>
                <div className="grid grid-cols-1 xl:grid-cols-1">
                    <div className="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <h2 className="card-title">Halaman Finishing</h2>
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
                                                        Tidak ada data finishing untuk kategori ini
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
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {items.map((item) => (
                                                                            <tr key={item.id} onClick={() => openModal(item)} className={`hover:bg-base-200/70 transition-colors cursor-pointer ${item.selesai == '1' ? 'bg-green-400' : ''} `}>
                                                                                <td className="font-mono font-medium text-[10px]">{item.kode_spk}</td>
                                                                                <td className='text-[10px]'>{item.bahan?.kode}</td>
                                                                                <td className="font-medium text-[10px]">{item.customer?.nama}</td>
                                                                                <td className="text-[10px] text-center tabular-nums">{item.tinggi} <span className="text-[10px] text-base-content/50">{item.satuan}</span></td>
                                                                                <td className="text-[10px] text-center tabular-nums">{item.lebar} <span className="text-[10px] text-base-content/50">{item.satuan}</span></td>
                                                                                <td className="text-[10px] text-center font-semibold tabular-nums">{item.qty}</td>
                                                                                <td className="text-[10px] text-center">{item.sisi}</td>
                                                                                <td className="text-[10px] text-center font-semibold tabular-nums">{item.metode_pengantaran}</td>
                                                                                <td className="text-[10px] text-center font-semibold tabular-nums">{item.tgl_kirim}</td>
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
                    <h3 className="text-lg font-bold mb-4">Konfirmasi Finishing Selesai</h3>
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
                        </div>
                    )}
                    <div className="modal-action">
                        <button className="btn btn-ghost" onClick={closeModal}>Batal</button>
                        {selected && selected.selesai == 1 ?
                            <button className="btn btn-primary w-full" onClick={handleProses}>
                                Batal Proses Selesai
                            </button>
                            :
                            <button className="btn btn-primary w-full" onClick={handleProses}>
                                Proses Selesai
                            </button>
                        }
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeModal}>close</button>
                </form>
            </dialog>
        </>
    )
}
