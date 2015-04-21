<?php


class EditUpdateCtrl
{
    private $user_id;

    public function __construct()
    {
        $objView = DataContModel::getInstance();
        $objAgent = new AgentPDOModel();
        $objSess = new SessionModel();
        $objModel = new EditUpdateModel();
        $sesCheck = $objSess->read('BookerLogin');
        if (isset($_POST[ 'user' ])) {
            $this->user_id = $_POST[ 'user' ];
        } else {
            $this->user_id = $_SESSION[ 'BookerID' ];
        }
        if (empty($_POST[ 'action' ])) {
            $objAgent->checkAdmin($this->user_id);
            $id = (int)$_GET[ 'id' ];
            $res = $objAgent->getAppointment($id);
            $objView->setStartPage('edit.html');
            $objView->setData($res);
        } else if ('delete' == $_POST[ 'action' ]) {
            $recur = 0;
            if (isset($_POST[ 'ifRec' ])) {
                $recur = 1;
            }
            $app_id = $_POST[ 'app_id' ];
            $deleteApp = $objModel->deleteBuilder($this->user_id, $app_id, $recur);
            $objView->setData(array(0 => $deleteApp));
        } else if ('update' == $_POST[ 'action' ]) {
            $recur = 0;
            if (isset($_POST[ 'ifRec' ])) {
                $recur = 1;
            }
            $result = $objModel->updateBuilder($recur, $this->user_id);
            $objView->setData(array($result));
//$objView->setData(array(0 => $_POST));
        }
    }
} 