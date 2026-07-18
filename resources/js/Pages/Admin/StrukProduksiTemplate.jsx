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
    Number(value || 0).toLocaleString('id-ID')

const receiptStyles = `

    @page { size: 90mm 297mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 13px;
        width: 62mm;
         margin: 0 auto;
        padding: 3mm;
        color: #000;
    }
    .receipt { width: 100%; padding: 0; }
    .header { text-align: center; margin-bottom: 4px; }
    .brand-row { display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .logo-img { max-width: 100%; height: auto; display: block; margin: 0 auto 3px; }
    .brand { font-size: 20px; font-weight: 900; letter-spacing: 0; line-height: 1; }
    .sub { font-size: 10px; font-weight: 700; letter-spacing: 2px; margin-top: 1px; }
    .contact { font-size: 13px; font-weight: 700; margin-top: 2px; letter-spacing: 0; }
    .topline { width: 100%; border-collapse: collapse; table-layout: fixed; margin-top: 2px; font-size: 12px; }
    .topline td { border: none; padding: 3px 0 4px; white-space: nowrap; }
    .topline .invoice { font-size: 11px; }
    .topline .amount { padding-right: 1mm; text-align: right; }
    .invoice { font-size: 13px; font-weight: 800; }
    .title { font-size: 13px; font-weight: 800; margin-bottom: 4px letter-spacing: 1px; text-align: center; }
    .block { margin-top: 2px; }
    .label { display: block; font-size: 11px; }
    .name { font-size: 14px; margin-top: 2px; }
    .address { min-height: 18px; overflow-wrap: anywhere; font-size: 12px; }
    .pay-row { display: grid; grid-template-columns: 1fr 1fr; margin: 5px 0 3px; text-align: center; font-size: 12px; }
    .line { border-top: 2px solid #000; margin: 4px 0; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 12px; }
    th, td { padding: 3px 2px; text-align: left; vertical-align: middle; overflow-wrap: anywhere; }
    th { border-top: 2px solid #000; border-bottom: 2px solid #000; font-weight: 900; text-align: center; font-size: 12px; }
    td { padding-top: 4px; padding-bottom: 4px; }
    .bahan { width: 18mm; text-align: left; }
    .ukuran { width: 20mm; text-align: center; font-variant-numeric: tabular-nums; }
    .qty { width: 7mm; text-align: center; font-variant-numeric: tabular-nums; font-size: 12px; }
    .amount { width: 16mm; text-align: right; font-variant-numeric: tabular-nums; }
    .alt td { background: #eee; }
    .muted { color: #000; }
    .keterangan-row td { padding-top: 0; padding-bottom: 4px; font-size: 11px; }
    tfoot td { padding: 2px; border: none; }
    tfoot tr:first-child td { padding-top: 4px; }
    .summary-label { text-align: left; font-weight: 700; }
    tfoot { border-top: 2px solid #000; }
    .notes { margin-top: 10px; }
    .notes ul { list-style: none; padding: 0; margin: 0; }
    .notes li { font-size: 11px; line-height: 1.5; margin-bottom: 2px; padding-left: 4mm; }
    .notes li::before { content: '* '; margin-left: -4mm; }
    .signatures { display: flex; justify-content: space-between; margin-top: 7px; text-align: center; font-size: 12px; }
    .signatures > div { width: 48%; }
    .sign-name { margin-top: 28px; min-height: 14px; font-size: 13px; font-weight: bold; }
    .printed { display: flex; justify-content: space-between; margin-top: 3px; font-size: 10px; }
`

export const buildProductionReceiptHtml = ({ items, auth, paymentType, diskonInfo }) => {
    const printedAt = new Date()
    const gtHarga = items.reduce((s, it) => s + Number(it.total_harga || 0), 0)
    const gtQty = items.reduce((s, it) => s + Number(it.qty || 0), 0)
    const firstItem = items[0]
    const firstCustomer = firstItem?.customer
    const invoiceNumber = firstItem?.no_invoice || firstItem?.kode_spk || '-'
    const selesaiDate = firstItem?.tgl_kirim || printedAt
    const cashierName = auth?.user?.username || auth?.user?.name || 'Admin'
    const paymentLabels = { lunas: 'TUNAI', utang: 'UTANG', transfer: 'TRANSFER', qris: 'QRIS' }
    const paymentLabel = paymentLabels[paymentType] || 'TUNAI'

    const hasDiskon = diskonInfo && Number(diskonInfo.diskon || 0) > 0
    const diskonLabel = hasDiskon
        ? (diskonInfo.mode_diskon === 'persen' ? `${diskonInfo.diskon}%` : `Rp ${formatMoney(diskonInfo.diskon)}`)
        : ''
    const hargaSetelahDiskon = hasDiskon ? Number(diskonInfo.harga_diskon || gtHarga) : gtHarga

    const itemRows = items.map((item, i) => `
            <tr${i % 2 === 1 ? ' class="alt"' : ''}>
                <td class="bahan">${item.bahan?.kode || '-'}</td>
                <td class="ukuran">
                    <span>${item.lebar || 0}</span>
                    <span class="muted"> x </span>
                    <span>${item.tinggi || 0}</span>
                    <span class="muted"> ${item.satuan || ''}</span>
                </td>
                <td class="qty">${item.qty || 0}</td>
                <td class="amount">${formatMoney(item.total_harga)}</td>
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
                <td class="bahan invoice">${invoiceNumber}</td>
                <td class="ukuran"></td>
                <td class="qty"></td>
                <td class="amount" style="font-weight: bold; font-size: 10px">${formatReceiptDateShort(printedAt)}</td>
            </tr>
        </table>

        <div class="title">FAKTUR</div>
        <div class="block">
            <span class="label">Kepada Yth :</span>
            <div class="name">${firstCustomer?.nama || '-'}</div>
            <div class="address">${firstCustomer?.alamat || '-'}</div>
        </div>
        <div>Selesai : ${formatReceiptDateShort(selesaiDate)}</div>
        <div>
            <span>Cara Bayar :</span>
            <strong>${paymentLabel}</strong>
        </div>

        <br />

        <table>
            <thead>
                <tr>
                    <th class="bahan">Bahan</th>
                    <th class="ukuran">ukuran</th>
                    <th class="qty">qty</th>
                    <th class="amount" style="text-align: center;">jml</th>
                </tr>
            </thead>
            <tbody>
                ${itemRows}
            </tbody>
            <tfoot>
                <tr><td class="summary-label" colspan="3">Total Faktur</td><td class="amount">${formatMoney(gtHarga)}</td></tr>
                ${hasDiskon ? `<tr><td class="summary-label" colspan="3">Diskon (${diskonLabel})</td><td class="amount" style="color:#c00">-${formatMoney(gtHarga - hargaSetelahDiskon)}</td></tr>` : ''}
                ${hasDiskon ? `<tr><td class="summary-label" colspan="3" style="font-weight:900">Harga Akhir</td><td class="amount" style="font-weight:900">${formatMoney(hargaSetelahDiskon)}</td></tr>` : ''}
               
            </tfoot>
        </table>

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

