<?php

namespace App\Http\Controllers\produksi;

use App\Http\Controllers\Controller;
use App\Models\Bahanpakai;
use App\Models\Customer;
use App\Models\InvoiceProduksi;
use App\Models\Itemstokbahan;
use App\Models\PengajuanDiskon;
use App\Models\Produksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduksiController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');

        $produksi = Produksi::with(['customer', 'bahan' => function ($q) {
            $q->with(['hargaBahan' => function ($q2) {
                $q2->with('hargaKhususCustomer');
            }]);
        }, 'pinising', 'mataAyam'])
            ->where('status_finishing', 0)
            ->where('status_produksi', 1)
            ->when($search, function ($q, $search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('kode_spk', 'like', "%{$search}%")
                        ->orWhere('no_invoice', 'like', "%{$search}%")
                        ->orWhere('keterangan', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($qqq) use ($search) {
                            $qqq->where('nama', 'like', "%{$search}%");
                        });
                });
            })
            ->when($tglAwal, fn ($q, $v) => $q->where('tanggal', '>=', $v))
            ->when($tglAkhir, fn ($q, $v) => $q->where('tanggal', '<=', $v))
            ->orderBy('id', 'desc')
            ->get();
        $bahanpakaiList = Bahanpakai::get();
        $itemstokbahans = Itemstokbahan::where('qty', '>', 0)->orderBy('id')->get();

        return Inertia::render('Produksi/Produksi', compact('produksi', 'bahanpakaiList', 'itemstokbahans', 'search', 'tglAwal', 'tglAkhir'));
    }

    public function dataproduksi(Request $request)
    {
        $search = $request->query('search');
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');

        $items = Produksi::with('customer', 'bahan', 'pinising', 'mataAyam', 'cs')
            ->whereNull('alasan_pembatalan')
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
            ->when($tglAwal, function ($q, $tglAwal) {
                $q->where('tanggal', '>=', $tglAwal);
            })
            ->when($tglAkhir, function ($q, $tglAkhir) {
                $q->where('tanggal', '<=', $tglAkhir);
            })
            ->orderBy('id', 'desc')
            ->get();

        $grouped = $items->groupBy('no_invoice')->map(function ($group) {
            $firstItem = $group->first();
            $invoiceProduksi = InvoiceProduksi::where('no_invoice', $firstItem->no_invoice)->first();
            $minimumFaktur = $invoiceProduksi?->minimum_faktur ?? 0;

            return [
                'no_invoice' => $firstItem->no_invoice,
                'items' => $group->values(),
                'customer' => $firstItem->customer,
                'total_qty' => $group->sum('qty'),
                'total_harga' => $group->sum('total_harga') + $minimumFaktur,
                'item_count' => $group->count(),
                'has_payment' => $group->some(fn ($item) => $item->pembayaran),
                'all_lunas' => $group->every(fn ($item) => $item->pembayaran === 'lunas'),
                'all_utang' => $group->every(fn ($item) => $item->pembayaran === 'utang'),
                'minimum_faktur' => $minimumFaktur,
                'harga_akhir_invoice' => $invoiceProduksi?->harga_akhir ?? null,
                'uang' => $invoiceProduksi?->uang ?? null,
                'kembalian' => $invoiceProduksi?->kembalian ?? null,
            ];
        })->values();

        $pengajuanDiskons = PengajuanDiskon::orderBy('id', 'desc')->get();
        $customer = Customer::all();

        return Inertia::render('Admin/Dataproduksi', [
            'produksi' => $grouped,
            'tglAwal' => $tglAwal,
            'tglAkhir' => $tglAkhir,
            'pengajuanDiskons' => $pengajuanDiskons,
            'customer' => $customer,
        ]);
    }

    public function prosesProduksi(Request $request)
    {
        $ids = $request->input('ids', []);
        $paymentType = $request->input('payment_type');
        $minimumFaktur = (float) ($request->input('minimum_faktur', 0) ?: 0);
        $uang = $request->input('uang');
        $kembalian = $request->input('kembalian');
        $isApi = $request->expectsJson();

        if ($paymentType === 'utang') {
            $firstItem = Produksi::with('customer')->whereIn('id', $ids)->first();
            if ($firstItem && $firstItem->customer) {
                $customer = $firstItem->customer;
                $total = Produksi::whereIn('id', $ids)->sum('total_harga') + $minimumFaktur;

                if (($customer->limit_akhir + $total) > $customer->limit) {
                    $error = [
                        'errors' => ['payment' => 'Limit customer tidak mencukupi. Sisa limit: Rp '.number_format($customer->limit - $customer->limit_akhir)],
                    ];

                    return $isApi ? response()->json($error, 422) : back()->withErrors($error['errors']);
                }

                $customer->increment('limit_akhir', $total);
            }
        }

        $displayIds = Produksi::with('bahan')->whereIn('id', $ids)
            ->whereHas('bahan', fn ($q) => $q->where('jenis_bahan', 'DISPLAY'))
            ->pluck('id');

        $nonDisplayIds = array_diff($ids, $displayIds->toArray());

        $eksternal = Produksi::with('bahan')->whereIn('id', $ids)
            ->whereHas('bahan', fn ($q) => $q->where('jenis', 'EKSTERNAL'))
            ->pluck('id');

        $nonEksternal = array_diff($ids, $eksternal->toArray());

        $isAdmin = in_array(auth()->user()->role, ['Admin', 'Admin 2', 'Customer Service']);

        if (! empty($nonDisplayIds) || ! empty($nonEksternal)) {
            $idsToUpdate = array_merge($nonDisplayIds, $nonEksternal);
            $baseUpdate = [
                'status_produksi' => 1,
                'pembayaran' => $paymentType,
            ];
            if ($isAdmin) {
                Produksi::whereIn('id', $idsToUpdate)->whereNull('id_cs')->update($baseUpdate + ['id_cs' => auth()->id()]);
                Produksi::whereIn('id', $idsToUpdate)->whereNotNull('id_cs')->update($baseUpdate);
            } else {
                Produksi::whereIn('id', $idsToUpdate)->update($baseUpdate + ['id_cs' => auth()->id()]);
            }
        }

        if ($displayIds->isNotEmpty()) {
            $baseUpdate = [
                'status_produksi' => 1,
                'status_finishing' => 1,
                'status_logistik' => 1,
                'pembayaran' => $paymentType,
            ];
            if ($isAdmin) {
                Produksi::whereIn('id', $displayIds)->whereNull('id_cs')->update($baseUpdate + ['id_cs' => auth()->id()]);
                Produksi::whereIn('id', $displayIds)->whereNotNull('id_cs')->update($baseUpdate);
            } else {
                Produksi::whereIn('id', $displayIds)->update($baseUpdate + ['id_cs' => auth()->id()]);
            }
        }

        if ($eksternal->isNotEmpty()) {
            $baseUpdate = [
                'status_produksi' => 1,
                'status_finishing' => 1,
                'status_logistik' => 1,
                'pembayaran' => $paymentType,
            ];
            if ($isAdmin) {
                Produksi::whereIn('id', $eksternal)->whereNull('id_cs')->update($baseUpdate + ['id_cs' => auth()->id()]);
                Produksi::whereIn('id', $eksternal)->whereNotNull('id_cs')->update($baseUpdate);
            } else {
                Produksi::whereIn('id', $eksternal)->update($baseUpdate + ['id_cs' => auth()->id()]);
            }
        }

        $processedItems = Produksi::with('customer')->whereIn('id', $ids)->get();
        $groupedByInvoice = $processedItems->groupBy('no_invoice');
        $minimumFakturApplied = false;
        foreach ($groupedByInvoice as $noInvoice => $items) {
            if (! $noInvoice) {
                continue;
            }

            $thisMinimumFaktur = 0;
            $approvedDiskon = PengajuanDiskon::where('no_invoice', $noInvoice)
                ->where('status', 'disetujui')
                ->first();
            $totalHarga = $items->sum('total_harga');
            $hargaSetelahDiskon = $approvedDiskon?->harga_diskon ?? $totalHarga;
            $hargaAwal = $approvedDiskon?->harga_awal ?? $totalHarga;
            if ($minimumFaktur > 0 && ! $minimumFakturApplied) {
                $thisMinimumFaktur = $minimumFaktur;
                $minimumFakturApplied = true;
            }

            $exists = InvoiceProduksi::where('no_invoice', $noInvoice)->exists();
            if (! $exists) {
                $firstItem = $items->first();
                InvoiceProduksi::create([
                    'no_invoice' => $noInvoice,
                    'id_customer' => $firstItem->id_customer,
                    'customer' => $firstItem->customer->nama ?? '',
                    'harga_awal' => $hargaAwal,
                    'diskon' => $approvedDiskon?->diskon ?? null,
                    'mode_diskon' => $approvedDiskon?->mode_diskon ?? null,
                    'harga_akhir' => $hargaSetelahDiskon + $thisMinimumFaktur,
                    'uang' => $uang,
                    'kembalian' => $kembalian,
                    'minimum_faktur' => $thisMinimumFaktur,
                    'tanggal' => date('Y-m-d'),
                ]);
            }
        }

        return $isApi
            ? response()->json(['message' => 'Status produksi berhasil diupdate'])
            : back()->with('success', 'Status produksi berhasil diupdate');
    }

    public function proses(Request $request, $id)
    {
        $pr = Produksi::find($id);
        if ($pr->status_finishing == 1) {
            $pr->status_finishing = 0;
        } else {
            $pr->status_finishing = 1;
        }
        $pr->sisa_putih_panjang = $request->sisa_putih_panjang;
        $pr->sisa_putih_lebar = $request->sisa_putih_lebar;
        $pr->sisa_putih_total = $request->sisa_putih_total;
        $pr->kode_bahanpakai = $request->kode_bahanpakai;
        $pr->update();

        if ($request->id_item_stok) {
            $stok = Itemstokbahan::find($request->id_item_stok);

            if ($stok && $request->total_all) {
                $stok->total = max(0, (float) $stok->total - (float) $request->total_all);
                if ((float) $stok->total == 0) {
                    $stok->qty = 0;
                }
                $stok->save();
            }
        }

        if ($request->kode_bahanpakai && $request->total_all) {
            $bahan = Bahanpakai::where('kode_bahan', $request->kode_bahanpakai)->first();
            if ($bahan) {
                $totalAll = (float) $request->total_all;
                $currentStok = (float) ($bahan->total_stok ?? 0);
                $bahan->total_stok = max(0, $currentStok - $totalAll);
                $bahan->save();
            }
        }

        return back()->with('success', 'Finishing berhasil diproses');
    }
}
