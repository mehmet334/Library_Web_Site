import React, { useEffect, useState } from "react";
import { notify } from "../utils/notify";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    id: "",
    title: "",
    author: "",
    publisher: "",
    year: "",
  });

  // 📘 Kitapları backend'den al
  useEffect(() => {
    fetch("http://localhost:8080/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => notify.error("Kitap listesi alınamadı ❌"));
  }, []);

  // ✏️ Form değiştiğinde state güncelle
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 💾 Kaydet / Güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEdit = Boolean(form.id);
    const url = isEdit
      ? `http://localhost:8080/api/books/${Number(form.id)}`
      : "http://localhost:8080/api/books";
    const method = isEdit ? "PUT" : "POST";

    const payload = {
      title: form.title,
      author: form.author,
      publisher: form.publisher,
      year: form.year ? Number(form.year) : null,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Sunucu hatası");

      const saved = await res.json();

      setBooks((prev) =>
        isEdit
          ? prev.map((b) => (b.id === saved.id ? saved : b))
          : [...prev, saved]
      );

      notify.success(isEdit ? "Kitap güncellendi ✅" : "Yeni kitap eklendi 🎉");
      setForm({ id: "", title: "", author: "", publisher: "", year: "" });
    } catch (err) {
      console.error("Hata:", err);
      notify.error("Kitap kaydedilemedi ❌");
    }
  };

  // 🧩 Düzenleme
  const handleEdit = (book) => {
    setForm({
      id: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      year: book.year ?? "",
    });
    notify.info("Düzenleme moduna geçtiniz ✏️");
  };

  // 🗑️ Silme
  const handleDelete = async (id) => {
    if (!window.confirm("Bu kitabı silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/books/${Number(id)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBooks((prev) => prev.filter((b) => b.id !== id));
        notify.success("Kitap silindi 🗑️");
      } else {
        const msg = await res.text();
        console.error("Silme hatası:", msg);
        notify.error("Silme işlemi başarısız ❌");
      }
    } catch (err) {
      console.error("Hata:", err);
      notify.error("Sunucuya ulaşılamadı ❌");
    }
  };

  return (
    <div style={{ color: "white", textAlign: "center", padding: "40px" }}>
      <h2>📚 Kitap Listesi</h2>

      {/* 📝 Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Başlık"
          required
        />
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Yazar"
          required
        />
        <input
          type="text"
          name="publisher"
          value={form.publisher}
          onChange={handleChange}
          placeholder="Yayınevi"
        />
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder="Yıl"
        />
        <button type="submit">{form.id ? "Güncelle" : "Ekle"}</button>
      </form>

      {/* 📋 Tablo */}
      <table border="1" style={{ margin: "0 auto", color: "white" }}>
        <thead>
          <tr>
            <th>Başlık</th>
            <th>Yazar</th>
            <th>Yayınevi</th>
            <th>Yıl</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.year}</td>
                <td>
                  <button
                    onClick={() => handleEdit(book)}
                    style={{
                      background: "#3b82f6",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Henüz kitap yok</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
