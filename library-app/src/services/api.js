// src/services/api.js
export const API_URL = "http://localhost:8080/api";


export async function getBooks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Kitap listesi alınamadı");
  return res.json();
}

export async function addBook(book) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Kitap eklenemedi");
  return res.json();
}
