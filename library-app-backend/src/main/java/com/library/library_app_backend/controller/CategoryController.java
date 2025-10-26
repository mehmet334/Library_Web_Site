package com.library.library_app_backend.controller;

import com.library.library_app_backend.model.Category;
import com.library.library_app_backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "https://librarytezcan.netlify.app")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    // 📋 Tüm kategorileri getir
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // ➕ Yeni kategori ekle
    @PostMapping
    public Category addCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    // ✏️ Kategori güncelle
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") Long id,  // ✅ parametre adı açıkça belirtildi
                                                   @RequestBody Category updatedCategory) {
        try {
            return categoryRepository.findById(id)
                    .map(category -> {
                        category.setName(updatedCategory.getName());
                        category.setDescription(updatedCategory.getDescription());
                        Category saved = categoryRepository.save(category);
                        return ResponseEntity.ok(saved);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // 🗑️ Kategori sil
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable("id") Long id) {  // ✅ parametre adı açıkça belirtildi
        try {
            if (!categoryRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            categoryRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
