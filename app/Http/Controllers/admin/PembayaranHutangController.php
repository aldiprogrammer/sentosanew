<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\PembayaranHutang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PembayaranHutangController extends Controller
{
    public function index(Request $request)
    {
        $query = PembayaranHutang::with('customer');

        if ($request->filled('tanggal_awal')) {
            $query->where('tanggal_bayar', '>=', $request->tanggal_awal);
        }
        if ($request->filled('tanggal_akhir')) {
            $query->where('tanggal_bayar', '<=', $request->tanggal_akhir);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('no_invoice', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($q) use ($search) {
                        $q->where('nama', 'like', "%{$search}%");
                    });
            });
        }

        $pembayaranHutangs = $query->latest()->paginate(15)->withQueryString();
        $totalPembayaran = $pembayaranHutangs->sum('total_pembayaran');

        return Inertia::render('Admin/PembayaranHutang', [
            'pembayaranHutangs' => $pembayaranHutangs,
            'totalPembayaran' => $totalPembayaran,
            'filters' => $request->only(['tanggal_awal', 'tanggal_akhir', 'search']),
        ]);
    }
}
