<?php


class BookerPaletteModel {
    private $repArr = array();

    /**
     *
     */
    public function __construct()
    {

    }

    /**
     * @return array
     */
    public function getArr()
    {
        $obj = DataContModel::getInstance();
        $arr = $obj->getData();
        $sub = new SubstitutionModel();
        $this->repArr['%MODAL%'] = $sub->subHTMLReplace('bookIt.html',array() );
        if (!empty($arr)) {
            return $arr;
        } else {
            return $this->repArr;
        }
    }
} 