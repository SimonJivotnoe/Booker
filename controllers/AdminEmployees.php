<?php


class AdminEmployees {
public function __construct() {
    $objView = DataContModel::getInstance();
    $userId = $_GET['userId'];
    $objModel = new AdminEmployeesModel();
    if (empty($userId)) {
        if ('add' == $_GET['action']) {
            $res = $objModel->addEditUser('add', '');
            $objView->setData(array(0 => $res));
        }
    } else {
        if ('delete' == $_GET['action']) {
            $res = $objModel->deleteUser($userId);
            $objView->setData(array(0 => $res));
        } else if('edit' == $_GET['action']){
            $res = $objModel->addEditUser('edit', $userId);
            $objView->setData(array(0 => $res));
        }
    }
}
} 