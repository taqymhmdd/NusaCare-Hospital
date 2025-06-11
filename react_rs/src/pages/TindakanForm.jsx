import React, { useEffect, useState } from "react";

const TindakanForm = ({ tindakanId, onClose }) => {
  const [form, setForm] = useState({
    nama: "",
    biaya: "",
    kode_icd: "",
  });

  useEffect(() => {
    if (tindakanId) {
      fetch(`http://127.0.0.1:8000/api/tindakan/${tindakanId}`)
        .then((res) => res.json())
        .then((data) => setForm(data))
        .catch((err) => console.error(err));
    }
  }, [tindakanId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = tindakanId ? "PUT" : "POST";
    const url = tindakanId
      ? `http://127.0.0.1:8000/api/tindakan/${tindakanId}`
      : `http://127.0.0.1:8000/api/tindakan`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => onClose())
      .catch((err) => console.error(err));
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">
          {tindakanId ? "Edit Tindakan" : "Tambah Tindakan"}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama Tindakan</label>
            <input
              type="text"
              className="form-control"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Biaya</label>
            <input
              type="number"
              className="form-control"
              name="biaya"
              value={form.biaya}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Kode ICD</label>
            <input
              type="text"
              className="form-control"
              name="kode_icd"
              value={form.kode_icd}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success me-2">
            Simpan
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Batal
          </button>
        </form>
      </div>
    </div>
  );
};

export default TindakanForm;
