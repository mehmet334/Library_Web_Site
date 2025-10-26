import React, { useEffect, useState } from "react";
import { notify } from "../utils/notify";

export default function Publisher() {
  const [publishers, setPublishers] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", address: "" });

  useEffect(() => {
    fetch("http://localhost:8080/api/publishers")
      .then((res) => res.json())
      .then((data) => setPublishers(data))
      .catch(() => notify.error("Yayınevleri alınamadı ❌"));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!form.id;
    const method = isEdit ? "PUT" : "POST";
    if (isEdit) form.id = Number(form.id);
    const url = isEdit
      ? `http://localhost:8080/api/publishers/${form.id}`
      : "http://localhost:8080/api/publishers";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      const saved = await res.json().catch(() => null);
      if (isEdit) {
        setPublishers(
          publishers.map((p) => (p.id === form.id ? saved : p))
        );
        notify.success("Yayınevi güncellendi ✅");
      } else {
        setPublishers([...publishers, saved]);
        notify.success("Yayınevi eklendi 🎉");
      }

      setForm({ id: "", name: "", address: "" });
    } catch {
      notify.error("Yayınevi kaydedilemedi ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yayınevini silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`http://localhost:8080/api/publishers/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setPublishers(publishers.filter((p) => p.id !== id));
      notify.success("Yayınevi silindi 🗑️");
    } else {
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
