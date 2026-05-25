<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('no_antrian');
            $table->integer('id_desain')->nullable(0);
            $table->integer('id_produksi')->nullable(0);
            $table->string('id_bahan', 11);
            $table->string('qty', 11);
            $table->string('total_harga', 11);
            $table->string('metode_pembayaran', 30);
            $table->string('uang', 11);
            $table->string('kembalian', 11);
            $table->string('tanggal', 15);
            $table->integer('status')->nullable(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
