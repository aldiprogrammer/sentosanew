<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('desains', function (Blueprint $table) {
            $table->text('alasan_pembatalan')->nullable()->after('pembayaran');
        });
    }

    public function down(): void
    {
        Schema::table('desains', function (Blueprint $table) {
            $table->dropColumn('alasan_pembatalan');
        });
    }
};
