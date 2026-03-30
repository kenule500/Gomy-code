-- Display all customer data:
SELECT * FROM Customer;

-- Display product names and categories for prices between 5000 and 10000:
SELECT product_name, category 
FROM Product 
WHERE Price BETWEEN 5000 AND 10000;

-- Display all product data sorted by price (descending):
SELECT * FROM Product 
ORDER BY Price DESC;


-- Display order statistics (Total, Average, Max, and Min amounts):
SELECT COUNT(*) AS total_orders, 
       AVG(total_amount) AS average_amount, 
       MAX(total_amount) AS highest_amount, 
       MIN(total_amount) AS lowest_amount 
FROM Orders;


-- Display the number of orders for each product_id:
SELECT Product_id, COUNT(*) AS num_orders 
FROM Orders 
GROUP BY Product_id;

-- Display customer_id with more than 2 orders:
SELECT Customer_id 
FROM Orders 
GROUP BY Customer_id 
HAVING COUNT(*) > 2;

-- Display the number of orders for each month of the year 2020:
SELECT EXTRACT(MONTH FROM OrderDate) AS month, COUNT(*) AS num_orders
FROM Orders
WHERE EXTRACT(YEAR FROM OrderDate) = 2020
GROUP BY EXTRACT(MONTH FROM OrderDate);

-- Display product name, customer name, and order date for each order:
SELECT p.product_name, c.customer_Name, o.OrderDate
FROM Orders o
JOIN Product p ON o.Product_id = p.Product_id
JOIN Customer c ON o.Customer_id = c.Customer_id;

-- Display all orders made three months ago:
SELECT * FROM Orders
WHERE OrderDate >= CURRENT_DATE - INTERVAL '3 months';


-- Display customers who have never ordered a product:
SELECT Customer_id FROM Customer
WHERE Customer_id NOT IN (SELECT DISTINCT Customer_id FROM Orders);