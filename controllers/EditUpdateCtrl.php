<?php


class EditUpdateCtrl {
public function __construct() {
    $objView = DataContModel::getInstance();
    $objAgent = new AgentPDOModel();
    $id = (int)$_GET['id'];
    $res = $objAgent->getAppointment($id );
    $objView->setStartPage('edit.html');
    $objView->setData($res);
}
} 