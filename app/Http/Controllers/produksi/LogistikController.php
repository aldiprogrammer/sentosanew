<?php

namespace App\Http\Controllers\produksi;

use App\Http\Controllers\Controller;
use App\Models\Bahanpakai;
use App\Models\Itemstokbahan;
use App\Models\Kurir;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogistikController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');

        $produksi = Produksi::with('customer', 'bahan', 'pinising', 'mataAyam')
            ->where('status_logistik', 1)
            ->where('status_selesai', 0)
            ->when($search, function ($q, $search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('kode_spk', 'like', "%{$search}%")
                        ->orWhere('no_invoice', 'like', "%{$search}%")
                        ->orWhere('keterangan', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($qqq) use ($search) {
                            $qqq->where('nama', 'like', "%{$search}%");
                        });
                });
            })
            ->when($tglAwal, fn ($q, $v) => $q->where('tanggal', '>=', $v))
            ->when($tglAkhir, fn ($q, $v) => $q->where('tanggal', '<=', $v))
            ->orderBy('id', 'desc')
            ->get();
        $kurir = Kurir::all();
        $bahanpakaiList = Bahanpakai::get();
        $itemstokbahans = Itemstokbahan::where('qty', '>', 0)->orderBy('id')->get();

        return Inertia::render('Produksi/Logistik', compact('produksi', 'kurir', 'bahanpakaiList', 'itemstokbahans', 'search', 'tglAwal', 'tglAkhir'));
    }

    public function proses(Request $request, $id)
    {
        $pr = Produksi::find($id);

        if ($request->kode_bahanpakai) {
            $pr->kode_bahanpakai = $request->kode_bahanpakai;
        }

        // echo $request->total_all;
        // die();
        $pr->status_selesai = 1;
        $pr->update();

        if ($request->id_item_stoks && $request->total_all) {
            $ids = $request->id_item_stoks;
            $perItem = (float) $request->total_all / max(count($ids), 1);
            foreach ($ids as $itemStokId) {
                $stok = Itemstokbahan::find($itemStokId);
                if ($stok) {
                    $stok->total = max(0, (float) $stok->total - $perItem);
                    if ((float) $stok->total == 0) {
                        $stok->qty = 0;
                    }
                    $stok->save();
                }
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

        return back()->with('success', 'Logistik berhasil diproses');
    }

    public function kembalikan($id)
    {
        $pr = Produksi::findOrFail($id);
        $pr->status_logistik = 0;
        $pr->update();

        return back()->with('success', 'Berhasil dikembalikan ke finishing');
    }
}
