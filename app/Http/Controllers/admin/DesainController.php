<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Desain;
use App\Models\FeeCsTransaksi;
use App\Models\FeeDesainTransaksi;
use App\Models\InvoiceDesain;
use App\Models\Kategoridesain;
use App\Models\PengajuanDiskon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DesainController extends Controller
{
    public function index()
    {
        if (auth()->user()->role === 'Desainer') {
            $id = auth()->id();
            $desain = Desain::with('customer', 'kategoridesain', 'desainer')->where('id_desain', $id)->whereNull('pembayaran')->get();
        } else {
            $desain = Desain::with('customer', 'kategoridesain', 'desainer')->get();
        }

        $kategoridesain = Kategoridesain::all();
        $customer = Customer::all();
        $kodespk = 'SPK-'.date('ymd').rand(0, 10000);
        $cek = Desain::first();
        if ($cek == false) {
            $kode_antrian = 'ANT-00001';
        } else {
            $ant = Desain::orderBy('id', 'desc')->first();
            $number = (int) substr($ant->no_antrian, 4);
            $number++;
            $kode_antrian = 'ANT-'.str_pad($number, 5, '0', STR_PAD_LEFT);
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

        $desain = Desain::with('customer', 'kategoridesain', 'desainer', 'cs', 'invoiceDesain')
            ->whereNull('alasan_pembatalan')
            ->when(auth()->user()->role === 'Desainer', function ($q) {
                $q->where('id_desain', auth()->id())->whereNull('pembayaran');
            })
            ->when($search, function ($q, $search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('no_invoice', 'like', "%{$search}%")
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

        $pengajuanDiskons = PengajuanDiskon::orderBy('id', 'desc')->get();

        return Inertia::render('Admin/DataDesain', compact('desain', 'tglAwal', 'tglAkhir', 'pengajuanDiskons'));
    }

    public function store(Request $request)
    {
        $kategori = Kategoridesain::find($request->id_kategori_desain);
        $harga = $kategori->harga ?? 0;
        $total_harga = $harga * $request->qty;

        $cs = new Desain;
        $cs->no_antrian = $request->kodeantiran;
        do {
            $cs->no_invoice = 'INVOICE-'.date('ymd').'-'.auth()->id().'-'.rand(0, 1000000);
        } while (Desain::where('no_invoice', $cs->no_invoice)->exists());
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
        $desain = Desain::find($id);

        if (auth()->user()->role === 'Desainer' && $desain->pembayaran) {
            return redirect()->back()->with('error', 'Data tidak dapat diubah karena pembayaran sudah diproses');
        }

        $kategori = Kategoridesain::find($request->id_kategori_desain);
        $harga = $kategori->harga ?? 0;
        $total_harga = $harga * $request->qty;

        $desain->id_customer = $request->id_customer;
        $desain->id_kategori_desain = $request->id_kategori_desain;
        $desain->qty = $request->qty;
        $desain->total_harga = $total_harga;
        $desain->id_desain = auth()->id();
        $desain->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function prosesPembayaran(Request $request)
    {
        $ids = $request->input('ids', []);
        $paymentType = $request->input('payment_type');
        $uang = $request->input('uang');
        $kembalian = $request->input('kembalian');

        if ($paymentType === 'utang') {
            $firstItem = Desain::with('customer')->whereIn('id', $ids)->first();
            if ($firstItem && $firstItem->customer) {
                $customer = $firstItem->customer;
                $total = Desain::whereIn('id', $ids)->sum('total_harga');

                if (($customer->limit_akhir + $total) > $customer->limit) {
                    return back()->withErrors([
                        'payment' => 'Limit customer tidak mencukupi. Sisa limit: Rp '.number_format($customer->limit - $customer->limit_akhir),
                    ]);
                }

                $customer->increment('limit_akhir', $total);
            }
        }

        Desain::whereIn('id', $ids)->update([
            'pembayaran' => $paymentType,
            'id_cs' => auth()->id(),
        ]);

        $desains = Desain::with('kategoridesain')->whereIn('id', $ids)->get();
        $today = now()->toDateString();
        foreach ($desains as $d) {
            $fee = ($d->kategoridesain->fee ?? 0) * ($d->qty ?? 1);
            if ($fee > 0) {
                $sudahAda = FeeDesainTransaksi::where('desain_id', $d->id)->exists();
                if (! $sudahAda) {
                    FeeDesainTransaksi::create([
                        'desain_id' => $d->id,
                        'pengguna_id' => $d->id_desain,
                        'kategori_desain_id' => $d->id_kategori_desain,
                        'fee' => $fee,
                        'tanggal' => $today,
                        'status' => 'belum_diambil',
                    ]);
                }
            }

            $feeCs = ($d->kategoridesain->fee_cs ?? 0) * ($d->qty ?? 1);
            if ($feeCs > 0) {
                $sudahAdaCs = FeeCsTransaksi::where('desain_id', $d->id)->exists();
                if (! $sudahAdaCs) {
                    FeeCsTransaksi::create([
                        'desain_id' => $d->id,
                        'pengguna_id' => auth()->id(),
                        'kategori_desain_id' => $d->id_kategori_desain,
                        'fee_cs' => $feeCs,
                        'tanggal' => $today,
                        'status' => 'belum_diambil',
                    ]);
                }
            }
        }

        $processedItems = Desain::with('customer')->whereIn('id', $ids)->get();
        $groupedByInvoice = $processedItems->groupBy('no_invoice');
        foreach ($groupedByInvoice as $noInvoice => $items) {
            if (! $noInvoice) {
                continue;
            }
            $exists = InvoiceDesain::where('no_invoice', $noInvoice)->exists();
            if (! $exists) {
                $firstItem = $items->first();
                $totalHarga = $items->sum('total_harga');
                $approvedDiskon = PengajuanDiskon::where('no_invoice', $noInvoice)
                    ->where('status', 'disetujui')
                    ->first();
                InvoiceDesain::create([
                    'no_invoice' => $noInvoice,
                    'id_customer' => $firstItem->id_customer,
                    'customer' => $firstItem->customer->nama ?? '',
                    'harga_awal' => $totalHarga,
                    'diskon' => $approvedDiskon?->diskon,
                    'mode_diskon' => $approvedDiskon?->mode_diskon,
                    'harga_akhir' => $approvedDiskon?->harga_diskon ?? $totalHarga,
                    'uang' => $uang,
                    'kembalian' => $kembalian,
                    'tanggal' => date('Y-m-d'),
                ]);
            }
        }

        return back()->with('success', 'Pembayaran berhasil diproses');
    }

    public function delete($id)
    {
        $desain = Desain::find($id);

        if (auth()->user()->role === 'Desainer' && $desain->pembayaran) {
            return redirect()->back()->with('error', 'Data tidak dapat dihapus karena pembayaran sudah diproses');
        }

        $desain->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }

    public function batal(Request $request, $id)
    {
        $request->validate([
            'alasan_pembatalan' => 'required|string',
        ]);

        $desain = Desain::find($id);

        if (! $desain) {
            return redirect()->back()->with('error', 'Data desain tidak ditemukan');
        }

        if ($desain->alasan_pembatalan) {
            return redirect()->back()->with('error', 'Data desain sudah dibatalkan');
        }

        $desain->alasan_pembatalan = $request->alasan_pembatalan;
        $desain->save();

        return redirect()->back()->with('success', 'Berhasil membatalkan desain');
    }

    public function batalMulti(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer',
            'alasan_pembatalan' => 'required|string',
        ]);

        $count = Desain::whereIn('id', $request->ids)
            ->whereNull('alasan_pembatalan')
            ->update(['alasan_pembatalan' => $request->alasan_pembatalan]);

        if ($count === 0) {
            return redirect()->back()->with('error', 'Tidak ada data yang dapat dibatalkan');
        }

        return redirect()->back()->with('success', "Berhasil membatalkan {$count} order desain");
    }
}
