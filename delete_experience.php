<?php
session_start();
if(!isset($_SESSION["user_id"])){
    echo json_encode(['status' => 'unauthorised']);
    exit();
}
require_once "connection.php";
if($_SERVER['REQUEST_METHOD']=="POST" && isset($_POST['id'])){
    $id=intval($_POST["id"]);

    $sql="DELETE FROM Experiences WHERE id=$id";
    $result=mysqli_query($conn,$sql);

    if($result){
        echo json_encode(['status' =>'success']);
    }else{
        echo json_encode(['status' =>"error" , "message" => "deletd query not executed successfuly"]);
    }

}else{
    echo json_encode(['status' =>"error" , "message" => "invalid server response"]);
}


?>


