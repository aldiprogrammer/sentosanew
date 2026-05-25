<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Bahan;
use App\Models\Customer;
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
        $tanggal = date('Y-m-d');
        $desain = Desain::where('status', 0)
            ->where('tanggal', $tanggal)
            ->with('customer', 'kategoridesain')
            ->get();
        $customer = Customer::all();
        $bahan = Bahan::all();

        $kodespk = 'SPK-' . date('ymd') . rand(0, 10000);
        $kode_antrian = $this->kodeAntrianProduksiBerikutnya();

        return Inertia::render('Admin/Produksi', compact('produksi', 'desain', 'bahan', 'customer', 'kode_antrian', 'kodespk'));
    }

    public function store(Request $request)
    {

        $bahan = Bahan::where('id', $request->id_bahan)->first();
        if ($bahan->cara_perhitungan == 'QTY') {
            $total_harga = $request->qty * $bahan->harga;
        } elseif ($bahan->cara_perhitungan == 'LUAS') {
            $luas = $request->lebar * $request->tinggi;
            $total_harga = $luas * $bahan->harga;
        }
        $desain = Desain::where('id_customer', $request->id_customer)
            ->where('tanggal', date('Y-m-d'))
            ->where('status', 0)
            ->first();
        $no_antrian = $desain->no_antrian ?? $this->kodeAntrianProduksiBerikutnya();

        $pr = new Produksi;
        $pr->tanggal = date('Y-m-d');
        $pr->id_customer = $request->id_customer;
        $pr->id_desain = $desain->id ?? $request->id_desain;
        $pr->id_desainer = auth()->id();
        $pr->no_antrian = $no_antrian;
        $pr->kode_spk = $request->kode_spk;
        $pr->id_bahan = $request->id_bahan;
        $pr->id_kategori_desain = $desain->id_kategori_desain ?? $request->id_kategori_desain;
        $pr->keterangan = $request->keterangan;
        $pr->satuan = $request->satuan;
        $pr->lebar = $request->lebar;
        $pr->tinggi = $request->tinggi;
        $pr->qty = $request->qty;
        $pr->sisi = $request->sisi ?? '1 SISI';
        $pr->cara_perhitungan = $bahan->cara_perhitungan;
        $pr->harga_bahan = $bahan->harga;
        $pr->total_harga = $total_harga;
        $pr->catatan = '1';
        $pr->metode_pengantaran = $request->metode_pengambilan;
        $pr->tgl_kirim = $request->tgl_kirim;
        $pr->status_produksi = 0;
        $pr->status_finishing = 0;
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
        $pr->id_desain = $request->id_desain;
        $pr->no_antrian = $request->no_antrian;
        $pr->kode_spk = $request->kode_spk;
        $pr->id_bahan = $request->id_bahan;
        $pr->id_kategori_desain = $request->id_kategori_desain;
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

    private function kodeAntrianProduksiBerikutnya()
    {
        $produksiTerakhir = Produksi::orderBy('id', 'desc')->first();

        if (! $produksiTerakhir || ! $produksiTerakhir->no_antrian) {
            return 'ANT-00001';
        }

        $nomorTerakhir = substr($produksiTerakhir->no_antrian, 4);
        $panjangNomor = strlen($nomorTerakhir);
        $nomorBerikutnya = (int) $nomorTerakhir + 1;

        return 'ANT-' . str_pad($nomorBerikutnya, $panjangNomor, '0', STR_PAD_LEFT);
    }
}
