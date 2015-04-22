<?php


class AdminEmployeesModel
{
    public function __construct()
    {

    }

    public function deleteUser($userId){
        $objAgent = new AgentPDOModel();
        $res = $objAgent->deleteUser($userId);
        return $res;
    }
} 