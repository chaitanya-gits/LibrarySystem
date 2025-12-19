package com.elibrary.repository;

import com.elibrary.entity.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {

    Optional<Book> findByIsbn(String isbn);

    List<Book> findByAuthorContainingIgnoreCase(String author);

    List<Book> findByTitleContainingIgnoreCase(String title);

    List<Book> findByCategory_Id(String categoryId);

    List<Book> findByAvailableTrue();

    @Query("{ 'availableCopies': { $gt: 0 } }")
    List<Book> findAvailableBooks();

    @Query("{ '$or': [ { 'title': { '$regex': ?0, '$options': 'i' } }, { 'author': { '$regex': ?0, '$options': 'i' } } ] }")
    List<Book> searchBooks(String keyword);

    boolean existsByIsbn(String isbn);
}
