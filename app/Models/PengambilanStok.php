<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PengambilanStok extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'item_stok_data' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(Pengguna::class);
    }

    public function bahanPakai()
    {
        return $this->belongsTo(Bahanpakai::class, 'kode_bahan_pakai', 'kode_bahan');
    }
}
