<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Otorisasi;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OtorisasiController extends Controller
{
    public function index()
    {
        $otorisasi = Otorisasi::with('customer')->get();

        return Inertia::render('Admin/Otorisasi', compact('otorisasi'));
    }

    public function cariSpk($kode_spk)
    {
        $produksi = Produksi::with('customer')
            ->where('kode_spk', $kode_spk)
            ->first();

        if (!$produksi) {
            return response()->json(null);
        }

        return response()->json([
            'id_customer' => $produksi->id_customer,
            'nama'        => $produksi->customer?->nama,
            'no_hp'       => $produksi->customer?->no_hp,
            'total_harga' => $produksi->total_harga,
        ]);
    }

    public function store(Request $request)
    {
        $cs = new Otorisasi;
        $cs->kode_spk = $request->kode_spk;
        $cs->id_customer = $request->id_customer;
        $cs->tanggal_pengajuan = now()->format('Y-m-d');
        $cs->save();

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $cs = Otorisasi::find($id);
        $cs->kode_spk = $request->kode_spk;
        $cs->id_customer = $request->id_customer;
        if ($request->filled('tanggal_disetujui')) {
            $cs->tanggal_disetujui = $request->tanggal_disetujui;
        }
        $cs->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function proses($id)
    {
        $cs = Otorisasi::find($id);
        $cs->status = 1;
        $cs->tanggal_disetujui = now()->format('Y-m-d');
        $cs->update();

        Produksi::where('kode_spk', $cs->kode_spk)
            ->update(['otorisasi' => 1, 'status_produksi' => 1]);

        return redirect()->back()->with('success', 'Otorisasi disetujui');
    }

    public function delete($id)
    {
        $cs = Otorisasi::find($id);
        $cs->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
