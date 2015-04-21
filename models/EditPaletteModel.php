<?php


class EditPaletteModel {
    private $repArr = array();
    public function __construct()
    {

    }

    public function getArr()
    {
        $obj = DataContModel::getInstance();
        $sub = new SubstitutionModel();
        $arr = $obj->getData();
        $this->repArr['%START%'] = $arr[0]['start_time_ms'];
        $this->repArr['%END%'] = $arr[0]['end_time_ms'];
        $this->repArr['%ID%'] = $arr[0]['id'];
        $this->repArr['%SUBMITTED%'] = $arr[0]['submitted'];
        $this->repArr['%DESCRIPTION%'] = $arr[0]['description'];
        $this->repArr['%USER%'] = $arr[2][0]['user_name'];
        if(!empty($arr[1])){
            $recc = $sub->subHTMLReplace('ifRecurrent.html',array() );
            $this->repArr['%RECURRENT%'] = $recc;
        } else {
            $this->repArr['%RECURRENT%'] = '';
        }
        if(($arr[0]['start_time_ms'] / 1000) > time()){
            $buttons = $sub->subHTMLReplace('EditUpdateButtons.html',array() );
            $this->repArr['%BUTTONS%'] = $buttons;
        } else {
            $this->repArr['%BUTTONS%'] = '';
        }

        //var_dump($this->repArr);
        return $this->repArr;
    }
} 