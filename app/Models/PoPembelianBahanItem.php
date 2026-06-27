<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PoPembelianBahanItem extends Model
{
    protected $fillable = ['po_pembelian_bahan_id', 'id_bahan', 'panjang', 'lebar', 'luas', 'harga', 'qty', 'total_harga', 'satuan', 'keterangan'];

    public function bahan()
    {
        return $this->belongsTo(Bahanpakai::class, 'id_bahan');
    }

    public function po()
    {
        return $this->belongsTo(PoPembelianBahan::class, 'po_pembelian_bahan_id');
    }

    public function itemStok()
    {
        return $this->hasMany(Itemstokbahan::class, 'po_pembelian_bahan_item_id');
    }
}
