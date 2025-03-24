<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    echo json_encode(['status' => 'unauthorised']);
    exit();
}

require_once "connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['id'])) {
    $id = intval($_POST['id']); // Ensure ID is an integer

    // if ($id <= 0) {
    //     echo json_encode(['status' => 'error', 'message' => 'Invalid ID']);
    //     exit();
    // }

    $sql = "DELETE FROM qualifications WHERE id = $id"; // Correct table name
    $result = mysqli_query($conn, $sql);

    if ($result) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Deletion failed: ' . mysqli_error($conn)]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request.']);
}
?>
