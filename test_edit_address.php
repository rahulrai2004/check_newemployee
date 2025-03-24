<?php
session_start();
require 'connection.php'; // Database connection include karein
if(!isset($_SESSION['user_id'])){
    echo json_encode(['status'=>'unauthorised']);
    exit();
}


if($_SERVER["REQUEST_METHOD"] ==="POST" && isset($_POST['field'])) {
    $field = mysqli_real_escape_string($conn,$_POST['field']);
    $userId = intval($_SESSION['user_id']); // Assume user login hai

    // SQL Query to Update Address Field
    $query = "UPDATE users SET $field = '' WHERE id = $userId";
    if(mysqli_query($conn, $query)) {
        echo json_encode(['status'=>'success','message'=>'correctly deleted data of this input field']);
        exit();
        //echo 'success';
    } else {
        echo json_encode(['status'=>'error','message'=>'mysqli_error($conn)']);
        exit();
       // echo 'error';
    }
}
?>
