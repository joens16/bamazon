-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS bamazonDB;
-- Create a database --
CREATE DATABASE bamazonDB;

-- Use programming db for the following statements --
USE bamazonDB;

CREATE TABLE IF NOT EXISTS products(
  
	item_id INTEGER (50) UNSIGNED AUTO_INCREMENT NOT NULL 
	, product_name VARCHAR (50) NOT NULL 
	, department_name VARCHAR (50) NOT NULL
    , price INTEGER (50) NOT NULL
    , stock_quantity INTEGER (50)
	, PRIMARY KEY(item_id)
);

-- Create new example rows

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yeti", "Kitchen", 40, 200)
, ("Blender", "Kitchen", 30, 190)
, ("Pan", "Kitchen", 20, 180)
, ("Toy Car", "Toys", 80, 100)
, ("Toy Bike", "Toys", 70, 90)
, ("Toy Plane", "Toys", 60, 80)
, ("Iphone", "Electronics", 900, 50)
, ("Galaxy Phone", "Electronics", 800, 40)
, ("Ipad", "Electronics", 700, 30)
, ("Surface Pro", "Electronics", 600, 20);


SELECT * FROM products;
