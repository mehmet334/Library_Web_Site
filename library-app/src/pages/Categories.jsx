import React, { useEffect, useState } from "react";
import { notify } from "../utils/notify";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", description: "" });

  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => notify.error("Kategoriler alınamadı ❌"));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!form.id;
    const method = isEdit ? "PUT" : "POST";
    if (isEdit) form.id = Number(form.id);
    const url = isEdit
      ? `http://localhost:8080/api/categories/${form.id}`
      : "http://localhost:8080/api/categories";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      const saved = await res.json().catch(() => null);
      if (isEdit) {
        setCategories(categories.map((c) => (c.id === form.id ? saved : c)));
        notify.success("Kategori güncellendi ✅");
      } else {
        setCategories([...categories, saved]);
        notify.success("Kategori eklendi 🎉");
      }

      setForm({ id: "", name: "", description: "" });
    } catch {
      notify.error("Kategori kaydedilemedi ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Kategoriyi silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setCategories(categories.filter((c) => c.id !== id));
      notify.success("Kategori silindi 🗑️");
    } else {
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
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Düzenle</button>
                <button onClick={() => handleDelete(c.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
