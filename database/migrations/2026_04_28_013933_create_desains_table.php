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
        Schema::create('desains', function (Blueprint $table) {
            $table->id();
            $table->string('tanggal', 16);
            $table->string('kode_spk', 30);
            $table->string('no_antrian', 30);
            $table->string('id_customer', 50);
            $table->string('id_kategori_desain', 50);
            $table->string('qty', 11);
            $table->string('id_desain', 11);
            $table->string('status', 11);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('desains');
    }
};
