<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PasienApiController;
use App\Http\Controllers\Api\DokterApiController;
use App\Http\Controllers\Api\KunjunganApiController;
use App\Http\Controllers\Api\TindakanApiController;
use App\Http\Controllers\Api\DetailTindakanApiController;

// Tes koneksi API
Route::post('/tes', function () {
    return response()->json(['message' => 'tes berhasil']);
});

// CRUD API
Route::apiResource('pasien', PasienApiController::class);
Route::apiResource('dokter', DokterApiController::class);
Route::apiResource('kunjungan', KunjunganApiController::class);
Route::apiResource('tindakan', TindakanApiController::class);
Route::apiResource('detail_tindakan', DetailTindakanApiController::class);
