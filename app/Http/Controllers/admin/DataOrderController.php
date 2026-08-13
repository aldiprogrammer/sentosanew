<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Desain;
use App\Models\InvoiceDesain;
use App\Models\InvoiceProduksi;
use App\Models\PengajuanDiskon;
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

    public function applyDiskon(Request $request)
    {
        $request->validate([
            'no_invoice' => 'required|string',
            'id_customer' => 'required',
            'harga_awal' => 'required|numeric|min:0',
            'mode_diskon' => 'required|in:persen,rupiah',
            'diskon' => 'required|numeric|min:0',
        ]);

        $customer = Customer::find($request->id_customer);
        $hargaAwal = (float) $request->harga_awal;
        $modeDiskon = $request->mode_diskon;
        $diskonVal = (float) $request->diskon;
        $hargaDiskon = $this->hitungHargaDiskon($hargaAwal, $modeDiskon, $diskonVal);

        $dataPengajuan = [
            'id_customer' => $request->id_customer,
            'customer' => $customer->nama ?? '',
            'harga_awal' => $hargaAwal,
            'mode_diskon' => $modeDiskon,
            'diskon' => $diskonVal,
            'harga_diskon' => $hargaDiskon,
            'status' => 'disetujui',
            'tanggal' => date('Y-m-d'),
        ];

        $pengajuan = PengajuanDiskon::where('no_invoice', $request->no_invoice)
            ->where('jenis', 'produksi')
            ->first();
        if ($pengajuan) {
            $pengajuan->update($dataPengajuan);
        } else {
            PengajuanDiskon::create($dataPengajuan + ['no_invoice' => $request->no_invoice, 'jenis' => 'produksi']);
        }

        $invoice = InvoiceProduksi::firstOrNew(['no_invoice' => $request->no_invoice]);
        $invoice->id_customer = $request->id_customer;
        $invoice->customer = $customer->nama ?? '';
        $invoice->harga_awal = $hargaAwal;
        $invoice->mode_diskon = $modeDiskon;
        $invoice->diskon = $diskonVal;
        $invoice->minimum_faktur = (float) ($invoice->minimum_faktur ?? 0);
        $invoice->harga_akhir = $hargaDiskon + (float) $invoice->minimum_faktur;
        $invoice->tanggal = date('Y-m-d');
        $invoice->save();

        return redirect()->back()->with('success', 'Diskon berhasil diterapkan ke invoice produksi');
    }

    public function applyMinimumFaktur(Request $request)
    {
        $request->validate([
            'no_invoice' => 'required|string',
            'id_customer' => 'required',
            'minimum_faktur' => 'required|numeric|min:0',
        ]);

        $customer = Customer::find($request->id_customer);
        $minimumFaktur = (float) $request->minimum_faktur;

        $invoice = InvoiceProduksi::firstOrNew(['no_invoice' => $request->no_invoice]);
        $approvedDiskon = PengajuanDiskon::where('no_invoice', $request->no_invoice)
            ->where('jenis', 'produksi')
            ->where('status', 'disetujui')
            ->first();

        if ($invoice->exists) {
            $hargaAwal = (float) ($invoice->harga_awal ?? 0);
            $baseHarga = (float) ($approvedDiskon?->harga_diskon ?? $hargaAwal);
        } else {
            $hargaAwal = (float) Produksi::where('no_invoice', $request->no_invoice)
                ->whereNull('alasan_pembatalan')
                ->sum('total_harga');
            $baseHarga = (float) ($approvedDiskon?->harga_diskon ?? $hargaAwal);
        }

        $invoice->id_customer = $request->id_customer;
        $invoice->customer = $customer->nama ?? '';
        $invoice->harga_awal = $hargaAwal;
        $invoice->minimum_faktur = $minimumFaktur;
        $invoice->harga_akhir = $baseHarga + $minimumFaktur;
        $invoice->tanggal = date('Y-m-d');
        $invoice->save();

        return redirect()->back()->with('success', 'Minimum harga berhasil diterapkan ke invoice produksi');
    }

    private function hitungHargaDiskon(float $hargaAwal, string $modeDiskon, float $diskon): float
    {
        if ($modeDiskon === 'persen') {
            $hargaDiskon = $hargaAwal - ($hargaAwal * $diskon / 100);
        } else {
            $hargaDiskon = $hargaAwal - $diskon;
        }

        return max(0, $hargaDiskon);
    }

    public function cancelDiskon($noInvoice)
    {
        $invoice = InvoiceProduksi::where('no_invoice', $noInvoice)->first();
        if (! $invoice) {
            return redirect()->back()->with('error', 'Invoice tidak ditemukan');
        }

        PengajuanDiskon::where('no_invoice', $noInvoice)
            ->where('jenis', 'produksi')
            ->where('status', 'disetujui')
            ->update(['status' => 'ditolak']);

        $invoice->diskon = null;
        $invoice->mode_diskon = 'persen';
        $invoice->harga_akhir = (float) $invoice->harga_awal + (float) ($invoice->minimum_faktur ?? 0);
        $invoice->save();

        return redirect()->back()->with('success', 'Diskon berhasil dibatalkan, total kembali semula');
    }

    public function cancelMinimumFaktur($noInvoice)
    {
        $invoice = InvoiceProduksi::where('no_invoice', $noInvoice)->first();
        if (! $invoice) {
            return redirect()->back()->with('error', 'Invoice tidak ditemukan');
        }

        $approvedDiskon = PengajuanDiskon::where('no_invoice', $noInvoice)
            ->where('jenis', 'produksi')
            ->where('status', 'disetujui')
            ->first();

        $invoice->minimum_faktur = 0;
        $invoice->harga_akhir = (float) ($approvedDiskon?->harga_diskon ?? $invoice->harga_awal);
        $invoice->save();

        return redirect()->back()->with('success', 'Minimum harga berhasil dibatalkan, total kembali semula');
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
