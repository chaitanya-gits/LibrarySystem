package com.elibrary.repository;

import com.elibrary.entity.Loan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface LoanRepository extends MongoRepository<Loan, String> {

    List<Loan> findByUser_Id(String userId);

    List<Loan> findByBook_Id(String bookId);

    List<Loan> findByStatus(Loan.LoanStatus status);

    List<Loan> findByUser_IdAndStatus(String userId, Loan.LoanStatus status);

    List<Loan> findByBook_IdAndStatus(String bookId, Loan.LoanStatus status);

    List<Loan> findByStatusAndDueDateBefore(Loan.LoanStatus status, LocalDate date);

    long countByUser_IdAndStatus(String userId, Loan.LoanStatus status);
}
