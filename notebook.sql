-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 18 maj 2024 kl 00:32
-- Serverversion: 10.4.32-MariaDB
-- PHP-version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `notebook`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `category`
--

CREATE TABLE `category` (
  `ID` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `parent` int(10) NOT NULL DEFAULT 0,
  `created` datetime NOT NULL,
  `edited` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `category`
--

INSERT INTO `category` (`ID`, `name`, `parent`, `created`, `edited`) VALUES
(18, 'Math', 0, '2024-04-22 14:39:07', '2024-04-22 14:39:07');

-- --------------------------------------------------------

--
-- Tabellstruktur `post`
--

CREATE TABLE `post` (
  `ID` int(10) NOT NULL,
  `codeblocks` text CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `created` datetime NOT NULL,
  `edited` datetime NOT NULL,
  `parent` int(10) NOT NULL DEFAULT 0,
  `title` text CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `post`
--

INSERT INTO `post` (`ID`, `codeblocks`, `created`, `edited`, `parent`, `title`) VALUES
(36, '[]', '2024-04-22 14:39:16', '2024-04-22 14:39:16', 18, 'Number Theory'),
(37, '[{\"desc\":\"This is BFS.\",\"code\":\"let i = 0;\\r\\nwhile(true) break;\",\"extended\":true}]', '2024-04-22 14:39:21', '2024-04-22 14:39:40', 18, 'Graph Theory');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`);

--
-- Index för tabell `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT för tabell `post`
--
ALTER TABLE `post`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
