package com.elibrary.controller;

import com.elibrary.dto.LoanDTO;
import com.elibrary.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/loans")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LoanController {

    private final LoanService loanService;

    @GetMapping
    public ResponseEntity<List<LoanDTO>> getAllLoans() {
        return ResponseEntity.ok(loanService.getAllLoans());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanDTO> getLoanById(@PathVariable String id) {
        return ResponseEntity.ok(loanService.getLoanById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LoanDTO>> getLoansByUser(@PathVariable String userId) {
        return ResponseEntity.ok(loanService.getLoansByUser(userId));
    }

    @GetMapping("/active")
    public ResponseEntity<List<LoanDTO>> getActiveLoans() {
        return ResponseEntity.ok(loanService.getActiveLoans());
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<LoanDTO>> getOverdueLoans() {
        return ResponseEntity.ok(loanService.getOverdueLoans());
    }

    @PostMapping("/checkout")
    public ResponseEntity<LoanDTO> checkoutBook(
            @RequestParam String bookId,
            @RequestParam String userId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(loanService.checkoutBook(bookId, userId));
    }

    @PostMapping("/{id}/return")
    public ResponseEntity<LoanDTO> returnBook(@PathVariable String id) {
        return ResponseEntity.ok(loanService.returnBook(id));
    }

    @PostMapping("/{id}/extend")
    public ResponseEntity<LoanDTO> extendLoan(
            @PathVariable String id,
            @RequestParam(defaultValue = "7") int days) {
        return ResponseEntity.ok(loanService.extendLoan(id, days));
    }
}
