<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Bahan;
use App\Models\Desain;
use App\Models\MataAyam;
use App\Models\Pinising;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduksiController extends Controller
{
    public function index()
    {
        $produksi = Produksi::with('customer', 'bahan', 'pinising', 'mataAyam')->get();
        $desain = Desain::where('status', 0)->with('customer', 'kategoridesain')->get();
        $bahan = Bahan::all();

        return Inertia::render('Admin/Produksi', compact('produksi', 'desain', 'bahan'));
    }

    public function store(Request $request)
    {
        $pr = new Produksi;
        $pr->tanggal = date('Y-m-d');
        $pr->id_customer = $request->id_customer;
        $pr->id_desain = $request->id_desain;
        $pr->no_antrian = $request->no_antrian;
        $pr->kode_spk = $request->kode_spk;
        $pr->id_bahan = $request->id_bahan;
        $pr->keterangan = $request->keterangan;
        $pr->satuan = $request->satuan;
        $pr->lebar = $request->lebar;
        $pr->tinggi = $request->tinggi;
        $pr->qty = $request->qty;
        $pr->sisi = $request->sisi ?? '1 SISI';
        $pr->catatan = '1';
        $pr->metode_pengantaran = $request->metode_pengambilan;
        $pr->tgl_kirim = $request->tgl_kirim;
        $pr->save();

        if ($request->pinising && $pr->kode_spk) {
            Pinising::updateOrCreate(
                ['kode_spk' => $pr->kode_spk],
                [
                    'atas' => $request->pinising['atas'] ?? '',
                    'bawah' => $request->pinising['bawah'] ?? '',
                    'kanan' => $request->pinising['kanan'] ?? '',
                    'kiri' => $request->pinising['kiri'] ?? '',
                ]
            );
        }

        if ($pr->kode_spk) {
            MataAyam::updateOrCreate(
                ['kode_spk' => $pr->kode_spk],
                [
                    'atas' => in_array('Atas', $request->mata_ayam ?? []),
                    'bawah' => in_array('Bawah', $request->mata_ayam ?? []),
                    'kiri' => in_array('Kiri', $request->mata_ayam ?? []),
                    'kanan' => in_array('Kanan', $request->mata_ayam ?? []),
                ]
            );
        }

        return redirect()->back()->with('success', 'Data barhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $pr = Produksi::find($id);
        $pr->id_customer = $request->id_customer;
        $pr->no_antrian = $request->no_antrian;
        $pr->kode_spk = $request->kode_spk;
        $pr->id_bahan = $request->id_bahan;
        $pr->keterangan = $request->keterangan;
        $pr->satuan = $request->satuan;
        $pr->lebar = $request->lebar;
        $pr->tinggi = $request->tinggi;
        $pr->qty = $request->qty;
        $pr->sisi = $request->sisi ?? '1 SISI';
        $pr->catatan = '1';
        $pr->metode_pengantaran = $request->metode_pengambilan;
        $pr->tgl_kirim = $request->tgl_kirim;
        $pr->update();

        if ($request->pinising && $pr->kode_spk) {
            Pinising::updateOrCreate(
                ['kode_spk' => $pr->kode_spk],
                [
                    'atas' => $request->pinising['atas'] ?? '',
                    'bawah' => $request->pinising['bawah'] ?? '',
                    'kanan' => $request->pinising['kanan'] ?? '',
                    'kiri' => $request->pinising['kiri'] ?? '',
                ]
            );
        }

        if ($pr->kode_spk) {
            MataAyam::updateOrCreate(
                ['kode_spk' => $pr->kode_spk],
                [
                    'atas' => in_array('Atas', $request->mata_ayam ?? []),
                    'bawah' => in_array('Bawah', $request->mata_ayam ?? []),
                    'kiri' => in_array('Kiri', $request->mata_ayam ?? []),
                    'kanan' => in_array('Kanan', $request->mata_ayam ?? []),
                ]
            );
        }

        return redirect()->back()->with('success', 'Data barhasil diubah');
    }

    public function delete($id)
    {
        $pr = Produksi::find($id);
        if ($pr->kode_spk) {
            MataAyam::where('kode_spk', $pr->kode_spk)->delete();
            Pinising::where('kode_spk', $pr->kode_spk)->delete();
        }
        $pr->delete();

        return redirect()->back()->with('success', 'Data barhasil dihapus');
    }
}
