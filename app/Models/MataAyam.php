<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MataAyam extends Model
{
    protected $fillable = ['kode_spk', 'atas', 'bawah', 'kiri', 'kanan'];

    protected function casts(): array
    {
        return [
            'atas' => 'boolean',
            'bawah' => 'boolean',
            'kiri' => 'boolean',
            'kanan' => 'boolean',
        ];
    }

    public function produksi()
    {
        return $this->belongsTo(Produksi::class, 'kode_spk', 'kode_spk');
    }
}
