<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pasien;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PasienApiController extends Controller
{
    public function index()
    {
        $pasien = Pasien::all();
        return response()->json($pasien);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nik' => 'required|string|unique:pasien,nik',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'no_hp' => 'required|string|max:20',
        ]);

        $pasien = Pasien::create($validated);
        return response()->json($pasien, 201);
    }

    public function show($id)
    {
        try {
            $pasien = Pasien::findOrFail($id);
            return response()->json($pasien);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Pasien tidak ditemukan'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $pasien = Pasien::findOrFail($id);

            $validated = $request->validate([
                'nama' => 'sometimes|required|string|max:255',
                'nik' => 'sometimes|required|string|unique:pasien,nik,' . $id,
                'tanggal_lahir' => 'sometimes|required|date',
                'alamat' => 'sometimes|required|string',
                'no_hp' => 'sometimes|required|string|max:20',
            ]);

            $pasien->update($validated);

            return response()->json($pasien);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Pasien tidak ditemukan'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            $pasien = Pasien::findOrFail($id);
            $pasien->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Pasien tidak ditemukan'], 404);
        }
    }
}
