import React, { useState, useEffect } from "react";

const initialForm = {
  nama: "",
  nik: "",
  tanggal_lahir: "",
  jenis_kelamin: "Laki-laki",
  alamat: "",
  no_hp: "",
};

export default function PasienForm({ pasienId, onSuccess, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pasienId) {
      setLoading(true);
      fetch(`http://127.0.0.1:8000/api/pasien/${pasienId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Data tidak ditemukan");
          return res.json();
        })
        .then((data) => {
          setForm({
            nama: data.nama || "",
            nik: data.nik || "",
            tanggal_lahir: data.tanggal_lahir || "",
            jenis_kelamin: data.jenis_kelamin || "Laki-laki",
            alamat: data.alamat || "",
            no_hp: data.no_hp || "",
          });
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setForm(initialForm);
    }
  }, [pasienId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Validasi sederhana
    if (!form.nama || !form.nik || !form.tanggal_lahir || !form.no_hp) {
      setError("Harap isi semua field wajib.");
      return;
    }

    setLoading(true);
    const method = pasienId ? "PUT" : "POST";
    const url = pasienId
      ? `http://127.0.0.1:8000/api/pasien/${pasienId}`
      : "http://127.0.0.1:8000/api/pasien";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal menyimpan data");
        return res.json();
      })
      .then(() => {
        setLoading(false);
        if (onSuccess) onSuccess();
        setForm(initialForm);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || "Terjadi kesalahan");
      });
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h3 className="mb-4 text-center">{pasienId ? "Edit Pasien" : "Tambah Pasien"}</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading && (
        <div className="d-flex justify-content-center mb-3">
          <div className="spinner-border text-primary" role="status" />
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Lengkap <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="form-control"
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nik" className="form-label">
            NIK <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="nik"
            name="nik"
            value={form.nik}
            onChange={handleChange}
            className="form-control"
            placeholder="Masukkan NIK"
            required
            maxLength={16}
            pattern="\d*"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tanggal_lahir" className="form-label">
            Tanggal Lahir <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            id="tanggal_lahir"
            name="tanggal_lahir"
            value={form.tanggal_lahir}
            onChange={handleChange}
            className="form-control"
            required
            max={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="jenis_kelamin" className="form-label">
            Jenis Kelamin
          </label>
          <select
            id="jenis_kelamin"
            name="jenis_kelamin"
            value={form.jenis_kelamin}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="alamat" className="form-label">
            Alamat
          </label>
          <textarea
            id="alamat"
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            className="form-control"
            rows={3}
            placeholder="Masukkan alamat"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="no_hp" className="form-label">
            No HP <span className="text-danger">*</span>
          </label>
          <input
            type="tel"
            id="no_hp"
            name="no_hp"
            value={form.no_hp}
            onChange={handleChange}
            className="form-control"
            placeholder="08123456789"
            required
            pattern="^\d{9,15}$"
            title="Masukkan nomor telepon yang valid (9-15 digit)"
          />
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Batal
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {pasienId ? "Update" : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
