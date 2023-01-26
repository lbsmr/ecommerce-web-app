CREATE DATABASE IF NOT EXISTS ecommercedb;

USE ecommercedb;

CREATE TABLE IF NOT EXISTS user(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('MASTER','CLIENT','SELLER') NOT NULL,
    specialPassword VARCHAR(255) DEFAULT NULL,
    bankName VARCHAR(100) DEFAULT NULL,
    bankAccountNumber INT(100) DEFAULT NULL,
    bankAddress VARCHAR(100) DEFAULT NULL
);

DESCRIBE user;

CREATE TABLE IF NOT EXISTS product(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(75) NOT NULL,
    price INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    sellerId INT(11) NOT NULL
);

DESCRIBE product;

CREATE TABLE IF NOT EXISTS `order`(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    buyerId INT(11) NOT NULL,
    sellerId INT(11) NOT NULL,
    productName VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    payment ENUM('Cash','Credit','Debit') NOT NULL,
    nameOnCard VARCHAR(50),
    expiration VARCHAR(8),
    cvv INT,
    creditNumber INT(25),
    status ENUM('In process','On delivery','Delivered') DEFAULT 'In process',
    totalPrice INT NOT NULL
);