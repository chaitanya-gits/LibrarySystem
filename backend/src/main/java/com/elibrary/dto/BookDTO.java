package com.elibrary.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDTO {
    private String id;
    private String title;
    private String author;
    private String isbn;
    private String description;
    private Integer publishedYear;
    private Boolean available;
    private Integer totalCopies;
    private Integer availableCopies;
    private String categoryId;
    private String categoryName;
}
