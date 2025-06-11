import React, { useEffect, useState } from "react";

const DokterForm = ({ dokterId, onClose }) => {
  const [formData, setFormData] = useState({
    nama: "",
    spesialis: "",
    jadwal_praktik: "",
    no_str: "",
  });

  useEffect(() => {
    if (dokterId) {
      fetch(`http://127.0.0.1:8000/api/dokter/${dokterId}`)
        .then((res) => res.json())
        .then((data) => setFormData({
          nama: data.nama || "",
          spesialis: data.spesialis || "",
          jadwal_praktik: data.jadwal_praktik || "",
          no_str: data.no_str || "",
        }))
        .catch((err) => console.error(err));
    } else {
      setFormData({
        nama: "",
        spesialis: "",
        jadwal_praktik: "",
        no_str: "",
      });
    }
  }, [dokterId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = dokterId ? "PUT" : "POST";
    const url = dokterId
      ? `http://127.0.0.1:8000/api/dokter/${dokterId}`
      : "http://127.0.0.1:8000/api/dokter";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        onClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="card p-3 mb-4">
      <h4>{dokterId ? "Edit Dokter" : "Tambah Dokter"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama</label>
          <input
            type="text"
            name="nama"
            className="form-control"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Spesialis</label>
          <input
            type="text"
            name="spesialis"
            className="form-control"
            value={formData.spesialis}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Jadwal Praktik</label>
          <input
            type="text"
            name="jadwal_praktek"
            className="form-control"
            value={formData.jadwal_praktik}
            onChange={handleChange}
            placeholder="Misal: Senin 08.00-12.00"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">No. STR</label>
          <input
            type="text"
            name="no_str"
            className="form-control"
            value={formData.no_str}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success me-2">
          Simpan
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
        >
          Batal
        </button>
      </form>
    </div>
  );
};

export default DokterForm;
