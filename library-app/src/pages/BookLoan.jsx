import React, { useEffect, useState } from "react";
import { notify } from "../utils/notify";

export default function BookLoan() {
  const [loans, setLoans] = useState([]);
  const [form, setForm] = useState({
    id: "",
    borrowerName: "",
    bookTitle: "",
    borrowDate: "",
    returnDate: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/loans")
      .then((res) => res.json())
      .then((data) => setLoans(data))
      .catch(() => notify.error("Kitap alma listesi alınamadı ❌"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEdit = !!form.id;
    const method = isEdit ? "PUT" : "POST";
    if (isEdit) form.id = Number(form.id);
    const url = isEdit
      ? `http://localhost:8080/api/loans/${form.id}`
      : "http://localhost:8080/api/loans";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((savedLoan) => {
        if (isEdit) {
          setLoans(loans.map((l) => (l.id === savedLoan.id ? savedLoan : l)));
          notify.success("Kayıt güncellendi ✅");
        } else {
          setLoans([...loans, savedLoan]);
          notify.success("Yeni kayıt eklendi 🎉");
        }
        setForm({
          id: "",
          borrowerName: "",
          bookTitle: "",
          borrowDate: "",
          returnDate: "",
        });
      })
      .catch(() => notify.error("Kayıt kaydedilemedi ❌"));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/loans/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setLoans(loans.filter((l) => l.id !== id));
          notify.success("Kayıt silindi 🗑️");
        } else {
          notify.error("Silme başarısız ❌");
        }
      })
      .catch(() => notify.error("Sunucuya bağlanılamadı ❌"));
  };

  const handleEdit = (loan) => {
    setForm({
      id: loan.id,
      borrowerName: loan.borrowerName,
      bookTitle: loan.bookTitle,
      borrowDate: loan.borrowDate,
      returnDate: loan.returnDate,
    });
    notify.info("Düzenleme moduna geçtiniz ✏️");
  };

  return (
    <div style={{ color: "white", textAlign: "center", padding: "40px" }}>
      <h2>📘 Kitap Alma Listesi</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="borrowerName"
          value={form.borrowerName}
          onChange={handleChange}
          placeholder="Alan Kişi"
          required
        />
        <input
          type="text"
          name="bookTitle"
          value={form.bookTitle}
          onChange={handleChange}
          placeholder="Kitap Adı"
          required
        />
        <input
          type="date"
          name="borrowDate"
          value={form.borrowDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="returnDate"
          value={form.returnDate}
          onChange={handleChange}
        />
        <button type="submit">{form.id ? "Güncelle" : "Ekle"}</button>
      </form>

      <table border="1" style={{ margin: "0 auto", color: "white" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Alan Kişi</th>
            <th>Kitap</th>
            <th>Alma Tarihi</th>
            <th>İade Tarihi</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {loans.length > 0 ? (
            loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.borrowerName}</td>
                <td>{loan.bookTitle}</td>
                <td>{loan.borrowDate}</td>
                <td>{loan.returnDate}</td>
                <td>
                  <button
                    onClick={() => handleEdit(loan)}
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
                    onClick={() => handleDelete(loan.id)}
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
              <td colSpan="6">Henüz kayıt yok</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
