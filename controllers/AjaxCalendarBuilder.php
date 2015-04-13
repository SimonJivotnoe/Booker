<?php


class AjaxCalendarBuilder {
    public function __construct() {
        $objView = DataContModel::getInstance();
        $firstDay = $_GET['start'];
        $lastDay = $_GET['end'];
        $objAgent = new AgentPDOModel();
        $res = $objAgent->getAppointments($firstDay, $lastDay);
        $objView->setData($res);
    }
} 