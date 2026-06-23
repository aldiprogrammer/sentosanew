@php
    $formatTanggal = function ($tanggal) {
        if (! $tanggal) {
            return '-';
        }

        try {
            return \Carbon\Carbon::parse($tanggal)->format('d-m-Y');
        } catch (\Throwable $e) {
            return $tanggal;
        }
    };

    $formatAngka = fn ($nilai, $decimal = 0) => number_format((float) ($nilai ?? 0), $decimal, '.', ',');

    $normalize = fn ($nilai) => strtolower(str_replace(' ', '', (string) $nilai));
    $isFinishing = fn ($nilai, $target) => $normalize($nilai) === $normalize($target);

    $finishingRows = function ($produksi) use ($isFinishing) {
        $pinising = $produksi?->pinising;
        $mataAyam = $produksi?->mataAyam;
        $sides = [
            ['atas', 'A'],
            ['bawah', 'B'],
            ['kanan', 'Ka'],
            ['kiri', 'Ki'],
        ];
        $targets = [
            ['Kantongan', 'Kantongan'],
            ['Lipat Pas Gbr', 'Lipat Pas Gambar'],
            ['Potong Pas Gbr', 'Potong Pas Gambar'],
            ['Lipat Sisa Putih', 'Lipat Sisa Putih'],
            ['Sisa Putih', 'Sisa Putih'],
        ];

        $rows = [];
        foreach ($targets as [$label, $target]) {
            $marks = [];
            foreach ($sides as [$key]) {
                $marks[] = $pinising && $isFinishing($pinising->{$key} ?? '', $target) ? 'V' : '';
            }
            $rows[] = [$label, ...$marks];
        }

        $mataMarks = [];
        foreach ($sides as [$key]) {
            $mataMarks[] = $mataAyam && ($mataAyam->{$key} ?? false) ? 'V' : '';
        }
        $rows[] = ['Mata Ayam', ...$mataMarks];

        return $rows;
    };

    $distributor = $po->distributor;
    $suplayer = $po->suplayer;
    $diskonPercent = (float) ($po->diskon ?? 0);
    $ppnPercent = (float) ($po->ppn ?? 0);
