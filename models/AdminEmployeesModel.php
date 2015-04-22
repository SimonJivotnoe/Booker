<?php


class AdminEmployeesModel
{
    public function __construct()
    {

    }

    public function deleteUser($userId)
    {
        $objAgent = new AgentPDOModel();
        $res = $objAgent->deleteUser($userId);

        return $res;
    }

    public function addEditUser($action, $user_id)
    {
        $user_name = $_GET[ 'name' ];
        $user_pass = $_GET[ 'pass' ];
        $user_mail = $_GET[ 'mail' ];
        $objValid = new ValidatorModel();
        $valid = $objValid->formValidation($user_name, $user_pass);
        $EmailValid = $objValid->emailCheck($user_mail);
        if ($valid && $EmailValid) {
            $objAgent = new AgentPDOModel();
            if ('add' == $action) {
                $res = $objAgent->addUser($user_name, $user_pass, $user_mail);

                return $res;
            } else {
                $res = $objAgent->updateUser($user_name, $user_pass, $user_mail, $user_id);

                return $res;
            }
        } else {
            return $objValid->getErrMess();
        }
    }
} 