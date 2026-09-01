<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PattyCash extends Model
{
    protected $table = 'patty_cash';

    protected $guarded = [];

    protected $casts = [
        'tanggal_transaksi' => 'date',
        'nominal_transaksi' => 'decimal:2',
        'saldo_awal' => 'decimal:2',
        'saldo_setelah_transaksi' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(Pengguna::class, 'id_user');
    }
}
