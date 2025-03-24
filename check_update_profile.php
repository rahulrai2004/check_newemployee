<?php
session_start();
require_once "connection.php";

header('Content-Type: application/json'); // Ensure JSON response

// Check if user is authenticated
if (!isset($_SESSION["user_id"])) {
    echo json_encode(['status' => 'unauthorized']);
    exit;
}

$user_id = intval($_SESSION["user_id"]);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['profile_picture'])) {
    $uploadDir = 'uploads/'; // Ensure this folder exists and is writable
    $fileName = uniqid() . "_" . basename($_FILES['profile_picture']['name']);
    $uploadFile = $uploadDir . $fileName;

    // Validate the uploaded file
    $check = getimagesize($_FILES['profile_picture']['tmp_name']);
    if ($check !== false) {
        if (move_uploaded_file($_FILES['profile_picture']['tmp_name'], $uploadFile)) {
            $imageUrl = mysqli_real_escape_string($conn, $uploadFile);

            // Update profile picture in database
            $query = "UPDATE users SET profile_pic = '$imageUrl' WHERE id = $user_id";
            if (mysqli_query($conn, $query)) {
                echo json_encode(['status' => 'success', 'image_url' => $uploadFile]);
                exit;
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Database update failed.']);
                exit;
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'File upload failed.']);
            exit;
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Uploaded file is not a valid image.']);
        exit;
    }
}

// Default response
echo json_encode(['status' => 'error', 'message' => 'Invalid request.']);
exit;
