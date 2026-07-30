<!doctype html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Order - Produksi</title>
    <style>
        body { font-family: sans-serif; font-size: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #000; padding: 4px 6px; text-align: left; }
        th { background: #e5e7eb; font-weight: bold; text-align: center; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-bold { font-weight: bold; }
        .header { margin-bottom: 20px; }
        .header h1 { margin: 0; font-size: 16px; }
        .header p { margin: 2px 0; font-size: 11px; color: #555; }
        .footer { margin-top: 20px; font-size: 10px; text-align: right; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Laporan Order - Produksi</h1>
        <p>
            @if ($filters['search'] ?? '')
                Cari: {{ $filters['search'] }} |
            @endif
            @if ($filters['pembayaran'] ?? '')
                Pembayaran: {{ ucfirst($filters['pembayaran']) }} |
            @endif
            @if ($penggunaName ?? '')
                Pegawai: {{ $penggunaName }} |
            @endif
            @if ($filters['tgl_awal'] ?? '')
                Tgl Awal: {{ $filters['tgl_awal'] }} |
            @endif
            @if ($filters['tgl_akhir'] ?? '')
                Tgl Akhir: {{ $filters['tgl_akhir'] }} |
            @endif
            @if (!($filters['tgl_awal'] ?? '') && !($filters['tgl_akhir'] ?? '') && !($filters['search'] ?? '') && !($filters['pembayaran'] ?? '') && !($penggunaName ?? ''))
                Semua Data
            @endif
        </p>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>No Invoice</th>
                <th>Kode SPK</th>
                <th>Customer</th>
                <th>Bahan</th>
                <th>Qty</th>
                <th>Total Harga</th>
                <th>Pembayaran</th>
                <th>Status</th>
                <th>CS</th>
            </tr>
        </thead>
        <tbody>
            @php $counter = 1; @endphp
            @forelse ($grouped as $noInvoice => $items)
                @php
                    $groupTotal = $items->sum('total_harga');
                    $inv = $invoiceData[$noInvoice] ?? null;
                    $hasDiskon = $inv && $inv->diskon != null && (float) $inv->diskon !== 0.0 && $inv->harga_awal != null && $inv->harga_akhir != null;
                    $hasMinFaktur = !$hasDiskon && $inv && $inv->minimum_faktur != null && (float) $inv->minimum_faktur > 0 && $inv->harga_awal != null && $inv->harga_akhir != null;
                    $fullTotal = $inv->harga_akhir ?? $groupTotal;
                @endphp
                <tr style="background: #d1d5db; font-weight: bold;">
                    <td colspan="11" style="padding: 6px 8px;">
                        <span>{{ $noInvoice === '__no_invoice__' ? '-' : $noInvoice }}</span>
                        <span style="margin-left: 20px;">Customer : {{ $items->first()->customer->nama ?? '-' }}</span>
                        @if ($hasDiskon)
                            <span style="float: right; color: #cc1818;">
                                Diskon: {{ $inv->mode_diskon === 'persen' ? $inv->diskon . '%' : 'Rp ' . number_format((float) $inv->diskon, 0, ',', '.') }}
                                | Awal: Rp {{ number_format((float) $inv->harga_awal, 0, ',', '.') }}
                                | Akhir: Rp {{ number_format((float) $fullTotal, 0, ',', '.') }}
                            </span>
                        @elseif ($hasMinFaktur)
                            <span style="float: right; color: #0d0ae2;">
                                Min Faktur: Rp {{ number_format((float) $inv->minimum_faktur, 0, ',', '.') }}
                                | Awal: Rp {{ number_format((float) $inv->harga_awal, 0, ',', '.') }}
                                | Akhir: Rp {{ number_format((float) $fullTotal, 0, ',', '.') }}
                            </span>
                        @else
                            <span style="float: right; color:#0c0000;">
                                Total: Rp {{ number_format((float) $fullTotal, 0, ',', '.') }}
                            </span>
                        @endif
                    </td>
                </tr>
                @foreach ($items as $item)
                    <tr>
                        <td class="text-center">{{ $counter++ }}</td>
                        <td>{{ $item->tanggal }}</td>
                        <td>{{ $item->no_invoice ?? '-' }}</td>
                        <td>{{ $item->kode_spk }}</td>
                        <td>{{ $item->customer->nama ?? '-' }}</td>
                        <td>{{ $item->bahan->bahan ?? '-' }}</td>
                        <td class="text-center">{{ $item->qty }}</td>
                        <td class="text-right">Rp {{ number_format((float) $item->total_harga, 0, ',', '.') }}</td>
                        <td class="text-center">{{ $item->pembayaran ? ucfirst($item->pembayaran) : '-' }}</td>
                        <td class="text-center">
                            @if($item->status_selesai == 1) Selesai
                            @elseif($item->status_logistik == 1) Logistik
                            @elseif($item->status_finishing == 1) Finishing
                            @elseif($item->status_produksi == 1) Produksi
                            @else -
                            @endif
                        </td>
                        <td>{{ $item->cs->username ?? '-' }}</td>
                    </tr>
                @endforeach
            @empty
                <tr>
                    <td colspan="11" class="text-center">Tidak ada data</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div style="margin-top: 15px;">
        <table style="width: 250px; margin-left: auto;">
            <tr>
                <td class="font-bold">Total Keseluruhan</td>
                <td class="text-right font-bold">Rp {{ number_format((float) $totalKeseluruhan, 0, ',', '.') }}</td>
            </tr>
        </table>
    </div>

    <div class="footer">
        Dicetak pada: {{ date('d-m-Y H:i') }}
    </div>
</body>
</html>
