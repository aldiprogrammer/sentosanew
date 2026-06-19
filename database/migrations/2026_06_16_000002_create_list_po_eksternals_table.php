<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('list_po_eksternals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('po_eksternal_id');
            $table->string('invoice', 100)->nullable();
            $table->unsignedBigInteger('id_bahan')->nullable();
            $table->string('spk', 100)->nullable();
            $table->decimal('tinggi', 12, 2)->default(0);
            $table->decimal('lebar', 12, 2)->default(0);
            $table->decimal('luas', 12, 2)->default(0);
            $table->decimal('qty', 12, 2)->default(0);
            $table->decimal('harga', 15, 2)->default(0);
            $table->decimal('total', 15, 2)->default(0);
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('list_po_eksternals');
    }
};
