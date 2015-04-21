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
        $this->repArr['%SUBMITTED%'] = $arr[0]['submitted'];
        $this->repArr['%DESCRIPTION%'] = $arr[0]['description'];
        $users_arr = array('%NAME' => '', '%CLASS%' => '');
        $userList = '';
        foreach ($arr[2] as $key => $val) {
            if (1 == count($arr[2])) {
                if ($arr[3] == $val['user_id']) {
                    $userList .= '<option selected><strong>'.$val['user_name'].'</strong></option>';
                }
            } else {
                if ($arr[3] == $val['user_id']) {
                    $userList .= '<option value="'.$val['user_id'].
                        '" selected><strong>'.$val['user_name'].'</strong></option>';
                } else {
                    $userList .= '<option value="'.$val['user_id'].'">'.$val['user_name'].'</option>';
                }
                $users_arr['%NAME%'] = 'user';
            }

        }
        $users_arr['%USERLIST%'] = $userList;
        $this->repArr['%USER%'] = $sub->subHTMLReplace('userList.html', $users_arr);
        if(!empty($arr[1])){
            $recc = $sub->subHTMLReplace('ifRecurrent.html',array() );
            $this->repArr['%RECURRENT%'] = $recc;
        } else {
            $this->repArr['%RECURRENT%'] = '';
        }
        if(($arr[0]['start_time_ms'] / 1000) > time()){
            $buttons = $sub->subHTMLReplace('EditUpdateButtons.html',array('%ID%' => $arr[0]['id']) );
            $this->repArr['%BUTTONS%'] = $buttons;
        } else {
            $this->repArr['%BUTTONS%'] = '';
        }

        //var_dump($this->repArr);
        return $this->repArr;
    }
} 