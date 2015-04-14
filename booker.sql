-- phpMyAdmin SQL Dump
-- version 4.0.10
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 14 2015 г., 12:19
-- Версия сервера: 5.5.38-log
-- Версия PHP: 5.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `booker`
--

-- --------------------------------------------------------

--
-- Структура таблицы `APPOINTMENTS`
--

CREATE TABLE IF NOT EXISTS `APPOINTMENTS` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(30) NOT NULL,
  `room_id` varchar(30) NOT NULL,
  `start_time_ms` bigint(20) NOT NULL,
  `end_time_ms` bigint(20) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Дамп данных таблицы `APPOINTMENTS`
--

INSERT INTO `APPOINTMENTS` (`id`, `user_id`, `room_id`, `start_time_ms`, `end_time_ms`, `description`) VALUES
(1, '1', '1', 1426849200000, 1426851000000, 'cfbdfbdfb'),
(5, '1', '1', 1429680600000, 1429687800000, ''),
(6, '1', '1', 1429689600000, 1429693200000, ''),
(7, '1', '1', 1429695000000, 1429698600000, ''),
(8, '1', '1', 1429702200000, 1429705800000, '');

-- --------------------------------------------------------

--
-- Структура таблицы `EMPLOYEES`
--

CREATE TABLE IF NOT EXISTS `EMPLOYEES` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` text NOT NULL,
  `user_pass` int(11) NOT NULL,
  `user_mail` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `EMPLOYEES`
--

INSERT INTO `EMPLOYEES` (`user_id`, `user_name`, `user_pass`, `user_mail`) VALUES
(1, 'user1', 1111, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `rooms`
--

CREATE TABLE IF NOT EXISTS `rooms` (
  `room_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `rooms`
--

INSERT INTO `rooms` (`room_id`) VALUES
(1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
