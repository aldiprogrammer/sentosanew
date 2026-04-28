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
        Schema::create('pinisings', function (Blueprint $table) {
            $table->id();
            $table->string('kode_spk', 50);
            $table->string('kantongan', 11);
            $table->string('lipat_pas_gambar', 11);
            $table->string('lipat_sisa_putih', 11);
            $table->string('potong_pas_gambar', 11);
            $table->string('sisa_putih', 11);
            $table->string('mata_ayam', 11);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pinisings');
    }
};
