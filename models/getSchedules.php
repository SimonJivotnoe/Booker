<?php
include '../config.php';
include 'MysqlModel.php';
$objCon = new MysqlModel();
$res = $objCon->selectAll();
$start = $_GET['start'];
$end = $_GET['end'];
echo json_encode($res);
//echo ($end);

