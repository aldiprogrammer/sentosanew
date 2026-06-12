<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Desain;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanPembukuanController extends Controller
{
    public function index()
    {
        $desain = Desain::with('customer')
            ->whereNotNull('pembayaran')
            ->get()
            ->map(function ($item) {
                return $this->formatItem($item, 'Desain');
            });

        $produksi = Produksi::with('customer')
            ->whereNotNull('pembayaran')
            ->get()
            ->map(function ($item) {
                return $this->formatItem($item, 'Produksi');
            });

        $data = collect($desain)
            ->concat($produksi)
            ->sortByDesc('tanggal')
            ->values();

        $totalLunas = $data->where('pembayaran', 'lunas')->sum('total_harga');
        $totalHutang = $data->where('pembayaran', 'utang')->sum('total_harga');

        return Inertia::render('Admin/LaporanPembukuan', [
            'data' => $data,
            'totalLunas' => $totalLunas,
            'totalHutang' => $totalHutang,
            'today' => date('Y-m-d'),
        ]);
    }

    private function formatItem($item, $jenis)
    {
        $jatuhTempo = null;
        $overdue = false;

        if ($item->customer && $item->customer->jatuh_tempo) {
            $jatuhTempo = date('Y-m-d', strtotime($item->tanggal . ' + ' . $item->customer->jatuh_tempo . ' days'));
            $overdue = $item->pembayaran === 'utang' && strtotime($jatuhTempo) < strtotime(date('Y-m-d'));
        }

        return [
            'id' => $item->id,
            'tanggal' => $item->tanggal,
            'customer' => $item->customer->nama ?? '-',
            'id_customer' => $item->id_customer,
            'kode_spk' => $item->kode_spk,
            'jenis' => $jenis,
            'total_harga' => (int) $item->total_harga,
            'pembayaran' => $item->pembayaran,
            'jatuh_tempo' => $jatuhTempo,
            'overdue' => $overdue,
        ];
    }
}
