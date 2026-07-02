<!doctype html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Pembukuan</title>
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
        <h1>Laporan Pembukuan</h1>
        <p>
            @if ($filters['jenis'] ?? '')
                Jenis: {{ $filters['jenis'] }} |
            @endif
            @if ($filters['tanggal_awal'] ?? '')
                Tgl Awal: {{ $filters['tanggal_awal'] }} |
            @endif
            @if ($filters['tanggal_akhir'] ?? '')
                Tgl Akhir: {{ $filters['tanggal_akhir'] }} |
            @endif
            @if ($filters['bulan'] ?? '')
                Bulan: {{ \Carbon\Carbon::create()->month((int) $filters['bulan'])->format('F') }}
            @endif
            @if (!($filters['tanggal_awal'] ?? '') && !($filters['tanggal_akhir'] ?? '') && !($filters['bulan'] ?? '') && !($filters['jenis'] ?? ''))
                Semua Data
            @endif
        </p>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Customer</th>
                <th>Kode SPK/Invoice</th>
                <th>Jenis</th>
                <th>Total Harga</th>
                <th>Pembayaran</th>
                <th>Jatuh Tempo</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($data as $i => $item)
                <tr>
                    <td class="text-center">{{ $i + 1 }}</td>
                    <td>{{ $item['tanggal'] }}</td>
                    <td>{{ $item['customer'] }}</td>
                    <td>{{ $item['jenis'] == 'Desain' ? ($item['no_invoice'] ?? '-') : $item['kode_spk'] }}</td>
                    <td class="text-center">{{ $item['jenis'] }}</td>
                    <td class="text-right">Rp {{ number_format((float) $item['total_harga'], 0, ',', '.') }}</td>
                    <td class="text-center">{{ $item['pembayaran'] == 'lunas' ? 'Lunas' : 'Hutang' }}</td>
                    <td>{{ $item['pembayaran'] != 'lunas' && $item['jatuh_tempo'] ? $item['jatuh_tempo'] . ($item['overdue'] ? ' (Telat)' : '') : '-' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="8" class="text-center">Tidak ada data</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div style="margin-top: 15px;">
        <table style="width: 300px; margin-left: auto;">
            <tr>
                <td class="font-bold">Total Lunas</td>
                <td class="text-right">Rp {{ number_format((float) $totalLunas, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="font-bold">Total Hutang</td>
                <td class="text-right">Rp {{ number_format((float) $totalHutang, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="font-bold">Grand Total</td>
                <td class="text-right font-bold">Rp {{ number_format((float) $grandTotal, 0, ',', '.') }}</td>
            </tr>
        </table>
    </div>

    <div class="footer">
        Dicetak pada: {{ date('d-m-Y H:i') }}
    </div>
</body>
</html>
