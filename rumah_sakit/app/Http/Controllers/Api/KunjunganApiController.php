<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kunjungan;
use Illuminate\Http\Request;

class KunjunganApiController extends Controller
{
    public function index()
    {
        $kunjungans = Kunjungan::with(['pasien', 'dokter'])->get();
        return response()->json($kunjungans);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pasien_id' => 'required|exists:pasien,id',
            'dokter_id' => 'required|exists:dokters,id',
            'tanggal' => 'required|date',
            'keluhan' => 'required|string',
        ]);

        $kunjungan = Kunjungan::create($validated);

        return response()->json($kunjungan, 201);
    }

    public function show($id)
    {
        $kunjungan = Kunjungan::with(['pasien', 'dokter'])->findOrFail($id);
        return response()->json($kunjungan);
    }

    public function update(Request $request, $id)
    {
        $kunjungan = Kunjungan::findOrFail($id);

        $validated = $request->validate([
            'pasien_id' => 'sometimes|exists:pasien,id',
            'dokter_id' => 'sometimes|exists:dokters,id',
            'tanggal' => 'sometimes|date',
            'keluhan' => 'sometimes|string',
        ]);

        $kunjungan->update($validated);

        return response()->json($kunjungan);
    }

    public function destroy($id)
    {
        $kunjungan = Kunjungan::findOrFail($id);
        $kunjungan->delete();

        return response()->json(null, 204);
    }
}
