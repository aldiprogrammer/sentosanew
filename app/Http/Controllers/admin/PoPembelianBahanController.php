<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Bahanpakai;
use App\Models\Itemstokbahan;
use App\Models\PoPembelianBahan;
use App\Models\PoPembelianBahanItem;
use App\Models\SuplayerPembelianBahan;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PoPembelianBahanController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $po = PoPembelianBahan::with('suplayer')
            ->when($search, function ($q, $search) {
                $q->where('no_po', 'like', "%{$search}%")
                    ->orWhere('hal', 'like', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate(10);
        $po->appends(['search' => $search]);

        $prefix = 'PB-'.date('ym').'-';
        $last = PoPembelianBahan::where('no_po', 'like', $prefix.'%')->orderBy('no_po', 'desc')->first();
        $no_po = $prefix.str_pad($last ? ((int) substr($last->no_po, -4)) + 1 : 1, 4, '0', STR_PAD_LEFT);
        $suplayers = SuplayerPembelianBahan::orderBy('nama_suplayer')
            ->get(['id', 'kode', 'nama_suplayer']);

        return Inertia::render('Admin/PoPembelianBahan', compact('po', 'no_po', 'suplayers'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'tgl' => 'required|date',
            'no_po' => 'nullable|string|max:30',
            'id_suplayer' => 'nullable|exists:suplayer_pembelian_bahans,id',
            'hal' => 'nullable|string|max:200',
            'pembayaran' => 'nullable|in:CASH,CREDIT',
        ]);

        PoPembelianBahan::create($data);

        return redirect()->back()->with('success', 'PO Pembelian Bahan berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'tgl' => 'required|date',
            'no_po' => 'nullable|string|max:30',
            'id_suplayer' => 'nullable|exists:suplayer_pembelian_bahans,id',
            'hal' => 'nullable|string|max:200',
            'pembayaran' => 'nullable|in:CASH,CREDIT',
        ]);

        $po = PoPembelianBahan::findOrFail($id);
        $po->update($data);

        return redirect()->back()->with('success', 'PO Pembelian Bahan berhasil diubah');
    }

    public function detail($id)
    {
        $po = PoPembelianBahan::with('suplayer', 'items.bahan', 'items.itemStok')->findOrFail($id);
        $totalHarga = PoPembelianBahanItem::where('po_pembelian_bahan_id', $po->id)->sum('total_harga');
        $diskonAmount = $this->hitungDiskon($totalHarga, $po->diskon, $po->diskon_type);
        $ppnAmount = $totalHarga * ($po->ppn / 100);
        $po->sub_total = $totalHarga - $diskonAmount + $ppnAmount;
        $po->update();

        $po->items->each(function ($item) {
            $item->stok_count = $item->itemStok->count();
        });

        $bahanpakais = Bahanpakai::orderBy('kode_bahan')->get();

        $hargaTerakhir = PoPembelianBahanItem::query()
            ->join('bahanpakais', 'bahanpakais.id', '=', 'po_pembelian_bahan_items.id_bahan')
            ->orderByDesc('po_pembelian_bahan_items.id')
            ->get(['bahanpakais.kode_bahan', 'po_pembelian_bahan_items.harga'])
            ->unique('kode_bahan')
            ->pluck('harga', 'kode_bahan');

        return Inertia::render('Admin/PoPembelianBahanDetail', compact('po', 'bahanpakais', 'hargaTerakhir'));
    }

    public function storeItem(Request $request, $id)
    {
        $po = PoPembelianBahan::findOrFail($id);

        $request->merge(collect($request->all())->map(fn ($v) => $v === '' ? null : $v)->all());

        $data = $request->validate([
            'id_bahan' => 'nullable|exists:bahanpakais,id',
            'panjang' => 'nullable|numeric',
            'lebar' => 'nullable|numeric',
            'luas' => 'nullable|numeric',
            'harga' => 'nullable|numeric',
            'qty' => 'nullable|numeric',
            'satuan' => 'nullable|string|max:50',
            'keterangan' => 'nullable|string|max:200',
            'total_harga' => 'nullable|numeric',
        ]);

        $data['po_pembelian_bahan_id'] = $po->id;
        PoPembelianBahanItem::create($data);

        $this->recalculateTotalHarga($po->id);

        return redirect()->back()->with('success', 'Item berhasil ditambah');
    }

    public function updateItem(Request $request, $id)
    {
        $request->merge(collect($request->all())->map(fn ($v) => $v === '' ? null : $v)->all());

        $data = $request->validate([
            'id_bahan' => 'nullable|exists:bahanpakais,id',
            'panjang' => 'nullable|numeric',
            'lebar' => 'nullable|numeric',
            'luas' => 'nullable|numeric',
            'harga' => 'nullable|numeric',
            'qty' => 'nullable|numeric',
            'satuan' => 'nullable|string|max:50',
            'keterangan' => 'nullable|string|max:200',
            'total_harga' => 'nullable|numeric',
        ]);

        $item = PoPembelianBahanItem::findOrFail($id);
        $poId = $item->po_pembelian_bahan_id;
        $item->update($data);

        $this->recalculateTotalHarga($poId);

        return redirect()->back()->with('success', 'Item berhasil diubah');
    }

    public function deleteItem($id)
    {
        $item = PoPembelianBahanItem::findOrFail($id);
        $poId = $item->po_pembelian_bahan_id;
        $item->delete();

        $this->recalculateTotalHarga($poId);

        return redirect()->back()->with('success', 'Item berhasil dihapus');
    }

    public function delete($id)
    {
        PoPembelianBahan::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'PO Pembelian Bahan berhasil dihapus');
    }

    public function updateHeader(Request $request, $id)
    {
        $po = PoPembelianBahan::findOrFail($id);

        $data = $request->validate([
            'diskon' => 'nullable|numeric',
            'diskon_type' => 'nullable|in:persen,rupiah',
            'ppn' => 'nullable|numeric',
        ]);

        $totalHarga = PoPembelianBahanItem::where('po_pembelian_bahan_id', $po->id)->sum('total_harga');
        $diskon = $data['diskon'] ?? 0;
        $diskonType = $data['diskon_type'] ?? 'persen';
        $ppn = $data['ppn'] ?? 0;
        $diskonAmount = $this->hitungDiskon($totalHarga, $diskon, $diskonType);
        $ppnAmount = $totalHarga * ($ppn / 100);
        $subTotal = $totalHarga - $diskonAmount + $ppnAmount;

        $po->diskon = $diskon;
        $po->diskon_type = $diskonType;
        $po->ppn = $ppn;
        $po->sub_total = $subTotal;
        $po->update();

        return redirect()->back()->with('success', 'Header berhasil diupdate');
    }

    public function updateStok($id)
    {
        $po = PoPembelianBahan::with('items.bahan')->findOrFail($id);

        if ($po->status == 1) {
            return redirect()->back()->with('success', 'Stok sudah diupdate');
        }

        $nextSeq = [];
        foreach ($po->items as $item) {
            if (! $item->bahan) {
                continue;
            }
            $kodeBahan = $item->bahan->kode_bahan;

            if (! isset($nextSeq[$kodeBahan])) {
                $existingMax = Itemstokbahan::where('kode_bahan_pakai', $kodeBahan)
                    ->whereNotNull('kode_label')
                    ->pluck('kode_label')
                    ->map(fn ($l) => (int) substr($l, strrpos($l, '-') + 1))
                    ->max() ?? 0;
                $nextSeq[$kodeBahan] = $existingMax + 1;
            }

            $qty = max((int) round((float) ($item->qty ?? 0)), 1);
            for ($i = 0; $i < $qty; $i++) {
                $seq = $nextSeq[$kodeBahan]++;
                $kodeLabel = 'LB-'.$kodeBahan.'-'.str_pad($seq, 3, '0', STR_PAD_LEFT);
                Itemstokbahan::create([
                    'po_pembelian_bahan_id' => $po->id,
                    'po_pembelian_bahan_item_id' => $item->id,
                    'kode_po' => $po->no_po,
                    'kode_label' => $kodeLabel,
                    'kode_bahan_pakai' => $kodeBahan,
                    'panjang' => $item->panjang,
                    'lebar' => $item->lebar,
                    'total' => $item->luas,
                    'qty' => 1,
                    'satuan' => $item->satuan,
                    'keterangan' => $item->keterangan,
                ]);
            }

            $this->tambahStokBahan($item);
        }

        $po->status = 1;
        $po->update();

        return redirect()->back()->with('success', 'Stok berhasil diupdate');
    }

    public function tarikStok($id)
    {
        $po = PoPembelianBahan::with('items.bahan')->findOrFail($id);

        if ($po->status == 0) {
            return redirect()->back()->with('success', 'Stok sudah ditarik');
        }

        foreach ($po->items as $item) {
            $this->kurangStokBahan($item);
        }

        Itemstokbahan::where('po_pembelian_bahan_id', $po->id)->delete();

        $po->status = 0;
        $po->update();

        return redirect()->back()->with('success', 'Stok berhasil ditarik');
    }

    private function hitungDiskon($totalHarga, $diskon, $diskonType)
    {
        if (($diskonType ?? 'persen') === 'rupiah') {
            return (float) $diskon;
        }

        return $totalHarga * ((float) $diskon / 100);
    }

    private function recalculateTotalHarga($poId)
    {
        $totalHarga = PoPembelianBahanItem::where('po_pembelian_bahan_id', $poId)->sum('total_harga');
        $po = PoPembelianBahan::find($poId);
        if ($po) {
            $diskonAmount = $this->hitungDiskon($totalHarga, $po->diskon, $po->diskon_type);
            $ppnAmount = $totalHarga * ($po->ppn / 100);
            $po->sub_total = $totalHarga - $diskonAmount + $ppnAmount;
            $po->update();
        }
    }

    private function tambahStokBahan($item)
    {
        $bahan = Bahanpakai::find($item->id_bahan);
        if (! $bahan) {
            return;
        }

        $satuan = strtoupper(trim($item->satuan ?? ''));
        $currentStok = (float) ($bahan->total_stok ?? 0);

        if ($satuan === 'M2' || $satuan === 'LEMBAR') {
            $luas = (float) ($item->luas ?? 0);
            $bahan->total_stok = $currentStok + ($luas * $item->qty);
        } elseif ($satuan === 'PCS' || $satuan === 'LITER') {
            $qty = (float) ($item->qty ?? 1);
            $bahan->total_stok = $currentStok + $qty;
        }

        $bahan->save();
    }

    private function kurangStokBahan($item)
    {
        $bahan = Bahanpakai::find($item->id_bahan);
        if (! $bahan) {
            return;
        }

        $satuan = strtoupper(trim($item->satuan ?? ''));
        $currentStok = (float) ($bahan->total_stok ?? 0);

        if ($satuan === 'M2' || $satuan === 'LEMBAR') {
            $luas = (float) ($item->luas ?? 0);
            $bahan->total_stok = max(0, $currentStok - ($luas * $item->qty));
        } else {
            $qty = (float) ($item->qty ?? 1);
            $bahan->total_stok = max(0, $currentStok - $qty);
        }

        $bahan->save();
    }

    public function updateStokItem(Request $request, $id)
    {
        $item = PoPembelianBahanItem::with('bahan', 'po')->findOrFail($id);

        $request->validate([
            'qty_diterima' => 'required|numeric|min:0.01',
        ]);

        $qtyDiterima = (int) round((float) $request->qty_diterima);
        if ($qtyDiterima < 1) {
            return redirect()->back()->with('error', 'Qty diterima minimal 1');
        }

        $existingStok = Itemstokbahan::where('po_pembelian_bahan_item_id', $item->id)->count();
        $totalStok = $existingStok + $qtyDiterima;

        if ($totalStok > (float) ($item->qty ?? 0)) {
            $sisa = (float) ($item->qty ?? 0) - $existingStok;

            return redirect()->back()->with('error', 'Sisa qty yang bisa diupdate: '.max(0, $sisa).' (sudah diupdate '.$existingStok.')');
        }

        if (! $item->bahan) {
            return redirect()->back()->with('error', 'Bahan tidak ditemukan');
        }

        $kodeBahan = $item->bahan->kode_bahan;

        $existingMax = Itemstokbahan::where('kode_bahan_pakai', $kodeBahan)
            ->whereNotNull('kode_label')
            ->pluck('kode_label')
            ->map(fn ($l) => (int) substr($l, strrpos($l, '-') + 1))
            ->max() ?? 0;
        $nextSeq = $existingMax + 1;

        for ($i = 0; $i < $qtyDiterima; $i++) {
            $seq = $nextSeq++;
            $kodeLabel = 'LB-'.$kodeBahan.'-'.str_pad($seq, 3, '0', STR_PAD_LEFT);
            Itemstokbahan::create([
                'po_pembelian_bahan_id' => $item->po_pembelian_bahan_id,
                'po_pembelian_bahan_item_id' => $item->id,
                'kode_po' => $item->po->no_po ?? '-',
                'kode_label' => $kodeLabel,
                'kode_bahan_pakai' => $kodeBahan,
                'panjang' => $item->panjang,
                'lebar' => $item->lebar,
                'total' => $item->luas,
                'qty' => 1,
                'satuan' => $item->satuan,
                'keterangan' => $item->keterangan,
            ]);
        }

        $bahan = $item->bahan;
        $satuan = strtoupper(trim($item->satuan ?? ''));
        $currentStok = (float) ($bahan->total_stok ?? 0);

        if ($satuan === 'M2' || $satuan === 'LEMBAR') {
            $luas = (float) ($item->luas ?? 0);
            $bahan->total_stok = $currentStok + ($luas * $item->qty * $qtyDiterima);
        } else {
            $bahan->total_stok = $currentStok + $qtyDiterima;
        }

        $bahan->save();

        return redirect()->back()->with('success', 'Stok item berhasil diupdate');
    }

    public function tarikStokItem($id)
    {
        $item = PoPembelianBahanItem::with('bahan')->findOrFail($id);

        $existingStok = Itemstokbahan::where('po_pembelian_bahan_item_id', $item->id)->count();
        if ($existingStok == 0) {
            return redirect()->back()->with('error', 'Tidak ada stok untuk ditarik');
        }

        if (! $item->bahan) {
            return redirect()->back()->with('error', 'Bahan tidak ditemukan');
        }

        $bahan = $item->bahan;
        $satuan = strtoupper(trim($item->satuan ?? ''));
        $currentStok = (float) ($bahan->total_stok ?? 0);

        if ($satuan === 'M2') {
            $luas = (float) ($item->luas ?? 0);
            $bahan->total_stok = max(0, $currentStok - ($luas * $item->qty * $existingStok));
        } else {
            $bahan->total_stok = max(0, $currentStok - $existingStok);
        }

        $bahan->save();

        Itemstokbahan::where('po_pembelian_bahan_item_id', $item->id)->delete();

        return redirect()->back()->with('success', 'Stok item berhasil ditarik ('.$existingStok.' entry)');
    }

    public function cetakLabel($id)
    {
        $po = PoPembelianBahan::with('items.bahan')->findOrFail($id);

        $labelStart = [];
        foreach ($po->items as $item) {
            if (! $item->bahan) {
                continue;
            }
            $kode = $item->bahan->kode_bahan;
            if (isset($labelStart[$kode])) {
                continue;
            }
            $max = Itemstokbahan::where('kode_bahan_pakai', $kode)
                ->whereNotNull('kode_label')
                ->pluck('kode_label')
                ->map(fn ($l) => (int) substr($l, strrpos($l, '-') + 1))
                ->max() ?? 0;
            $labelStart[$kode] = $max + 1;
        }

        $pdf = Pdf::loadView('pdf.label-bahan', [
            'po' => $po,
            'labelStart' => $labelStart,
        ])->setPaper('a4', 'portrait');

        return $pdf->stream('label_bahan_'.$po->no_po.'.pdf');
    }
}
