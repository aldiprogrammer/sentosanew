<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeeDesainTransaksi extends Model
{
    protected $guarded = [];

    public function desain()
    {
        return $this->belongsTo(Desain::class);
    }

    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class);
    }

    public function kategoriDesain()
    {
        return $this->belongsTo(Kategoridesain::class);
    }
}
