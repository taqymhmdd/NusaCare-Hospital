import React, { useEffect, useState } from "react";
import KunjunganForm from "./KunjunganForm";

const KunjunganList = () => {
  const [kunjungans, setKunjungans] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchKunjungans = () => {
    fetch("http://127.0.0.1:8000/api/kunjungan")
      .then((res) => res.json())
      .then((data) => setKunjungans(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchKunjungans();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus kunjungan ini?")) {
      fetch(`http://127.0.0.1:8000/api/kunjungan/${id}`, { method: "DELETE" })
        .then(() => fetchKunjungans())
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleFormClose = () => {
    setEditingId(null);
    fetchKunjungans();
  };

  return (
    <div className="container mt-4">
      <h2>Daftar Kunjungan</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => setEditingId("new")}
      >
        Tambah Kunjungan
      </button>

      {editingId && (
        <KunjunganForm
          kunjunganId={editingId === "new" ? null : editingId}
          onClose={handleFormClose}
        />
      )}

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pasien</th>
            <th>Dokter</th>
            <th>Tanggal</th>
            <th>Keluhan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kunjungans.length > 0 ? (
            kunjungans.map((k) => (
              <tr key={k.id}>
                <td>{k.id}</td>
                <td>{k.pasien?.nama || "N/A"}</td>
                <td>{k.dokter?.nama || "N/A"}</td>
                <td>{new Date(k.tanggal).toLocaleDateString()}</td>
                <td>{k.keluhan}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(k.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(k.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Tidak ada data kunjungan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default KunjunganList;
