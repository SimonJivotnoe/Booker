-- phpMyAdmin SQL Dump
-- version 4.0.10
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 18 2015 г., 13:23
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=132 ;

--
-- Дамп данных таблицы `APPOINTMENTS`
--

INSERT INTO `APPOINTMENTS` (`id`, `user_id`, `room_id`, `start_time_ms`, `end_time_ms`, `description`) VALUES
(107, '9', '', 1431694800000, 1431696600000, ''),
(108, '9', '', 1429275600000, 1429277400000, ''),
(109, '9', '', 1429563600000, 1429565400000, ''),
(110, '9', '', 1430168400000, 1430170200000, ''),
(111, '9', '', 1430773200000, 1430775000000, ''),
(112, '9', '', 1431378000000, 1431379800000, ''),
(113, '9', '', 1431982800000, 1431984600000, ''),
(114, '9', '', 1431896400000, 1431898200000, ''),
(116, '9', '', 1429696800000, 1429709400000, ''),
(117, '9', '', 1430301600000, 1430314200000, ''),
(118, '9', '', 1430906400000, 1430919000000, ''),
(119, '9', '', 1431511200000, 1431523800000, ''),
(120, '9', '', 1432116000000, 1432128600000, ''),
(121, '9', '', 1429736400000, 1429738200000, ''),
(122, '9', '', 1430946000000, 1430947800000, ''),
(123, '9', '', 1432155600000, 1432157400000, ''),
(124, '9', '', 1429822800000, 1429907400000, ''),
(125, '9', '', 1429293600000, 1429295400000, ''),
(126, '9', '', 1429477200000, 1429479000000, ''),
(127, '9', '', 1430082000000, 1430083800000, ''),
(128, '9', '', 1430686800000, 1430688600000, ''),
(129, '9', '', 1431291600000, 1431293400000, '');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Дамп данных таблицы `EMPLOYEES`
--

INSERT INTO `EMPLOYEES` (`user_id`, `role`, `user_name`, `user_pass`, `user_mail`) VALUES
(2, 'admin', 'boss', 'boss', 'boss@mail.ru'),
(3, '', 'user2', '2222', 'user2@mail.ru'),
(9, '', 'user1', '1111', 'user1@mail.ru');

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
