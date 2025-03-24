<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit();
}

require_once "connection.php";
header('Content-Type: application/json');

$user_id = intval($_SESSION['user_id']);
$username = isset($_POST['username']) ? mysqli_real_escape_string($conn, $_POST['username']) : '';

if (!empty($username)) {
    $sql = "UPDATE users SET full_name='$username' WHERE id=$user_id";
    if (mysqli_query($conn, $sql)) {
        echo json_encode(['status' => 'success', 'username' => $username]);
        exit();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Database update failed']);
        exit();
    }
}


echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
exit();
?>

