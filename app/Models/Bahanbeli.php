<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bahanbeli extends Model
{
    protected $guarded = [];

    public function masterBahan()
    {
        return $this->belongsTo(Materbahan::class, 'id_master_bahan', 'kode_bahan_pakai');
    }
}
