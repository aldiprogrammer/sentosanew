<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Suplayer extends Model
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
        return $this->hasMany(RekeningSuplayer::class, 'id_suplayer');
    }
}
