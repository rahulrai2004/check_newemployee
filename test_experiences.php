<?php
session_start();
require_once "connection.php";
if(!isset($_SESSION['user_id'])){
    echo json_encode(['status'=>'unauthorised']);
    exit();
}

if($_SERVER["REQUEST_METHOD"]==="POST" && isset($_POST['id'])){
    $id=intval($_POST['id']);
    $sql="DELETE FROM experiences WHERE id='$id'";
   // console.log('hii');
    $result=mysqli_query($conn,$sql);
    if($result){
        echo json_encode(['status'=>'success']);
        exit();
    }else{
        echo json_encode(['status'=>'error','message'=>'query not executed co'.conn->error()]);
        exit();
    }
}
else{
    echo json_encode(['status'=>'error','message'=>'invalid']);
    exit();
}




?>