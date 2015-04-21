<?php


class EditUpdateModel
{
    public function __construct()
    {

    }

    public function updateBuilder($recur, $user_id)
    {
        $objAgent = new AgentPDOModel();
        $objView = DataContModel::getInstance();
        $objValid = new ValidatorModel();
        $app_id = $_POST[ 'app_id' ];
        $room_id = $_POST[ 'room_id' ];
        $newTimeStart = ($_POST[ 'startHour' ] * 60 * 60) + ($_POST[ 'startMin' ] * 60);
        $newTimeEnd = ($_POST[ 'endHour' ] * 60 * 60) + ($_POST[ 'endMin' ] * 60);
        $description = $_POST[ 'description' ];
        $arrMess = array();
        if (0 == $recur) {
            $appDetails = $objAgent->getAppointment($app_id);
            $startDay = $appDetails[ 0 ][ 'start_time_ms' ] / 1000;
            $date = date('j', $appDetails[ 0 ][ 'start_time_ms' ] / 1000);
            $month = date('m', $appDetails[ 0 ][ 'start_time_ms' ] / 1000);
            $year = date('Y', $appDetails[ 0 ][ 'start_time_ms' ] / 1000);
            $startDay = mktime(0, 0, 0, $month, $date, $year);
            $endDay = mktime(23, 59, 59, $month, $date, $year);
            $startTime = ($newTimeStart + $startDay) * 1000;
            $endTime = ($newTimeEnd + $startDay) * 1000;
            $currentTime = time();
            $appList = $objAgent->getAppointmentsInDay($app_id, $startDay * 1000, $endDay * 1000, $room_id);
            if (empty($appList)) {
                if ($currentTime < ($startTime / 1000)
                    && $currentTime < ($appDetails[ 0 ][ 'start_time_ms' ] / 1000)
                    && ($startTime / 1000) < ($endTime / 1000)) {
                    $ins = $objAgent->updateAppointment($app_id, $startTime, $endTime, $description, $user_id);
                    return $ins;
                } else {
                    return $arrMess[ 'Error' ] = $date.'.'.$month.'.'.$year;
                }
            } else {
                $valid = $objValid->checkTime($appList, $startTime, $endTime);
                if (0 == $valid) {
                    $ins = $objAgent->updateAppointment($app_id, $startTime, $endTime, $description, $user_id);
                    return $ins;
                } else {
                    return $arrMess[ 'Error' ] = $date.'.'.$month.'.'.$year;
                }
            }
        } else {
            $rec_id = $objAgent->getRecurrentId($app_id);
            $appListById = $objAgent->getAppointmentsByRecId($rec_id);
            $arrMess = array();
            foreach ($appListById as $key => $val) {
                $startDay = $val[ 'start_time_ms' ] / 1000;
                $date = date('j', $val[ 'start_time_ms' ] / 1000);
                $month = date('m', $val[ 'start_time_ms' ] / 1000);
                $year = date('Y', $val[ 'start_time_ms' ] / 1000);
                $startDay = mktime(0, 0, 0, $month, $date, $year);
                $endDay = mktime(23, 59, 59, $month, $date, $year);
                $currentTime = time();
                $startTime = ($newTimeStart + $startDay) * 1000;
                $endTime = ($newTimeEnd + $startDay) * 1000;
                $appList = $objAgent->getAppointmentsInDay($val[ 'id' ], $startDay * 1000, $endDay * 1000, $room_id);
                if (empty($appList)) {
                    if ($currentTime < ($startTime / 1000) && $currentTime < ($val[ 'start_time_ms' ] / 1000) && ($startTime / 1000) < ($endTime / 1000)) {
                        $ins = $objAgent->updateAppointment($val[ 'id' ], $startTime, $endTime, $description, $user_id);
                        //$objView->setData(array(0 => $ins));
                    } else {
                        $arrMess[ 'Error' ] = $date.'.'.$month.'.'.$year;
                    }

                } else {
                    $valid = $objValid->checkTime($appList, $startTime, $endTime);
                    if (0 == $valid) {
                        $ins = $objAgent->updateAppointment($val[ 'id' ], $startTime, $endTime, $description, $user_id);
                    } else {
                        $arrMess[ 'Error' ] = $date.'.'.$month.'.'.$year;
                    }
                }

            }
            if (empty($arrMess)) {
                return true;
            } else {
                return $arrMess[ 'Error' ];
            }
        }
    }

    public function deleteBuilder($user_id, $app_id, $recur)
    {
        $objAgent = new AgentPDOModel();
        $checkDel = $objAgent->checkDelete($user_id, $app_id);
        if ($checkDel) {
            $deleteApp = $objAgent->deleteAppointment($app_id, $recur);

            return $deleteApp;
        }
    }
} 