<?php
session_start();
if(!isset($_SESSION['user_id'])){
    echo json_encode(['status'=>'error','message'=>'unauthorised']);
    exit();
}
require_once "connection.php";
header("content-Type: application/json");
$user_id=(int)$_SESSION['user_id'];

if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['fieldName'], $_POST['fieldValue'] )){
  $fieldName=mysqli_real_escape_string($conn,$_POST['fieldName']);
  $fieldValue=mysqli_real_escape_string($conn,$_POST['fieldValue']);


  try{
    if (in_array($fieldName, ['permanent_address_line1', 'permanent_address_line2', 'permanent_city', 'permanent_state', 'current_address_line1', 'current_address_line2', 'current_city', 'current_state'])) {
        $sql="UPDATE users SET $fieldName='' WHERE id='$user_id'";
        $result=mysqli_query($conn,$sql);
        if($result){
            echo json_encode(['status' => 'success','message'=>"updated"]);
            exit();
        }else{
            echo json_encode(['status'=>'error','message'=>"query not executed successfully"]);
            exit();
        }
  }else{
    echo json_encode(['status'=>'error','message'=>'invalid not found address field']);
    exit();
  }
}catch(Exception $e){
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
}
mysqli_close($conn);
?>