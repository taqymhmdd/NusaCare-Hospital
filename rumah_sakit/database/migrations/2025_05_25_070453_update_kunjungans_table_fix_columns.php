<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateKunjungansTableFixColumns extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('kunjungans', function (Blueprint $table) {
            // Rename kolom tanggal_kunjungan jadi tanggal
            $table->renameColumn('tanggal_kunjungan', 'tanggal');

            // Hapus kolom tindakan
            $table->dropColumn('tindakan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('kunjungans', function (Blueprint $table) {
            // Balikkan rename kolom
            $table->renameColumn('tanggal', 'tanggal_kunjungan');

            // Tambahkan lagi kolom tindakan
            $table->string('tindakan')->nullable();
        });
    }
}
