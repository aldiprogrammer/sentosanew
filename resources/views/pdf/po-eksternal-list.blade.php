<!doctype html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Daftar PO Eksternal</title>
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
        <h1>Daftar PO Eksternal</h1>
        <p>
            @if ($filters['search'] ?? '')
                Cari: {{ $filters['search'] }} |
            @endif
            @if ($filters['bulan'] ?? '')
                Bulan: {{ $filters['bulan'] }} |
            @endif
            @if ($filters['tgl_dari'] ?? '')
                Tgl Dari: {{ $filters['tgl_dari'] }} |
            @endif
            @if ($filters['tgl_sampai'] ?? '')
                Tgl Sampai: {{ $filters['tgl_sampai'] }} |
            @endif
            @if (!($filters['search'] ?? '') && !($filters['bulan'] ?? '') && !($filters['tgl_dari'] ?? '') && !($filters['tgl_sampai'] ?? ''))
                Semua Data
            @endif
        </p>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>No PO</th>
                <th>Suplayer</th>
                <th>Customer</th>
                <th>Hal</th>
                <th>Mata Uang</th>
                <th>Batas Bayar</th>
                <th>Pembayaran</th>
                <th>Total Harga</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($poEksternal as $index => $po)
                <tr>
                    <td class="text-center">{{ $loop->iteration }}</td>
                    <td class="text-center">{{ $po->tgl }}</td>
                    <td class="font-bold">{{ $po->no_po }}</td>
                    <td>{{ $po->suplayer->nama_suplayer ?? '-' }}</td>
                    <td>{{ $po->customer_names ?? '-' }}</td>
                    <td>{{ $po->hal ?? '-' }}</td>
                    <td class="text-center">{{ $po->mata_uang ?? '-' }}</td>
                    <td class="text-center">{{ $po->batas_bayar ?? '-' }}</td>
                    <td class="text-center">{{ $po->pembayaran ?? '-' }}</td>
                    <td class="text-right">Rp {{ number_format((float) $po->total_harga ?? 0, 0, ',', '.') }}</td>
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
        Dicetak pada: {{ date('d-m-Y H:i') }} | Oleh: {{ $user->username ?? $user->name ?? '-' }}
    </div>
</body>
</html>
