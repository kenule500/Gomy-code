-- 1. Insert Data into Customer Table
INSERT INTO Customer (Customer_id, customer_Name, customer_Tel)
VALUES 
('C01', 'ALI', '71321009'),
('C02', 'ASMA', '77345823');

-- 2. Insert Data into Product Table
INSERT INTO Product (Product_id, product_name, category, Price)
VALUES 
('P01', 'SAMSUNG GALAXY S20', 'Smartphone', 3299),
('P02', 'ASUS ROG STRIX', 'PC', 6599);

-- 3. Insert Data into Orders Table
INSERT INTO Orders (Customer_id, Product_id, OrderDate, quantity, total_amount)
VALUES 
('C01', 'P02', NULL, 2, 9198),
('C02', 'P01', '2020-05-28', 1, 3299);