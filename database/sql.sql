Task 1
 Three File-Base storage problems

- Data Redundancy and Inconsistency Customer info(name, email) is duplicated across orders.xlsxx
- Lack of Unique Identifiers for Books. Books titles are used as the primary identifier in both orders.xlsx & inventory.xlsx, but titles aren't unique
- No data Integrity Enforcement. There's no mechanism to prevent orders for ou of stock books


Task 2 
Customers
- custormer_id(PRIMARY KEY)
- customer_name
- customer_email (UNIQUE)
- address
- phone

Books
- book_id(PRIMARY KEY)
- book_title
- author
- isbn (UNIQUE)
- publisher

Inventory
- book_id(FOREIGN KEY)
- stock_quantity
- min_stock_level
- last_restock_date

Orders 
- order_id (PRIMARY KEY)
- customer_id
- order_date
- status


Task 3
CREATE TALE Customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255) UNIQUE,
    address VARCHAR(255),
    phone VARCHAR(50)
);

CREATE TABLE Books (
    book_id INT PRIMARY KEY,
    book_title VARCHAR(255),
    author VARCHAR(255),
    isbn VARCHAR(13) UNIQUE,
    publisher VARCHAR(255)
);

CREATE TABLE Inventory (
    book_id INT PRIMARY KEY,
    stock_quantity INT,
    min_stock_level INT,
    last_restock_date DATE,
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);