<?php
require_once 'connection.php';

if($_SERVER['REQUEST_METHOD']==='POST')
try{

    // gather form data
    $fullName = $_POST['fullName'];
    $dob = $_POST['dob'];
    $email = $_POST['email'];
    $passwd = $_POST['password'];


    //for name validation
    if (!preg_match("/^[a-zA-Z-' ]*$/",$fullName)){
        throw new Exception("name only should be allow capital letter , small letter and white space ");
    }

    if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
        throw new Exception("email should be rquired in valid form");
    }

    // Password validation
     if (!preg_match('/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/', $passwd)) {
        // echo "<script>
        //         alert('not matching password exact pattern as required with one capital, one small, one digit,one symbol and minimum 8 character');

        //     </script>";
        //     exit;
       throw new Exception("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
      }


    // Hash the password using bcrypt
    $hashedPassword = password_hash($passwd, PASSWORD_BCRYPT);


    // Handle profile picture (if uploaded)
    $profilePic = "uploads/default-profile.png";
    if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
        $profilePic = 'uploads/' . uniqid() . '-' . $_FILES['profile_pic']['name'];
        move_uploaded_file($_FILES['profile_pic']['tmp_name'], $profilePic);
    }




    // gather permanent and current address data
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

        //insert user data into database

        $query="INSERT INTO users (full_name,dob,profile_pic,email,password,permanent_address_line1,permanent_address_line2,permanent_city,permanent_state,current_address_line1,current_address_line2,current_city,current_state) VALUES ('$fullName','$dob','$profilePic','$email','$hashedPassword','$permAddressLine1','$permAddressLine2','$permCity','$permState','$currAddressLine1','$currAddressLine2','$currCity','$currState')";
        $result=mysqli_query($conn,$query);

         if($result){
            $userId=mysqli_insert_id($conn);
            
         }
         else{
            echo "Error: " . mysqli_error($conn);
         }

         // insert qualifications
         foreach ($qualifications as $qualification) {
            if (!empty($qualification)) {
                $query = "INSERT INTO qualifications (user_id, qualification) VALUES ('$userId', '$qualification')";
                if(!mysqli_query($conn,$query))
                {
                    throw new Exception("qualification insertion failed: " . mysqli_error($conn));

                }
            }
        }
         // insert Experiences

         foreach ($experiences as $experience) {
            if (!empty($experience)) {
                $query = "INSERT INTO experiences (user_id, experience) VALUES ('$userId', '$experience')";
                if(!mysqli_query($conn,$query))
                {
                    throw new Exception("Experience insertion failed: " . mysqli_error($conn));

                }
            }
        }

        //success Response


        echo "<script>
                alert('registration successfull');
                 window.location.href='signup.php?register=successfully';
                
            </script>";

      
 

   } catch(Exception $e){
    

    echo "<script>alert('Something went wrong. Try again!');
     window.location.href='signup.php';</script>";

        
        if(isset($profilePic) && file_exists($profilePic)){
            unlink($profilePic);
        }
   }
   mysqli_close($conn);

?>