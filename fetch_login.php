<?php
require_once "connection.php";

// check if form is submitted
if($_SERVER["REQUEST_METHOD"]==="POST"){
    $email=trim($_POST['email']);
    $password=trim($_POST['password']);

    // query to fetch user details
    $sql="SELECT id,password from users where email='$email'";
    $result=mysqli_query($conn,$sql);

    if(($result) && mysqli_num_rows($result)>0)
    {
        $row=mysqli_fetch_assoc($result);
        $id=$row['id'];
        $hashedpassword=$row['password'];

        //verify password
        if(password_verify($password,$hashedpassword)){
            // start session and set session variable
            session_start();
            $_SESSION['user_id']=$id;
            $_SESSION['email']=$email;


            //redirect to dashboard page
             header("Location: profile.php");
             //header("Location: checking_profile.php");
            exit();
        } 
        else{
            echo "<script>
            alert('Invalid password');
            window.location.href='login.php';
            </script>";
        }
    }
        else{
            echo "<script>
            alert('user not found');
            window.location.href='login.php';
            </script>";
        }
    
}
?>








<!-- require_once 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Gather form data
        $fullName = $_POST['fullName'];
        $dob = $_POST['dob'];
        $email = $_POST['email'];
        $passwd = $_POST['password'];
        $rePassword = $_POST['rePassword'];

        // Password validation pattern
        $regex = "/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/";
        if (!preg_match($regex, $passwd)) {
            echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special characters.']);
            exit;
        }

        if ($passwd !== $rePassword) {
            echo json_encode(['success' => false, 'message' => 'Passwords do not match!']);
            exit;
        }

        // Hash password
        $hashedPassword = password_hash($passwd, PASSWORD_BCRYPT);

        // Handle profile picture
        $profilePic = "uploads/default-profile.png";
        if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
            $fileSize = $_FILES['profile_pic']['size'];
            $maxFileSize = 2 * 1024 * 1024; // 2MB limit

            if ($fileSize > $maxFileSize) {
                echo json_encode(['success' => false, 'message' => 'Profile picture size must be less than 2MB.']);
                exit;
            }

            $fileType = mime_content_type($_FILES['profile_pic']['tmp_name']);
            if (strpos($fileType, 'image') === false) {
                echo json_encode(['success' => false, 'message' => 'Only image files are allowed.']);
                exit;
            }

            $profilePic = 'uploads/' . uniqid() . '-' . $_FILES['profile_pic']['name'];
            move_uploaded_file($_FILES['profile_pic']['tmp_name'], $profilePic);
        }

        // Permanent and current address data
        $permAddressLine1 = $_POST['perm_address_line1'];
        $permAddressLine2 = $_POST['perm_address_line2'] ?? null;
        $permCity = $_POST['perm_city'];
        $permState = $_POST['perm_state'];

        $currAddressLine1 = $_POST['curr_address_line1'];
        $currAddressLine2 = $_POST['curr_address_line2'] ?? null;
        $currCity = $_POST['curr_city'];
        $currState = $_POST['curr_state'];

        // Gather qualifications and experiences
        $qualifications = $_POST['qualifications'] ?? [];
        $experiences = $_POST['experiences'] ?? [];

        // Insert user data into the database
        $query = "INSERT INTO users (full_name, dob, profile_pic, email, password, permanent_address_line1, permanent_address_line2, permanent_city, permanent_state, current_address_line1, current_address_line2, current_city, current_state) 
                  VALUES ('$fullName', '$dob', '$profilePic', '$email', '$hashedPassword', '$permAddressLine1', '$permAddressLine2', '$permCity', '$permState', '$currAddressLine1', '$currAddressLine2', '$currCity', '$currState')";
        $result = mysqli_query($conn, $query);

        if ($result) {
            $userId = mysqli_insert_id($conn);

            // Insert qualifications
            foreach ($qualifications as $qualification) {
                if (!empty($qualification)) {
                    $query = "INSERT INTO qualifications (user_id, qualification) VALUES ('$userId', '$qualification')";
                    if (!mysqli_query($conn, $query)) {
                        throw new Exception("Qualification insertion failed: " . mysqli_error($conn));
                    }
                }
            }

            // Insert experiences
            foreach ($experiences as $experience) {
                if (!empty($experience)) {
                    $query = "INSERT INTO experiences (user_id, experience) VALUES ('$userId', '$experience')";
                    if (!mysqli_query($conn, $query)) {
                        throw new Exception("Experience insertion failed: " . mysqli_error($conn));
                    }
                }
            }

            // Success response
            $response['success'] = true;
            $response['message'] = "Registration successful";
            echo json_encode($response);

            // Redirect user
            header('location: signup.php?register=successfuly');
        } else {
            echo "Error: " . mysqli_error($conn);
        }

    } catch (Exception $e) {
        $response['success'] = false;
        $response['message'] = 'Error: ' . $e->getMessage();
        echo json_encode($response);

        // Remove the uploaded profile picture if it exists
        if (isset($profilePic) && file_exists($profilePic)) {
            unlink($profilePic);
        }
    }

    mysqli_close($conn);
} -->
