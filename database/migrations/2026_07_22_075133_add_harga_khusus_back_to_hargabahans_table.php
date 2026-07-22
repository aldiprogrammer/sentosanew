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
        Schema::table('hargabahans', function (Blueprint $table) {
            if (! Schema::hasColumn('hargabahans', 'harga_khusus')) {
                $table->string('harga_khusus', 50)->nullable()->after('harga_member');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hargabahans', function (Blueprint $table) {
            if (Schema::hasColumn('hargabahans', 'harga_khusus')) {
                $table->dropColumn('harga_khusus');
            }
        });
    }
};
