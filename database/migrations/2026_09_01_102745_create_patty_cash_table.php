<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patty_cash', function (Blueprint $table) {
            $table->id();
            $table->string('kode_transaksi');
            $table->date('tanggal_transaksi');
            $table->string('type');
            $table->string('jenis_biaya');
            $table->decimal('nominal_transaksi', 15, 2)->default(0);
            $table->decimal('saldo_awal', 15, 2)->default(0);
            $table->decimal('saldo_setelah_transaksi', 15, 2)->default(0);
            $table->unsignedBigInteger('id_user')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patty_cash');
    }
};
