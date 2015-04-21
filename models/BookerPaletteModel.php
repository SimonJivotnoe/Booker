<?php


class BookerPaletteModel {
    private $repArr = array('%EMPLOYEELISTBUTTON%' => '',);

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
        $objAgent = new AgentPDOModel();
        $arr = $obj->getData();
        //var_dump($arr);
        $role = $obj->getRole();
        $sub = new SubstitutionModel();
        $users_arr = array('%NAME' => '', '%CLASS%' => 'form-control');
        if ($role) {
            $this->repArr['%EMPLOYEELISTBUTTON%'] = $sub->subHTMLReplace('employeeListButton.html',array());
        }
        $userList = '';
        foreach ($arr as $key => $val) {
            if (1 == count($arr)) {
                $userList .= '<option>'.$val['user_name'].'</option>';
            } else {
                $userList .= '<option value="'.$val['user_id'].'">'.$val['user_name'].'</option>';
                $users_arr['%NAME%'] = 'userBookIt';
            }
        }
        $users_arr['%USERLIST%'] = $userList;
        $users_res = $sub->subHTMLReplace('userList.html', $users_arr);
        $rooms = '';
        $roomsArr = $objAgent->getRooms();
        foreach ($roomsArr as $key => $val) {
            $rooms .= '<option value="'.$val['room_id'].'">'.$val['room_name'].'</option>';
        }
        $this->repArr['%ROOMS%'] = $rooms;
        $this->repArr['%MODAL%'] = $sub->subHTMLReplace('bookIt.html',array('%USERSLIST%' => $users_res) );
        $this->repArr['%WELCOME%'] = $_SESSION['BookerLogin'];
        return $this->repArr;
    }
} 