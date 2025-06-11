import React, { useEffect, useState } from "react";
import DokterForm from "./DokterForm";

const DokterList = () => {
  const [dokters, setDokters] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchDokters = () => {
    fetch("http://127.0.0.1:8000/api/dokter")
      .then((res) => res.json())
      .then((data) => setDokters(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchDokters();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus dokter ini?")) {
      fetch(`http://127.0.0.1:8000/api/dokter/${id}`, { method: "DELETE" })
        .then(() => fetchDokters())
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleFormClose = () => {
    setEditingId(null);
    fetchDokters();
  };

  return (
    <div className="container mt-4">
      <h2>Daftar Dokter</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => setEditingId("new")}
      >
        Tambah Dokter
      </button>

      {editingId && (
        <DokterForm
          dokterId={editingId === "new" ? null : editingId}
          onClose={handleFormClose}
        />
      )}

      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Spesialis</th>
            <th>Jadwal Praktik</th>
            <th>No. STR</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dokters.length > 0 ? (
            dokters.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.nama}</td>
                <td>{d.spesialis}</td>
                <td>{d.jadwal_praktik}</td>
                <td>{d.no_str}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(d.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(d.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Tidak ada data dokter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DokterList;
