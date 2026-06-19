<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hargabahan extends Model
{
    protected $fillable = [
        'kode_bahan',
        'sisi',
        'qty_min',
        'qty_max',
        'harga_po',
        'harga_umum',
        'harga_member',
        'harga_khusus',
        'harga_custome',
    ];
}
