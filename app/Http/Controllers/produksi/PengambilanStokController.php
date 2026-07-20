<?php

namespace App\Http\Controllers\produksi;

use App\Http\Controllers\Controller;
use App\Models\Bahanpakai;
use App\Models\Databahan;
use App\Models\Itemstokbahan;
use App\Models\Materbahan;
use App\Models\PengambilanStok;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengambilanStokController extends Controller
{
    public function index()
    {
        $bahanpakaiList = Bahanpakai::get();
        $itemstokbahans = Itemstokbahan::where('qty', '>', 0)->orderBy('id')->get();
        $riwayat = PengambilanStok::with('user', 'bahanPakai')->orderBy('id', 'desc')->limit(5)->get();

        return Inertia::render('Produksi/PengambilanStok', compact('bahanpakaiList', 'itemstokbahans', 'riwayat'));
    }

    public function proses(Request $request)
    {
        $request->validate([
            'kode_bahan_pakai' => 'required|string',
            'item_stok_ids' => 'required|array|min:1',
            'item_stok_ids.*' => 'integer|exists:itemstokbahans,id',
            'total_qty' => 'required|numeric|min:0.01',
            'keterangan' => 'nullable|string',
        ]);

        $remainingNeed = (float) $request->total_qty;
        $itemStokData = [];

        foreach ($request->item_stok_ids as $stokId) {
            if ($remainingNeed <= 0) {
                break;
            }

            $stok = Itemstokbahan::find($stokId);
            if (! $stok) {
                continue;
            }

            $take = min((float) $stok->total, $remainingNeed);
            $stok->total = max(0, (float) $stok->total - $take);
            if ((float) $stok->total == 0) {
                $stok->qty = 0;
            }
            $stok->save();

            $itemStokData[] = [
                'id' => $stok->id,
                'kode_label' => $stok->kode_label,
                'qty' => $take,
            ];

            $remainingNeed -= $take;
        }

        PengambilanStok::create([
            'kode_bahan_pakai' => $request->kode_bahan_pakai,
            'item_stok_data' => $itemStokData,
            'total_qty' => (string) $request->total_qty,
            'user_id' => auth()->id(),
            'keterangan' => $request->keterangan,
        ]);

        $bahan = Bahanpakai::where('kode_bahan', $request->kode_bahan_pakai)->first();
        if ($bahan) {
            $bahan->total_stok = max(0, (float) ($bahan->total_stok ?? 0) - (float) $request->total_qty);
            $bahan->save();
        }

        return back()->with('success', 'Stok berhasil diambil');
    }

    public function riwayat(Request $request)
    {
        $search = $request->query('search');
        $riwayat = PengambilanStok::with('user', 'bahanPakai')
            ->when($search, function ($q, $search) {
                $q->where('kode_bahan_pakai', 'like', "%{$search}%")
                    ->orWhere('keterangan', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($qq) use ($search) {
                        $qq->where('username', 'like', "%{$search}%");
                    });
            })
            ->orderBy('id', 'desc')
            ->paginate(20);
        $riwayat->appends(['search' => $search]);

        return Inertia::render('Produksi/RiwayatPengambilanStok', compact('riwayat', 'search'));
    }

    public function riwayatPemakaian(Request $request)
    {
        $masterBahan = Materbahan::orderBy('kode_bahan_jual')->get()->map(function ($m) {
            $m->total_stok = Bahanpakai::whereRaw('JSON_CONTAINS(id_master_bahan, \'["'.$m->kode_bahan_jual.'"]\')')
                ->sum('total_stok');

            return $m;
        });
        $kode = $request->query('kode');

        $produksi = collect();
        $totalProduksi = 0;
        $totalStok = 0;

        if ($kode) {
            $databahanIds = Databahan::where('kode', $kode)->pluck('id');
            $produksi = Produksi::with('customer', 'bahan')
                ->whereIn('id_bahan', $databahanIds)
                ->orderBy('id', 'desc')
                ->paginate(20);
            $produksi->appends(['kode' => $kode]);

            $totalProduksi = Produksi::whereIn('id_bahan', $databahanIds)->count();

            $totalStok = Bahanpakai::whereRaw('JSON_CONTAINS(id_master_bahan, \'["'.$kode.'"]\')')
                ->sum('total_stok');
        }

        return Inertia::render('Produksi/RiwayatPemakaianBahan', compact('masterBahan', 'produksi', 'kode', 'totalProduksi', 'totalStok'));
    }
}
