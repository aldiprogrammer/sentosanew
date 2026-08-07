<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Databahan;
use App\Models\Desain;
use App\Models\Hargabahan;
use App\Models\HargaKhususCustomer;
use App\Models\MataAyam;
use App\Models\Pinising;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduksiController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $produksi = Produksi::with('customer', 'bahan.hargaBahan', 'pinising', 'mataAyam', 'desainer', 'cs')
            ->when(auth()->user()->role === 'Desainer', function ($q) {
                $q->where('id_desainer', auth()->id())->whereNull('pembayaran');
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
            ->orderBy('id', 'desc')
            ->paginate(10);
        $produksi->appends(['search' => $search]);
        $tanggal = date('Y-m-d');
        $desain = Desain::where('status', 0)
            ->where('tanggal', $tanggal)
            ->with('customer', 'kategoridesain')
            ->get();
        $customer = Customer::all();
        $bahan = Databahan::with('hargaBahan.hargaKhususCustomer')->get();

        do {
            $kodespk = 'SPK-'.date('ymd').rand(0, 100000);
        } while (Produksi::where('kode_spk', $kodespk)->exists());
        $kode_antrian = $this->kodeAntrianProduksiBerikutnya();
        do {
            $kode_invoice = 'INVOICE-'.date('ymd').'-'.auth()->id().'-'.rand(0, 1000000);
        } while (Produksi::where('no_invoice', $kode_invoice)->exists());
        $existingInvoices = Produksi::select('no_invoice')
            ->whereNotNull('no_invoice')
            ->where('no_invoice', '!=', '')
            ->distinct()
            ->orderBy('no_invoice')
            ->pluck('no_invoice');

        $todayActiveProduksi = Produksi::where('tanggal', date('Y-m-d'))
            ->where('status_produksi', 0)
            ->get(['id_customer', 'no_invoice']);

        $unpaidInvoices = Produksi::whereNull('pembayaran')
            ->whereNotNull('no_invoice')
            ->where('no_invoice', '!=', '')
            ->distinct()
            ->orderBy('no_invoice')
            ->pluck('no_invoice')
            ->values();

        return Inertia::render('Admin/Produksi', compact('produksi', 'desain', 'bahan', 'customer', 'kode_antrian', 'kodespk', 'kode_invoice', 'existingInvoices', 'todayActiveProduksi', 'unpaidInvoices'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode_spk' => 'required|unique:produksis,kode_spk',
        ], [
            'kode_spk.unique' => 'Kode SPK sudah digunakan, silakan ganti dengan yang lain.',
        ]);

        if ($request->filled('no_invoice') && $request->filled('id_customer')) {
            $dipakaiCustomerLain = Produksi::where('no_invoice', $request->no_invoice)
                ->where('id_customer', '!=', $request->id_customer)
                ->exists();
            if ($dipakaiCustomerLain) {
                return redirect()->back()
                    ->withInput()
                    ->withErrors(['no_invoice' => 'Nomor invoice sudah digunakan oleh customer lain, silakan ganti dengan nomor yang berbeda.']);
            }
        }

        $bahan = Databahan::find($request->id_bahan);
        $harga_produk = $this->hargaProduk($bahan, $request);
        $total_harga = $this->totalHarga($bahan, $request, $harga_produk);
        $desain = Desain::where('id_customer', $request->id_customer)
            ->where('tanggal', date('Y-m-d'))
            ->where('status', 0)
            ->first();
        $no_antrian = $desain->no_antrian ?? $this->kodeAntrianProduksiBerikutnya();

        $pr = new Produksi;
        $pr->tanggal = date('Y-m-d');
        $pr->no_invoice = $request->no_invoice ?: (function () use ($request) {
            $existing = Produksi::where('id_customer', $request->id_customer)
                ->where('tanggal', date('Y-m-d'))
                ->where('status_produksi', 0)
                ->first();
            if ($existing && $existing->no_invoice) {
                return $existing->no_invoice;
            }

            do {
                $invoice = 'INVOICE-'.date('ymd').'-'.auth()->id().'-'.rand(100, 9999);
            } while (Produksi::where('no_invoice', $invoice)->exists());

            return $invoice;
        })();
        $pr->id_customer = $request->id_customer;
        $pr->id_desain = $desain->id ?? $request->id_desain;
        $pr->id_desainer = auth()->id();
        if (in_array(auth()->user()->role, ['Customer Service', 'Admin'])) {
            $pr->id_cs = $request->id_cs ?: auth()->id();
        }
        $pr->no_antrian = $no_antrian;
        $pr->kode_spk = $request->kode_spk;
        $pr->id_bahan = $request->id_bahan;
        $pr->id_kategori_desain = $desain->id_kategori_desain ?? $request->id_kategori_desain;
        $pr->keterangan = $request->keterangan;
        $pr->satuan = $request->satuan;
        $pr->lebar = $request->lebar;
        $pr->tinggi = $request->tinggi;
        $pr->qty = $request->qty;
        $pr->sisi = $request->sisi ?? '1 SISI';
        $pr->cara_perhitungan = $bahan->cara_perhitungan ?? '';
        $pr->harga_bahan = $harga_produk;
        $pr->total_harga = $total_harga;
        $pr->catatan = '1';
        $pr->metode_pengantaran = $request->metode_pengambilan;
        $pr->tgl_kirim = $request->tgl_kirim;
        $pr->status_produksi = 0;
        $pr->status_finishing = 0;
        $pr->save();

        if ($request->pinising && $pr->kode_spk) {
            Pinising::updateOrCreate(
                ['kode_spk' => $pr->kode_spk],
                [
                    'atas' => $request->pinising['atas'] ?? '',
                    'bawah' => $request->pinising['bawah'] ?? '',
                    'kanan' => $request->pinising['kanan'] ?? '',
                    'kiri' => $request->pinising['kiri'] ?? '',
                    'catatan' => $request->pinising['catatan'] ?? '',
                ]
            );
        }

        if ($pr->kode_spk) {
            MataAyam::updateOrCreate(
                ['kode_spk' => $pr->kode_spk],
                [
                    'atas' => in_array('Atas', $request->mata_ayam ?? []),
                    'bawah' => in_array('Bawah', $request->mata_ayam ?? []),
                    'kiri' => in_array('Kiri', $request->mata_ayam ?? []),
                    'kanan' => in_array('Kanan', $request->mata_ayam ?? []),
                ]
            );
        }

        return redirect()->back()->with('success', 'Data barhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'kode_spk' => 'required|unique:produksis,kode_spk,'.$id,
        ], [
            'kode_spk.unique' => 'Kode SPK sudah digunakan, silakan ganti dengan yang lain.',
        ]);

        if ($request->filled('no_invoice') && $request->filled('id_customer')) {
            $dipakaiCustomerLain = Produksi::where('no_invoice', $request->no_invoice)
                ->where('id_customer', '!=', $request->id_customer)
                ->where('id', '!=', $id)
                ->exists();
            if ($dipakaiCustomerLain) {
                return redirect()->back()
                    ->withInput()
                    ->withErrors(['no_invoice' => 'Nomor invoice sudah digunakan oleh customer lain, silakan ganti dengan nomor yang berbeda.']);
            }
        }

        $pr = Produksi::find($id);

        if (in_array(auth()->user()->role, ['Desainer', 'Customer Service']) && $pr->pembayaran) {
            return redirect()->back()->with('error', 'Data tidak dapat diubah karena pembayaran sudah diproses');
        }
        $bahan = Databahan::find($request->id_bahan);
        $harga_produk = $this->hargaProduk($bahan, $request);
        $total_harga = $this->totalHarga($bahan, $request, $harga_produk);

        $pr->no_invoice = $request->no_invoice ?: $pr->no_invoice;
        $pr->id_customer = $request->id_customer;
        $pr->id_desain = $request->id_desain;
        $pr->no_antrian = $request->no_antrian;
        $pr->kode_spk = $request->kode_spk;
        $pr->id_bahan = $request->id_bahan;
        $pr->id_kategori_desain = $request->id_kategori_desain;
        $pr->keterangan = $request->keterangan;
        $pr->satuan = $request->satuan;
        $pr->lebar = $request->lebar;
        $pr->tinggi = $request->tinggi;
        $pr->qty = $request->qty;
        $pr->sisi = $request->sisi ?? '1 SISI';
        $pr->cara_perhitungan = $bahan->cara_perhitungan ?? '';
        $pr->harga_bahan = $harga_produk;
        $pr->total_harga = $total_harga;
        $pr->catatan = '1';
        $pr->metode_pengantaran = $request->metode_pengambilan;
        $pr->tgl_kirim = $request->tgl_kirim;
        $pr->update();

        if ($request->pinising && $pr->kode_spk) {
            Pinising::updateOrCreate(
                ['kode_spk' => $pr->kode_spk],
                [
                    'atas' => $request->pinising['atas'] ?? '',
                    'bawah' => $request->pinising['bawah'] ?? '',
                    'kanan' => $request->pinising['kanan'] ?? '',
                    'kiri' => $request->pinising['kiri'] ?? '',
                    'catatan' => $request->pinising['catatan'] ?? '',
                ]
            );
        }

        if ($pr->kode_spk) {
            MataAyam::updateOrCreate(
                ['kode_spk' => $pr->kode_spk],
                [
                    'atas' => in_array('Atas', $request->mata_ayam ?? []),
                    'bawah' => in_array('Bawah', $request->mata_ayam ?? []),
                    'kiri' => in_array('Kiri', $request->mata_ayam ?? []),
                    'kanan' => in_array('Kanan', $request->mata_ayam ?? []),
                ]
            );
        }

        return redirect()->back()->with('success', 'Data barhasil diubah');
    }

    public function delete($id)
    {
        $pr = Produksi::find($id);

        if (in_array(auth()->user()->role, ['Desainer', 'Customer Service']) && $pr->pembayaran) {
            return redirect()->back()->with('error', 'Data tidak dapat dihapus karena pembayaran sudah diproses');
        }

        if ($pr->kode_spk) {
            MataAyam::where('kode_spk', $pr->kode_spk)->delete();
            Pinising::where('kode_spk', $pr->kode_spk)->delete();
        }
        $pr->delete();

        return redirect()->back()->with('success', 'Data barhasil dihapus');
    }

    public function batal(Request $request, $id)
    {
        $request->validate([
            'alasan_pembatalan' => 'required|string',
        ]);

        $produksi = Produksi::find($id);

        if (! $produksi) {
            return redirect()->back()->with('error', 'Data produksi tidak ditemukan');
        }

        if ($produksi->alasan_pembatalan) {
            return redirect()->back()->with('error', 'Data produksi sudah dibatalkan');
        }

        $produksi->alasan_pembatalan = $request->alasan_pembatalan;
        $produksi->save();

        return redirect()->back()->with('success', 'Berhasil membatalkan produksi');
    }

    public function batalMulti(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer',
            'alasan_pembatalan' => 'required|string',
        ]);

        $count = Produksi::whereIn('id', $request->ids)
            ->whereNull('alasan_pembatalan')
            ->update(['alasan_pembatalan' => $request->alasan_pembatalan]);

        if ($count === 0) {
            return redirect()->back()->with('error', 'Tidak ada data yang dapat dibatalkan');
        }

        return redirect()->back()->with('success', "Berhasil membatalkan {$count} order produksi");
    }

    private function kodeAntrianProduksiBerikutnya()
    {
        $produksiTerakhir = Produksi::orderBy('id', 'desc')->first();

        if (! $produksiTerakhir || ! $produksiTerakhir->no_antrian) {
            return 'ANT-00001';
        }

        $nomorTerakhir = substr($produksiTerakhir->no_antrian, 4);
        $panjangNomor = strlen($nomorTerakhir);
        $nomorBerikutnya = (int) $nomorTerakhir + 1;

        return 'ANT-'.str_pad($nomorBerikutnya, $panjangNomor, '0', STR_PAD_LEFT);
    }

    private function hargaProduk(?Databahan $bahan, Request $request): float
    {
        if (! $bahan) {
            return 0;
        }

        if ($request->pilihan_harga === 'Custom') {
            return (float) ($request->harga_manual ?: 0);
        }

        $kolomHarga = [
            'Umum' => 'harga_umum',
            'Khusus' => 'harga_khusus',
            'Member' => 'harga_member',
            'Custom' => 'harga_custome',
        ][$request->pilihan_harga] ?? 'harga_umum';

        $qty = (float) ($request->qty ?: 0);
        $sisi = trim((string) $request->sisi);
        $hargaBahan = Hargabahan::where('kode_bahan', $bahan->kode)->get();
        $pakaiSisi = $hargaBahan->contains(fn ($harga) => trim((string) $harga->sisi) !== '');

        if (in_array($bahan->cara_perhitungan, ['QTY KHUSUS', 'QTY2'])) {
            $harga = $hargaBahan
                ->filter(function ($harga) use ($qty, $sisi, $pakaiSisi) {
                    $qtyMin = (float) ($harga->qty_min ?: 0);
                    $qtyMaxKosong = trim((string) $harga->qty_max) === '';
                    $qtyMax = $qtyMaxKosong ? INF : (float) $harga->qty_max;
                    $sisiHarga = trim((string) $harga->sisi);

                    if ($qtyMaxKosong && $qty !== $qtyMin) {
                        return false;
                    }

                    if ($qty < $qtyMin || $qty > $qtyMax) {
                        return false;
                    }

                    if ($pakaiSisi) {
                        return strcasecmp($sisiHarga, $sisi) === 0;
                    }

                    return $sisiHarga === '';
                })
                ->sortByDesc(fn ($harga) => (float) ($harga->qty_min ?: 0))
                ->first();
        } else {
            $harga = $hargaBahan
                ->filter(function ($harga) use ($sisi, $pakaiSisi) {
                    $sisiHarga = trim((string) $harga->sisi);

                    if ($pakaiSisi) {
                        return strcasecmp($sisiHarga, $sisi) === 0;
                    }

                    return $sisiHarga === '';
                })
                ->sortBy(fn ($harga) => (float) ($harga->qty_min ?: 0))
                ->first();
        }

        if (! $harga) {
            return 0;
        }

        if ($request->id_customer) {
            $hk = HargaKhususCustomer::where('hargabahan_id', $harga->id)
                ->where('customer_id', $request->id_customer)
                ->first();
            if ($hk && $hk->harga) {
                return (float) $hk->harga;
            }
        }

        return (float) ($harga?->$kolomHarga ?: 0);
    }

    private function totalHarga(?Databahan $bahan, Request $request, float $hargaProduk): float
    {
        if (! $bahan) {
            return 0;
        }

        if (in_array($bahan->cara_perhitungan, ['QTY'])) {

            return (float) $request->qty * $hargaProduk;
        }

        if (in_array($bahan->cara_perhitungan, ['QTY KHUSUS'])) {
            // return (float) $hargaProduk;
            if (in_array($bahan->satuan, ['PCS'])) {
                return (float) $request->qty * $hargaProduk;
            } elseif (in_array($bahan->satuan, ['QTY'])) {
                return (float) $request->qty * $hargaProduk;
            } else {
                return (float) $hargaProduk;
            }
        }

        if ($bahan->cara_perhitungan === 'QTY2') {

            return (float) $request->qty * $hargaProduk;
        }

        if ($bahan->cara_perhitungan === 'LUAS') {
            $lebar = (float) $request->lebar;
            $tinggi = (float) $request->tinggi;

            if ($request->satuan === 'Cm') {
                $lebar /= 100;
                $tinggi /= 100;
            } elseif ($request->satuan === 'Mm') {
                $lebar /= 1000;
                $tinggi /= 1000;
            }

            $luas = $lebar * $tinggi;

            if ($request->boolean('minimum_harga') && $luas < 1) {
                return (float) $request->qty * $hargaProduk;
            }

            return (float) $request->qty * ($luas * $hargaProduk);
        }

        return 0;
    }
}
