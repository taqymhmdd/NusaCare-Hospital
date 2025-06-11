import React, { useEffect, useState } from "react";
import PasienForm from "./PasienForm";

export default function PasienList() {
  const [pasienList, setPasienList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchPasien = () => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/pasien")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data pasien");
        return res.json();
      })
      .then((data) => {
        setPasienList(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPasien();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Yakin ingin menghapus pasien ini?")) return;

    fetch(`http://127.0.0.1:8000/api/pasien/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal menghapus pasien");
        fetchPasien();
      })
      .catch((err) => alert(err.message));
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    fetchPasien();
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Daftar Pasien</h2>

      {!showForm && (
        <button className="btn btn-success mb-3" onClick={handleAddNew}>
          Tambah Pasien Baru
        </button>
      )}

      {showForm && (
        <PasienForm
          pasienId={editingId}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}

      {!showForm && (
        <>
          {loading && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status" />
            </div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          {!loading && !error && pasienList.length === 0 && (
            <div className="alert alert-info">Belum ada data pasien.</div>
          )}

          {!loading && pasienList.length > 0 && (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>NIK</th>
                  <th>Tanggal Lahir</th>
                  <th>Jenis Kelamin</th>
                  <th>Alamat</th>
                  <th>No HP</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pasienList.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nama}</td>
                    <td>{p.nik}</td>
                    <td>{p.tanggal_lahir}</td>
                    <td>{p.jenis_kelamin}</td>
                    <td>{p.alamat}</td>
                    <td>{p.no_hp}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEdit(p.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
