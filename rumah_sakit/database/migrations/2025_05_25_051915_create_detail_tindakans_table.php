<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailTindakansTable extends Migration
{
    public function up()
    {
        Schema::create('detail_tindakans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kunjungan_id')->constrained('kunjungans')->onDelete('cascade');
            $table->foreignId('tindakan_id')->constrained('tindakans')->onDelete('cascade');
            $table->string('keterangan')->nullable();
            $table->integer('subtotal'); // total biaya tindakan di kunjungan ini
            $table->timestamps();

            $table->unique(['kunjungan_id', 'tindakan_id']); // optional, agar tidak ada duplikat tindakan sama di satu kunjungan
        });
    }

    public function down()
    {
        Schema::dropIfExists('detail_tindakans');
    }
}
