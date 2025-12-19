package com.elibrary.service;

import com.elibrary.dto.BookDTO;
import com.elibrary.entity.Book;
import com.elibrary.entity.Category;
import com.elibrary.exception.ResourceNotFoundException;
import com.elibrary.repository.BookRepository;
import com.elibrary.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private BookService bookService;

    private Book testBook;
    private Category testCategory;

    @BeforeEach
    void setUp() {
        testCategory = Category.builder()
                .id("cat-1")
                .name("Fiction")
                .build();

        testBook = Book.builder()
                .id("book-1")
                .title("The Great Gatsby")
                .author("F. Scott Fitzgerald")
                .isbn("978-0743273565")
                .publishedYear(1925)
                .available(true)
                .totalCopies(3)
                .availableCopies(2)
                .category(testCategory)
                .build();
    }

    @Test
    void getAllBooks_ShouldReturnListOfBooks() {
        when(bookRepository.findAll()).thenReturn(Arrays.asList(testBook));

        List<BookDTO> result = bookService.getAllBooks();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("The Great Gatsby", result.get(0).getTitle());
    }

    @Test
    void getBookById_WhenExists_ShouldReturnBook() {
        when(bookRepository.findById("book-1")).thenReturn(Optional.of(testBook));

        BookDTO result = bookService.getBookById("book-1");

        assertNotNull(result);
        assertEquals("The Great Gatsby", result.getTitle());
        assertEquals("Fiction", result.getCategoryName());
    }

    @Test
    void getBookById_WhenNotExists_ShouldThrowException() {
        when(bookRepository.findById("99")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            bookService.getBookById("99");
        });
    }

    @Test
    void createBook_ShouldReturnCreatedBook() {
        BookDTO inputDTO = BookDTO.builder()
                .title("New Book")
                .author("Test Author")
                .isbn("123-456")
                .build();

        Book savedBook = Book.builder()
                .id("book-2")
                .title("New Book")
                .author("Test Author")
                .isbn("123-456")
                .available(true)
                .totalCopies(1)
                .availableCopies(1)
                .build();

        when(bookRepository.existsByIsbn("123-456")).thenReturn(false);
        when(bookRepository.save(any(Book.class))).thenReturn(savedBook);

        BookDTO result = bookService.createBook(inputDTO);

        assertNotNull(result);
        assertEquals("New Book", result.getTitle());
        verify(bookRepository, times(1)).save(any(Book.class));
    }

    @Test
    void searchBooks_ShouldReturnMatchingBooks() {
        when(bookRepository.searchBooks("Gatsby")).thenReturn(Arrays.asList(testBook));

        List<BookDTO> result = bookService.searchBooks("Gatsby");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("The Great Gatsby", result.get(0).getTitle());
    }

    @Test
    void deleteBook_WhenExists_ShouldDeleteSuccessfully() {
        when(bookRepository.findById("book-1")).thenReturn(Optional.of(testBook));
        doNothing().when(bookRepository).delete(testBook);

        assertDoesNotThrow(() -> bookService.deleteBook("book-1"));
        verify(bookRepository, times(1)).delete(testBook);
    }
}
