<?php


class AjaxTime
{
    private $start;
    private $end;
    private $startDay;
    private $endDay;

    public function __construct()
    {
        $objView = DataContModel::getInstance();
        $objAgent = new AgentPDOModel();
        if (!empty($_POST['formMonth'])) {

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
                $objView->setData(array(0 => false));
            } else {
                $objValid = new ValidatorModel();
                $valid = $objValid->checkTime($app,$this->start, $this->end );
                if (0 == $valid) {
                    if (!empty($_POST['formMonth'])) {

                    } else {
                        $objView->setData(array(0 => false));
                    }
                } else {
                    $objView->setData(array(0 => true));
                }

            }
        }
    }
} 