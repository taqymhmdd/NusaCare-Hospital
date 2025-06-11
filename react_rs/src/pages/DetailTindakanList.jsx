import React, { useEffect, useState } from "react";
import DetailTindakanForm from "./DetailTindakanForm";

const DetailTindakanList = () => {
  const [details, setDetails] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchDetails = () => {
    fetch("http://127.0.0.1:8000/api/detail_tindakan")
      .then((res) => res.json())
      .then((data) => setDetails(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus detail tindakan ini?")) {
      fetch(`http://127.0.0.1:8000/api/detail_tindakan/${id}`, {
        method: "DELETE",
      })
        .then(() => fetchDetails())
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleFormClose = () => {
    setEditingId(null);
    fetchDetails();
  };

  return (
    <div className="container mt-4">
      <h2>Daftar Detail Tindakan</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => setEditingId("new")}
      >
        Tambah Detail Tindakan
      </button>

      {editingId && (
        <DetailTindakanForm
          detailId={editingId === "new" ? null : editingId}
          onClose={handleFormClose}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Kunjungan</th>
            <th>ID Tindakan</th>
            <th>Keterangan</th>
            <th>Subtotal (Rp)</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {details.length > 0 ? (
            details.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.kunjungan_id}</td>
                <td>{d.tindakan_id}</td>
                <td>{d.keterangan}</td>
                <td>{parseInt(d.subtotal).toLocaleString("id-ID")}</td>
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
                Tidak ada data detail tindakan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DetailTindakanList;
