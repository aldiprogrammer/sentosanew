<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bahan extends Model
{
    protected $fillable = [
        'kode',
        'bahan',
        'kategori',
        'satuan',
        'jenis',
        'kategori_cetak',
        'jenis_bahan',
        'klik',
        'harga',
        'cara_perhitungan',
    ];
}
