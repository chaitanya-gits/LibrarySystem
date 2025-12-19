import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ReadingPage.css';

const ReadingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    // This would normally come from an API
    const sampleBooks = [
        {
            id: 1,
            title: 'The Psychology of Money',
            author: 'Morgan Housel',
        },
        {
            id: 5,
            title: 'Atomic Habits',
            author: 'James Clear',
        }
    ];

    useEffect(() => {
        const foundBook = sampleBooks.find(b => b.id === parseInt(id));
        setBook(foundBook || sampleBooks[0]); // Fallback for demo
    }, [id]);

    if (!book) return null;

    return (
        <div className="reading-page">
            <header className="reading-header">
                <div className="header-left">
                    <button className="back-btn" onClick={() => navigate('/books')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Library
                    </button>
                </div>
                <div className="header-right">
                    <button className="reading-icon-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 7V4h16v3M9 20h6M12 4v16M7 20h10" />
                        </svg>
                    </button>
                    <button className="reading-icon-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                    </button>
                    <button className="reading-icon-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    </button>
                </div>
            </header>

            <main className="reading-content">
                <div className="reading-container">
                    <h1 className="reading-book-title">{book.title}</h1>
                    <p className="reading-book-author">by {book.author}</p>

                    <div className="reading-text">
                        <p>
                            <span className="drop-cap">T</span>his is a sample reading view for <strong>{book.title}</strong>.
                        </p>
                        <p>
                            No matter your goals, {book.title} offers a proven framework for improving--every day. {book.author}, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.
                        </p>
                        <p>
                            Here continues the text of the book in a comfortable reading format, mimicking the experience of a Kindle Paperwhite in light mode.
                        </p>
                        <p>
                            The concept is simple yet profound. In a world obsessed with more—more money, more fame, more output—we often lose sight of the small, consistent changes that lead to long-term success.
                        </p>

                        <div className="reading-divider"></div>

                        <p className="chapter-title">Chapter 1: The Beginning</p>

                        <p>
                            It started as a whisper. A small idea that refused to go away. Innovation, wealth, happiness—they all begin this way. Not with a bang, but with a quiet persistence.
                        </p>

                        <div className="end-of-sample">- End of Sample -</div>

                        <div className="reading-actions">
                            <button className="buy-full-version-btn">Buy Full Version</button>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="reading-footer">
                <span className="page-info">Page 1 of 15</span>
                <span className="read-percentage">7% Read</span>
            </footer>
        </div>
    );
};

export default ReadingPage;
