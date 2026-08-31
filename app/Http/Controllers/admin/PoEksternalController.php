<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Bahan;
use App\Models\Databahan;
use App\Models\Distributor;
use App\Models\ListPoEksternal;
use App\Models\PoEksternal;
use App\Models\Produksi;
use App\Models\Suplayer;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PoEksternalController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $poEksternal = PoEksternal::with('suplayer', 'bahan', 'items.produksi.customer')
            ->when($search, function ($q, $search) {
                $q->where('no_po', 'like', "%{$search}%")
                    ->orWhereHas('suplayer', function ($sq) use ($search) {
                        $sq->where('nama_suplayer', 'like', "%{$search}%");
                    });
            })
            ->orderBy('id', 'desc')
            ->paginate(10);

        $poEksternal->getCollection()->transform(function ($po) {
            $customerNames = $po->items
                ->pluck('produksi.customer.nama')
                ->filter()
                ->unique()
                ->values()
                ->implode(', ');
            $po->customer_names = $customerNames ?: '-';
            return $po;
        });
        $poEksternal->appends(['search' => $search]);

        $prefix = 'PO-'.date('ym').'-';
        $last = PoEksternal::where('no_po', 'like', $prefix.'%')->orderBy('no_po', 'desc')->first();
        $no_po = $prefix.str_pad($last ? ((int) substr($last->no_po, -4)) + 1 : 1, 4, '0', STR_PAD_LEFT);
        $bahans = Bahan::orderBy('bahan')->get(['id', 'kode', 'bahan', 'satuan', 'harga_po']);
        $suplayers = Suplayer::orderBy('nama_suplayer')
            ->get(['id', 'kode', 'nama_suplayer', 'jatuh_tempo']);
        $distributors = Distributor::orderBy('nama')->get(['id', 'kode', 'nama']);

        return Inertia::render('Admin/PoEksternal', compact('poEksternal', 'no_po', 'bahans', 'suplayers', 'distributors'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'tgl' => 'required|date',
            'no_po' => 'nullable|string|max:30',
            'hal' => 'nullable|string|max:200',
            'id_distributor' => 'nullable|exists:distributors,id',
            'mata_uang' => 'nullable|string|max:10',
            'batas_bayar' => 'nullable|date',
            'pembayaran' => 'nullable|in:CASH,CREDIT',
            'id_suplayer' => 'nullable|exists:suplayers,id',
            // 'invoice' => 'nullable|string|max:100',
            // 'id_bahan' => 'nullable|exists:bahans,id',
            // 'spk' => 'nullable|string|max:100',
            // 'tinggi' => 'nullable|numeric',
            // 'lebar' => 'nullable|numeric',
            // 'luas' => 'nullable|numeric',
            // 'qty' => 'nullable|numeric',
            // 'harga' => 'nullable|numeric',
            // 'total' => 'nullable|numeric',
            // 'keterangan' => 'nullable|string',
        ]);

        $no_po = $data['no_po'] ?? null;
        if (! $no_po) {
            $prefix = 'PO-'.date('ym').'-';
            $last = PoEksternal::where('no_po', 'like', $prefix.'%')->orderBy('no_po', 'desc')->first();
            $no_po = $prefix.str_pad($last ? ((int) substr($last->no_po, -4)) + 1 : 1, 4, '0', STR_PAD_LEFT);
        }

        $po = new PoEksternal;
        $po->tgl = $data['tgl'];
        $po->no_po = $no_po;
        $po->hal = $data['hal'];
        $po->id_distributor = $data['id_distributor'] ?: null;
        $po->mata_uang = $data['mata_uang'];
        $po->batas_bayar = $data['batas_bayar'];
        $po->pembayaran = $data['pembayaran'];
        $po->id_suplayer = $data['id_suplayer'] ?: null;
        // $po->invoice = $data['invoice'];
        // $po->id_bahan = $data['id_bahan'] ?: null;
        // $po->spk = $data['spk'];
        // $po->tinggi = $data['tinggi'] ?: 0;
        // $po->lebar = $data['lebar'] ?: 0;
        // $po->luas = $data['luas'] ?: 0;
        // $po->qty = $data['qty'] ?: 0;
        // $po->harga = $data['harga'] ?: 0;
        // $po->total = $data['total'] ?: 0;
        // $po->keterangan = $data['keterangan'];
        $po->save();

        return redirect()->back()->with('success', 'PO Eksternal berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $po = PoEksternal::findOrFail($id);

        $data = $request->validate([
            'tgl' => 'required|date',
            'no_po' => 'required|string|max:30',
            'hal' => 'nullable|string|max:200',
            'id_distributor' => 'nullable|exists:distributors,id',
            'mata_uang' => 'nullable|string|max:10',
            'batas_bayar' => 'nullable|date',
            'pembayaran' => 'nullable|in:CASH,CREDIT',
            'id_suplayer' => 'nullable|exists:suplayers,id',
            // 'invoice' => 'nullable|string|max:100',
            // 'id_bahan' => 'nullable|exists:bahans,id',
            // 'spk' => 'nullable|string|max:100',
            // 'tinggi' => 'nullable|numeric',
            // 'lebar' => 'nullable|numeric',
            // 'luas' => 'nullable|numeric',
            // 'qty' => 'nullable|numeric',
            // 'harga' => 'nullable|numeric',
            // 'total' => 'nullable|numeric',
            // 'keterangan' => 'nullable|string',
        ]);

        $po->tgl = $data['tgl'];
        $po->no_po = $data['no_po'];
        $po->hal = $data['hal'];
        $po->id_distributor = $data['id_distributor'] ?: null;
        $po->mata_uang = $data['mata_uang'];
        $po->batas_bayar = $data['batas_bayar'];
        $po->pembayaran = $data['pembayaran'];
        $po->id_suplayer = $data['id_suplayer'] ?: null;
        // $po->invoice = $data['invoice'];
        // $po->id_bahan = $data['id_bahan'] ?: null;
        // $po->spk = $data['spk'];
        // $po->tinggi = $data['tinggi'] ?: 0;
        // $po->lebar = $data['lebar'] ?: 0;
        // $po->luas = $data['luas'] ?: 0;
        // $po->qty = $data['qty'] ?: 0;
        // $po->harga = $data['harga'] ?: 0;
        // $po->total = $data['total'] ?: 0;
        // $po->keterangan = $data['keterangan'];
        $po->update();

        return redirect()->back()->with('success', 'PO Eksternal berhasil diubah');
    }

    public function delete($id)
    {
        $po = PoEksternal::findOrFail($id);
        $po->delete();

        return redirect()->back()->with('success', 'PO Eksternal berhasil dihapus');
    }

    public function cariInvoice(Request $request)
    {
        $invoice = $request->query('invoice');
        if (! $invoice) {
            return response()->json(['data' => null]);
        }

        $pr = Produksi::with('bahan')
            ->where('no_invoice', $invoice)
            ->orderBy('id', 'desc')
            ->first();

        if (! $pr) {
            return response()->json(['data' => null]);
        }

        return response()->json([
            'data' => [
                'id_bahan' => $pr->id_bahan,
                'bahan_kode' => $pr->bahan?->kode,
                'bahan_nama' => $pr->bahan?->bahan,
                'kode_spk' => $pr->kode_spk,
                'lebar' => round($pr->lebar),
                'tinggi' => round($pr->tinggi),
                'harga' => round($pr->harga_bahan),
                'harga_po' => $pr->bahan?->harga_po,
                'qty' => round($pr->qty),
                'satuan' => $pr->satuan,
            ],
        ]);
    }

    public function detail($id)
    {
        $po = PoEksternal::with('suplayer', 'distributor', 'items.bahan')->findOrFail($id);

        $totalHarga = ListPoEksternal::where('po_eksternal_id', $po->id)->sum('total');
        $diskonAmount = $po->diskon_type === 'rupiah' ? (float) $po->diskon : $totalHarga * ((float) $po->diskon / 100);
        $ppnAmount = $totalHarga * ((float) $po->ppn / 100);
        $po->total_harga = $totalHarga;
        $po->sub_total = $totalHarga - $diskonAmount + $ppnAmount;
        $po->update();

        $bahans = Databahan::with(['hargaBahan' => function ($q) {
            $q->orderBy('qty_min')->orderBy('id');
        }])
            ->orderBy('bahan')
            ->get([
                'id',
                'kode',
                'bahan',
                'satuan',
                'jenis',
                'cara_perhitungan',
            ]);

        $invoices = Produksi::with('bahan', 'pinising', 'mataAyam', 'customer')
            ->whereHas('bahan', fn ($q) => $q->whereRaw('LOWER(jenis) = ?', ['eksternal']))
            ->whereNotNull('no_invoice')
            ->orderBy('no_invoice')
            ->get(['id', 'no_invoice', 'id_bahan', 'id_customer', 'kode_spk', 'lebar', 'tinggi', 'qty', 'harga_bahan', 'satuan', 'sisi', 'catatan', 'keterangan', 'sisa_putih_panjang', 'sisa_putih_lebar', 'sisa_putih_total']);

        return Inertia::render('Admin/PoEksternalDetail', compact('po', 'bahans', 'invoices'));
    }

    public function pdf($id)
    {
        $po = PoEksternal::with('suplayer', 'distributor', 'items.bahan')->findOrFail($id);

        $totalHarga = ListPoEksternal::where('po_eksternal_id', $po->id)->sum('total');
        $diskonAmount = $po->diskon_type === 'rupiah' ? (float) $po->diskon : $totalHarga * ((float) $po->diskon / 100);
        $ppnAmount = $totalHarga * ((float) $po->ppn / 100);
        $po->total_harga = $totalHarga;
        $po->sub_total = $totalHarga - $diskonAmount + $ppnAmount;

        $produksiByInvoice = Produksi::with('bahan', 'pinising', 'mataAyam')
            ->whereIn('no_invoice', $po->items->pluck('invoice')->filter()->values())
            ->get()
            ->keyBy('no_invoice');

        $produksiBySpk = Produksi::whereIn('kode_spk', $po->items->pluck('spk')->filter()->values())
            ->get()
            ->keyBy('kode_spk');

        $user = auth()->user();

        $pdf = Pdf::loadView('pdf.po-eksternal', [
            'po' => $po,
            'produksiByInvoice' => $produksiByInvoice,
            'produksiBySpk' => $produksiBySpk,
            'totalHarga' => $totalHarga,
            'diskonAmount' => $diskonAmount,
            'ppnAmount' => $ppnAmount,
            'grandTotal' => $po->sub_total,
            'dibuatOleh' => $user?->username ?: $user?->name ?: 'Admin',
        ])->setPaper('a4', 'portrait');

        return $pdf->stream('po_eksternal_'.$po->no_po.'.pdf');
    }

    public function storeItem(Request $request, $id)
    {
        $po = PoEksternal::findOrFail($id);

        $data = $request->validate([
            'invoice' => 'nullable|string|max:100',
            'id_bahan' => 'nullable|exists:databahans,id',
            'spk' => 'nullable|string|max:100',
            'tinggi' => 'nullable|numeric',
            'lebar' => 'nullable|numeric',
            'luas' => 'nullable|numeric',
            'satuan' => 'nullable|string|max:30',
            'qty' => 'nullable|numeric',
            'harga' => 'nullable|numeric',
            'total' => 'nullable|numeric',
            'keterangan' => 'nullable|string',
        ]);
        $bahan = $data['id_bahan'] ? Databahan::find($data['id_bahan']) : null;

        $item = new ListPoEksternal;
        $item->po_eksternal_id = $po->id;
        $item->invoice = $data['invoice'];
        $item->id_bahan = $data['id_bahan'] ?: null;
        $item->spk = $data['spk'];
        $item->satuan = $bahan?->satuan;
        $item->tinggi = round($data['tinggi'] ?? 0);
        $item->lebar = round($data['lebar'] ?? 0);
        $item->luas = round($data['luas'] ?? 0);
        $item->qty = round($data['qty'] ?? 0);
        $item->harga = round($data['harga'] ?? 0);
        $item->total = $this->hitungTotalItem($bahan, $item->luas, $item->qty, $item->harga);
        $item->keterangan = $data['keterangan'];
        $item->save();

        $this->recalculateTotalHarga($po->id);

        return redirect()->back()->with('success', 'Item berhasil ditambah');
    }

    public function updateItem(Request $request, $id)
    {
        $item = ListPoEksternal::findOrFail($id);

        $data = $request->validate([
            'invoice' => 'nullable|string|max:100',
            'id_bahan' => 'nullable|exists:databahans,id',
            'spk' => 'nullable|string|max:100',
            'tinggi' => 'nullable|numeric',
            'lebar' => 'nullable|numeric',
            'luas' => 'nullable|numeric',
            'satuan' => 'nullable|string|max:30',
            'qty' => 'nullable|numeric',
            'harga' => 'nullable|numeric',
            'total' => 'nullable|numeric',
            'keterangan' => 'nullable|string',
        ]);
        $bahan = $data['id_bahan'] ? Databahan::find($data['id_bahan']) : null;

        $item->invoice = $data['invoice'];
        $item->id_bahan = $data['id_bahan'] ?: null;
        $item->spk = $data['spk'];
        $item->satuan = $bahan?->satuan;
        $item->tinggi = round($data['tinggi'] ?? 0);
        $item->lebar = round($data['lebar'] ?? 0);
        $item->luas = round($data['luas'] ?? 0);
        $item->qty = round($data['qty'] ?? 0);
        $item->harga = round($data['harga'] ?? 0);
        $item->total = $this->hitungTotalItem($bahan, $item->luas, $item->qty, $item->harga);
        $item->keterangan = $data['keterangan'];
        $item->update();

        $this->recalculateTotalHarga($item->po_eksternal_id);

        return redirect()->back()->with('success', 'Item berhasil diubah');
    }

    public function deleteItem($id)
    {
        $item = ListPoEksternal::findOrFail($id);
        $poId = $item->po_eksternal_id;
        $item->delete();

        $this->recalculateTotalHarga($poId);

        return redirect()->back()->with('success', 'Item berhasil dihapus');
    }

    public function updateHeader(Request $request, $id)
    {
        $po = PoEksternal::findOrFail($id);

        $data = $request->validate([
            'diskon' => 'nullable|numeric',
            'diskon_type' => 'nullable|in:persen,rupiah',
            'ppn' => 'nullable|numeric',
        ]);

        $totalHarga = ListPoEksternal::where('po_eksternal_id', $po->id)->sum('total');
        $diskon = $data['diskon'] ?? 0;
        $diskonType = $data['diskon_type'] ?? 'persen';
        $ppn = $data['ppn'] ?? 0;
        $diskonAmount = $diskonType === 'rupiah' ? $diskon : $totalHarga * ($diskon / 100);
        $ppnAmount = $totalHarga * ($ppn / 100);
        $subTotal = $totalHarga - $diskonAmount + $ppnAmount;

        $po->total_harga = $totalHarga;
        $po->diskon = $diskon;
        $po->diskon_type = $diskonType;
        $po->ppn = $ppn;
        $po->sub_total = $subTotal;
        $po->update();

        return redirect()->back()->with('success', 'Header berhasil diupdate');
    }

    private function recalculateTotalHarga($poId)
    {
        $totalHarga = ListPoEksternal::where('po_eksternal_id', $poId)->sum('total');
        $po = PoEksternal::find($poId);
        if ($po) {
            $diskonAmount = $po->diskon_type === 'rupiah' ? (float) $po->diskon : $totalHarga * ((float) $po->diskon / 100);
            $ppnAmount = $totalHarga * ((float) $po->ppn / 100);
            $po->total_harga = $totalHarga;
            $po->sub_total = $totalHarga - $diskonAmount + $ppnAmount;
            $po->update();
        }
    }

    private function hitungTotalItem(?Databahan $bahan, float|int $luas, float|int $qty, float|int $harga): int
    {
        $caraPerhitungan = strtoupper((string) $bahan?->cara_perhitungan);

        if ($caraPerhitungan === 'LUAS') {
            return round($luas * $harga);
        }

        if ($caraPerhitungan === 'QTY KHUSUS') {
            $satuan = strtoupper((string) $bahan?->satuan);

            if (in_array($satuan, ['PCS', 'QTY'])) {
                return round($qty * $harga);
            }

            return round($harga);
        }

        if ($caraPerhitungan === 'QTY2') {

            return round($qty * $harga);
        }

        return round($qty * $harga);
    }
}
