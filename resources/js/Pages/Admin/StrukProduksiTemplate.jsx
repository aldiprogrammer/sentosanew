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

const parseReceiptDate = (value) => {
    if (!value) return null
    if (typeof value === 'string') {
        const parts = value.match(/^(\d{2})-(\d{2})-(\d{4})$/)
        if (parts) {
            const [, day, month, year] = parts
            return new Date(Number(year), Number(month) - 1, Number(day))
        }
    }

    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
}

const formatReceiptDateShort = (value = new Date()) => {
    const date = value instanceof Date ? value : parseReceiptDate(value)
    if (!date) return value || '-'

    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date).replace(/\//g, '-')
}

const formatMoney = (value) =>
    Math.round(Number(value || 0)).toLocaleString('id-ID')

const receiptStyles = `

    @page { size: 96mm 450mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        font-family: Calibri, sans-serif;
        font-size: 17px;
        width: 67mm;
        margin: 0 auto;
        padding: 3mm;
        color: #000;
    }
    .receipt { width: 100%; padding: 0; }
    .header { text-align: center; margin-bottom: 2px; }
    .brand-row { display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .logo-img { max-width: 100%; height: auto; display: block; margin: 0 auto 3px; }
    .brand { font-size: 22px; font-weight: 900; letter-spacing: 0; line-height: 1; }
    .sub { font-size: 12px; font-weight: 700; letter-spacing: 2px; margin-top: 1px; }
    .contact { font-size: 14px; font-weight: 700; margin-top: 2px; letter-spacing: 0; }
    .topline { width: 100%; border-collapse: collapse; table-layout: fixed; margin-top: 2px; font-size: 14px; }
    .topline td { border: none; padding: 3px 0 4px; white-space: nowrap; }
    .topline .invoice { font-size: 13px; }
    .topline .amount { padding-right: 1mm; text-align: right; }
    .invoice { font-size: 15px; font-weight: 800; }
    .title { font-size: 16px; font-weight: 800; margin-bottom: 2px letter-spacing: 1px; text-align: center; }
    .block { margin-top: 1px; }
    .label { display: block; font-size: 13px; }
    .name { font-size: 16px; margin-top: 2px; }
    .address { min-height: 18px; overflow-wrap: anywhere; font-size: 16px; }
    .pay-row { display: grid; grid-template-columns: 1fr 1fr; margin: 5px 0 3px; text-align: center; font-size: 14px; }
    .line { border-top: 2px solid #000; margin: 2px 0; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 14px; }
    th, td { padding: 1px 2px; text-align: left; vertical-align: middle; overflow-wrap: anywhere; line-height: 1.1; }
    th { border-top: 2px solid #000; border-bottom: 2px solid #000; font-weight: 900; text-align: center; font-size: 14px; }
    td { padding-top: 1px; padding-bottom: 1px; }
    .bahan { width: 17mm; text-align: left; }
    .ukuran-col { width: 14mm; text-align: center; font-size: 12px; font-weight: bold; white-space: nowrap; }
    .ukuran { display: block; font-size: 12px; color: #444; margin-top: 0; }
    .qty { width: 7mm; text-align: center; font-variant-numeric: tabular-nums; font-size: 14px; }
    .amount { width: 18mm; text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .alt td { background: #eee; }
    .muted { color: #000; }
    .keterangan-row td { padding-top: 0; padding-bottom: 1px; font-size: 13px; }
    tfoot td { padding: 1px 2px; white-space: nowrap; }
    .summary-amount { width: mm; text-align: right; font-variant-numeric: tabular-nums; font-size: 14px; }
    tfoot tr:first-child td { padding-top: 2px; }
    .summary-label { text-align: left; font-weight: 700; white-space: nowrap; }
    tfoot { border-top: 2px solid #000; }
    .notes { margin-top: 5px; }
    .notes ul { list-style: none; padding: 0; margin: 0;  border-radius: 2px; }
    .notes li { font-size: 10px; line-height: 1; margin-bottom: 0; padding: 1px 4mm; }
    .notes li::before { content: '* '; margin-left: -4mm; }
    .signatures { display: flex; justify-content: space-between; margin-top: 7px; text-align: center; font-size: 14px; }
    .signatures > div { width: 48%; }
    .sign-name { margin-top: 28px; min-height: 14px; font-size: 15px; font-weight: bold; }
    .printed { display: flex; justify-content: space-between; margin-top: 3px; font-size: 12px; }
`

