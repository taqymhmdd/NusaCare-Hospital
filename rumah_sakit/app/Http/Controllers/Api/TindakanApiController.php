<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tindakan;
use Illuminate\Http\Request;

class TindakanApiController extends Controller
{
    public function index()
    {
        return response()->json(Tindakan::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_tindakan' => 'required|string|max:255',
            'biaya' => 'required|numeric',
            'kode_icd' => 'nullable|string|max:255',
        ]);

        $tindakan = Tindakan::create($validated);

        return response()->json($tindakan, 201);
    }

    public function show($id)
    {
        $tindakan = Tindakan::findOrFail($id);
        return response()->json($tindakan);
    }

    public function update(Request $request, $id)
    {
        $tindakan = Tindakan::findOrFail($id);

        $validated = $request->validate([
            'nama_tindakan' => 'sometimes|string|max:255',
            'biaya' => 'sometimes|numeric',
            'kode_icd' => 'nullable|string|max:255',
        ]);

        $tindakan->update($validated);

        return response()->json($tindakan);
    }

    public function destroy($id)
    {
        $tindakan = Tindakan::findOrFail($id);
        $tindakan->delete();

        return response()->json(null, 204);
    }
}
