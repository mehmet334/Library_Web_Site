# 📚 Library Management Web App

Modern, tam entegre bir **Kütüphane Yönetim Sistemi**.  
Kullanıcılar kitap, yazar, yayınevi, kategori ve ödünç kayıtlarını kolayca yönetebilir.  
Frontend kısmı **React (Vite)**, backend kısmı **Spring Boot + PostgreSQL** kullanılarak geliştirilmiştir.

---

## 🌐 Canlı Demo

| Uygulama | Link |
|-----------|------|
| 🚀 Frontend (Netlify) | [https://librarytezcan.netlify.app](https://librarytezcan.netlify.app) |
| ⚙️ Backend (Render) | [https://library-web-site.onrender.com](https://library-web-site.onrender.com) |

---

## 🏗️ Mimari Yapı
📦 library-web-site/<br>
├── 📁 library-app-backend/ → Spring Boot REST API (Render üzerinde)<br>
│ ├── src/main/java/com/library/library_app_backend/<br>
│ │ ├── controller/ → Book, Author, Category, Publisher, BookLoan controller’ları<br>
│ │ ├── model/ → JPA Entity sınıfları<br>
│ │ ├── repository/ → JPA Repository interface’leri<br>
│ │ └── LibraryAppBackendApplication.java<br>
│ └── pom.xml<br>
│
└── 📁 library-app/ → React (Vite) frontend (Netlify üzerinde)<br>
├── src/pages/ → Books, Authors, Categories, Publishers, BookLoan<br>
├── src/components/ → Navbar, Toast sistemi<br>
├── src/utils/notify.js → react-toastify bildirimleri<br>
└── vite.config.js<br>

---

## ⚙️ Teknolojiler

**Frontend**
- React 18 (Vite)
- React Router DOM
- React Toastify
- TailwindCSS (veya basic CSS)
- Fetch API

**Backend**
- Spring Boot 3.4.1
- Java 17
- Spring Data JPA (Hibernate)
- PostgreSQL
- Maven
- Lombok

---

## 🔌 API Endpoint’leri

| Metot | Endpoint | Açıklama |
|--------|-----------|-----------| 
| GET | `/api/books` | Tüm kitapları getirir |
| POST | `/api/books` | Yeni kitap ekler |
| PUT | `/api/books/{id}` | Mevcut kitabı günceller |
| DELETE | `/api/books/{id}` | Kitabı siler |
| GET | `/api/authors` | Yazar listesini getirir |
| GET | `/api/categories` | Kategori listesini getirir |
| GET | `/api/publishers` | Yayınevi listesini getirir |
| GET | `/api/loans` | Kitap alma (ödünç) listesini getirir |

> 🔒 CORS ayarları yalnızca `https://librarytezcan.netlify.app` adresine izin vermektedir.

---

## 🧠 Özellikler

✅ CRUD (Ekle / Güncelle / Sil / Listele)  
✅ Toast Bildirim Sistemi  
✅ Responsive Arayüz  
✅ Son 5 kitabı gösteren Ana Sayfa  
✅ PostgreSQL veritabanı bağlantısı (Render Cloud DB)  
✅ Tam entegre Netlify ↔ Render yapılandırması  
✅ @CrossOrigin ve @PathVariable düzeltmeleriyle sorunsuz backend API

---

## 💾 Kurulum (Yerel Geliştirme)

### 1️⃣ Backend

```bash
cd library-app-backend
./mvnw clean package -DskipTests
java -jar target/library-app-backend-0.0.1-SNAPSHOT.jar

🌍 Deployment
🔹 Backend (Render)

Build Command: ./mvnw clean package -DskipTests

Start Command: java -jar target/library-app-backend-0.0.1-SNAPSHOT.jar

Environment:
JAVA_VERSION = 17
DB_URL = <render_postgres_url>
DB_USER = <username>
DB_PASSWORD = <password>

### 2️⃣ Frontend

Build Command: npm run build

Publish Directory: dist

Environment:

VITE_BACKEND_URL=https://library-web-site.onrender.com

👨‍💻 Geliştirici

Mehmet Ali Tezcan
📍 Eczacıbaşı İlaç - Ticari Operasyonlar
💼 Full Stack Developer (Java + React)
🌐 GitHub
