import React, { useEffect, useState } from "react";
import { notify } from "../utils/notify";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", description: "" });

  // 🌐 Backend URL - ortam değişkeninden al, yoksa localhost
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  // 📦 Kategorileri getir
  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then((res) => {
        if (!res.ok) throw new Error("Veri alınamadı");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch(() => notify.error("Kategoriler alınamadı ❌"));
  }, [API_URL]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 💾 Ekle / Güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!form.id;
    const method = isEdit ? "PUT" : "POST";
    if (isEdit) form.id = Number(form.id);

    const url = isEdit
      ? `${API_URL}/api/categories/${form.id}`
      : `${API_URL}/api/categories`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Sunucu hatası");

      const saved = await res.json();

      if (isEdit) {
        setCategories((prev) =>
          prev.map((c) => (c.id === saved.id ? saved : c))
        );
        notify.success("Kategori güncellendi ✅");
      } else {
        setCategories((prev) => [...prev, saved]);
        notify.success("Kategori eklendi 🎉");
      }

      setForm({ id: "", name: "", description: "" });
    } catch (err) {
      console.error("Kategori kaydedilemedi:", err);
      notify.error("Kategori kaydedilemedi ❌");
    }
  };

  // 🗑️ Silme işlemi
  const handleDelete = async (id) => {
    if (!window.confirm("Kategoriyi silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Silme hatası");

      setCategories((prev) => prev.filter((c) => c.id !== id));
      notify.success("Kategori silindi 🗑️");
    } catch (err) {
      console.error("Silme hatası:", err);
      notify.error("Silme işlemi başarısız ❌");
    }
  };

  const handleEdit = (c) => setForm(c);

  return (
    <div style={{ color: "white", textAlign: "center", padding: 40 }}>
      <h2>📂 Kategoriler</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Kategori Adı"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Açıklama"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">{form.id ? "Güncelle" : "Ekle"}</button>
      </form>

      <table border="1" style={{ margin: "20px auto", color: "white" }}>
        <thead>
          <tr>
            <th>Adı</th>
            <th>Açıklama</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.description}</td>
                <td>
                  <button onClick={() => handleEdit(c)}>Düzenle</button>
                  <button onClick={() => handleDelete(c.id)}>Sil</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Henüz kategori yok</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
