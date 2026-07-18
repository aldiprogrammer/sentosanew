<?php

namespace App\Http\Controllers\produksi;

use App\Http\Controllers\Controller;
use App\Models\Bahanpakai;
use App\Models\Customer;
use App\Models\InvoiceProduksi;
use App\Models\Itemstokbahan;
use App\Models\PengajuanDiskon;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduksiController extends Controller
{
    public function index()
    {
        $produksi = Produksi::with('customer', 'bahan', 'pinising', 'mataAyam')
            ->where('status_finishing', 0)
            ->where('status_produksi', 1)
            ->orderBy('id', 'desc')
            ->get();
        $bahanpakaiList = Bahanpakai::get();
        $itemstokbahans = Itemstokbahan::where('qty', '>', 0)->orderBy('id')->get();

        return Inertia::render('Produksi/Produksi', compact('produksi', 'bahanpakaiList', 'itemstokbahans'));
    }

    public function dataproduksi(Request $request)
    {
        $search = $request->query('search');
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');

        $items = Produksi::with('customer', 'bahan', 'pinising', 'mataAyam')
            ->whereNull('alasan_pembatalan')
            ->when(auth()->user()->role === 'Desainer', function ($q) {
                $q->where('id_desainer', auth()->id())->whereNull('pembayaran');
            })
            ->when($search, function ($q, $search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('kode_spk', 'like', "%{$search}%")
                        ->orWhere('no_invoice', 'like', "%{$search}%")
                        ->orWhere('keterangan', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($qqq) use ($search) {
                            $qqq->where('nama', 'like', "%{$search}%");
                        })
                        ->orWhereHas('bahan', function ($qqq) use ($search) {
                            $qqq->where('bahan', 'like', "%{$search}%");
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
            ->get();

        $grouped = $items->groupBy('no_invoice')->map(function ($group) {
            return [
                'no_invoice' => $group->first()->no_invoice,
                'items' => $group->values(),
                'customer' => $group->first()->customer,
                'total_qty' => $group->sum('qty'),
                'total_harga' => $group->sum('total_harga'),
                'item_count' => $group->count(),
                'has_payment' => $group->some(fn ($item) => $item->pembayaran),
                'all_lunas' => $group->every(fn ($item) => $item->pembayaran === 'lunas'),
                'all_utang' => $group->every(fn ($item) => $item->pembayaran === 'utang'),
            ];
        })->values();

        $pengajuanDiskons = PengajuanDiskon::orderBy('id', 'desc')->get();
        $customer = Customer::all();

        return Inertia::render('Admin/Dataproduksi', [
            'produksi' => $grouped,
            'tglAwal' => $tglAwal,
            'tglAkhir' => $tglAkhir,
            'pengajuanDiskons' => $pengajuanDiskons,
            'customer' => $customer,
        ]);
    }

    public function prosesProduksi(Request $request)
    {
        $ids = $request->input('ids', []);
        $paymentType = $request->input('payment_type');
        $isApi = $request->expectsJson();

        if ($paymentType === 'utang') {
            $firstItem = Produksi::with('customer')->whereIn('id', $ids)->first();
            if ($firstItem && $firstItem->customer) {
                $customer = $firstItem->customer;
                $total = Produksi::whereIn('id', $ids)->sum('total_harga');

                if (($customer->limit_akhir + $total) > $customer->limit) {
                    $error = [
                        'errors' => ['payment' => 'Limit customer tidak mencukupi. Sisa limit: Rp '.number_format($customer->limit - $customer->limit_akhir)],
                    ];

                    return $isApi ? response()->json($error, 422) : back()->withErrors($error['errors']);
                }

                $customer->increment('limit_akhir', $total);
            }
        }

        $displayIds = Produksi::with('bahan')->whereIn('id', $ids)
            ->whereHas('bahan', fn ($q) => $q->where('jenis_bahan', 'DISPLAY'))
            ->pluck('id');

        $nonDisplayIds = array_diff($ids, $displayIds->toArray());

        $eksternal = Produksi::with('bahan')->whereIn('id', $ids)
            ->whereHas('bahan', fn ($q) => $q->where('jenis', 'EKSTERNAL'))
            ->pluck('id');

        $nonEksternal = array_diff($ids, $eksternal->toArray());

        if (! empty($nonDisplayIds) || ! empty($nonEksternal)) {
            Produksi::whereIn('id', array_merge($nonDisplayIds, $nonEksternal))->update([
                'status_produksi' => 1,
                'pembayaran' => $paymentType,
                'id_cs' => auth()->id(),
            ]);
        }

        if ($displayIds->isNotEmpty()) {
            Produksi::whereIn('id', $displayIds)->update([
                'status_produksi' => 1,
                'status_finishing' => 1,
                'status_logistik' => 1,
                'pembayaran' => $paymentType,
                'id_cs' => auth()->id(),
            ]);
        }

        if ($eksternal->isNotEmpty()) {
            Produksi::whereIn('id', $eksternal)->update([
                'status_produksi' => 1,
                'status_finishing' => 1,
                'status_logistik' => 1,
                'pembayaran' => $paymentType,
                'id_cs' => auth()->id(),
            ]);
        }

        $processedItems = Produksi::with('customer')->whereIn('id', $ids)->get();
        $groupedByInvoice = $processedItems->groupBy('no_invoice');
        foreach ($groupedByInvoice as $noInvoice => $items) {
            if (! $noInvoice) {
                continue;
            }
            $exists = InvoiceProduksi::where('no_invoice', $noInvoice)->exists();
            if (! $exists) {
                $firstItem = $items->first();
                $totalHarga = $items->sum('total_harga');
                $approvedDiskon = PengajuanDiskon::where('no_invoice', $noInvoice)
                    ->where('status', 'disetujui')
                    ->first();
                InvoiceProduksi::create([
                    'no_invoice' => $noInvoice,
                    'id_customer' => $firstItem->id_customer,
                    'customer' => $firstItem->customer->nama ?? '',
                    'harga_awal' => $totalHarga,
                    'diskon' => $approvedDiskon?->diskon,
                    'mode_diskon' => $approvedDiskon?->mode_diskon,
                    'harga_akhir' => $approvedDiskon?->harga_diskon ?? $totalHarga,
                    'tanggal' => date('Y-m-d'),
                ]);
            }
        }

        return $isApi
            ? response()->json(['message' => 'Status produksi berhasil diupdate'])
            : back()->with('success', 'Status produksi berhasil diupdate');
    }

    public function proses(Request $request, $id)
    {
        $pr = Produksi::find($id);
        if ($pr->status_finishing == 1) {
            $pr->status_finishing = 0;
        } else {
            $pr->status_finishing = 1;
        }
        $pr->sisa_putih_panjang = $request->sisa_putih_panjang;
        $pr->sisa_putih_lebar = $request->sisa_putih_lebar;
        $pr->sisa_putih_total = $request->sisa_putih_total;
        $pr->kode_bahanpakai = $request->kode_bahanpakai;
        $pr->update();

        if ($request->id_item_stok) {
            $stok = Itemstokbahan::find($request->id_item_stok);

            if ($stok && $request->total_all) {
                $stok->total = max(0, (float) $stok->total - (float) $request->total_all);
                if ((float) $stok->total == 0) {
                    $stok->qty = 0;
                }
                $stok->save();
            }
        }

        if ($request->kode_bahanpakai && $request->total_all) {
            $bahan = Bahanpakai::where('kode_bahan', $request->kode_bahanpakai)->first();
            if ($bahan) {
                $totalAll = (float) $request->total_all;
                $currentStok = (float) ($bahan->total_stok ?? 0);
                $bahan->total_stok = max(0, $currentStok - $totalAll);
                $bahan->save();
            }
        }

        return back()->with('success', 'Finishing berhasil diproses');
    }
}
