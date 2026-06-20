<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RekeningSuplayerPembelianBahan extends Model
{
    protected $fillable = [
        'id_suplayer_pembelian_bahan',
        'nama_bank',
        'no_rekening',
        'nama_rekening',
    ];

    public function suplayer()
    {
        return $this->belongsTo(SuplayerPembelianBahan::class, 'id_suplayer_pembelian_bahan');
    }
}
