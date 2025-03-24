<?php
include 'connection.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $recordId = intval($_POST['id']);

    // Check which type of record it is (qualification or experience)
    $query = "DELETE FROM qualifications WHERE id = $recordId";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        $query = "DELETE FROM experiences WHERE id = $recordId";
        $result = mysqli_query($conn, $query);
    }

    if ($result) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Deletion failed.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request.']);
}
?>
