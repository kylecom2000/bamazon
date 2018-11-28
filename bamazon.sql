DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adjustable Laptop Stand", "Computer Accessories", 80, 10),
("Bose QuietComfort 35", "Electronics", 300, 50),
("Gold Fish", "Groceries", 5, 500),
("Mac Book Pro", "Electronics", 2500, 3),
("Clif Bars", "Groceries", 5, 250),
("Bamazon Echo Silver", "Electronics", 30, 10000),
("Xmas Sweater", "Clothing", 20, 100),
("FitBit", "Electronics", 250, 250),
("RayBan Sunglasses", "Clothing Accesories", 193, 100),
("xBox One", "Electronics", 250, 300);

SELECT * FROM products

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
