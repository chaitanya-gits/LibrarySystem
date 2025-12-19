-- ================================
-- E-Library System Database Initialization
-- ================================

-- Create schema if not exists (optional)
-- CREATE SCHEMA IF NOT EXISTS elibrary;

-- Insert sample categories
INSERT INTO categories (name, description, created_at, updated_at) VALUES
('Fiction', 'Novels, short stories, and other fictional works', NOW(), NOW()),
('Non-Fiction', 'Educational, informational, and factual works', NOW(), NOW()),
('Science & Technology', 'Books about science, technology, and engineering', NOW(), NOW()),
('History', 'Historical accounts and biographies', NOW(), NOW()),
('Literature', 'Classic and contemporary literary works', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Insert sample books
INSERT INTO books (title, author, isbn, description, published_year, available, total_copies, available_copies, category_id, created_at, updated_at) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', '978-0743273565', 'A novel about the American Dream set in the Jazz Age', 1925, true, 3, 3, 1, NOW(), NOW()),
('1984', 'George Orwell', '978-0451524935', 'A dystopian social science fiction novel', 1949, true, 5, 5, 1, NOW(), NOW()),
('Clean Code', 'Robert C. Martin', '978-0132350884', 'A handbook of agile software craftsmanship', 2008, true, 2, 2, 3, NOW(), NOW()),
('Sapiens', 'Yuval Noah Harari', '978-0062316097', 'A brief history of humankind', 2011, true, 4, 4, 4, NOW(), NOW())
ON CONFLICT (isbn) DO NOTHING;

-- Insert sample users
INSERT INTO users (name, email, phone, address, membership_date, active, created_at, updated_at) VALUES
('John Doe', 'john.doe@example.com', '555-0101', '123 Main St, City', CURRENT_DATE, true, NOW(), NOW()),
('Jane Smith', 'jane.smith@example.com', '555-0102', '456 Oak Ave, Town', CURRENT_DATE, true, NOW(), NOW()),
('Bob Wilson', 'bob.wilson@example.com', '555-0103', '789 Pine Rd, Village', CURRENT_DATE, true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;
