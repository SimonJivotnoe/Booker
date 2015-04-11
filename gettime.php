<?php
/*
** Сценарий возвращает текущее время
*/

// Установка типа данных и кодировки
header("Content-type: text/plain; charset=utf-8");
header("My-Time: ".date("H:i:s"));
//var_dump("OK");