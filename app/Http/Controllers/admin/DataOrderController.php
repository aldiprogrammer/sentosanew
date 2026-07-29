<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Desain;
use App\Models\InvoiceDesain;
use App\Models\InvoiceProduksi;
use App\Models\Pengguna;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataOrderController extends Controller
{
    public function index(Request $request)
    {
        $searchDesain = $request->query('search_desain');
        $searchProduksi = $request->query('search_produksi');
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');

        $desain = Desain::with('customer', 'kategoridesain', 'desainer', 'cs')
            ->whereNull('alasan_pembatalan')
            ->when(auth()->user()->role === 'Desainer', function ($q) {
                $q->where('id_desain', auth()->id());
            })
            ->when($searchDesain, function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('no_invoice', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($q) use ($search) {
                            $q->where('nama', 'like', "%{$search}%");
                        });
                });
            })
            ->when($tglAwal, function ($q, $tglAwal) {
                $q->where('tanggal', '>=', $tglAwal);
            })
            ->when($tglAkhir, function ($q, $tglAkhir) {
                $q->where('tanggal', '<=', $tglAkhir);
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        $produksi = Produksi::with('customer', 'bahan', 'cs')
            ->whereNull('alasan_pembatalan')
            ->when(auth()->user()->role === 'Desainer', function ($q) {
                $q->where('id_desainer', auth()->id());
            })
            ->when($searchProduksi, function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('no_invoice', 'like', "%{$search}%")
                        ->orWhere('kode_spk', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($q) use ($search) {
                            $q->where('nama', 'like', "%{$search}%");
                        });
                });
            })
            ->when($tglAwal, function ($q, $tglAwal) {
                $q->where('tanggal', '>=', $tglAwal);
            })
            ->when($tglAkhir, function ($q, $tglAkhir) {
                $q->where('tanggal', '<=', $tglAkhir);
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        $produksiInvoiceNos = collect($produksi->items())->pluck('no_invoice')->filter()->unique()->values();
        $invoiceProduksiData = InvoiceProduksi::whereIn('no_invoice', $produksiInvoiceNos)->get()->keyBy('no_invoice');
        $produksiInvoiceTotals = Produksi::whereIn('no_invoice', $produksiInvoiceNos)
            ->whereNull('alasan_pembatalan')
            ->groupBy('no_invoice')
            ->selectRaw('no_invoice, SUM(total_harga) as total')
            ->pluck('total', 'no_invoice');

        $desainInvoiceNos = collect($desain->items())->pluck('no_invoice')->filter()->unique()->values();
        $invoiceDesainData = InvoiceDesain::whereIn('no_invoice', $desainInvoiceNos)->get()->keyBy('no_invoice');
        $desainInvoiceTotals = Desain::whereIn('no_invoice', $desainInvoiceNos)
            ->whereNull('alasan_pembatalan')
            ->groupBy('no_invoice')
            ->selectRaw('no_invoice, SUM(total_harga) as total')
            ->pluck('total', 'no_invoice');

        $penggunas = Pengguna::select('id', 'username', 'role')->orderBy('username')->get();

        return Inertia::render('Admin/DataOrder', compact('desain', 'produksi', 'penggunas', 'tglAwal', 'tglAkhir', 'searchDesain', 'searchProduksi', 'invoiceProduksiData', 'produksiInvoiceTotals', 'invoiceDesainData', 'desainInvoiceTotals'));
    }

    public function produksiByInvoice($noInvoice)
    {
        $items = Produksi::with('customer', 'bahan')
            ->where('no_invoice', $noInvoice)
            ->whereNull('alasan_pembatalan')
            ->orderBy('id')
            ->get();

        return response()->json($items);
    }

    public function updateProduksiPayment(Request $request, $id)
    {
        $request->validate([
            'pembayaran' => 'required|in:lunas,utang,transfer,qris',
            'id_cs' => 'nullable|exists:App\Models\Pengguna,id',
            'keterangan' => 'nullable|string',
        ]);

        $produksi = Produksi::findOrFail($id);
        $produksi->pembayaran = $request->pembayaran;
        if ($request->has('id_cs')) {
            $produksi->id_cs = $request->id_cs;
        }
        if ($request->has('keterangan')) {
            $produksi->keterangan = $request->keterangan;
        }
        $produksi->save();

        return redirect()->back()->with('success', 'Pembayaran produksi berhasil diperbarui');
    }

    public function desainByInvoice($noInvoice)
    {
        $items = Desain::with('customer', 'kategoridesain', 'desainer')
            ->where('no_invoice', $noInvoice)
            ->whereNull('alasan_pembatalan')
            ->orderBy('id')
            ->get();

        return response()->json($items);
    }

    public function updateDesainPayment(Request $request, $id)
    {
        $request->validate([
            'pembayaran' => 'required|in:lunas,utang,transfer,qris',
            'id_cs' => 'nullable|exists:App\Models\Pengguna,id',
        ]);

        $desain = Desain::findOrFail($id);
        $desain->pembayaran = $request->pembayaran;
        if ($request->has('id_cs')) {
            $desain->id_cs = $request->id_cs;
        }
        $desain->save();

        return redirect()->back()->with('success', 'Pembayaran desain berhasil diperbarui');
    }
}
