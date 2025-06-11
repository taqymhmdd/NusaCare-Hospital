<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailTindakan extends Model
{
    protected $fillable = [
        'kunjungan_id',
        'tindakan_id',
        'keterangan',
        'subtotal',
    ];

    public function kunjungan()
    {
        return $this->belongsTo(Kunjungan::class);
    }

    public function tindakan()
    {
        return $this->belongsTo(Tindakan::class);
    }
}
