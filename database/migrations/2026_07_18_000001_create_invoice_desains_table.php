<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoice_desains', function (Blueprint $table) {
            $table->id();
            $table->string('no_invoice', 50);
            $table->string('id_customer', 11)->nullable();
            $table->string('customer', 100)->nullable();
            $table->string('harga_awal', 30)->default('0');
            $table->string('diskon', 30)->nullable();
            $table->enum('mode_diskon', ['persen', 'rupiah'])->nullable();
            $table->string('harga_akhir', 30)->default('0');
            $table->string('tanggal', 15)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoice_desains');
    }
};
