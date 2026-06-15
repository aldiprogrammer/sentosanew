<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('po_eksternals', function (Blueprint $table) {
            $table->id();
            $table->date('tgl');
            $table->string('no_po', 30)->unique();
            $table->string('hal', 200)->nullable();
            $table->unsignedBigInteger('id_distributor')->nullable();
            $table->string('mata_uang', 10)->nullable();
            $table->date('batas_bayar')->nullable();
            $table->unsignedBigInteger('id_suplayer')->nullable();
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

            // Foreign key constraints omitted due to type compatibility
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('po_eksternals');
    }
};
