<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('po_pembelian_bahans', function (Blueprint $table) {
            $table->string('diskon', 100)->nullable()->after('hal');
            $table->string('ppn')->nullable()->after('diskon');
            $table->decimal('sub_total', 15, 2)->default(0)->after('ppn');
        });
    }

    public function down(): void
    {
        Schema::table('po_pembelian_bahans', function (Blueprint $table) {
            $table->dropColumn(['diskon', 'ppn', 'sub_total']);
        });
    }
};
