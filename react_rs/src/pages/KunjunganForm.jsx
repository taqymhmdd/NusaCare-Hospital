import React, { useEffect, useState } from "react";

const KunjunganForm = ({ kunjunganId, onClose }) => {
  const [formData, setFormData] = useState({
    pasien_id: "",
    dokter_id: "",
    tanggal: "",
    keluhan: "",
  });

  const [pasienList, setPasienList] = useState([]);
  const [dokterList, setDokterList] = useState([]);

  useEffect(() => {
    // Load list pasien & dokter untuk dropdown
    fetch("http://127.0.0.1:8000/api/pasien")
      .then((res) => res.json())
      .then((data) => setPasienList(data))
      .catch((err) => console.error(err));

    fetch("http://127.0.0.1:8000/api/dokter")
      .then((res) => res.json())
      .then((data) => setDokterList(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (kunjunganId) {
      fetch(`http://127.0.0.1:8000/api/kunjungan/${kunjunganId}`)
        .then((res) => res.json())
        .then((data) =>
          setFormData({
            pasien_id: data.pasien_id || "",
            dokter_id: data.dokter_id || "",
            tanggal: data.tanggal ? data.tanggal.substring(0, 10) : "",
            keluhan: data.keluhan || "",
          })
        )
        .catch((err) => console.error(err));
    } else {
      setFormData({
        pasien_id: "",
        dokter_id: "",
        tanggal: "",
        keluhan: "",
      });
    }
  }, [kunjunganId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = kunjunganId ? "PUT" : "POST";
    const url = kunjunganId
      ? `http://127.0.0.1:8000/api/kunjungan/${kunjunganId}`
      : "http://127.0.0.1:8000/api/kunjungan";

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
      <h4>{kunjunganId ? "Edit Kunjungan" : "Tambah Kunjungan"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Pasien</label>
          <select
            name="pasien_id"
            className="form-select"
            value={formData.pasien_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Pasien --</option>
            {pasienList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Dokter</label>
          <select
            name="dokter_id"
            className="form-select"
            value={formData.dokter_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Dokter --</option>
            {dokterList.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nama} ({d.spesialis})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Tanggal</label>
          <input
            type="date"
            name="tanggal"
            className="form-control"
            value={formData.tanggal}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Keluhan</label>
          <textarea
            name="keluhan"
            className="form-control"
            rows="3"
            value={formData.keluhan}
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
  );
};

export default KunjunganForm;
