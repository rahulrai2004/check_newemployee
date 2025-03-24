<?php
 session_start();
 require_once "connection.php";

 if(!isset($_SESSION["user_id"]))
 {
    echo json_encode(['status' => 'unauthorised']);
    exit;
 }

 $user_id = intval($_SESSION["user_id"]);

 if($_SERVER['REQUEST_METHOD']==='POST'){
    $fieldName=$_POST['fieldName'] ?? '';
    $fieldValue=$_POST['fieldValue'] ?? '';

    if(empty($fieldName)  || empty($fieldValue)){
        echo json_encode(['status' => 'error' , 'message' => 'Invalid data']);
        exit;
    }

    //Insert new record
    if($fieldName==='experience'){
        $sql="INSERT INTO experiences (experience,user_id) VALUES ('$fieldValue','$user_id')";
    }
    elseif($fieldName==='qualification'){
        $sql="INSERT INTO qualifications (qualification,user_id) VALUES ('$fieldValue','$user_id')";
    }
    else{
        echo json_encode(['status' => 'error','message'=>'Invalid field name']);
        exit;
    }

    if(mysqli_query($conn,$sql)){
        $newId=mysqli_insert_id($conn);// here i used for finding last inserted id
        echo json_encode(['status' => 'success' , 'id' => $newId]);//here newid should not be in bracket
    }
    else{
        echo json_encode(['status' => 'error' , 'message' => 'Failed to insert record.']);
    }
 }
  mysqli_close($conn);
?>