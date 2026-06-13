<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Desain;
use App\Models\Kategoridesain;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DesainController extends Controller
{
    public function index()
    {
        if (auth()->user()->role === 'Desainer') {
            $id = auth()->id();
            $desain = Desain::with('customer', 'kategoridesain', 'desainer')->where('id_desain', $id)->get();
        } else {
            $desain = Desain::with('customer', 'kategoridesain', 'desainer')->get();
        }


        $kategoridesain = Kategoridesain::all();
        $customer = Customer::all();
        $kodespk = 'SPK-' . date('ymd') . rand(0, 10000);
        $cek = Desain::first();
        if ($cek == false) {
            $kode_antrian = 'ANT-00001';
        } else {
            $ant = Desain::orderBy('id', 'desc')->first();
            $number = (int) substr($ant->no_antrian, 4);
            $number++;
            $kode_antrian = 'ANT-' . str_pad($number, 5, '0', STR_PAD_LEFT);
        }

        $tanggal = date('Y-m-d');

        return Inertia::render('Admin/Desain', compact('customer', 'kategoridesain', 'kodespk', 'kode_antrian', 'tanggal', 'desain'));
    }

    public function dataDesain(Request $request)
    {
        // dd(auth()->user()->role);
        // die();
        $search = $request->query('search');
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');

        $desain = Desain::with('customer', 'kategoridesain', 'desainer')
            ->when(auth()->user()->role === 'Desainer', function ($q) {
                $q->where('id_desain', auth()->id());
            })
            ->when($search, function ($q, $search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('kode_order', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($qqq) use ($search) {
                            $qqq->where('nama', 'like', "%{$search}%");
                        })
                        ->orWhereHas('kategoridesain', function ($qqq) use ($search) {
                            $qqq->where('kategori', 'like', "%{$search}%");
                        })
                        ->orWhereHas('desainer', function ($qqq) use ($search) {
                            $qqq->where('username', 'like', "%{$search}%");
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
        $desain->appends(['search' => $search, 'tgl_awal' => $tglAwal, 'tgl_akhir' => $tglAkhir]);

        return Inertia::render('Admin/DataDesain', compact('desain', 'tglAwal', 'tglAkhir'));
    }

    public function store(Request $request)
    {
        $kategori = Kategoridesain::find($request->id_kategori_desain);
        $harga = $kategori->harga ?? 0;
        $total_harga = $harga * $request->qty;

        $cs = new Desain;
        $cs->no_antrian = $request->kodeantiran;
        $cs->no_invoice = 'INVOICE-' . date('ymd') . rand(0, 10000);
        $cs->tanggal = $request->tanggal;
        $cs->id_customer = $request->id_customer;
        $cs->id_kategori_desain = $request->id_kategori_desain;
        $cs->qty = $request->qty;
        $cs->total_harga = $total_harga;
        $cs->id_desain = auth()->id();
        $cs->status = 0;
        $cs->save();

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $kategori = Kategoridesain::find($request->id_kategori_desain);
        $harga = $kategori->harga ?? 0;
        $total_harga = $harga * $request->qty;

        $cs = Desain::find($id);
        $cs->id_customer = $request->id_customer;
        $cs->id_kategori_desain = $request->id_kategori_desain;
        $cs->qty = $request->qty;
        $cs->total_harga = $total_harga;
        $cs->id_desain = auth()->id();
        $cs->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function prosesPembayaran(Request $request)
    {
        $ids = $request->input('ids', []);
        $paymentType = $request->input('payment_type');

        if ($paymentType === 'utang') {
            $firstItem = Desain::with('customer')->whereIn('id', $ids)->first();
            if ($firstItem && $firstItem->customer) {
                $customer = $firstItem->customer;
                $total = Desain::whereIn('id', $ids)->sum('total_harga');

                if (($customer->limit_akhir + $total) > $customer->limit) {
                    return back()->withErrors([
                        'payment' => 'Limit customer tidak mencukupi. Sisa limit: Rp ' . number_format($customer->limit - $customer->limit_akhir),
                    ]);
                }

                $customer->increment('limit_akhir', $total);
            }
        }

        Desain::whereIn('id', $ids)->update(['pembayaran' => $paymentType]);
        return back()->with('success', 'Pembayaran berhasil diproses');
    }

    public function delete($id)
    {
        $cs = Desain::find($id);
        $cs->delete();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }
}
