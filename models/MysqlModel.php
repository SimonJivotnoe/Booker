<?php
class MysqlModel {

    public function __construct(){
        mysql_connect(HOST, USER, PASS) or die('no connection to server');
        mysql_select_db (DB) or die ('no connection to DataBase');
    }

    /**
     * @return array
     */
    function selectAll() {
        $listOfSchedules = array();
        $result = mysql_query("SELECT * from APPOINTMENTS");
        if(empty ($result))
        {
            echo"<p>Data not received </p>";
            exit(mysql_error());
        }

        while ($row = mysql_fetch_assoc($result)) {
            $listOfSchedules[] = $row;
        }
        return $listOfSchedules;
    }

    function checkFormInputs($checkArr){
        $cName = $checkArr['loginAF'];
        $cPass = $checkArr['passAF'];
        $result = mysql_query("SELECT user_name, user_pass FROM employees.css WHERE user_name = '$cName' AND user_pass = '$cPass'");
        $row = mysql_fetch_assoc($result);
        if (empty($row)) {
            return false;
        } else {
            return true;
        }
    }
} 