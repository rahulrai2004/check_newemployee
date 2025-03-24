<?php
session_start();
require_once "connection.php";

if (!isset($_SESSION["user_id"])) {
    echo json_encode(['status' => 'unauthorised']);
    exit;
}

$user_id = intval($_SESSION["user_id"]);

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['fieldName'], $_POST['fieldValue'], $_POST['id'])) {
    $fieldName = $_POST['fieldName'];
    $fieldValue = trim($_POST['fieldValue']);
    $recordId = intval($_POST['id']);

    try {
        // Sanitize input
        $fieldName = mysqli_real_escape_string($conn, $fieldName);
        $fieldValue = mysqli_real_escape_string($conn, $fieldValue);

        // Update address fields in the users table
        if (in_array($fieldName, ['permanent_address_line1', 'permanent_address_line2', 'permanent_city', 'permanent_state', 'current_address_line1', 'current_address_line2', 'current_city', 'current_state'])) {
            $query = "UPDATE users SET $fieldName = '$fieldValue' WHERE id = $user_id";
        }
        // Update experience field in the experience table
        elseif ($fieldName === 'experience') {
            $query = "UPDATE experiences SET experience = '$fieldValue' WHERE user_id = $user_id AND id = $recordId";
        }
        // Update qualification field in the qualifications table
        elseif ($fieldName === 'qualification') {
            $query = "UPDATE qualifications SET qualification = '$fieldValue' WHERE user_id = $user_id AND id = $recordId";
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid field name']);
            exit;
        }

        if (mysqli_query($conn, $query)) {
            echo json_encode(['status' => 'success', 'message' => ucfirst($fieldName) . ' updated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Update failed']);
        }
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }

    mysqli_close($conn);
}
?>