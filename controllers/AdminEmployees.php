<?php


class AdminEmployees {
public function __construct() {
    $objView = DataContModel::getInstance();
    $userId = $_GET['userId'];
    $objModel = new AdminEmployeesModel();
    if (!empty($userId)) {
        if ('delete' == $_GET['action']) {
            $res = $objModel->deleteUser($userId);
            $objView->setData(array(0 => $res));
        } else if ('add' == $_GET['action']) {

        } else if('update' == $_GET['action']){

        }

    } else {

    }
}
} 