import React, { useEffect, useState } from "react";
import TindakanForm from "./TindakanForm";

const TindakanList = () => {
  const [tindakans, setTindakans] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchTindakans = () => {
    fetch("http://127.0.0.1:8000/api/tindakan")
      .then((res) => res.json())
      .then((data) => setTindakans(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTindakans();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus tindakan ini?")) {
      fetch(`http://127.0.0.1:8000/api/tindakan/${id}`, { method: "DELETE" })
        .then(() => fetchTindakans())
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleFormClose = () => {
    setEditingId(null);
    fetchTindakans();
  };

  return (
    <div className="container mt-4">
      <h2>Daftar Tindakan</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => setEditingId("new")}
      >
        Tambah Tindakan
      </button>

      {editingId && (
        <TindakanForm
          tindakanId={editingId === "new" ? null : editingId}
          onClose={handleFormClose}
        />
      )}

      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Tindakan</th>
            <th>Biaya</th>
            <th>Kode ICD</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {tindakans.length > 0 ? (
            tindakans.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.nama_tindakan}</td>
                <td>Rp {parseInt(t.biaya).toLocaleString("id-ID")}</td>
                <td>{t.kode_icd}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(t.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(t.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Tidak ada data tindakan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TindakanList;
