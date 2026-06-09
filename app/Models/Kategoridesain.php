<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kategoridesain extends Model
{
    protected $fillable = [
        'kode',
        'kategori',
        'harga',
        'qty',
        'fee',
        'status_point',
    ];
}
