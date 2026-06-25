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
    function index()
    {
        $produksi = Produksi::with('customer', 'bahan', 'pinising', 'mataAyam')
            ->where('status_logistik', 1)
            ->where('status_selesai', 0)
            ->orderBy('id', 'desc')
            ->get();
        $kurir = Kurir::all();
        $bahanpakaiList = Bahanpakai::get();
        $itemstokbahans = Itemstokbahan::where('qty', '>', 0)->orderBy('id')->get();
        return Inertia::render('Produksi/Logistik', compact('produksi', 'kurir', 'bahanpakaiList', 'itemstokbahans'));
    }

    function proses(Request $request, $id)
    {
        $pr = Produksi::find($id);

        if ($request->kode_bahanpakai) {
            $pr->kode_bahanpakai = $request->kode_bahanpakai;
        }
        $pr->status_selesai = 1;
        $pr->update();

        if ($request->id_item_stoks && $request->total_all) {
            $ids = $request->id_item_stoks;
            $perItem = (float) $request->total_all / max(count($ids), 1);
            foreach ($ids as $itemStokId) {
                $stok = Itemstokbahan::find($itemStokId);
                if ($stok) {
                    $stok->luas = max(0, (float) $stok->luas - $perItem);
                    if ((float) $stok->luas == 0) $stok->qty = 0;
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
}
