<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RekeningSuplayer extends Model
{
    protected $fillable = ['id_suplayer', 'nama_bank', 'no_rekening', 'nama_rekening'];

    public function suplayer()
    {
        return $this->belongsTo(Suplayer::class, 'id_suplayer');
    }
}
