<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\NomorRekening;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NomorRekeningController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $rekening = NomorRekening::when($search, function ($q, $search) {
            $q->where('nama_bank', 'like', "%{$search}%")
                ->orWhere('nomor_rekening', 'like', "%{$search}%")
                ->orWhere('atas_nama', 'like', "%{$search}%");
        })
            ->orderBy('id', 'desc')
            ->paginate(10);
        $rekening->appends(['search' => $search]);

        return Inertia::render('Admin/NomorRekening', compact('rekening'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_bank' => ['required', 'string', 'max:100'],
            'nomor_rekening' => ['required', 'string', 'max:50'],
            'atas_nama' => ['required', 'string', 'max:150'],
        ]);

        NomorRekening::create($data);

        return redirect()->back()->with('success', 'Nomor rekening berhasil ditambah');
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'nama_bank' => ['required', 'string', 'max:100'],
            'nomor_rekening' => ['required', 'string', 'max:50'],
            'atas_nama' => ['required', 'string', 'max:150'],
        ]);

        $rekening = NomorRekening::findOrFail($id);
        $rekening->nama_bank = $data['nama_bank'];
        $rekening->nomor_rekening = $data['nomor_rekening'];
        $rekening->atas_nama = $data['atas_nama'];
        $rekening->update();

        return redirect()->back()->with('success', 'Nomor rekening berhasil diubah');
    }

    public function delete($id)
    {
        $rekening = NomorRekening::findOrFail($id);
        $rekening->delete();

        return redirect()->back()->with('success', 'Nomor rekening berhasil dihapus');
    }
}
