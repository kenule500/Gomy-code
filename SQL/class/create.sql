-- CREATE TABLE Categories (
--   id INT PRIMARY KEY,
--   name VARCHAR(100)
-- );
-- CREATE TABLE Products (
--   id INT PRIMARY KEY,
--   name VARCHAR(100),
--   description TEXT,
--   price DECIMAL(10,2),
--   category_id INT,
--   FOREIGN KEY (category_id) REFERENCES Categories(id)
-- );

-- -- Insert Categories
-- INSERT INTO Categories VALUES 
-- (1, 'Books'), 
-- (2, 'Electronics'), 
-- (3, 'Clothing');

-- -- Insert Products
-- INSERT INTO Products VALUES
-- (1, 'C++ Book', 'Learn C++ from scratch', 29.99, 1),
-- (2, 'Laptop', 'Gaming laptop', 1099.99, 2),
-- (3, 'T-Shirt', 'Cotton T-Shirt', 15.99, 3),
-- (4, 'Headphones', 'Noise cancelling', 59.99, 2),
-- (5, 'Python Book', 'Advanced Python', 39.99, 1);

-- SELECT Products.name, Categories.name AS category
-- FROM Products
-- JOIN Categories ON Products.category_id = Categories.id;


UPDATE Products
SET price = price * 1.1
WHERE category_id = (SELECT id FROM Categories WHERE name = 'Books');