<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>Label Bahan {{ $po->no_po }}</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 10mm;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 8px;
            color: #000;
        }
        .page-wrap {
            width: 190mm;
            margin: 0 auto;
        }
        table.grid {
            border-collapse: separate;
            border-spacing: 5mm;
            width: 170mm;
            margin: 0 auto;
        }
        table.grid td {
            width: 80mm;
            height: 40mm;
            border: 2px solid #000;
            padding: 3mm 4mm;
            vertical-align: top;
            border-radius: 1mm;
        }
        .label-header {
            font-size: 8px;
            color: #888;
            letter-spacing: 0.3px;
            text-transform: uppercase;
            border-bottom: 1px dashed #ccc;
            padding-bottom: 2px;
            margin-bottom: 3px;
        }
        .label-code {
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 0.5px;
            color: #1a1a1a;
            margin: 4px 0 3px;
        }
        .label-desc {
            font-size: 10px;
            line-height: 1.4;
            color: #333;
            word-wrap: break-word;
            max-height: 16mm;
            overflow: hidden;
        }
        .label-footer {
            font-size: 7px;
            color: #aaa;
            text-align: right;
            margin-top: 3px;
            border-top: 1px dashed #eee;
            padding-top: 2px;
        }
    </style>
</head>
<body>
    @php
        $cols = 2;
        $rowsPerPage = 6;
        $labelsPerPage = $cols * $rowsPerPage;
        $allLabels = [];
        $localSeq = $labelStart ?? [];
    @endphp

    @foreach ($po->items as $item)
        @php
            if (!$item->bahan) continue;

            $qty = (int) round((float) ($item->qty ?? 0));
            $kodeBahan = $item->bahan->kode_bahan;
            $keterangan = $item->bahan->keterangan ?? '-';
            if (!isset($localSeq[$kodeBahan])) {
                $localSeq[$kodeBahan] = 1;
            }
        @endphp
        @for ($i = 0; $i < $qty; $i++)
            @php
                $seq = $localSeq[$kodeBahan]++;
                $kodeLabel = 'LB-' . $kodeBahan . '-' . str_pad($seq, 3, '0', STR_PAD_LEFT);
                $allLabels[] = [
                    'kodeLabel' => $kodeLabel,
                    'kodeBahan' => $kodeBahan,
                    'keterangan' => $keterangan,
                    'no' => $seq,
                    'qty' => $qty,
                ];
            @endphp
        @endfor
    @endforeach

    @php $total = count($allLabels); @endphp
    @for ($idx = 0; $idx < $total; $idx += $labelsPerPage)
        @php $pageLabels = array_slice($allLabels, $idx, $labelsPerPage); @endphp
        <table class="grid">
            @for ($r = 0; $r < (int) ceil(count($pageLabels) / $cols); $r++)
                <tr>
                    @for ($c = 0; $c < $cols; $c++)
                        @php $li = $r * $cols + $c; @endphp
                        @if (isset($pageLabels[$li]))
                            @php $lb = $pageLabels[$li]; @endphp
                            <td>
                                <div class="label-header" style="font-size: 20px">{{ $po->no_po }} | {{ $lb['kodeLabel'] }}</div>
                                <div class="label-code">{{ $lb['kodeBahan'] }}</div>
                                <div class="label-desc">{{ $lb['keterangan'] }}</div>
                                <div class="label-footer">#{{ $lb['no'] }}/{{ $lb['qty'] }}</div>
                                 <div style="font-weight: bold; font-style:italic">Dicetak pada : {{ date('Y-m-d') }}</div>
                            </td>
                        @else
                            <td style="border: none;"></td>
                        @endif
                    @endfor
                </tr>
            @endfor
        </table>
        @if ($idx + $labelsPerPage < $total)
            <div style="page-break-before: always;"></div>
        @endif
    @endfor
</body>
</html>
