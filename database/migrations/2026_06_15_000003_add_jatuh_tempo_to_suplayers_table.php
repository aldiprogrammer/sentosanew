<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('suplayers', function (Blueprint $table) {
            $table->string('jatuh_tempo', 50)->nullable()->after('harga');
        });
    }

    public function down(): void
    {
        Schema::table('suplayers', function (Blueprint $table) {
            $table->dropColumn('jatuh_tempo');
        });
    }
};
