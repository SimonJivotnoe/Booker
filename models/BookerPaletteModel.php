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
        $arr = $obj->getData();
        //var_dump($arr);
        $role = $obj->getRole();
        $sub = new SubstitutionModel();
        if ($role) {
            $this->repArr['%EMPLOYEELISTBUTTON%'] = $sub->subHTMLReplace('employeeListButton.html',array());
        }
        $userList = '';
        foreach ($arr as $key => $val) {
            $userList .= '<option>'.$val['user_name'].'</option>';
        }
        $this->repArr['%MODAL%'] = $sub->subHTMLReplace('bookIt.html',array('%USERSLIST%' => $userList) );
        return $this->repArr;
    }
} 