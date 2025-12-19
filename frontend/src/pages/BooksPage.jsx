import { useState, useEffect } from 'react';
import { bookApi } from '../services/api';
import Loading from '../components/Loading';
import BookDetailsModal from '../components/BookDetailsModal';
import '../styles/BooksPage.css';

// Sample book covers using reliable image sources
const sampleBooks = [
    {
        id: 1,
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        coverImage: 'https://m.media-amazon.com/images/I/71TRUbzcvaL._AC_UF1000,1000_QL80_.jpg',
        category: 'Business',
        publishedDate: 'Sep 08, 2020',
        isbn: '9780857197689',
        pages: '256',
        language: 'English',
        description: "Doing well with money isn't necessarily about what you know. It's about how you behave. In The Psychology of Money, award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money.",
        isBestseller: true
    },
    {
        id: 2,
        title: 'Company of One',
        author: 'Paul Jarvis',
        coverImage: 'https://m.media-amazon.com/images/I/71e5yHjPsZL._SL1500_.jpg',
        category: 'Business',
        publishedDate: 'Jan 15, 2019',
        isbn: '9781328915870',
        pages: '272',
        language: 'English',
        description: "What if the real key to a richer and more fulfilling career was not to create and scale a new business, but rather, to be able to work for yourself?",
        isBestseller: false
    },
    {
        id: 3,
        title: 'How Innovation Works',
        author: 'Matt Ridley',
        coverImage: 'https://m.media-amazon.com/images/I/91hrgdN3J0L._SY466_.jpg',
        category: 'Technology',
        publishedDate: 'May 19, 2020',
        isbn: '9780062916594',
        pages: '416',
        language: 'English',
        description: "Innovation is the main event of the modern age, the reason we experience dramatic improvements in our living standards.",
        isBestseller: true
    },
    {
        id: 4,
        title: 'The Picture of Dorian Gray',
        author: 'Oscar Wilde',
        coverImage: 'https://m.media-amazon.com/images/I/91R44SkY9wL._SY522_.jpg',
        category: 'Classics',
        publishedDate: 'July 1, 1890',
        isbn: '9780141439570',
        pages: '250',
        language: 'English',
        description: "Entropy and elegance collide in Oscar Wilde's masterpiece. Dorian Gray remains eternally young while his portrait ages hideously.",
        isBestseller: false
    },
    {
        id: 5,
        title: 'Atomic Habits',
        author: 'James Clear',
        coverImage: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UF1000,1000_QL80_.jpg',
        category: 'Self-Help',
        publishedDate: 'Oct 16, 2018',
        isbn: '9780735211292',
        pages: '320',
        language: 'English',
        description: " James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
        isBestseller: true
    },
    {
        id: 6,
        title: 'The Subtle Art of Not Giving a F*ck',
        author: 'Mark Manson',
        coverImage: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg',
        category: 'Self-Help',
        publishedDate: 'Sep 13, 2016',
        isbn: '9780062457714',
        pages: '224',
        language: 'English',
        description: "In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be 'positive' all the time.",
        isBestseller: true
    }
];

const categories = [
    {
        name: 'Business',
        bgColor: '#fff5eb',
        textColor: '#8b4513'
    },
    {
        name: 'Technology',
        bgColor: '#f0f7ff',
        textColor: '#2b6cb0'
    },
    {
        name: 'Self-Help',
        bgColor: '#f0fff4',
        textColor: '#2f855a'
    },
    {
        name: 'Classics',
        bgColor: '#faf5ff',
        textColor: '#6b46c1'
    },
    {
        name: 'Design',
        bgColor: '#fff5f7',
        textColor: '#b83280'
    }
];

function BooksPage() {
    const [books, setBooks] = useState(sampleBooks);
    const [filteredBooks, setFilteredBooks] = useState(sampleBooks);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await bookApi.getAll();
                if (response.data && response.data.length > 0) {
                    // Merge API books with sample images for demo
                    const mergedBooks = response.data.map((book, index) => ({
                        ...book,
                        coverImage: book.coverImage || sampleBooks[index % sampleBooks.length]?.coverImage
                    }));
                    setBooks(mergedBooks);
                    setFilteredBooks(mergedBooks);
                }
            } catch (error) {
                console.error('Failed to fetch books:', error);
                // Keep sample data if API fails
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    // Filter logic
    useEffect(() => {
        let filtered = books;

        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(book =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'All Categories') {
            filtered = filtered.filter(book => book.category === selectedCategory);
        }

        setFilteredBooks(filtered);
    }, [searchTerm, selectedCategory, books]);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    if (loading) return <Loading />;

    return (
        <div className="books-page">
            {/* Search Section */}
            <div className="books-search-container">
                <form onSubmit={handleSearch} className="books-search-bar">
                    <div className="custom-dropdown-container">
                        <div
                            className={`custom-select ${isDropdownOpen ? 'open' : ''}`}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <span className="current-selected">{selectedCategory}</span>
                            <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <div
                                    className={`dropdown-item ${selectedCategory === 'All Categories' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedCategory('All Categories');
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    All Categories
                                </div>
                                {categories.map((cat, i) => (
                                    <div
                                        key={i}
                                        className={`dropdown-item ${selectedCategory === cat.name ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedCategory(cat.name);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {cat.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="search-input-wrapper">
                        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="find the book you like...."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="search-btn">Search</button>
                </form>
            </div>

            {/* Book Recommendation Section */}
            <div className="section-header">
                <h2>Book Recommendation</h2>
                <button className="view-all-btn">
                    View all
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            <div className="books-recommendation-scroll">
                {filteredBooks.map((book, index) => (
                    <div
                        key={book.id}
                        className="book-card-container"
                        style={{ '--delay': `${index * 0.1}s` }}
                        onClick={() => setSelectedBook(book)}
                    >
                        <div className="book-cover-wrapper">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="book-cover"
                                onError={(e) => {
                                    e.target.src = `https://placehold.co/200x300/1e5245/ffffff?text=${encodeURIComponent(book.title)}`;
                                }}
                            />
                            <button className="zoom-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                </svg>
                            </button>
                        </div>
                        <div className="book-info">
                            <h3 className="book-title">{book.title}</h3>
                            <p className="book-author">{book.author}</p>
                        </div>
                    </div>
                ))}
                {filteredBooks.length === 0 && (
                    <p className="no-books-message">No books found matching your search.</p>
                )}
            </div>

            {/* Book Category Section */}
            <div className="section-header">
                <h2>Book Category</h2>
                <button className="grid-toggle-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="7" cy="7" r="2" />
                        <circle cx="17" cy="7" r="2" />
                        <circle cx="7" cy="17" r="2" />
                        <circle cx="17" cy="17" r="2" />
                    </svg>
                </button>
            </div>

            <div className="categories-grid">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="category-pill"
                        onClick={() => setSelectedCategory(category.name)}
                        style={{
                            '--delay': `${index * 0.1}s`,
                            backgroundColor: category.bgColor,
                            color: category.textColor
                        }}
                    >
                        <span className="category-name">{category.name}</span>
                    </div>
                ))}
            </div>

            {/* Book Details Modal */}
            <BookDetailsModal
                book={selectedBook}
                onClose={() => setSelectedBook(null)}
            />
        </div>
    );
}

export default BooksPage;
