package com.library.library_app_backend.controller;

import com.library.library_app_backend.model.Book;
import com.library.library_app_backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "https://librarytezcan.netlify.app")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    // 📘 Tüm kitapları getir
    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // ➕ Yeni kitap ekle
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    // ✏️ Kitap güncelle
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable("id") Long id,  // ✅ parametre adı açıkça belirtildi
                                           @RequestBody Book updatedBook) {
        try {
            return bookRepository.findById(id)
                    .map(book -> {
                        book.setTitle(updatedBook.getTitle());
                        book.setAuthor(updatedBook.getAuthor());
                        book.setPublisher(updatedBook.getPublisher());
                        book.setYear(updatedBook.getYear());
                        Book saved = bookRepository.save(book);
                        return ResponseEntity.ok(saved);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // 🗑️ Kitap sil
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable("id") Long id) {  // ✅ parametre adı açıkça belirtildi
        try {
            if (!bookRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            bookRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
