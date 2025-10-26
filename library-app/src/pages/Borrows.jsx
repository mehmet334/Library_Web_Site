import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Borrows() {
  const [borrows, setBorrows] = useState([]);
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    bookId: "",
    borrower: "",
    borrowDate: "",
    returnDate: "",
  });
  const [editId, setEditId] = useState(null);

  // 📥 Verileri çek
  const fetchData = async () => {
    try {
      const [borrowRes, bookRes] = await Promise.all([
        api.get("/borrows"),
        api.get("/books"),
      ]);
      setBorrows(borrowRes.data);
      setBooks(bookRes.data);
    } catch {
      toast.error("Veriler yüklenemedi!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 📝 Form değişiklikleri
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ➕ Ekle veya Güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/borrows/${editId}`, formData);
        toast.success("Kayıt güncellendi!");
      } else {
        await api.post("/borrows", formData);
        toast.success("Yeni ödünç kaydı eklendi!");
      }
      setFormData({ bookId: "", borrower: "", borrowDate: "", returnDate: "" });
      setEditId(null);
      fetchData();
    } catch {
      toast.error("İşlem başarısız!");
    }
  };

  // ✏️ Düzenle
  const handleEdit = (item) => {
    setFormData({
      bookId: item.bookId,
      borrower: item.borrower,
      borrowDate: item.borrowDate,
      returnDate: item.returnDate,
    });
    setEditId(item.id);
  };

  // ❌ Sil
  const handleDelete = async (id) => {
    if (!window.confirm("Bu ödünç kaydını silmek istiyor musun?")) return;
    try {
      await api.delete(`/borrows/${id}`);
      toast.info("Kayıt silindi!");
      fetchData();
    } catch {
      toast.error("Silme işlemi başarısız!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📖 Kitap Alma / Ödünç İşlemleri</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <select
          name="bookId"
          value={formData.bookId}
          onChange={handleChange}
          required
        >
          <option value="">Kitap Seç</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="borrower"
          placeholder="Ödünç Alan Kişi"
          value={formData.borrower}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="borrowDate"
          value={formData.borrowDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="returnDate"
          value={formData.returnDate}
          onChange={handleChange}
        />

        <button type="submit" style={{ marginLeft: 8 }}>
          {editId ? "Güncelle" : "Ekle"}
        </button>
      </form>

      <table border="1" cellPadding="8" style={{ background: "white", color: "black" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kitap</th>
            <th>Ödünç Alan</th>
            <th>Alış Tarihi</th>
            <th>İade Tarihi</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {borrows.length === 0 ? (
            <tr><td colSpan="6">Henüz kayıt yok.</td></tr>
          ) : (
            borrows.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{books.find((bk) => bk.id === b.bookId)?.title || "-"}</td>
                <td>{b.borrower}</td>
                <td>{b.borrowDate}</td>
                <td>{b.returnDate || "-"}</td>
                <td>
                  <button onClick={() => handleEdit(b)}>Düzenle</button>
                  <button onClick={() => handleDelete(b.id)} style={{ marginLeft: 8 }}>
                    Sil
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
