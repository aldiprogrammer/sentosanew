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
        Schema::create('suplayers', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 30);
            $table->string('nama_suplayer', 40);
            $table->string('alamat');
            $table->string('nohp', 16);
            $table->string('produk', 50);
            $table->string('harga', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suplayers');
    }
};
