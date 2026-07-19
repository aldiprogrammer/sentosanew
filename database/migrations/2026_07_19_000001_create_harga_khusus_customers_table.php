<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('harga_khusus_customers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('hargabahan_id');
            $table->unsignedBigInteger('customer_id');
            $table->string('harga', 20)->nullable();
            $table->timestamps();

            $table->foreign('hargabahan_id')->references('id')->on('hargabahans')->cascadeOnDelete();
            $table->foreign('customer_id')->references('id')->on('customers')->cascadeOnDelete();
            $table->unique(['hargabahan_id', 'customer_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('harga_khusus_customers');
    }
};
