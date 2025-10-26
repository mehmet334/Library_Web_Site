package com.library.library_app_backend.controller;

import com.library.library_app_backend.model.BookLoan;
import com.library.library_app_backend.repository.BookLoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin(origins = "http://localhost:5173")
public class BookLoanController {

    @Autowired
    private BookLoanRepository bookLoanRepository;

    @GetMapping
    public List<BookLoan> getAllLoans() {
        return bookLoanRepository.findAll();
    }

    @PostMapping
    public BookLoan addLoan(@RequestBody BookLoan loan) {
        return bookLoanRepository.save(loan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookLoan> updateLoan(@PathVariable Long id, @RequestBody BookLoan updatedLoan) {
        try {
            return bookLoanRepository.findById(id)
                    .map(loan -> {
                        loan.setId(id);
                        loan.setBorrowerName(updatedLoan.getBorrowerName());
                        loan.setBookTitle(updatedLoan.getBookTitle());
                        loan.setBorrowDate(updatedLoan.getBorrowDate());
                        loan.setReturnDate(updatedLoan.getReturnDate());
                        BookLoan saved = bookLoanRepository.save(loan);
                        return ResponseEntity.ok(saved);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        try {
            if (!bookLoanRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            bookLoanRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
