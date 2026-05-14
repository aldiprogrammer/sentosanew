<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mata_ayams', function (Blueprint $table) {
            $table->id();
            $table->string('kode_spk', 50);
            $table->boolean('atas')->default(false);
            $table->boolean('bawah')->default(false);
            $table->boolean('kiri')->default(false);
            $table->boolean('kanan')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mata_ayams');
    }
};
