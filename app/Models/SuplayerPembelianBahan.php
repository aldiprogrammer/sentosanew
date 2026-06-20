<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuplayerPembelianBahan extends Model
{
    protected $fillable = [
        'kode',
        'nama_suplayer',
        'alamat',
        'nohp',
        'produk',
        'harga',
        'jatuh_tempo',
    ];

    public function rekening()
    {
        return $this->hasMany(RekeningSuplayerPembelianBahan::class, 'id_suplayer_pembelian_bahan');
    }
}
