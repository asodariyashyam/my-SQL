-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 10, 2024 at 10:03 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `make_apis`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`)
) ENGINE=MyISAM AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `userId`, `productId`, `quantity`) VALUES
(59, 46, 48, 1),
(64, 48, 50, 2),
(57, 48, 48, 1),
(56, 48, 57, 1),
(55, 48, 56, 1),
(54, 48, 55, 1),
(53, 48, 54, 1),
(52, 48, 50, 1),
(51, 49, 53, 1),
(50, 49, 54, 1),
(49, 48, 56, 1),
(48, 48, 47, 1),
(47, 48, 50, 1),
(61, 48, 50, 42),
(62, 47, 50, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(30) NOT NULL,
  `price` int NOT NULL,
  `old_price` int NOT NULL,
  `description` varchar(1000) NOT NULL,
  `userId` int NOT NULL,
  `stock` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_name` (`product_name`)
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `product_name`, `price`, `old_price`, `description`, `userId`, `stock`) VALUES
(54, 'googel 7', 50000, 5000, 'test', 47, 48),
(55, 'googel 7pro', 80000, 80000, 'test', 49, 54),
(56, 'googel 7 a', 65000, 62000, 'test', 49, 43),
(57, 'googel 8 ', 80000, 80000, 'test', 49, 9),
(48, 'googel 6', 25, 25, 'test', 46, 0),
(53, 'googel  6a', 25000, 27000, 'text\r\n\r\n', 47, 97),
(47, 'googel 4', 25, 25, 'text', 46, 48);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(110) NOT NULL,
  `password` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'buyer',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `role`) VALUES
(48, 'shyamasoriya25@gmail.com', '$2b$10$GgPaPGLWix6iVR9GVmlqmOLzJB8p4RMxaUFKdkaZF3uzun86krt/e', 'Buyer'),
(47, 'shyamasoriya124@gmail.com', '$2b$10$coT2J8POPF50sYGlRM0k3.ZQEjj/pa.MCvizDbdDtld02sdMZJ.lu', 'Seller'),
(46, 'asodariyashyam555@gmail.com', '$2b$10$wNoijuVSGPqEDEtQyblxj.fK8P8IU4pR3lzPT3ObRF/GS/c9pDc5O', 'Admin'),
(49, 'asodaruya3@gmail.com', '$2b$10$FhVdZj1.cpOmxt/qj8mGu.F3W2yoAlEIjXlDYbRpACMUmaHduSTHe', 'Seller');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
