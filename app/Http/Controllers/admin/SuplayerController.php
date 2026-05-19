<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\RekeningSuplayer;
use App\Models\Suplayer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuplayerController extends Controller
{
    public function index()
    {
        $suplayer = Suplayer::with('rekening')->get();
        $kode = 'SP-'.rand(0, 100000);

        return Inertia::render('Admin/Suplayer', compact('suplayer', 'kode'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode' => 'required',
            'nama_suplayer' => 'required',
            'alamat' => 'required',
            'nohp' => 'required',
            'produk' => 'required',
            'harga' => 'required',
            'rekening' => 'nullable|array|max:2',
            'rekening.*.nama_bank' => 'required_with:rekening.*.no_rekening|max:30',
            'rekening.*.no_rekening' => 'required_with:rekening.*.nama_bank|max:30',
            'rekening.*.nama_rekening' => 'required_with:rekening.*.nama_bank',
        ]);

        $sp = new Suplayer;
        $sp->kode = $request->kode;
        $sp->nama_suplayer = $request->nama_suplayer;
        $sp->alamat = $request->alamat;
        $sp->nohp = str_replace('-', '', $request->nohp);
        $sp->produk = $request->produk;
        $sp->harga = str_replace('.', '', $request->harga);
        $sp->save();

        if ($request->rekening) {
            foreach ($request->rekening as $rek) {
                if ($rek['nama_bank'] && $rek['no_rekening'] && $rek['nama_rekening']) {
                    $r = new RekeningSuplayer;
                    $r->id_suplayer = $sp->id;
                    $r->nama_bank = $rek['nama_bank'];
                    $r->no_rekening = $rek['no_rekening'];
                    $r->nama_rekening = $rek['nama_rekening'];
                    $r->save();
                }
            }
        }

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'kode' => 'required',
            'nama_suplayer' => 'required',
            'alamat' => 'required',
            'nohp' => 'required',
            'produk' => 'required',
            'harga' => 'required',
            'rekening' => 'nullable|array|max:2',
            'rekening.*.nama_bank' => 'required_with:rekening.*.no_rekening|max:30',
            'rekening.*.no_rekening' => 'required_with:rekening.*.nama_bank|max:30',
            'rekening.*.nama_rekening' => 'required_with:rekening.*.nama_bank',
        ]);

        $sp = Suplayer::find($id);
        $sp->kode = $request->kode;
        $sp->nama_suplayer = $request->nama_suplayer;
        $sp->alamat = $request->alamat;
        $sp->nohp = str_replace('-', '', $request->nohp);
        $sp->produk = $request->produk;
        $sp->harga = str_replace('.', '', $request->harga);
        $sp->update();

        // Hapus rekening lama, simpan ulang
        RekeningSuplayer::where('id_suplayer', $id)->delete();

        if ($request->rekening) {
            foreach ($request->rekening as $rek) {
                if ($rek['nama_bank'] && $rek['no_rekening'] && $rek['nama_rekening']) {
                    $r = new RekeningSuplayer;
                    $r->id_suplayer = $sp->id;
                    $r->nama_bank = $rek['nama_bank'];
                    $r->no_rekening = $rek['no_rekening'];
                    $r->nama_rekening = $rek['nama_rekening'];
                    $r->save();
                }
            }
        }

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function delete($id)
    {
        $sp = Suplayer::find($id);
        $sp->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
