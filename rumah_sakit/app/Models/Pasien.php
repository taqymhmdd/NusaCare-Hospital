<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    use HasFactory;

    protected $table = 'pasien'; // ini supaya Laravel gak default cari 'pasiens'

    protected $fillable = [
        'nama', 'nik', 'tanggal_lahir', 'alamat', 'no_hp', 'jenis_kelamin'
    ];

    public function kunjungans()
    {
        return $this->hasMany(Kunjungan::class);
    }
}
