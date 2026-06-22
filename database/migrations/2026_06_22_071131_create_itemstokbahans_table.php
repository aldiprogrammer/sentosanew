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
        Schema::create('itemstokbahans', function (Blueprint $table) {
            $table->id();
            $table->string('kode_bahan_beli', 30);
            $table->string('luas', 30);
            $table->string('qty', 30);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('itemstokbahans');
    }
};
