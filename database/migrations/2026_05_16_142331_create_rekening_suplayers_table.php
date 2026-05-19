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
        Schema::create('rekening_suplayers', function (Blueprint $table) {
            $table->id();
            $table->string('id_suplayaer', 11);
            $table->string('nama_bank', 30);
            $table->string('no_rekening', 30);
            $table->string('nama_rekening');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekening_suplayers');
    }
};
