import AdminLayout from '@/Layouts/AdminLayout'
import { Link, router } from '@inertiajs/react'
import React, { useRef } from 'react'

export default function DataSaya({ produksi, tglAwal, tglAkhir }) {
    const [search, setSearch] = React.useState('')
    const [tgl_awal, setTglAwal] = React.useState(tglAwal || '')
    const [tgl_akhir, setTglAkhir] = React.useState(tglAkhir || '')
    const [selected, setSelected] = React.useState([])
    const previewRef = useRef(null)
    const iframeRef = useRef(null)

    const allSelected = produksi.data.length > 0 && produksi.data.every(item => selected.some(s => s.id === item.id))

    const toggleSelect = (item) => {
        setSelected((prev) => {
            const exists = prev.find(x => x.id === item.id)
            return exists ? prev.filter(x => x.id !== item.id) : [...prev, item]
        })
    }

    const toggleSelectAll = () => {
        if (allSelected) {
            const currentIds = new Set(produksi.data.map(item => item.id))
            setSelected(prev => prev.filter(item => !currentIds.has(item.id)))
        } else {
            const existingIds = new Set(selected.map(item => item.id))
            const newItems = produksi.data.filter(item => !existingIds.has(item.id))
            setSelected(prev => [...prev, ...newItems])
        }
    }

    const selectedItems = selected
    const totalHarga = selectedItems.reduce((sum, item) => sum + Number(item.total_harga || 0), 0)
    const totalQty = selectedItems.reduce((sum, item) => sum + Number(item.qty || 0), 0)

    const handleSearch = (e) => {
        e.preventDefault()
        setSelected([])
        router.get('/produksi/data-saya', { search, tgl_awal, tgl_akhir }, { preserveState: true, replace: true })
    }

    const setPreview = (show) => {
        if (show && selectedItems.length > 0) {
            const html = buildReceiptHtml(selectedItems)
            const doc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document
            if (doc) {
                doc.open()
                doc.write(html)
                doc.close()
            }
            previewRef.current?.showModal()
        }
    }

    const escapeHtml = (value) =>
        String(value ?? '')
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

    const buildReceiptHtml = (items) => {
        const printedAt = new Date()
        const isMultiple = items.length > 1

        const itemRows = items
            .map(
                (item, i) => `
                <tr${i % 2 === 1 ? ' class="alt"' : ''}>
                    <td>${escapeHtml(item.kode_spk)}</td>
                    <td>${escapeHtml(item.customer?.nama)}</td>
                    <td>${escapeHtml(item.bahan?.bahan)}</td>
                    <td class="num">${escapeHtml(item.qty)}</td>
                    <td class="num">${escapeHtml(item.tinggi)}x${escapeHtml(item.lebar)} ${escapeHtml(item.satuan)}</td>
                    <td class="num">Rp ${Number(item.total_harga || 0).toLocaleString('id-ID')}</td>
                </tr>
            `
            )
            .join('')

        return `
            <!doctype html>
            <html>
                <head>
                    <title>Struk Produksi - ${isMultiple ? items.length + ' item' : escapeHtml(items[0].kode_spk)}</title>
                    <style>
                        @page { size: 75mm auto; margin: 3mm; }
                        * { box-sizing: border-box; margin: 0; padding: 0; }
                        body {
                            width: 69mm; margin: 0; color: #000;
                            font-family: 'Courier New', monospace;
                            font-size: 10px; line-height: 1.3;
                        }
                        .receipt { width: 69mm; padding: 2mm 2mm; }
                        .header { text-align: center; margin-bottom: 6px; }
                        .header .brand { font-size: 20px; font-weight: 900; letter-spacing: 2px; }
                        .header .sub { font-size: 11px; font-weight: 700; }
                        .header .contact { font-size: 10px; }
                        .divider { border-top: 1px dashed #000; margin: 6px 0; }
                        .divider-solid { border-top: 1px solid #000; margin: 6px 0; }
                        .info-row { display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 2px; }
                        .info-row .label { font-weight: 700; }
                        .section-title { font-weight: 700; font-size: 11px; margin: 4px 0 3px; }
                        table { width: 100%; border-collapse: collapse; font-size: 9px; }
                        th, td { padding: 2px 3px; text-align: left; vertical-align: top; }
                        thead th { border-bottom: 1px solid #000; font-weight: 700; }
                        tbody td { border-bottom: 1px dotted #ccc; }
                        .num { text-align: right; font-variant-numeric: tabular-nums; }
                        .total-row td { font-weight: 700; border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 3px; }
                        .total-row .num { font-size: 11px; }
                        .footer { text-align: center; margin-top: 8px; font-size: 9px; }
                        .signature { display: flex; justify-content: space-between; margin-top: 16px; font-size: 10px; }
                        .signature div { text-align: center; }
                        .signature .line { margin-top: 24px; width: 80px; border-top: 1px solid #000; }
                        .note-box { margin-top: 4px; padding: 3px; border: 1px dashed #000; font-size: 9px; }
                        .terbilang { font-size: 9px; font-style: italic; margin-top: 2px; }
                        @media print {
                            body { margin: 0; }
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="receipt">
                        <div class="header">
                            <div class="brand">SENTOSA</div>
                            <div class="sub">DIGITAL PRINTING</div>
                            <div class="contact">081 - 7368007</div>
                        </div>

                        <div class="divider"></div>

                        <div class="info-row">
                            <span class="label">Tanggal</span>
                            <span>${escapeHtml(formatReceiptDate(printedAt))} ${escapeHtml(formatReceiptTime(printedAt))}</span>
                        </div>

                        ${isMultiple ? `
                            <div class="section-title">STRUK PRODUKSI (${items.length} item)</div>
                        ` : `
                            <div class="info-row">
                                <span class="label">No. SPK</span>
                                <span>${escapeHtml(items[0].kode_spk)}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Customer</span>
                                <span>${escapeHtml(items[0].customer?.nama)}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Bahan</span>
                                <span>${escapeHtml(items[0].bahan?.bahan)}</span>
                            </div>
                        `}

                        <div class="divider"></div>

                        <table>
                            <thead>
                                <tr>
                                    <th>SPK</th>
                                    <th>Customer</th>
                                    <th>Bahan</th>
                                    <th class="num">Qty</th>
                                    <th class="num">Ukuran</th>
                                    <th class="num">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemRows}
                            </tbody>
                            ${isMultiple ? `
                                <tfoot>
                                    <tr class="total-row">
                                        <td colspan="3">${items.length} item</td>
                                        <td class="num">${totalQty}</td>
                                        <td></td>
                                        <td class="num">Rp ${totalHarga.toLocaleString('id-ID')}</td>
                                    </tr>
                                </tfoot>
                            ` : ''}
                        </table>

                        <div class="divider"></div>

                        <div class="info-row">
                            <span class="label">Total Item</span>
                            <span>${items.length}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Total Qty</span>
                            <span>${totalQty}</span>
                        </div>
                        <div class="info-row" style="font-size: 13px; font-weight: 900; margin-top: 2px;">
                            <span>GRAND TOTAL</span>
                            <span>Rp ${totalHarga.toLocaleString('id-ID')}</span>
                        </div>

                        <div class="divider-solid"></div>

                        <div class="signature">
                            <div>
                                <div>Hormat Kami</div>
                                <div class="line"></div>
                            </div>
                            <div>
                                <div>Penerima</div>
                                <div class="line"></div>
                            </div>
                        </div>

                        <div class="footer">
                            Terima Kasih Atas Kepercayaan Anda<br>
                            Barang yang sudah dibeli tidak dapat dikembalikan
                        </div>
                    </div>
                    <script>
                        window.addEventListener('load', function () {
                            window.focus();
                            setTimeout(function () { window.print(); }, 300);
                        });
                        window.addEventListener('afterprint', function () {
                            window.close();
                        });
                    </script>
                </body>
            </html>
        `
    }

    const printReceipt = () => {
        if (selectedItems.length === 0) return

        if (selectedItems.length === 1) {
            const w = window.open('', '_blank', 'width=420,height=640')
            w.document.open()
            w.document.write(buildReceiptHtml(selectedItems))
            w.document.close()
        } else {
            let idx = 0
            const openNext = () => {
                if (idx >= selectedItems.length) return
                const w = window.open('', '_blank', 'width=420,height=640')
                w.document.open()
                w.document.write(buildReceiptHtml([selectedItems[idx]]))
                w.document.close()
                const checkClosed = setInterval(() => {
                    if (w.closed) {
                        clearInterval(checkClosed)
                        idx++
                        openNext()
                    }
                }, 500)
            }
            openNext()
        }
        setSelected([])
    }

    const printReceiptCombined = () => {
        if (selectedItems.length === 0) return
        const w = window.open('', '_blank', 'width=500,height=700')
        w.document.open()
        w.document.write(buildReceiptHtml(selectedItems))
        w.document.close()
        setSelected([])
    }

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 xl:grid-cols-1">
                <div className="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <h2 className="card-title">Data Produksi</h2>
                        </div>

                        <div className="mb-3">
                            <form onSubmit={handleSearch} className="flex flex-wrap gap-2 items-end">
                                <input
                                    type="text"
                                    placeholder="Cari kode SPK, keterangan, customer, bahan..."
                                    className="input input-bordered input-success w-full max-w-xs"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <label className="form-control w-full max-w-[160px]">
                                    <span className="label-text text-xs">Tgl Awal</span>
                                    <input
                                        type="date"
                                        className="input input-bordered input-success input-sm"
                                        value={tgl_awal}
                                        onChange={(e) => setTglAwal(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-[160px]">
                                    <span className="label-text text-xs">Tgl Akhir</span>
                                    <input
                                        type="date"
                                        className="input input-bordered input-success input-sm"
                                        value={tgl_akhir}
                                        onChange={(e) => setTglAkhir(e.target.value)}
                                    />
                                </label>
                                <button type="submit" className="btn btn-success btn-sm">
                                    <i className="fas fa-search"></i> Cari
                                </button>
                            </form>
                        </div>

                        <div>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th className="w-10">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-sm checkbox-success"
                                                    checked={allSelected}
                                                    onChange={toggleSelectAll}
                                                />
                                            </th>
                                            <th>No</th>
                                            <th>Kode SPK</th>
                                            <th>Customer</th>
                                            <th>Bahan</th>
                                            <th>Keterangan</th>
                                            <th>Tinggi</th>
                                            <th>Lebar</th>
                                            <th>Qty</th>
                                            <th>Sisi</th>
                                            <th>Harga</th>
                                            <th>Total Harga</th>
                                            <th>Metode P</th>
                                            <th>Tgl Kirim</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs">
                                        {produksi.data.length === 0 ? (
                                            <tr>
                                                <td colSpan={14} className="text-center py-8 text-base-content/50">
                                                    Tidak ada data produksi
                                                </td>
                                            </tr>
                                        ) : (
                                            produksi.data.map((item, index) => (
                                                <tr key={item.id} className="hover:bg-base-200">
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox checkbox-sm checkbox-success"
                                                            checked={selected.some(s => s.id === item.id)}
                                                            onChange={() => toggleSelect(item)}
                                                        />
                                                    </td>
                                                    <td>{produksi.from + index}</td>
                                                    <td className="font-mono font-medium">{item.kode_spk}</td>
                                                    <td>{item.customer?.nama}</td>
                                                    <td>{item.bahan?.bahan}</td>
                                                    <td>{item.keterangan}</td>
                                                    <td className="tabular-nums">{item.tinggi} {item.satuan}</td>
                                                    <td className="tabular-nums">{item.lebar}</td>
                                                    <td className="tabular-nums text-center">{item.qty}</td>
                                                    <td className="text-center">{item.sisi}</td>
                                                    <td className="tabular-nums">{Number(item.harga_bahan).toLocaleString('id-ID')}</td>
                                                    <td className="tabular-nums">{Number(item.total_harga).toLocaleString('id-ID')}</td>
                                                    <td>{item.metode_pengantaran}</td>
                                                    <td>{item.tgl_kirim}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {produksi.links && (
                                <div className="flex justify-center mt-4 join">
                                    {produksi.links.map((link, i) => (
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

            {selected.length > 0 && (
                <div className="mb-3 bg-gradient-to-r from-success/10 to-success/5 border border-success/30 rounded-xl px-4 py-3 shadow-sm transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="badge badge-success badge-lg gap-1">
                                    <i className="fas fa-check-circle text-xs"></i>
                                    {selected.length}
                                </div>
                                <span className="text-base-content/70 font-medium">item dipilih</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-4">
                                <span className="text-base-content/40">|</span>
                                <span className="text-base-content/70">
                                    Qty: <strong className="text-base-content">{totalQty}</strong>
                                </span>
                                <span className="text-base-content/40">|</span>
                                <span className="text-base-content/70">
                                    Total: <strong className="text-success text-sm">Rp {totalHarga.toLocaleString('id-ID')}</strong>
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="btn btn-success btn-sm" onClick={printReceipt}>
                                <i className="fas fa-receipt"></i> Cetak Struk
                            </button>
                            <div className="dropdown dropdown-end">
                                <button className="btn btn-success btn-sm btn-outline" tabIndex={0}>
                                    <i className="fas fa-chevron-down"></i>
                                </button>
                                <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-100 rounded-xl shadow-lg border border-base-300 z-50 w-48 p-2 mt-1">
                                    <li><button onClick={printReceiptCombined}><i className="fas fa-layer-group"></i> Cetak Gabungan</button></li>
                                    <li><button onClick={() => setPreview(true)}><i className="fas fa-eye"></i> Preview Struk</button></li>
                                    <li><button onClick={() => setSelected([])}><i className="fas fa-times"></i> Batalkan Pilihan</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <dialog ref={previewRef} className="modal">
                <div className="modal-box w-11/12 max-w-4xl h-[90vh] p-0">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-base-300 bg-base-100 sticky top-0 z-10">
                        <h3 className="font-bold text-lg">
                            <i className="fas fa-eye text-success"></i> Preview Struk
                        </h3>
                        <div className="flex gap-2">
                            <button className="btn btn-success btn-sm" onClick={() => { previewRef.current?.close(); printReceipt() }}>
                                <i className="fas fa-print"></i> Cetak
                            </button>
                            <button className="btn btn-ghost btn-sm btn-circle" onClick={() => previewRef.current?.close()}>✕</button>
                        </div>
                    </div>
                    <div className="w-full h-[calc(90vh-60px)]">
                        <iframe ref={iframeRef} className="w-full h-full border-none" title="Preview Struk" />
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </AdminLayout>
    )
}
