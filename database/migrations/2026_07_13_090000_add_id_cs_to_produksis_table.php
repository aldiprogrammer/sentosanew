<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // public function up(): void
    // {
    //     Schema::table('produksis', function (Blueprint $table) {
    //         $table->string('id_cs', 11)->nullable()->after('id_desainer');
    //     });
    // }

    public function down(): void
    {
        Schema::table('produksis', function (Blueprint $table) {
            $table->dropColumn('id_cs');
        });
    }
};
