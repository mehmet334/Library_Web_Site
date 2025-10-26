package com.library.library_app_backend.repository;
import com.library.library_app_backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
public interface BookRepository extends JpaRepository<Book, Long> {}