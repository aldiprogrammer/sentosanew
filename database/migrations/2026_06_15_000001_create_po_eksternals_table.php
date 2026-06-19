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
            $table->string('diskon', 100)->nullable();
            $table->string('ppn')->nullable();
            $table->string('total_harg')->nullable();
            $table->timestamps();

            // Foreign key constraints omitted due to type compatibility
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('po_eksternals');
    }
};