@endphp
<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>PO Eksternal {{ $po->no_po }}</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 18px 22px 20px;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            color: #000;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            line-height: 1.25;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        .header-table td {
            border: 0;
            padding: 0;
            vertical-align: top;
        }

        .brand {
            font-size: 16px;
            font-weight: bold;
            letter-spacing: .2px;
        }

        .logo {
            width: 126px;
            margin: 4px 0 2px;
        }

        .po-title {
            font-size: 17px;
            font-weight: bold;
            text-align: right;
        }

        .po-number {
            margin-top: 12px;
            font-size: 15px;
            font-weight: bold;
            text-align: right;
        }

        .info-table {
            margin-top: 18px;
        }

        .info-table td {
            border: 0;
            padding: 2px 6px 2px 0;
            vertical-align: top;
        }

        .info-title {
            font-weight: bold;
            padding-bottom: 6px !important;
        }

        .right-label {
            width: 74px;
            white-space: nowrap;
        }

        .intro {
            margin: 14px 0 8px;
        }

        .items th,
        .items td {
            border: 1px solid #000;
            padding: 5px 4px;
            vertical-align: top;
        }

        .items th {
            font-weight: bold;
            text-align: center;
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .finishing-cell {
            padding: 0 !important;
        }

        .finishing-title {
            padding: 5px 6px;
            font-weight: bold;
            border-bottom: 1px solid #000;
        }

        .finish-wrap td {
            border: 0;
            padding: 0;
        }

        .finish-table th,
        .finish-table td {
            border: 1px solid #000;
            padding: 3px 4px;
            height: 20px;
        }

        .finish-table {
            border-left: 0;
            border-bottom: 0;
        }

        .finish-table th:first-child,
        .finish-table td:first-child {
            border-left: 0;
            text-align: left;
        }

        .note-box {
            border-left: 1px solid #000;
            min-height: 141px;
        }

        .note-row {
            min-height: 70px;
            padding: 8px;
        }

        .note-row + .note-row {
            border-top: 1px solid #000;
        }

        .note-label {
            display: inline-block;
            width: 72px;
            font-weight: bold;
        }

        .bottom-area {
            margin-top: 14px;
        }

        .bottom-area td {
            border: 0;
            padding: 0;
            vertical-align: top;
        }

        .summary th,
        .summary td {
            border: 1px solid #000;
            padding: 5px 6px;
        }

        .summary th {
            width: 92px;
            text-align: left;
            font-weight: normal;
        }

        .summary .grand th,
        .summary .grand td {
            font-weight: bold;
        }

        .terms {
            margin-top: 28px;
            font-size: 10px;
        }

        .sign td {
            border: 0;
            padding-top: 14px;
            text-align: center;
        }

        .sign-name {
            padding-top: 46px;
        }
    </style>
</head>
<body>
    <table class="header-table">
        <tr>
            <td style="width: 55%;">
                <div class="brand">SENTOSA DIGITAL PRINTING</div>
                {{-- <img class="logo" src="{{ public_path('logonew.png') }}" alt="Sentosa"> --}}
                <div>JL. LAKSANA NO.75 MEDAN</div>
                <div style="margin-top: 8px;">061- 7359 007</div>
            </td>
            <td>
                <div class="po-title">Purchase Order</div>
                <div class="po-number">{{ $po->no_po }}</div>
            </td>
        </tr>
    </table>

    <table class="info-table">
        <tr>
            <td class="info-title" style="width: 34%;">Distributor : </td>
            <td class="info-title" style="width: 32%;">Tujuan  : </td>
            <td class="right-label">Tanggal</td>
            <td style="width: 1%;">:</td>
            <td>{{ $formatTanggal($po->tgl) }}</td>
        </tr>
        <tr>
            <td><strong>{{ $distributor?->nama ?? $suplayer?->nama_suplayer ?? '-' }}</strong></td>
            <td><strong>Sentosa Digital Printing</strong></td>
            <td>Mata Uang</td>
            <td>:</td>
            <td>{{ $po->mata_uang ?: 'IDR' }}</td>
        </tr>
        <tr>
            <td rowspan="1">{{ $suplayer?->alamat ?? '-' }}</td>
            <td>Jl. Laksana No. 75/73 A</td>
            <td class="right-label">Tanggal Kirim</td>
            <td>:</td>
            <td>{{ $formatTanggal($po->tgl) }}</td>
        </tr>
        <tr>
            <td>{{ $suplayer->nohp }}</td>
            <td>Medan-20125</td>
            <td class="right-label">Hal</td>
            <td>:</td>
           <td>{{ $po->hal ?: '-' }}</td>
        </tr>
        {{-- <tr>
            <td></td>
            <td></td>
            <td class="right-label">Hal</td>
            <td>:</td>
            <td>{{ $po->hal ?: '-' }}</td>
        </tr> --}}
        {{-- <tr>
            <td>{{ $distributor?->nohp ?? $suplayer?->nohp ?? '-' }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr> --}}
    </table>

    <div class="intro" style="font-weight: bold;">Mohon dikirimkan barang - barang tersebut di bawah ini :</div>

    <table class="items">
        <thead>
            <tr>
                <th style="width: 28px;">No</th>
                <th>Barang</th>
                <th style="width: 45px;">P</th>
                <th style="width: 55px;">L</th>
                <th style="width: 62px;">Qty</th>
                <th style="width: 78px;">Harga</th>
                <th style="width: 82px;">Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($po->items as $index => $item)
                @php
                    $produksi = $produksiByInvoice->get($item->invoice);
                    $satuanUkuran = $produksi?->satuan;
                    $keterangan = $produksi?->keterangan;
                    $catatan = $produksi?->pinising?->catatan ?: '-';
                    $note = $item->keterangan;
                @endphp
                <tr>
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td>{{ $item->bahan?->bahan ?? '-' }}</td>
                    <td class="text-center">{{ $formatAngka($item->tinggi, 2) }}</td>
                    <td class="text-center">{{ $formatAngka($item->lebar, 2) }} {{ $satuanUkuran }}</td>
                    <td class="text-center">{{ $formatAngka($item->qty) }} {{ $item->bahan?->satuan }}</td>
                    <td class="text-right">{{ $formatAngka($item->harga, 2) }}</td>
                    <td class="text-right">{{ $formatAngka($item->total, 2) }}</td>
                </tr>
                <tr>
                    <td colspan="7" class="finishing-cell">
                        <div class="finishing-title">Finishing Item :</div>
                        <table class="finish-wrap">
                            <tr>
                                <td style="width: 46%;">
                                    <table class="finish-table">
                                        <thead>
                                            <tr>
                                                <th style="width: 58%;"></th>
                                                <th>A</th>
                                                <th>B</th>
                                                <th>Ka</th>
                                                <th>Ki</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach ($finishingRows($produksi) as $row)
                                                <tr>
                                                    <td>{{ $row[0] }}</td>
                                                    <td class="text-center">{{ $row[1] }}</td>
                                                    <td class="text-center">{{ $row[2] }}</td>
                                                    <td class="text-center">{{ $row[3] }}</td>
                                                    <td class="text-center">{{ $row[4] }}</td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <div class="note-box">
                                        <div class="note-row">
                                            <span class="note-label">Keterangan</span> : {{ $keterangan }}
                                        </div>
                                        <div class="note-row">
                                            <span class="note-label">Catatan</span> : {{ $catatan }}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="7" class="text-center">Belum ada item</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <table class="bottom-area">
        <tr>
            <td style="width: 62%;">
                <div>
                    Batas waktu pembayaran :
                    {{-- @if ($po->pembayaran === 'CREDIT' && $po->batas_bayar)
                        {{ $formatTanggal($po->batas_bayar) }}
                    @else
                        {{ $po->pembayaran ?: '-' }}
                    @endif --}}

                    {{ $po->batas_bayar }}
                </div>
                <div style="margin-top: 8px;">Note : {{ $note }}</div>
            </td>
            <td>
                <table class="summary">
                    <tr>
                        <th>SubTotal</th>
                        <td class="text-right">{{ $formatAngka($totalHarga) }}</td>
                    </tr>
                    <tr>
                        <th>Diskon</th>
                        <td class="text-right">{{ $diskonPercent ? $formatAngka($diskonAmount) : '-' }}</td>
                    </tr>
                    <tr>
                        <th>PPN</th>
                        <td class="text-right">{{ $ppnPercent ? $formatAngka($ppnAmount) : '-' }}</td>
                    </tr>
                    <tr>
                        <th>Ongkos Kirim</th>
                        <td class="text-right">-</td>
                    </tr>
                    <tr class="grand">
                        <th>Grant Total</th>
                        <td class="text-right">{{ $formatAngka($grandTotal) }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <table class="bottom-area">
        <tr>
            <td style="width: 62%;">
                <div class="terms">
                    <div>* No PO harus dicantumkan pada setiap invoice /surat jalan</div>
                    <div>* Setelah disetujui, mohon PO ditandatangani dan di fax kembali</div>
                    <div>* PO dianggap batal jika tidak dikonfirmasi kembali dalam 1 jam</div>
                </div>
            </td>
            <td>
                <table class="sign">
                    <tr>
                        <td>Disiapkan Oleh,</td>
                        <td>Disetujui Oleh</td>
                        <td>Konfirmasi</td>
                    </tr>
                    <br />
                     <br />
                    <tr>
                        <td class="sign-name" style="height: 70px">nanda</td>
                        <td class="sign-name">nanda</td>
                        <td class="sign-name">Distributor</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
