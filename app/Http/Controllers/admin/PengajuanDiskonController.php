<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\InvoiceDesain;
use App\Models\InvoiceProduksi;
use App\Models\PengajuanDiskon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengajuanDiskonController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $jenis = $request->query('jenis');
        $pengajuan = PengajuanDiskon::query()
            ->when($jenis, function ($q, $jenis) {
                $q->where('jenis', $jenis);
            })
            ->when($search, function ($q, $search) {
                $q->where('no_invoice', 'like', "%{$search}%")
                    ->orWhere('customer', 'like', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate(10);
        $pengajuan->appends(['search' => $search, 'jenis' => $jenis]);

        return Inertia::render('Admin/DataPengajuanDiskon', compact('pengajuan', 'jenis'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'no_invoice' => 'required',
            'jenis' => 'required|in:desain,produksi',
            'id_customer' => 'required',
            'harga_awal' => 'required|numeric|min:0',
            'mode_diskon' => 'required|in:persen,rupiah',
            'diskon' => 'required|numeric|min:0',
        ], [
            'no_invoice.required' => 'Nomor Invoice wajib diisi',
            'jenis.required' => 'Jenis wajib dipilih',
            'id_customer.required' => 'Customer wajib dipilih',
            'harga_awal.required' => 'Harga wajib diisi',
            'mode_diskon.required' => 'Mode diskon wajib dipilih',
            'diskon.required' => 'Diskon wajib diisi',
        ]);

        $customer = Customer::find($request->id_customer);
        $hargaAwal = (float) $request->harga_awal;
        $modeDiskon = $request->mode_diskon;
        $diskonVal = (float) $request->diskon;

        if ($modeDiskon === 'persen') {
            $hargaDiskon = $hargaAwal - ($hargaAwal * $diskonVal / 100);
        } else {
            $hargaDiskon = $hargaAwal - $diskonVal;
        }
        $hargaDiskon = max(0, $hargaDiskon);

        PengajuanDiskon::create([
            'no_invoice' => $request->no_invoice,
            'jenis' => $request->jenis,
            'id_customer' => $request->id_customer,
            'customer' => $customer->nama ?? '',
            'harga_awal' => $hargaAwal,
            'mode_diskon' => $modeDiskon,
            'diskon' => $diskonVal,
            'harga_diskon' => $hargaDiskon,
            'status' => 'pending',
            'tanggal' => date('Y-m-d'),
        ]);

        return redirect()->back()->with('success', 'Pengajuan diskon berhasil dikirim');
    }

    public function approve($id)
    {
        $pengajuan = PengajuanDiskon::find($id);
        if (! $pengajuan) {
            return redirect()->back()->with('error', 'Data pengajuan tidak ditemukan');
        }

        $pengajuan->update(['status' => 'disetujui']);

        InvoiceProduksi::where('no_invoice', $pengajuan->no_invoice)->update([
            'harga_awal' => $pengajuan->harga_awal,
            'mode_diskon' => $pengajuan->mode_diskon,
            'diskon' => $pengajuan->diskon,
            'harga_akhir' => $pengajuan->harga_diskon,
        ]);

        InvoiceDesain::where('no_invoice', $pengajuan->no_invoice)->update([
            'harga_awal' => $pengajuan->harga_awal,
            'mode_diskon' => $pengajuan->mode_diskon,
            'diskon' => $pengajuan->diskon,
            'harga_akhir' => $pengajuan->harga_diskon,
        ]);

        return redirect()->back()->with('success', 'Pengajuan disetujui, diskon telah diterapkan ke invoice');
    }

    public function reject($id)
    {
        $pengajuan = PengajuanDiskon::find($id);
        if (! $pengajuan) {
            return redirect()->back()->with('error', 'Data pengajuan tidak ditemukan');
        }

        $pengajuan->update(['status' => 'ditolak']);

        return redirect()->back()->with('success', 'Pengajuan ditolak');
    }

    public function cancel($id)
    {
        $pengajuan = PengajuanDiskon::find($id);
        if (! $pengajuan) {
            return redirect()->back()->with('error', 'Data pengajuan tidak ditemukan');
        }

        $pengajuan->update(['status' => 'pending']);

        InvoiceProduksi::where('no_invoice', $pengajuan->no_invoice)
            ->whereNotNull('id')
            ->update([
                'mode_diskon' => 'persen',
                'diskon' => '',
                'harga_akhir' => $pengajuan->harga_awal,
            ]);

        InvoiceDesain::where('no_invoice', $pengajuan->no_invoice)
            ->whereNotNull('id')
            ->update([
                'mode_diskon' => 'persen',
                'diskon' => '',
                'harga_akhir' => $pengajuan->harga_awal,
            ]);

        return redirect()->back()->with('success', 'Persetujuan dibatalkan, status kembali ke pending');
    }
}
