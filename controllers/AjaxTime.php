<?php


class AjaxTime
{
    private $start;
    private $end;
    private $startDay;
    private $endDay;

    private $specifics;
    private $recurring;
    public function __construct()
    {
        $objView = DataContModel::getInstance();
        $objAgent = new AgentPDOModel();
        if (!empty($_POST['formMonth'])) {
            $this->start = $_POST[ 'start' ];
            $this->end = $_POST[ 'end' ];
            $this->startDay = $_POST[ 'startDay' ];
            $this->endDay = $_POST[ 'endDay' ];
            $this->specifics = $_POST['bookerTextArea'];
            $this->recurring = $_POST[ 'recurring' ];
        } else {
            $this->start = $_GET[ 'start' ];
            $this->end = $_GET[ 'end' ];
            $this->startDay = $_GET[ 'startDay' ];
            $this->endDay = $_GET[ 'endDay' ];
        }

        $res = $objAgent->checkAppointments($this->start, $this->end);
        if ($res) {
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
                    $objView->setData(array(0 => true));
                }

            }
        }
    }

    private function insertApp(){
        $objView = DataContModel::getInstance();
        $objAgent = new AgentPDOModel();
        if (!empty($_POST['formMonth'])) {
            $user_id = $_SESSION['BookerID'];
            $ins = $objAgent->insertAppointment($user_id, $this->start, $this->end, $this->specifics);
            if ($ins) {
                $objView->setData(array(0 => true));
            } else {
                $objView->setData(array(0 => false));
            }
        } else {
            $objView->setData(array(0 => false));
        }
    }
} 