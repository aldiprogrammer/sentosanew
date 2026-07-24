<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Desain;
use App\Models\Pengguna;
use App\Models\Produksi;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanOrderController extends Controller
{
    public function index(Request $request)
    {
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');
        $search = $request->query('search');
        $pembayaran = $request->query('pembayaran');
        $penggunaIds = array_values(array_filter((array) $request->query('pengguna_id', []), fn ($id) => $id !== ''));
        $customerIds = array_values(array_filter((array) $request->query('customer_id', []), fn ($id) => $id !== ''));

        $desain = Desain::with('customer', 'kategoridesain', 'desainer', 'cs')
            ->whereNull('alasan_pembatalan')
            ->when($search, function ($q, $search) {
                $q->where('no_invoice', 'like', "%{$search}%");
            })
            ->when($pembayaran, function ($q, $pembayaran) {
                $q->where('pembayaran', $pembayaran);
            })
            ->when(! empty($penggunaIds), fn ($q) => $q->where(function ($q) use ($penggunaIds) {
                foreach ($penggunaIds as $id) {
                    $q->orWhere('id_desain', $id)->orWhere('id_cs', $id);
                }
            }))
            ->when(! empty($customerIds), fn ($q) => $q->whereIn('id_customer', $customerIds))
            ->when($tglAwal, fn ($q) => $q->where('tanggal', '>=', $tglAwal))
            ->when($tglAkhir, fn ($q) => $q->where('tanggal', '<=', $tglAkhir))
            ->orderBy('id', 'desc')
            ->paginate(20)
            ->withQueryString();

        $desainBatal = Desain::with('customer', 'kategoridesain', 'desainer', 'cs')
            ->whereNotNull('alasan_pembatalan')
            ->when($search, function ($q, $search) {
                $q->where('no_invoice', 'like', "%{$search}%");
            })
            ->when(! empty($penggunaIds), fn ($q) => $q->where(function ($q) use ($penggunaIds) {
                foreach ($penggunaIds as $id) {
                    $q->orWhere('id_desain', $id)->orWhere('id_cs', $id);
                }
            }))
            ->when(! empty($customerIds), fn ($q) => $q->whereIn('id_customer', $customerIds))
            ->when($tglAwal, fn ($q) => $q->where('tanggal', '>=', $tglAwal))
            ->when($tglAkhir, fn ($q) => $q->where('tanggal', '<=', $tglAkhir))
            ->orderBy('id', 'desc')
            ->paginate(20)
            ->withQueryString();

        $produksi = Produksi::with('customer', 'bahan', 'cs')
            ->whereNull('alasan_pembatalan')
            ->when($search, function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('no_invoice', 'like', "%{$search}%")
                        ->orWhere('kode_spk', 'like', "%{$search}%");
                });
            })
            ->when($pembayaran, function ($q, $pembayaran) {
                $q->where('pembayaran', $pembayaran);
            })
            ->when(! empty($penggunaIds), fn ($q) => $q->whereIn('id_cs', $penggunaIds))
            ->when(! empty($customerIds), fn ($q) => $q->whereIn('id_customer', $customerIds))
            ->when($tglAwal, fn ($q) => $q->where('tanggal', '>=', $tglAwal))
            ->when($tglAkhir, fn ($q) => $q->where('tanggal', '<=', $tglAkhir))
            ->orderBy('id', 'desc')
            ->paginate(20)
            ->withQueryString();

        $penggunas = Pengguna::whereIn('role', ['Customer Service', 'Desainer'])
            ->orderBy('username')
            ->get(['id', 'username']);

        $customers = Customer::orderBy('nama')
            ->get(['id', 'nama']);

        return Inertia::render('Admin/LaporanOrder', compact(
            'desain', 'produksi', 'tglAwal', 'tglAkhir', 'search', 'pembayaran', 'penggunaIds', 'penggunas', 'desainBatal', 'customers', 'customerIds'
        ));
    }

    public function pdfDesain(Request $request)
    {
        $data = $this->getFilteredDesain($request);
        $filters = $request->only(['tgl_awal', 'tgl_akhir', 'search', 'pembayaran']);
        $penggunaIds = array_values(array_filter((array) $request->query('pengguna_id', []), fn ($id) => $id !== ''));
        $customerIds = array_values(array_filter((array) $request->query('customer_id', []), fn ($id) => $id !== ''));
        $filters['pengguna_id'] = $penggunaIds;
        $filters['customer_id'] = $customerIds;
        $totalKeseluruhan = $data->sum('total_harga');
        $penggunaName = ! empty($penggunaIds)
            ? Pengguna::whereIn('id', $penggunaIds)->pluck('username')->implode(', ')
            : '';
        $customerName = ! empty($customerIds)
            ? Customer::whereIn('id', $customerIds)->pluck('nama')->implode(', ')
            : '';

        $pdf = Pdf::loadView('pdf.laporan-order-desain', compact('data', 'filters', 'totalKeseluruhan', 'penggunaName', 'customerName'))
            ->setPaper('a4', 'landscape');

        return $pdf->stream('laporan-order-desain.pdf');
    }

    public function pdfProduksi(Request $request)
    {
        $data = $this->getFilteredProduksi($request);
        $filters = $request->only(['tgl_awal', 'tgl_akhir', 'search', 'pembayaran']);
        $penggunaIds = array_values(array_filter((array) $request->query('pengguna_id', []), fn ($id) => $id !== ''));
        $customerIds = array_values(array_filter((array) $request->query('customer_id', []), fn ($id) => $id !== ''));
        $filters['pengguna_id'] = $penggunaIds;
        $filters['customer_id'] = $customerIds;
        $totalKeseluruhan = $data->sum('total_harga');
        $penggunaName = ! empty($penggunaIds)
            ? Pengguna::whereIn('id', $penggunaIds)->pluck('username')->implode(', ')
            : '';
        $customerName = ! empty($customerIds)
            ? Customer::whereIn('id', $customerIds)->pluck('nama')->implode(', ')
            : '';

        $pdf = Pdf::loadView('pdf.laporan-order-produksi', compact('data', 'filters', 'totalKeseluruhan', 'penggunaName', 'customerName'))
            ->setPaper('a4', 'landscape');

        return $pdf->stream('laporan-order-produksi.pdf');
    }

    private function getFilteredDesain(Request $request)
    {
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');
        $search = $request->query('search');
        $pembayaran = $request->query('pembayaran');
        $penggunaIds = array_values(array_filter((array) $request->query('pengguna_id', []), fn ($id) => $id !== ''));
        $customerIds = array_values(array_filter((array) $request->query('customer_id', []), fn ($id) => $id !== ''));

        return Desain::with('customer', 'kategoridesain', 'desainer', 'cs')
            ->whereNull('alasan_pembatalan')
            ->when($search, function ($q, $search) {
                $q->where('no_invoice', 'like', "%{$search}%");
            })
            ->when($pembayaran, fn ($q) => $q->where('pembayaran', $pembayaran))
            ->when(! empty($penggunaIds), fn ($q) => $q->where(function ($q) use ($penggunaIds) {
                foreach ($penggunaIds as $id) {
                    $q->orWhere('id_desain', $id)->orWhere('id_cs', $id);
                }
            }))
            ->when(! empty($customerIds), fn ($q) => $q->whereIn('id_customer', $customerIds))
            ->when($tglAwal, fn ($q) => $q->where('tanggal', '>=', $tglAwal))
            ->when($tglAkhir, fn ($q) => $q->where('tanggal', '<=', $tglAkhir))
            ->orderBy('id', 'desc')
            ->get();
    }

    private function getFilteredProduksi(Request $request)
    {
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');
        $search = $request->query('search');
        $pembayaran = $request->query('pembayaran');
        $penggunaIds = array_values(array_filter((array) $request->query('pengguna_id', []), fn ($id) => $id !== ''));
        $customerIds = array_values(array_filter((array) $request->query('customer_id', []), fn ($id) => $id !== ''));

        return Produksi::with('customer', 'bahan', 'cs')
            ->whereNull('alasan_pembatalan')
            ->when($search, function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('no_invoice', 'like', "%{$search}%")
                        ->orWhere('kode_spk', 'like', "%{$search}%");
                });
            })
            ->when($pembayaran, fn ($q) => $q->where('pembayaran', $pembayaran))
            ->when(! empty($penggunaIds), fn ($q) => $q->whereIn('id_cs', $penggunaIds))
            ->when(! empty($customerIds), fn ($q) => $q->whereIn('id_customer', $customerIds))
            ->when($tglAwal, fn ($q) => $q->where('tanggal', '>=', $tglAwal))
            ->when($tglAkhir, fn ($q) => $q->where('tanggal', '<=', $tglAkhir))
            ->orderBy('id', 'desc')
            ->get();
    }
}
