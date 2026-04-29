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
        Schema::create('distributors', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 30);
            $table->string('kode', 30);
            $table->string('alamat');
            $table->string('kota', 30);
            $table->string('nohp', 15);
            $table->string('bank', 20);
            $table->string('norek', 20);
            $table->string('jt', 15);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('distributors');
    }
};
