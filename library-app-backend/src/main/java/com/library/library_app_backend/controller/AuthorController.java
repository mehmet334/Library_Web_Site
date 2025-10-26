package com.library.library_app_backend.controller;

import com.library.library_app_backend.model.Author;
import com.library.library_app_backend.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
@CrossOrigin(origins = "https://librarytezcan.netlify.app")
public class AuthorController {

    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @PostMapping
    public Author addAuthor(@RequestBody Author author) {
        return authorRepository.save(author);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable("id") Long id,  // ✅ id adı açıkça belirtildi
                                               @RequestBody Author updatedAuthor) {
        try {
            return authorRepository.findById(id)
                    .map(author -> {
                        author.setName(updatedAuthor.getName());
                        author.setCountry(updatedAuthor.getCountry());
                        Author saved = authorRepository.save(author);
                        return ResponseEntity.ok(saved);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable("id") Long id) {  // ✅ id açıkça belirtildi
        try {
            if (!authorRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            authorRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
