<?php

namespace App\Http\Controllers\produksi;

use App\Http\Controllers\Controller;
use App\Models\Bahanpakai;
use App\Models\Itemstokbahan;
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

        $produksi = Produksi::with('customer', 'bahan', 'pinising', 'mataAyam')
            ->when(auth()->user()->role === 'Desainer', function ($q) {
                $q->where('id_desainer', auth()->id());
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
            ->paginate(10);
        $produksi->appends(['search' => $search, 'tgl_awal' => $tglAwal, 'tgl_akhir' => $tglAkhir]);

        return Inertia::render('Admin/Dataproduksi', compact('produksi', 'tglAwal', 'tglAkhir'));
    }

    public function prosesProduksi(Request $request)
    {
        $ids = $request->input('ids', []);
        $paymentType = $request->input('payment_type');

        if ($paymentType === 'utang') {
            $firstItem = Produksi::with('customer')->whereIn('id', $ids)->first();
            if ($firstItem && $firstItem->customer) {
                $customer = $firstItem->customer;
                $total = Produksi::whereIn('id', $ids)->sum('total_harga');

                if (($customer->limit_akhir + $total) > $customer->limit) {
                    return back()->withErrors([
                        'payment' => 'Limit customer tidak mencukupi. Sisa limit: Rp ' . number_format($customer->limit - $customer->limit_akhir),
                    ]);
                }

                $customer->increment('limit_akhir', $total);
            }
        }

        $displayIds = Produksi::with('bahan')->whereIn('id', $ids)
            ->whereHas('bahan', fn($q) => $q->where('jenis_bahan', 'DISPLAY'))
            ->pluck('id');

        $nonDisplayIds = array_diff($ids, $displayIds->toArray());

        $eksternal = Produksi::with('bahan')->whereIn('id', $ids)
            ->whereHas('bahan', fn($q) => $q->where('jenis', 'EKSTERNAL'))
            ->pluck('id');

        $nonEksternal = array_diff($ids, $eksternal->toArray());

        if (! empty($nonDisplayIds) || ! empty($nonEksternal)) {
            Produksi::whereIn('id', array_merge($nonDisplayIds, $nonEksternal))->update([
                'status_produksi' => 1,
                'pembayaran' => $paymentType,
            ]);
        }

        if ($displayIds->isNotEmpty()) {
            Produksi::whereIn('id', $displayIds)->update([
                'status_produksi' => 1,
                'status_finishing' => 1,
                'status_logistik' => 1,
                'pembayaran' => $paymentType,
            ]);
        }

        if ($eksternal->isNotEmpty()) {
            Produksi::whereIn('id', $eksternal)->update([
                'status_produksi' => 1,
                'status_finishing' => 1,
                'status_logistik' => 1,
                'pembayaran' => $paymentType,
            ]);
        }

        return back()->with('success', 'Status produksi berhasil diupdate');
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
