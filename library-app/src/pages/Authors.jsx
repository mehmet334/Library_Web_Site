import React, { useEffect, useState } from "react";
import { notify } from "../utils/notify";

export default function Author() {
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", country: "" });

  // 🌍 Ortam değişkeninden backend URL'sini al
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  // 🔹 Tüm yazarları getir
  useEffect(() => {
    fetch(`${API_URL}/api/authors`)
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch(() => notify.error("Yazar listesi alınamadı ❌"));
  }, [API_URL]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🔹 Ekle / Güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!form.id;
    const method = isEdit ? "PUT" : "POST";
    if (isEdit) form.id = Number(form.id);

    const url = isEdit
      ? `${API_URL}/api/authors/${form.id}`
      : `${API_URL}/api/authors`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      const saved = await res.json().catch(() => null);
      if (isEdit) {
        setAuthors(authors.map((a) => (a.id === form.id ? saved : a)));
        notify.success("Yazar güncellendi ✅");
      } else {
        setAuthors([...authors, saved]);
        notify.success("Yazar eklendi 🎉");
      }

      setForm({ id: "", name: "", country: "" });
    } catch {
      notify.error("Yazar kaydedilemedi ❌");
    }
  };

  // 🔹 Silme
  const handleDelete = async (id) => {
    if (!window.confirm("Yazarı silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`${API_URL}/api/authors/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setAuthors(authors.filter((a) => a.id !== id));
      notify.success("Yazar silindi 🗑️");
    } else {
      notify.error("Silme işlemi başarısız ❌");
    }
  };

  // 🔹 Düzenleme
  const handleEdit = (a) => setForm(a);

  return (
    <div style={{ color: "white", textAlign: "center", padding: 40 }}>
      <h2>✍️ Yazarlar</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Yazar Adı"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="country"
          placeholder="Ülke"
          value={form.country}
          onChange={handleChange}
        />
        <button type="submit">{form.id ? "Güncelle" : "Ekle"}</button>
      </form>

      <table border="1" style={{ margin: "20px auto", color: "white" }}>
        <thead>
          <tr>
            <th>Adı</th>
            <th>Ülke</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.country}</td>
              <td>
                <button onClick={() => handleEdit(a)}>Düzenle</button>
                <button onClick={() => handleDelete(a.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
