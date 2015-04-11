<?php

class Page404PaletteModel {

   // private $arr = array();
    /**
     *
     */
    public function __construct() {

    }

    /**
     * @return array
     */
    public function getArr(){
        $arr = array(''=>'');
        return DataContModel::getInstance()->getData();
    }
}