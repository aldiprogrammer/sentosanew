<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\RekeningSuplayerPembelianBahan;
use App\Models\SuplayerPembelianBahan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuplayerPembelianBahanController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $suplayer = SuplayerPembelianBahan::with('rekening')
            ->when($search, function ($q, $search) {
                $q->where('nama_suplayer', 'like', "%{$search}%")
                  ->orWhere('produk', 'like', "%{$search}%")
                  ->orWhere('nohp', 'like', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate(10);
        $suplayer->appends(['search' => $search]);
        $kode = 'SPB-'.rand(0, 100000);

        return Inertia::render('Admin/SuplayerPembelianBahan', compact('suplayer', 'kode'));
    }

    public function store(Request $request)
    {
        $request->validate($this->rules());

        $sp = new SuplayerPembelianBahan;
        $sp->kode = $request->kode;
        $sp->nama_suplayer = $request->nama_suplayer;
        $sp->alamat = $request->alamat;
        $sp->nohp = str_replace('-', '', $request->nohp);
        $sp->produk = $request->produk;
        $sp->harga = str_replace('.', '', $request->harga);
        $sp->jatuh_tempo = $request->jatuh_tempo;
        $sp->save();

        $this->saveRekening($request, $sp);

        return redirect()->back()->with('success', 'Data suplayer pembelian bahan berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $request->validate($this->rules());

        $sp = SuplayerPembelianBahan::findOrFail($id);
        $sp->kode = $request->kode;
        $sp->nama_suplayer = $request->nama_suplayer;
        $sp->alamat = $request->alamat;
        $sp->nohp = str_replace('-', '', $request->nohp);
        $sp->produk = $request->produk;
        $sp->harga = str_replace('.', '', $request->harga);
        $sp->jatuh_tempo = $request->jatuh_tempo;
        $sp->update();

        RekeningSuplayerPembelianBahan::where('id_suplayer_pembelian_bahan', $id)->delete();
        $this->saveRekening($request, $sp);

        return redirect()->back()->with('success', 'Data suplayer pembelian bahan berhasil diubah');
    }

    public function delete($id)
    {
        $sp = SuplayerPembelianBahan::findOrFail($id);
        $sp->delete();

        return redirect()->back()->with('success', 'Data suplayer pembelian bahan berhasil dihapus');
    }

    private function rules(): array
    {
        return [
            'kode' => 'required',
            'nama_suplayer' => 'required',
            'alamat' => 'required',
            'nohp' => 'required',
            'produk' => 'required',
            'harga' => 'required',
            'jatuh_tempo' => 'nullable|string|max:50',
            'rekening' => 'nullable|array|max:2',
            'rekening.*.nama_bank' => 'required_with:rekening.*.no_rekening|max:30',
            'rekening.*.no_rekening' => 'required_with:rekening.*.nama_bank|max:30',
            'rekening.*.nama_rekening' => 'required_with:rekening.*.nama_bank',
        ];
    }

    private function saveRekening(Request $request, SuplayerPembelianBahan $sp): void
    {
        if (! $request->rekening) {
            return;
        }

        foreach ($request->rekening as $rek) {
            if ($rek['nama_bank'] && $rek['no_rekening'] && $rek['nama_rekening']) {
                $r = new RekeningSuplayerPembelianBahan;
                $r->id_suplayer_pembelian_bahan = $sp->id;
                $r->nama_bank = $rek['nama_bank'];
                $r->no_rekening = $rek['no_rekening'];
                $r->nama_rekening = $rek['nama_rekening'];
                $r->save();
            }
        }
    }
}
