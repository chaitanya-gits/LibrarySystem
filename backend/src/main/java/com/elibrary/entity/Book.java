package com.elibrary.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Document(collection = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = { "id", "isbn" })
@ToString(exclude = { "category" })
public class Book {

    @Id
    private String id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Author is required")
    private String author;

    @Indexed(unique = true)
    private String isbn;

    private String description;

    @Min(value = 1000, message = "Published year must be valid")
    @Max(value = 2100, message = "Published year must be valid")
    private Integer publishedYear;

    @Builder.Default
    private Boolean available = true;

    @Min(value = 0)
    @Builder.Default
    private Integer totalCopies = 1;

    @Min(value = 0)
    @Builder.Default
    private Integer availableCopies = 1;

    @DBRef
    private Category category;

    // Remove OneToMany loans list, managed by LoanRepository queries
    // private List<Loan> loans = new ArrayList<>();

    @Field("created_at")
    private LocalDateTime createdAt;

    @Field("updated_at")
    private LocalDateTime updatedAt;
}
