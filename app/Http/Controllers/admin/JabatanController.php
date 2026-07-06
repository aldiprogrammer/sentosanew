<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Jabatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JabatanController extends Controller
{
    public function index()
    {
        $jabatan = Jabatan::all();
        $kode = 'JB-'.rand(0, 100000);

        $daftarMenu = [
            ['key' => 'dashboard', 'label' => 'Dashboard', 'group' => 'Umum'],
            ['key' => 'customer', 'label' => 'Data Customer', 'group' => 'Umum'],
            ['key' => 'otorisasi', 'label' => 'Otorisasi', 'group' => 'Umum'],
            ['key' => 'tambah-desain', 'label' => 'Tambah Desain', 'group' => 'Umum'],
            ['key' => 'data-desain', 'label' => 'Data Desain', 'group' => 'Umum'],
            ['key' => 'data-order', 'label' => 'Data Order', 'group' => 'Order'],
            ['key' => 'laporan-order', 'label' => 'Laporan Order', 'group' => 'Order'],
            ['key' => 'tambah-produksi', 'label' => 'Tambah Produksi', 'group' => 'Umum'],
            ['key' => 'data-produksi', 'label' => 'Data Produksi', 'group' => 'Umum'],
            ['key' => 'proses-produksi', 'label' => 'Proses Produksi - Produksi', 'group' => 'Proses Produksi'],
            ['key' => 'proses-finishing', 'label' => 'Proses Produksi - Finishing', 'group' => 'Proses Produksi'],
            ['key' => 'logistik', 'label' => 'Logistik', 'group' => 'Proses Produksi'],
            ['key' => 'pengambilan-stok', 'label' => 'Pengambilan Stok', 'group' => 'Stok'],
            ['key' => 'riwayat-pengambilan-stok', 'label' => 'Riwayat Pengambilan Stok', 'group' => 'Stok'],
            ['key' => 'riwayat-pemakaian-bahan', 'label' => 'Riwayat Pemakaian Bahan', 'group' => 'Stok'],
            ['key' => 'laporan-pembukuan', 'label' => 'Laporan Pembukuan', 'group' => 'Laporan Keuangan'],
            ['key' => 'laporan-fee-desain', 'label' => 'Laporan Fee Desain', 'group' => 'Laporan Keuangan'],
            ['key' => 'laporan-fee-cs', 'label' => 'Laporan Fee CS', 'group' => 'Laporan Keuangan'],

            ['key' => 'pengguna', 'label' => 'Pengguna', 'group' => 'Master Data'],
            ['key' => 'distributor', 'label' => 'Distributor', 'group' => 'Master Data'],
            ['key' => 'kurir', 'label' => 'Kurir', 'group' => 'Master Data'],
            ['key' => 'suplayer', 'label' => 'Suplayer Eksternal', 'group' => 'Master Data'],
            ['key' => 'suplayer-pembelian-bahan', 'label' => 'Suplayer Pembelian Bahan', 'group' => 'Master Data'],
            ['key' => 'master-bahan', 'label' => 'Bahan Jual', 'group' => 'Bahan'],
            ['key' => 'master-kategoridesain', 'label' => 'Kategori Desain', 'group' => 'Master Data'],
            ['key' => 'master-materbahan', 'label' => 'Master Bahan', 'group' => 'Bahan'],
            ['key' => 'master-bahanpakai', 'label' => 'Bahan Pakai', 'group' => 'Bahan'],
            ['key' => 'relasi-bahan', 'label' => 'Relasi Bahan', 'group' => 'Bahan'],
            ['key' => 'po-eksternal', 'label' => 'PO Eksternal', 'group' => 'Umum'],
            ['key' => 'po-pembelian-bahan', 'label' => 'PO Pembelian Bahan', 'group' => 'Umum'],
            ['key' => 'master-jabatan', 'label' => 'Jabatan', 'group' => 'Master Data'],
        ];

        return Inertia::render('Admin/Jabatan', compact('jabatan', 'kode', 'daftarMenu'));
    }

    public function store(Request $request)
    {
        $cs = new Jabatan;
        $cs->kode = $request->kode;
        $cs->jabatan = $request->jabatan;
        $cs->menu_akses = $request->menu_akses ?? [];
        $cs->save();

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $cs = Jabatan::find($id);
        $cs->kode = $request->kode;
        $cs->jabatan = $request->jabatan;
        $cs->menu_akses = $request->menu_akses ?? [];
        $cs->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function delete($id)
    {
        $cs = Jabatan::find($id);
        $cs->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
