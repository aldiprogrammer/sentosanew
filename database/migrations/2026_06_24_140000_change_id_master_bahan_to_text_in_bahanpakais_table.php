<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bahanpakais', function (Blueprint $table) {
            $table->text('id_master_bahan')->nullable()->change();
        });

        $rows = DB::table('bahanpakais')
            ->whereNotNull('id_master_bahan')
            ->where('id_master_bahan', 'NOT LIKE', '[%')
            ->get();

        foreach ($rows as $row) {
            DB::table('bahanpakais')
                ->where('id', $row->id)
                ->update(['id_master_bahan' => json_encode([$row->id_master_bahan])]);
        }
    }

    public function down(): void
    {
        $rows = DB::table('bahanpakais')
            ->whereNotNull('id_master_bahan')
            ->where('id_master_bahan', 'LIKE', '[%')
            ->get();

        foreach ($rows as $row) {
            $decoded = json_decode($row->id_master_bahan, true);
            $first = is_array($decoded) ? ($decoded[0] ?? null) : null;
            DB::table('bahanpakais')
                ->where('id', $row->id)
                ->update(['id_master_bahan' => $first]);
        }

        Schema::table('bahanpakais', function (Blueprint $table) {
            $table->string('id_master_bahan', 30)->nullable()->change();
        });
    }
};
