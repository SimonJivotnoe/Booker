<?php


class AgentPDOModel {
    private $resArr = array();
    public function __construct() {

    }

    public function checkUser($checkArr){
        $name = $checkArr['login'];
        $pass = $checkArr['pass'];
        $pdo = PDOModel::connect();
        $res = $pdo ->select("user_name, user_pass, user_id")
                    ->from("employees")
                    ->where("user_name = '$name' AND user_pass = '$pass'")
                    ->exec();
        if (0 == count($res)) {
            return array('noUser' => 'ask admin to register You');
        } else {
            $this->resArr = $res;
            return true;
        }
    }

    /**
     * @return array
     */
    public function getResArr()
    {
        return $this->resArr;
    }

} 