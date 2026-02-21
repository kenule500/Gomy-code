-- Creating the Customer table
CREATE TABLE CUSTOMER (
    Customer_id VARCHAR2(20) PRIMARY KEY,
    Customer_Name VARCHAR2(20) NOT NULL,
    Customer_Tel NUMBER
);

-- Creating the Product table
CREATE TABLE PRODUCT (
    Product_id VARCHAR2(20) PRIMARY KEY,
    Product_Name VARCHAR2(20) NOT NULL,
    Price NUMBER CHECK (Price > 0)
);

-- Creating the Orders table
CREATE TABLE ORDERS (
    Customer_id VARCHAR2(20),
    Product_id VARCHAR2(20),
    Quantity NUMBER,
    Total_amount NUMBER,
    CONSTRAINT fk_customer FOREIGN KEY (Customer_id) REFERENCES CUSTOMER(Customer_id),
    CONSTRAINT fk_product FOREIGN KEY (Product_id) REFERENCES PRODUCT(Product_id)
);

-- Add Category to PRODUCT
ALTER TABLE PRODUCT ADD Category VARCHAR2(20);

-- Add OrderDate to ORDERS with Default Value
ALTER TABLE ORDERS ADD OrderDate DATE DEFAULT SYSDATE;