<!doctype html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Order - Desain</title>
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
        <h1>Laporan Order - Desain</h1>
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
                <th>No Antrian</th>
                <th>Customer</th>
                <th>Kategori Desain</th>
                <th>Qty</th>
                <th>Total Harga</th>
                <th>Pembayaran</th>
                <th>Desainer</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($data as $i => $item)
                <tr>
                    <td class="text-center">{{ $i + 1 }}</td>
                    <td>{{ $item->tanggal }}</td>
                    <td>{{ $item->no_invoice ?? $item->kode_spk }}</td>
                    <td>{{ $item->no_antrian }}</td>
                    <td>{{ $item->customer->nama ?? '-' }}</td>
                    <td>{{ $item->kategoridesain->kategori ?? '-' }}</td>
                    <td class="text-center">{{ $item->qty }}</td>
                    <td class="text-right">Rp {{ number_format((float) $item->total_harga, 0, ',', '.') }}</td>
                    <td class="text-center">{{ $item->pembayaran ? ucfirst($item->pembayaran) : '-' }}</td>
                    <td>{{ $item->desainer->username ?? '-' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="10" class="text-center">Tidak ada data</td>
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
