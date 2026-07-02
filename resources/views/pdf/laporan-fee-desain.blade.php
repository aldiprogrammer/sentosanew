<!doctype html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Fee Desain</title>
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
        <h1>Laporan Fee Desain</h1>
        <p>
            @if ($filters['pengguna_id'] ?? '')
                Pegawai ID: {{ $filters['pengguna_id'] }} |
            @endif
            @if ($filters['tgl_awal'] ?? '')
                Tgl Awal: {{ $filters['tgl_awal'] }} |
            @endif
            @if ($filters['tgl_akhir'] ?? '')
                Tgl Akhir: {{ $filters['tgl_akhir'] }} |
            @endif
            @if ($filters['bulan'] ?? '')
                Bulan: {{ \Carbon\Carbon::create()->month((int) $filters['bulan'])->format('F') }} |
            @endif
            @if ($filters['tahun'] ?? '')
                Tahun: {{ $filters['tahun'] }}
            @endif
            @if (!($filters['tgl_awal'] ?? '') && !($filters['tgl_akhir'] ?? '') && !($filters['bulan'] ?? '') && !($filters['tahun'] ?? ''))
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
                <th>Customer</th>
                <th>Kategori Desain</th>
                <th>Qty</th>
                <th>Fee</th>
                <th>Desainer</th>
                <th>Status</th>
                <th>Diambil At</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($data as $i => $item)
                <tr>
                    <td class="text-center">{{ $i + 1 }}</td>
                    <td>{{ $item->tanggal }}</td>
                    <td>{{ $item->desain->no_invoice ?? '-' }}</td>
                    <td>{{ $item->desain->customer->nama ?? '-' }}</td>
                    <td>{{ $item->kategoriDesain->kategori ?? '-' }}</td>
                    <td class="text-center">{{ $item->desain->qty ?? '-' }}</td>
                    <td class="text-right">Rp {{ number_format((float) $item->fee, 0, ',', '.') }}</td>
                    <td>{{ $item->pengguna->username ?? '-' }}</td>
                    <td class="text-center">{{ $item->status == 'diambil' ? 'Diambil' : 'Belum diambil' }}</td>
                    <td>{{ $item->diambil_at ?? '-' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="10" class="text-center">Tidak ada data</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div style="margin-top: 15px;">
        <table style="width: 300px; margin-left: auto;">
            <tr>
                <td class="font-bold">Total Belum Diambil</td>
                <td class="text-right">Rp {{ number_format((float) $totalBelumDiambil, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="font-bold">Total Diambil</td>
                <td class="text-right">Rp {{ number_format((float) $totalDiambil, 0, ',', '.') }}</td>
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
