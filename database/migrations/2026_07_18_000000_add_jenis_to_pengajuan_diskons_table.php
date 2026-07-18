<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pengajuan_diskons', function (Blueprint $table) {
            $table->enum('jenis', ['desain', 'produksi'])->default('produksi')->after('no_invoice');
        });
    }

    public function down(): void
    {
        Schema::table('pengajuan_diskons', function (Blueprint $table) {
            $table->dropColumn('jenis');
        });
    }
};
