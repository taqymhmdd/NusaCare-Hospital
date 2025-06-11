<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tindakan extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_tindakan',
        'biaya',
        'kode_icd',
    ];

    // Relasi many-to-many dengan kunjungan
    public function kunjungan()
    {
        return $this->belongsToMany(Kunjungan::class, 'detail_tindakans', 'tindakan_id', 'kunjungan_id');
    }
}
