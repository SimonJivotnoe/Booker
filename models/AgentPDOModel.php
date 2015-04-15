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
                    ->from("EMPLOYEES")
                    ->where("user_name = '$name' AND user_pass = '$pass'")
                    ->exec();
        if (0 == count($res)) {
            return array('noUser' => 'ask admin to register You');
        } else {
            $this->resArr = $res;
            return true;
        }
    }

    public function checkAdmin($user_id){
        $pdo = PDOModel::connect();
        $res = $pdo ->select("user_name, user_pass, user_id")
            ->from("EMPLOYEES")
            ->where("user_id = '$user_id' AND role = 'admin'")
            ->exec();
        if (0 == count($res)) {
            $list = $pdo ->select("user_id, user_name, user_pass, user_mail")
                ->from("EMPLOYEES")
                ->where("user_id = '$user_id'")
                ->exec();
            $this->resArr = $list;
            return false;
        } else {
            $list = $pdo ->select("user_id, user_name, user_pass, user_mail")
                ->from("EMPLOYEES")
                ->where("role = ''")
                  ->exec();
            $this->resArr = $list;
            return true;
        }
    }
    public function getAppointments($firstDay, $lastDay){
        $pdo = PDOModel::connect();
        $res = $pdo->select("id, start_time_ms, end_time_ms")
                    ->from("APPOINTMENTS")
                    ->where("start_time_ms >='$firstDay' AND end_time_ms <='$lastDay'")
                    ->exec();
        return $res;
    }

    public function deleteUser($userId){
        $pdo = PDOModel::connect();
        $res = $pdo ->delete("EMPLOYEES")
            ->where("user_id = '$userId'")
            ->execInsert();
        if (0 == count($res)) {
            return false;
        } else {
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