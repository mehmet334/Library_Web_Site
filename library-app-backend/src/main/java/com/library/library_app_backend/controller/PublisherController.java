package com.library.library_app_backend.controller;

import com.library.library_app_backend.model.Publisher;
import com.library.library_app_backend.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/publishers")
@CrossOrigin(origins = "https://librarytezcan.netlify.app")
public class PublisherController {

    @Autowired
    private PublisherRepository publisherRepository;

    // 📚 Tüm yayınevlerini getir
    @GetMapping
    public List<Publisher> getAllPublishers() {
        return publisherRepository.findAll();
    }

    // ➕ Yeni yayınevi ekle
    @PostMapping
    public Publisher addPublisher(@RequestBody Publisher publisher) {
        return publisherRepository.save(publisher);
    }

    // ✏️ Yayınevi güncelle
    @PutMapping("/{id}")
    public ResponseEntity<Publisher> updatePublisher(@PathVariable("id") Long id,  // ✅ parametre adı açıkça belirtildi
                                                     @RequestBody Publisher updatedPublisher) {
        try {
            return publisherRepository.findById(id)
                    .map(publisher -> {
                        publisher.setName(updatedPublisher.getName());
                        publisher.setAddress(updatedPublisher.getAddress());
                        Publisher saved = publisherRepository.save(publisher);
                        return ResponseEntity.ok(saved);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // 🗑️ Yayınevi sil
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublisher(@PathVariable("id") Long id) {  // ✅ parametre adı açıkça belirtildi
        try {
            if (!publisherRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            publisherRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
