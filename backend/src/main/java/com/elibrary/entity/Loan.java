package com.elibrary.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "loans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@ToString(exclude = { "book", "user" })
public class Loan {

    @Id
    private String id;

    @DBRef
    private Book book;

    @DBRef
    private User user;

    @Field("loan_date")
    private LocalDate loanDate;

    @Field("due_date")
    private LocalDate dueDate;

    @Field("return_date")
    private LocalDate returnDate;

    @Builder.Default
    private LoanStatus status = LoanStatus.ACTIVE;

    private String notes;

    @Field("created_at")
    private LocalDateTime createdAt;

    @Field("updated_at")
    private LocalDateTime updatedAt;

    // Use constructor or service for status setting, removing PrePersist logic for
    // now
    // or handle in Service layer (recommended for Mongo)
    // For simple migration, we trust Service sets these or we use default values.

    public enum LoanStatus {
        ACTIVE, RETURNED, OVERDUE
    }
}
