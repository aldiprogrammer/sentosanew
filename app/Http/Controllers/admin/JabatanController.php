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
        $kode = 'JB-' . rand(0, 100000);

        $daftarMenu = [
            ['key' => 'dashboard', 'label' => 'Dashboard', 'group' => 'Umum'],
            ['key' => 'customer', 'label' => 'Data Customer', 'group' => 'Umum'],
            ['key' => 'otorisasi', 'label' => 'Otorisasi', 'group' => 'Umum'],
            ['key' => 'tambah-desain', 'label' => 'Tambah Desain', 'group' => 'Umum'],
            ['key' => 'data-desain', 'label' => 'Data Desain', 'group' => 'Umum'],
            ['key' => 'tambah-produksi', 'label' => 'Tambah Produksi', 'group' => 'Umum'],
            ['key' => 'data-produksi', 'label' => 'Data Produksi', 'group' => 'Umum'],
            ['key' => 'proses-produksi', 'label' => 'Proses Produksi - Produksi', 'group' => 'Umum'],
            ['key' => 'proses-finishing', 'label' => 'Proses Produksi - Finishing', 'group' => 'Umum'],
            ['key' => 'logistik', 'label' => 'Logistik', 'group' => 'Umum'],
            ['key' => 'pengguna', 'label' => 'Pengguna', 'group' => 'Master Data'],
            ['key' => 'distributor', 'label' => 'Distributor', 'group' => 'Master Data'],
            ['key' => 'kurir', 'label' => 'Kurir', 'group' => 'Master Data'],
            ['key' => 'suplayer', 'label' => 'Suplayer', 'group' => 'Master Data'],
            ['key' => 'master-bahan', 'label' => 'Bahan', 'group' => 'Master Data'],
            ['key' => 'master-kategoridesain', 'label' => 'Kategori Desain', 'group' => 'Master Data'],
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
