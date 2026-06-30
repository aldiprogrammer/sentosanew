
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
        Schema::create('kategoridesains', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 15);
            $table->string('kategori', 30);
            $table->string('harga', 11);
            $table->string('status_point', 11);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategoridesains');
    }
};
