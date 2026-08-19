<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Desain extends Model
{
    protected $fillable = [
        'alasan_pembatalan',
        'tarik_bon',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }

    public function kategoridesain()
    {
        return $this->belongsTo(Kategoridesain::class, 'id_kategori_desain');
    }

    public function desainer()
    {
        return $this->belongsTo(Pengguna::class, 'id_desain');
    }

    public function cs()
    {
        return $this->belongsTo(Pengguna::class, 'id_cs');
    }

    public function invoiceDesain()
    {
        return $this->belongsTo(InvoiceDesain::class, 'no_invoice', 'no_invoice');
    }
}
