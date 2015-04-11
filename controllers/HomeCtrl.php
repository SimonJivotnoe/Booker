<?php

class HomeCtrl
{
    /**
     *
     */
    public function __construct()
    {
        $objView = DataContModel::getInstance();
        $objSess = new SessionModel();
        $sesCheck = $objSess->read('BookerLogin');
        if (!empty($sesCheck)) {
            $objView->setStartPage(BOOKER);
        } else {
            //$this->startPage();
            $objView->setStartPage(INDEX);
        }
    }
}