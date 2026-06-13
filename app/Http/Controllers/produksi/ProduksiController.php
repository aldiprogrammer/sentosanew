<?php

namespace App\Http\Controllers\produksi;

use App\Http\Controllers\Controller;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduksiController extends Controller
{
    function index()
    {
        $produksi = Produksi::with('customer', 'bahan', 'pinising', 'mataAyam')
            ->where('status_finishing', 0)
            ->where('status_produksi', 1)
            ->orderBy('id', 'desc')
            ->get();
        return Inertia::render('Produksi/Produksi', compact('produksi'));
    }

    function dataproduksi(Request $request)
    {
        $search = $request->query('search');
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');

        $produksi = Produksi::with('customer', 'bahan', 'pinising', 'mataAyam')
            ->when(auth()->user()->role === 'Desainer', function ($q) {
                $q->where('id_desainer', auth()->id());
            })
            ->when($search, function ($q, $search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('kode_spk', 'like', "%{$search}%")
                        ->orWhere('no_invoice', 'like', "%{$search}%")
                        ->orWhere('keterangan', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($qqq) use ($search) {
                            $qqq->where('nama', 'like', "%{$search}%");
                        })
                        ->orWhereHas('bahan', function ($qqq) use ($search) {
                            $qqq->where('bahan', 'like', "%{$search}%");
                        });
                });
            })
            ->when($tglAwal, function ($q, $tglAwal) {
                $q->where('tanggal', '>=', $tglAwal);
            })
            ->when($tglAkhir, function ($q, $tglAkhir) {
                $q->where('tanggal', '<=', $tglAkhir);
            })
            ->orderBy('id', 'desc')
            ->paginate(10);
        $produksi->appends(['search' => $search, 'tgl_awal' => $tglAwal, 'tgl_akhir' => $tglAkhir]);

        return Inertia::render('Admin/Dataproduksi', compact('produksi', 'tglAwal', 'tglAkhir'));
    }

    function prosesProduksi(Request $request)
    {
        $ids = $request->input('ids', []);
        $paymentType = $request->input('payment_type');

        if ($paymentType === 'utang') {
            $firstItem = Produksi::with('customer')->whereIn('id', $ids)->first();
            if ($firstItem && $firstItem->customer) {
                $customer = $firstItem->customer;
                $total = Produksi::whereIn('id', $ids)->sum('total_harga');

                if (($customer->limit_akhir + $total) > $customer->limit) {
                    return back()->withErrors([
                        'payment' => 'Limit customer tidak mencukupi. Sisa limit: Rp ' . number_format($customer->limit - $customer->limit_akhir),
                    ]);
                }

                $customer->increment('limit_akhir', $total);
            }
        }

        Produksi::whereIn('id', $ids)->update([
            'status_produksi' => 1,
            'pembayaran' => $paymentType,
        ]);
        return back()->with('success', 'Status produksi berhasil diupdate');
    }

    function proses($id)
    {
        $pr = Produksi::find($id);
        if ($pr->status_finishing == 1) {
            $pr->status_finishing = 0;
        } else {
            $pr->status_finishing = 1;
        }
        $pr->update();
        return back()->with('success', 'Finishing berhasil diproses');
    }
}
