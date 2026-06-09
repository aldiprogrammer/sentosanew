<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jabatan extends Model
{
    protected $fillable = [
        'kode',
        'jabatan',
        'menu_akses',
    ];

    protected function casts(): array
    {
        return [
            'menu_akses' => 'array',
        ];
    }
}
