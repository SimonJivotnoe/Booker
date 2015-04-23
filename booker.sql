-- phpMyAdmin SQL Dump
-- version 4.0.10
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 23 2015 г., 12:30
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
  `recurrent` int(255) DEFAULT NULL,
  `description` text NOT NULL,
  `submitted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

--
-- Дамп данных таблицы `APPOINTMENTS`
--

INSERT INTO `APPOINTMENTS` (`id`, `user_id`, `room_id`, `start_time_ms`, `end_time_ms`, `recurrent`, `description`, `submitted`) VALUES
(1, '9', '1', 1429711200000, 1429713000000, 1, '', '2015-04-22 14:21:47'),
(2, '9', '1', 1429822800000, 1429824600000, NULL, '', '2015-04-22 19:12:59'),
(4, '9', '2', 1429824600000, 1429826400000, NULL, '', '2015-04-22 19:13:59'),
(5, '9', '2', 1429837200000, 1429839000000, NULL, '', '2015-04-22 19:16:14'),
(6, '9', '2', 1429840800000, 1429846200000, NULL, '', '2015-04-22 19:14:21'),
(7, '9', '2', 1432242000000, 1432243800000, 7, '', '2015-04-22 19:18:35'),
(8, '9', '2', 1430427600000, 1430429400000, 8, '', '2015-04-22 19:19:05'),
(12, '9', '2', 1433106000000, 1433107800000, 12, '', '2015-04-22 19:33:31'),
(13, '9', '2', 1434315600000, 1434317400000, 12, '', '2015-04-22 19:33:31'),
(14, '9', '2', 1435525200000, 1435527000000, 12, '', '2015-04-22 19:33:31'),
(18, '9', '2', 1430082000000, 1430083800000, NULL, '', '2015-04-22 20:26:19'),
(19, '9', '2', 1429732800000, 1429734600000, 19, '', '2015-04-22 20:26:34'),
(20, '9', '2', 1430337600000, 1430339400000, 19, '', '2015-04-22 20:26:34'),
(21, '9', '2', 1430942400000, 1430944200000, 19, '', '2015-04-22 20:26:34'),
(22, '9', '2', 1431547200000, 1431549000000, 19, '', '2015-04-22 20:26:34'),
(23, '9', '2', 1432152000000, 1432153800000, 19, '', '2015-04-22 20:26:34'),
(24, '3', '1', 1429740000000, 1429741800000, 24, '', '2015-04-22 21:44:13'),
(25, '1004', '1', 1430168400000, 1430170200000, 25, '', '2015-04-22 21:45:32');

-- --------------------------------------------------------

--
-- Структура таблицы `EMPLOYEES`
--

CREATE TABLE IF NOT EXISTS `EMPLOYEES` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `user_mail` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1005 ;

--
-- Дамп данных таблицы `EMPLOYEES`
--

INSERT INTO `EMPLOYEES` (`user_id`, `role`, `user_name`, `user_pass`, `user_mail`) VALUES
(3, '', 'user2', '2222', 'user2@mail.ru'),
(9, '', 'user1', '1111', 'user1@mail.ru'),
(777, 'admin', 'boss', 'boss', 'boss@mail.ru'),
(1003, '', 'dgdgdsf', 'sfgfdsgds', 'sdfgdsfgtsdf'),
(1004, '', 'user3', '3333', 'user3@mail.ru');

-- --------------------------------------------------------

--
-- Структура таблицы `rooms`
--

CREATE TABLE IF NOT EXISTS `rooms` (
  `room_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) NOT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `rooms`
--

INSERT INTO `rooms` (`room_id`, `room_name`) VALUES
(1, 'BoardRoom1'),
(2, 'BoardRoom2'),
(3, 'BoardRoom3');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
