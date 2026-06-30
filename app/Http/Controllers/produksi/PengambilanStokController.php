<?php

namespace App\Http\Controllers\produksi;

use App\Http\Controllers\Controller;
use App\Models\Bahanpakai;
use App\Models\Itemstokbahan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengambilanStokController extends Controller
{
    public function index()
    {
        $itemstokbahans = Itemstokbahan::where('qty', '>', 0)
            ->orderBy('id', 'desc')
            ->get();
        $bahanpakaiList = Bahanpakai::get();

        return Inertia::render('Produksi/PengambilanStok', compact('itemstokbahans', 'bahanpakaiList'));
    }

    public function proses(Request $request, $id)
    {
        $stok = Itemstokbahan::find($id);
        if (! $stok) {
            return back()->with('error', 'Stok tidak ditemukan');
        }

        $request->validate([
            'ambil_luas' => 'required|numeric|min:0',
            'keterangan' => 'nullable|string',
        ]);

        $ambilLuas = (float) $request->ambil_luas;
        $sisa = (float) $stok->luas - $ambilLuas;

        if ($ambilLuas <= 0) {
            return back()->with('error', 'Jumlah luas yang diambil harus lebih dari 0');
        }

        if ($sisa < 0) {
            return back()->with('error', 'Sisa stok tidak mencukupi');
        }

        $stok->luas = max(0, $sisa);
        if ((float) $stok->luas == 0) {
            $stok->qty = 0;
        }

        if ($request->keterangan) {
            $stok->keterangan = $request->keterangan;
        }

        $stok->save();

        if ($request->kode_bahanpakai && $request->total_all) {
            $bahan = Bahanpakai::where('kode_bahan', $request->kode_bahanpakai)->first();
            if ($bahan) {
                $totalAll = (float) $request->total_all;
                $currentStok = (float) ($bahan->total_stok ?? 0);
                $bahan->total_stok = max(0, $currentStok - $totalAll);
                $bahan->save();
            }
        }

        return back()->with('success', 'Stok berhasil diambil');
    }
}
