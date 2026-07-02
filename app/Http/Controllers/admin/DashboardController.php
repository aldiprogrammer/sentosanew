<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Kurir;
use App\Models\Pengguna;
use App\Models\Produksi;
use App\Models\Suplayer;
use App\Models\SuplayerPembelianBahan;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $produksiSelesai = Produksi::with('customer')
            ->where('status_selesai', 1)
            ->whereDate('tanggal', date('Y-m-d'))
            ->orderBy('id', 'desc')
            ->get()
            ->map(fn ($item) => [
                'kode_spk' => $item->kode_spk,
                'customer' => $item->customer->nama ?? '-',
                'tanggal' => $item->tanggal,
                'status' => 'Selesai',
            ]);

        return Inertia::render('Admin/Home', [
            'totalPengguna' => Pengguna::count(),
            'totalCustomer' => Customer::count(),
            'totalKurir' => Kurir::count(),
            'totalSuplayerEksternal' => Suplayer::count(),
            'totalSuplayerPembelianBahan' => SuplayerPembelianBahan::count(),
            'produksiSelesai' => $produksiSelesai,
        ]);
    }
}
