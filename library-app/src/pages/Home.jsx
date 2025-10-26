// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [latestBooks, setLatestBooks] = useState([]);

  // 🌍 Ortam değişkeninden backend URL'sini al
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  // ✅ Backend'den son 5 kitabı çek
  useEffect(() => {
    fetch(`${API_URL}/api/books`)
      .then((res) => res.json())
      .then((data) => {
        // Kitapları id'ye göre tersten sırala (yeni eklenen en üstte)
        const sorted = data.sort((a, b) => b.id - a.id).slice(0, 5);
        setLatestBooks(sorted);
      })
      .catch((err) => console.error("Kitaplar alınamadı:", err));
  }, [API_URL]);

  return (
    <div
      style={{
        color: "white",
        textAlign: "center",
        padding: "60px 20px",
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        📚 Kütüphane Yönetim Sistemi
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#cbd5e1",
          marginBottom: "40px",
        }}
      >
        Kitap, yazar, yayınevi, kategori ve ödünç işlemlerini yönetin.
      </p>

      {/* 🔹 Navigasyon Butonları */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "60px",
        }}
      >
        <Link to="/books" className="home-link">
          📘 Kitaplar
        </Link>
        <Link to="/authors" className="home-link">
          ✍️ Yazarlar
        </Link>
        <Link to="/publishers" className="home-link">
          🏢 Yayınevleri
        </Link>
        <Link to="/categories" className="home-link">
          📂 Kategoriler
        </Link>
        <Link to="/book-loans" className="home-link">
          📖 Ödünç İşlemleri
        </Link>
      </div>

      {/* 🔹 Son Eklenen 5 Kitap */}
      <h2 style={{ marginBottom: "20px", fontSize: "1.8rem" }}>
        📗 Son Eklenen 5 Kitap
      </h2>

      {latestBooks.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {latestBooks.map((book) => (
            <div
              key={book.id}
              style={{
                background: "#1e293b",
                padding: "20px",
                borderRadius: "12px",
                width: "240px",
                textAlign: "left",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                transition: "0.3s ease",
              }}
            >
              <h3 style={{ color: "#3b82f6" }}>{book.title}</h3>
              <p style={{ margin: "5px 0" }}>✍️ {book.author}</p>
              <p style={{ margin: "5px 0" }}>🏢 {book.publisher}</p>
              <p style={{ margin: "5px 0", color: "#94a3b8" }}>
                📅 {book.year}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#94a3b8" }}>Henüz kitap eklenmemiş.</p>
      )}

      <style>
        {`
          .home-link {
            display: inline-block;
            background: #3b82f6;
            color: white;
            padding: 14px 28px;
            border-radius: 10px;
            text-decoration: none;
            font-size: 1.1rem;
            transition: 0.3s ease;
          }
          .home-link:hover {
            background: #2563eb;
            transform: translateY(-3px);
          }
        `}
      </style>
    </div>
  );
}
