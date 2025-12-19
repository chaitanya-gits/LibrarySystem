import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookApi, categoryApi } from '../services/api';
import Loading from '../components/Loading';
import BookCard from '../components/BookCard';
import CategoryCard from '../components/CategoryCard';

function HomePage() {
    const [recentBooks, setRecentBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [booksRes, categoriesRes] = await Promise.all([
                    bookApi.getAll(),
                    categoryApi.getAll()
                ]);

                setRecentBooks(booksRes.data.slice(0, 5));
                setCategories(categoriesRes.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                if (categories.length === 0) {
                    setCategories([
                        { id: 1, name: 'Money/Investing' },
                        { id: 2, name: 'Design' },
                        { id: 3, name: 'Business' },
                        { id: 4, name: 'Self Improvement' }
                    ]);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="discovery-page">
            <div className="hero-section">
                <div className="hero-text">
                    <h1>Discover</h1>

                    <div className="search-bar" style={{ marginTop: '2rem', maxWidth: '600px', width: '100%', padding: '0.5rem', height: 'auto' }}>
                        <div style={{
                            borderRight: '1px solid #e0e0e0',
                            paddingRight: '1rem',
                            marginRight: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            minWidth: '140px'
                        }}>
                            <select style={{
                                border: 'none',
                                background: 'transparent',
                                fontWeight: 500,
                                color: '#2d2d2d',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                outline: 'none',
                                width: '100%'
                            }}>
                                <option>All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input
                                type="text"
                                placeholder="find the book you like...."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%', border: 'none', outline: 'none', padding: '0.5rem 0' }}
                            />
                        </div>

                        <button className="btn-primary" style={{ padding: '0.8rem 2rem', marginLeft: '0.5rem' }}>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <section style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 className="section-title" style={{ fontSize: '1.5rem', color: '#2d2d2d', fontWeight: 500 }}>Book Recommendation</h2>
                    <Link to="/books" className="btn btn-outline" style={{ border: '1px solid #ddd', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                        View all &gt;
                    </Link>
                </div>

                <div className="recommendations-scroll">
                    {recentBooks.length > 0 ? recentBooks.map((book) => (
                        <div key={book.id} style={{ minWidth: '200px', width: '200px' }}>
                            <BookCard book={book} />
                        </div>
                    )) : (
                        <p>No books available.</p>
                    )}
                </div>
            </section>

            <section>
                <h2 className="section-title" style={{ fontSize: '1.5rem', color: '#2d2d2d', fontWeight: 500, marginBottom: '1.5rem' }}>Book Category</h2>
                <div className="category-grid">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            title={category.name}
                            image={category.image}
                        />
                    ))}
                    {categories.length === 0 && (
                        <>
                            <CategoryCard title="Money/Investing" />
                            <CategoryCard title="Design" />
                            <CategoryCard title="Business" />
                            <CategoryCard title="Self Improvement" />
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

export default HomePage;
