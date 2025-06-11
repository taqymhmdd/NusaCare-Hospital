import React, { useEffect, useState } from "react";

const DetailTindakanForm = ({ detailId, onClose }) => {
  const [form, setForm] = useState({
    kunjungan_id: "",
    tindakan_id: "",
    keterangan: "",
    subtotal: "",
  });

  const [kunjunganList, setKunjunganList] = useState([]);
  const [tindakanList, setTindakanList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/kunjungan")
      .then((res) => res.json())
      .then((data) => setKunjunganList(data));

    fetch("http://127.0.0.1:8000/api/tindakan")
      .then((res) => res.json())
      .then((data) => setTindakanList(data));

    if (detailId) {
      fetch(`http://127.0.0.1:8000/api/detail_tindakan/${detailId}`)
        .then((res) => res.json())
        .then((data) => setForm(data))
        .catch((err) => console.error(err));
    }
  }, [detailId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = detailId ? "PUT" : "POST";
    const url = detailId
      ? `http://127.0.0.1:8000/api/detail_tindakan/${detailId}`
      : `http://127.0.0.1:8000/api/detail_tindakan`;

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
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
          {detailId ? "Edit Detail Tindakan" : "Tambah Detail Tindakan"}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Kunjungan</label>
            <select
              name="kunjungan_id"
              className="form-select"
              value={form.kunjungan_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Pilih Kunjungan --</option>
              {kunjunganList.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.id} - {k.tanggal}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Tindakan</label>
            <select
              name="tindakan_id"
              className="form-select"
              value={form.tindakan_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Pilih Tindakan --</option>
              {tindakanList.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nama} (Rp {parseInt(t.biaya).toLocaleString("id-ID")})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Keterangan</label>
            <input
              type="text"
              name="keterangan"
              className="form-control"
              value={form.keterangan}
              onChange={handleChange}
              placeholder="Catatan tambahan..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Subtotal (Rp)</label>
            <input
              type="number"
              name="subtotal"
              className="form-control"
              value={form.subtotal}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary me-2">
            {detailId ? "Update" : "Simpan"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Batal
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailTindakanForm;
