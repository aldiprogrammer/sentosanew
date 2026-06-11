<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('otorisasis', function (Blueprint $table) {
            $table->id();
            $table->string('kode_spk', 20);
            $table->foreignId('id_customer')->constrained('customers')->cascadeOnDelete();
            $table->date('tanggal_pengajuan');
            $table->date('tanggal_disetujui')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('otorisasis');
    }
};
