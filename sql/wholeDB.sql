-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2019 at 02:14 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinema_reservation`
--
CREATE DATABASE IF NOT EXISTS `cinema_reservation` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `cinema_reservation`;

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movie_id` int(11) NOT NULL,
  `movie_name` varchar(250) NOT NULL,
  `genre` varchar(50) NOT NULL,
  `screen` int(11) NOT NULL,
  `length` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movie_id`, `movie_name`, `genre`, `screen`, `length`) VALUES
(6, 'The Lion King', 'Animation', 1, 180),
(7, 'The Lion King 2', 'Animation', 2, 100),
(8, 'The Lion King 1/2', 'Animation', 3, 100),
(9, 'Toy Story', 'Animation', 4, 110),
(10, 'Toy Story 2', 'Animation', 5, 60);

-- --------------------------------------------------------

--
-- Table structure for table `movie_times`
--

CREATE TABLE `movie_times` (
  `movie_id` int(11) NOT NULL,
  `movie_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `movie_times`
--

INSERT INTO `movie_times` (`movie_id`, `movie_time`) VALUES
(6, '2019-12-01 05:10:10'),
(6, '2019-12-02 05:10:10'),
(7, '2019-12-04 06:10:10'),
(8, '2019-12-05 07:10:10'),
(9, '2019-12-06 05:20:10'),
(10, '2019-12-07 08:10:10');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `screen` int(11) NOT NULL,
  `seat_row` int(11) NOT NULL,
  `seat_col` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`screen`, `seat_row`, `seat_col`) VALUES
(1, 1, 1),
(1, 1, 2),
(1, 1, 3),
(1, 1, 4),
(1, 2, 1),
(2, 3, 1),
(3, 1, 1),
(4, 1, 1),
(5, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `screen`
--

CREATE TABLE `screen` (
  `screen_number` int(11) NOT NULL,
  `rows` int(11) NOT NULL,
  `columns` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `screen`
--

INSERT INTO `screen` (`screen_number`, `rows`, `columns`) VALUES
(1, 5, 5),
(2, 6, 6),
(3, 10, 10),
(4, 10, 10),
(5, 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `birth_date` date NOT NULL,
  `email` varchar(250) NOT NULL,
  `type` enum('admin','customer') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `birth_date`, `email`, `type`) VALUES
('customer', '1', 'someone', 'something', '1997-08-07', 'dumm1y@', 'customer'),
('maryam', '1', 'maryam', 'shalaby', '1997-08-07', 'dummy@', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movie_id`),
  ADD KEY `screen` (`screen`);

--
-- Indexes for table `movie_times`
--
ALTER TABLE `movie_times`
  ADD PRIMARY KEY (`movie_id`,`movie_time`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`screen`,`seat_row`,`seat_col`);

--
-- Indexes for table `screen`
--
ALTER TABLE `screen`
  ADD PRIMARY KEY (`screen_number`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `movie_times`
--
ALTER TABLE `movie_times`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`screen`) REFERENCES `screen` (`screen_number`);

--
-- Constraints for table `movie_times`
--
ALTER TABLE `movie_times`
  ADD CONSTRAINT `movie_times_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`);

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`screen`) REFERENCES `screen` (`screen_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
