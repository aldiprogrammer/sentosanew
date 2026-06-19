<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('po_pembelian_bahans', function (Blueprint $table) {
            $table->id();
            $table->date('tgl');
            $table->string('no_po', 30);
            $table->unsignedBigInteger('id_suplayer')->nullable();
            $table->string('hal', 200)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('po_pembelian_bahans');
    }
};
