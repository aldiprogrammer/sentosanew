<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Databahan extends Model
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
        'cara_perhitungan',
    ];

    public function hargaBahan()
    {
        return $this->hasMany(Hargabahan::class, 'kode_bahan', 'kode');
    }
}
