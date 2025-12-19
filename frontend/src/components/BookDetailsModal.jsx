import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookDetailsModal.css';

const BookDetailsModal = ({ book, onClose }) => {
    const navigate = useNavigate();
    if (!book) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                <div className="modal-content">
                    <div className="modal-left">
                        <div className="modal-book-cover-wrapper">
                            <img src={book.coverImage} alt={book.title} className="modal-book-cover" />
                            <button className="modal-zoom-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="modal-right">
                        {book.isBestseller && <span className="bestseller-badge">BESTSELLER</span>}
                        <h1 className="modal-book-title">{book.title}</h1>
                        <p className="modal-book-author">by {book.author}</p>

                        <div className="modal-metadata-grid">
                            <div className="metadata-item">
                                <span className="metadata-label">PUBLISHED</span>
                                <span className="metadata-value">{book.publishedDate}</span>
                            </div>
                            <div className="metadata-item">
                                <span className="metadata-label">ISBN</span>
                                <span className="metadata-value">{book.isbn}</span>
                            </div>
                            <div className="metadata-item">
                                <span className="metadata-label">PAGES</span>
                                <span className="metadata-value">{book.pages}</span>
                            </div>
                            <div className="metadata-item">
                                <span className="metadata-label">LANGUAGE</span>
                                <span className="metadata-value">{book.language}</span>
                            </div>
                        </div>

                        <div className="modal-about">
                            <h3>About the Book</h3>
                            <p>{book.description}</p>
                        </div>

                        <div className="modal-actions">
                            <button
                                className="read-sample-btn"
                                onClick={() => navigate(`/read/${book.id}`)}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                </svg>
                                Read Sample
                            </button>
                            <button className="icon-action-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                            <button className="icon-action-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="18" cy="5" r="3" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="19" r="3" />
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsModal;
