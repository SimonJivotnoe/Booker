<?php


class AjaxTime
{
    private $start;
    private $end;
    private $startDay;
    private $endDay;

    private $specifics;
    private $recurring;
    private $recType;
    private $duration;
    public function __construct()
    {
        $objView = DataContModel::getInstance();
        $objAgent = new AgentPDOModel();
        /*if (!empty($_POST['formMonth'])) {
            $this->typeOfReq = '$_POST';
        }
        $this->typeOfReq = trim(str_replace("'",'',$this->typeOfReq));
        $this->start = $this->typeOfReq[ 'start' ];
        $this->end = $this->typeOfReq[ 'end' ];
        $this->startDay = $this->typeOfReq[ 'startDay' ];
        $this->endDay = $this->typeOfReq[ 'endDay' ];
        $this->specifics = $this->typeOfReq['bookerTextArea'];
        $this->recurring = $this->typeOfReq[ 'recurring' ];
        if ('1' == $this->recurring) {
            $this->duration = (int)$this->typeOfReq['duration'];
            $this->recType = (int)$this->typeOfReq['recurringRes'];
        } else {
            $this->duration = 0;
        }*/
        if (!empty($_POST['formMonth'])) {
            $this->start = $_POST[ 'start' ];
            $this->end = $_POST[ 'end' ];
            $this->startDay = $_POST[ 'startDay' ];
            $this->endDay = $_POST[ 'endDay' ];
            $this->specifics = $_POST['bookerTextArea'];
            $this->recurring = $_POST[ 'recurring' ];
            if ('1' == $this->recurring) {
                $this->duration = (int)$_POST['duration'];
                $this->recType = (int)$_POST['recurringRes'];
            } else {
                $this->duration = 0;
            }
        } else {
            $this->start = $_GET[ 'start' ];
            $this->end = $_GET[ 'end' ];
            $this->startDay = $_GET[ 'startDay' ];
            $this->endDay = $_GET[ 'endDay' ];
            $this->recType = (int)$_GET['recurringRes'];
            if ('' != $this->recType) {
                $this->duration = (int)$_GET['duration'];
            } else {
                $this->duration = 0;
            }
        }

        $res = $this->checkApp($this->start, $this->end, $this->duration, $this->recType);
        if (!$res) {
            $objView->setData(array(0 => $res));
        } else {
            $app = $objAgent->getAppointments($this->startDay, $this->endDay);
            if (0 == count($app)) {
                $this->insertApp();
            } else {
                $objValid = new ValidatorModel();
                $valid = $objValid->checkTime($app,$this->start, $this->end );
                if (0 == $valid) {
                    $this->insertApp();
                } else {
                    $objView->setData(array(0 => false));
                }
            }
        }
    }

    private function checkApp($startApp, $endApp, $duration, $recType){
        $objAgent = new AgentPDOModel();
        $start = $startApp;
        $end = $endApp;
        $msInDay = 1000 * 60 * 60 * 24;
        $res = '';
        if (0 == $duration) {
            $res = $objAgent->checkAppointments($start, $end);
        } else {
            for ($i = 0; $i <= $duration; $i++) {
                $res = $objAgent->checkAppointments($start, $end);
                if (!$res) {break;}
                $start = ($recType * $msInDay) + $start;
                $end = ($recType * $msInDay) + $end;
            }
        }
        return $res;
    }

    private function insertApp(){
        $objView = DataContModel::getInstance();
        $objAgent = new AgentPDOModel();
        if (!empty($_POST['formMonth'])) {
            $user_id = $_SESSION['BookerID'];
            $ins = $objAgent->insertAppointment($user_id, $this->start, $this->end,
                $this->specifics, $this->duration);
            if ($ins) {
                $objView->setData(array(0 => true));
            } else {
                $objView->setData(array(0 => false));
            }
        } else {
            $objView->setData(array(0 => true));
        }
    }
} 