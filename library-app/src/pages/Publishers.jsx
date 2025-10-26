import React, { useEffect, useState } from "react";
import { notify } from "../utils/notify";

export default function Publisher() {
  const [publishers, setPublishers] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", address: "" });

  // 🌐 Backend adresi: ortam değişkeninden al, yoksa localhost kullan
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  // 📦 Verileri getir
  useEffect(() => {
    fetch(`${API_URL}/api/publishers`)
      .then((res) => {
        if (!res.ok) throw new Error("Veri alınamadı");
        return res.json();
      })
      .then((data) => setPublishers(data))
      .catch(() => notify.error("Yayınevleri alınamadı ❌"));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 💾 Ekle / Güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!form.id;
    const method = isEdit ? "PUT" : "POST";
    if (isEdit) form.id = Number(form.id);

    const url = isEdit
      ? `${API_URL}/api/publishers/${form.id}`
      : `${API_URL}/api/publishers`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Sunucu hatası");

      const saved = await res.json();
      if (isEdit) {
        setPublishers((prev) =>
          prev.map((p) => (p.id === saved.id ? saved : p))
        );
        notify.success("Yayınevi güncellendi ✅");
      } else {
        setPublishers((prev) => [...prev, saved]);
        notify.success("Yayınevi eklendi 🎉");
      }

      setForm({ id: "", name: "", address: "" });
    } catch {
      notify.error("Yayınevi kaydedilemedi ❌");
    }
  };

  // 🗑️ Silme işlemi
  const handleDelete = async (id) => {
    if (!window.confirm("Yayınevini silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`${API_URL}/api/publishers/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Silme başarısız");

      setPublishers((prev) => prev.filter((p) => p.id !== id));
      notify.success("Yayınevi silindi 🗑️");
    } catch {
      notify.error("Silme işlemi başarısız ❌");
    }
  };

  const handleEdit = (p) => setForm(p);

  return (
    <div style={{ color: "white", textAlign: "center", padding: 40 }}>
      <h2>🏢 Yayınevleri</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Yayınevi Adı"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Adres"
          value={form.address}
          onChange={handleChange}
        />
        <button type="submit">{form.id ? "Güncelle" : "Ekle"}</button>
      </form>

      <table border="1" style={{ margin: "20px auto", color: "white" }}>
        <thead>
          <tr>
            <th>Adı</th>
            <th>Adres</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.address}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Düzenle</button>
                <button onClick={() => handleDelete(p.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