export const buildProductionReceiptHtml = ({ items, auth, paymentType, diskonInfo, minimumHarga = 0, hargaAkhirInvoice = null, uang = null, kembalian = null }) => {
    const printedAt = new Date()
    const gtHarga = items.reduce((s, it) => s + Number(it.total_harga || 0), 0)
    const gtQty = items.reduce((s, it) => s + Number(it.qty || 0), 0)
    const firstItem = items[0]
    const firstCustomer = firstItem?.customer
    const invoiceNumber = firstItem?.no_invoice || firstItem?.kode_spk || '-'
    const selesaiDate = firstItem?.tgl_kirim || printedAt
    const cashierName = items[0]?.cs?.username || auth?.user?.username || auth?.user?.name || 'Admin'
    const paymentLabels = { lunas: 'TUNAI', utang: 'UTANG', transfer: 'TRANSFER', qris: 'QRIS' }
    const paymentLabel = paymentLabels[paymentType] || 'TUNAI'

    const safeKembalian = kembalian !== null ? Math.max(0, Number(kembalian)) : null

    const hasDiskon = diskonInfo && Number(diskonInfo.diskon || 0) > 0
    const diskonLabel = hasDiskon
        ? (diskonInfo.mode_diskon === 'persen' ? `${diskonInfo.diskon}%` : `Rp ${formatMoney(diskonInfo.diskon)}`)
        : ''
    const hargaSetelahDiskon = hasDiskon ? Number(diskonInfo.harga_diskon || gtHarga) : gtHarga
    const hasMinimumFaktur = Number(minimumHarga) > 0
    const hargaAkhir = hargaAkhirInvoice ? Number(hargaAkhirInvoice) : (hargaSetelahDiskon + Number(minimumHarga))

    const itemRows = items.map((item, i) => `
            <tr${i % 2 === 1 ? ' class="alt"' : ''}>
                <td class="bahan">${item.bahan?.kode || '-'}</td>
                <td class="ukuran-col" style="text-align: center">${item.lebar || 0}x${item.tinggi || 0}${item.satuan ? ' ' + item.satuan : ''}</td>
                <td class="qty">${item.qty || 0}</td>
                <td class="amount" style="font-weight: bold;">${formatMoney(item.total_harga)}</td>
            </tr>
            ${(item.keterangan || item.kode_spk) ? `
            <tr class="keterangan-row${i % 2 === 1 ? ' alt' : ''}">
                <td class="keterangan" colspan="4">${item.keterangan || item.kode_spk}</td>
            </tr>` : ''}`
    ).join('')

    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<title>Struk Produksi - ${items.length > 1 ? items.length + ' item' : items[0]?.kode_spk}</title>
<style>${receiptStyles}</style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <div class="brand-row">
               <h1>SENTOSA</h1>
            </div>
        </div>

        <table class="topline">
            <tr>
                <td class="bahan invoice" style="font-weight: bold;">${invoiceNumber}</td>
                <td class="ukuran-col"></td>
                <td class="qty"></td>
                <td class="amount" style="font-weight: bold;">${formatReceiptDateShort(firstItem?.tanggal || printedAt)}</td>
            </tr>
        </table>

        <div class="title"><b>FAKTUR</b></div>
        <div class="block" style="font-weight: bold;">
            <span class="label">Kepada Yth :</span>
            <div class="name">${firstCustomer?.nama || '-'}</div>
            <div class="address">${firstCustomer?.alamat || '-'}</div>
             <span>Cara Bayar :</span>
            <strong>${paymentLabel}</strong>
        </div>

        <table>
            <thead>
                <tr>
                    <th class="bahan">Bahan</th>
                    <th class="ukuran-col">Ukuran</th>
                    <th class="qty">Qty</th>
                    <th class="amount" style="text-align: center;">Jml</th>
                </tr>
            </thead>
            <tbody>
                ${itemRows}
            </tbody>
            <tfoot>
                <tr><td class="summary-label" colspan="3">Total Faktur</td><td class="summary-amount" colspan='1' style="font-weight: bold">${formatMoney(gtHarga)}</td></tr>
                ${hasDiskon ? `<tr><td class="summary-label" colspan="3">Diskon (${diskonLabel})</td><td colspan='1' class="summary-amount" style="color:#c00">-${formatMoney(gtHarga - hargaSetelahDiskon)}</td></tr>` : ''}
                ${hasMinimumFaktur ? `<tr><td class="summary-label" colspan="3">Minimum Faktur</td><td class="summary-amount" style="color:#c00">+${formatMoney(minimumHarga)}</td></tr>` : ''}
                ${hasDiskon || hasMinimumFaktur ? `<tr><td class="summary-label" colspan="3" style="font-weight:900">Harga Akhir</td><td colspan='1' class="summary-amount" style="font-weight:900">${formatMoney(hargaAkhir)}</td></tr>` : ''}
            </tfoot>
        </table>

        ${uang !== null ? `
        <table>
            <tfoot>
                <tr><td class="summary-label" colspan="3">Uang</td><td class="summary-amount">${formatMoney(uang)}</td></tr>
                <tr><td class="summary-label" colspan="3">Kembalian</td><td class="summary-amount">${formatMoney(safeKembalian)}</td></tr>
            </tfoot>
        </table>` : ''}

<br>
        <div class="notes">
            <ul>
                <li>Diperiksa saat pengambilan / penerimaan barang pesanan.</li>
                <li>Kami tidak bertanggung jawab atas kekurangan/kerusakan barang setelah diterima.</li>
                <li>Barang yang tidak diambil selama 1 bulan bila hilang/rusak bukan tanggungan kami.</li>
            </ul>
        </div>

        <div class="signatures" style="margin-top: 10px; font-weight: bold;">
            <div>
                <div>Hormat Kami,</div>
                <div class="sign-name">${cashierName}</div>
            </div>
            <div>
                <div>Customer</div>
                <div class="sign-name">${firstCustomer?.nama || '-'}</div>
            </div>
        </div>

        <div class="printed" style="margin-top: 7px;">
            <span>Printed By : ${cashierName}</span>
            <span>${formatReceiptDate(printedAt)} ${formatReceiptTime(printedAt)}</span>
        </div>
    </div>
</body></html>`
}

