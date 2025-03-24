<?php

require_once "fetch_profile.php";
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->
    <script src="./js/jquery-3.7.1.min.js"></script>
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> -->
    <link rel="stylesheet" href="css/profile.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <title>Dashboard</title>
</head>
<body>
    <h3>Employee Profile</h3>
    <div class="profile-header">
        <img src="<?= htmlspecialchars($profilePic) ?>" alt="Profile Picture" id="profile-pic"/>
        <input type="file" name="profile_picture" id="profile_picture" accept="image/*" style="display: none;">
        <i class="icon img">&#9998;</i>
        <!-- <h4 id="profile-name" contenteditable="false"><?= htmlspecialchars($profileName) ?></h4>
        <i class="edit-name">$#9998;</i> -->
        <!-- here above add icon for update name  -->
         <!-- Wrap name in a div for better styling and editing -->
    <div id="profile-name-container">
        <h2 id="profile-name"><?= htmlspecialchars($profileName) ?></h2>
        <i class="edit-name">&#9998;</i> <!-- Correctly placed edit icon -->
    </div>
        <p id="user-email"><?= htmlspecialchars($userEmail) ?></p>
        <p id="dob">DOB - <?= date('d M Y', strtotime(htmlspecialchars($dob))); ?></p>
    </div>

    <div class="profile-details">

        <div class="details-section">
            <div class="qualifications">
                <h5>Qualifications</h5>
                <?php foreach ($qualifications as $index => $qualification): ?>
                    <div class="data">
                            <input type="text" name="qualification" value="<?= htmlspecialchars($qualification['qualification']) ?>" id="<?= $qualification['id'] ?>" readonly disabled>
                            <i class="icon pencil">&#9998;</i>
                            <i class="icon remove">&#10060;</i>
                             <!-- here just above used for remove icon on qualification -->
                    </div>
                <?php endforeach; ?>
                <label id="addQualification" class="addMore">Add Qualification</label>
            </div>
            <div class="experiences">
                <h5>Experiences</h5>
                <?php foreach ($experiences as $index => $experience): ?>
                    <div class="data">
                        <input type="text" name="experience" value="<?= htmlspecialchars($experience['experience']) ?>" id="<?=  $experience['id'] ?>" readonly disabled >
                        <i class="icon pencil">&#9998;</i>
                        <i class="icon remove">&#10060;</i>
                        <!-- <i class="fa fa-save"></i> -->
                    </div>
                <?php endforeach; ?>
                <label id="addExperience" class="addMore">Add Experience</label>
            </div>
        </div>
         <div class="details-section">
            <div class="address">
                <h5>Current Address</h5>
                <div class="data">
                    <input type="text" placeholder="current address line 1" name="current_address_line1" value="<?= htmlspecialchars($currAddressLine1) ?>" id="currentAddressLine1" readonly disabled >
                    <i class="icon pencil">&#9998;</i>
                    <!-- <i class="icon edit">&#9881;</i> -->
                </div>
                <div class="data">
                    <input type="text" placeholder="current address line 2" name="current_address_line2" value="<?= htmlspecialchars($currAddressLine2) ?>" id="currentAddressLine2" readonly disabled >
                    <i class="icon pencil">&#9998;</i>
                    <!-- <i class="icon edit">&#9881;</i> -->
                </div>
                <div class="data">
                    <input type="text" placeholder="current city" name="current_city" value="<?= htmlspecialchars($currCity) ?>" id="currentCity" readonly disabled>
                    <i class="icon pencil">&#9998;</i>
                    <!-- <i class="icon edit">&#9881;</i> -->
                </div>
                <div class="data">
                    <input type="text" placeholder="current state"  name="current_state" value="<?= htmlspecialchars($currState) ?>" id="currentState" readonly disabled>
                    <i class="icon pencil">&#9998;</i>
                    <!-- <i class="icon edit">&#9881;</i> -->
                </div>
            </div>
            <div class="permanent-address">
                <h5>Permanent Address</h5>
                <div class="data">
                    <input type="text" placeholder="permanent address line 1" name="permanent_address_line1" value="<?= htmlspecialchars($permAddressLine1) ?>" id="permanentAddressLine1" readonly disabled>
                    <i class="icon pencil">&#9998;</i>
                    <!-- <i class="icon edit">&#9881;</i> -->
                </div>
                <div class="data">
                    <input type="text" placeholder="permanent address line 2"  name="permanent_address_line2" value="<?= htmlspecialchars($permAddressLine2) ?>" id="permanentAddressLine2" readonly disabled>
                    <i class="icon pencil">&#9998;</i>
                    <!-- <i class="icon edit">&#9881;</i> -->
                </div>
                <div class="data">
                    <input type="text" placeholder="permanent city" name="permanent_city" value="<?= htmlspecialchars($permCity) ?>" id="permanentCity" readonly disabled>
                    <i class="icon pencil">&#9998;</i>
                    <!-- <i class="icon edit">&#9881;</i> -->
                </div>
                <div class="data">
                    <input type="text" placeholder="permanent state" name="permanent_state" value="<?= htmlspecialchars($permState) ?>" id="permanentState" readonly disabled>
                    <i class="icon pencil">&#9998;</i>
                    <!-- <i class="icon edit">&#9881;</i> -->
                </div>
            </div>
        </div>
    </div>
    <div><a id="logout" href="logout.php">&#128282;Logout</a></div>
    <!-- <script src="new.js"></script> this is updated that with delet button -->
<script src="./js/profile.js"></script> 
 <!-- this was original that is used before  -->
 <!-- this only for check that is for check_profile.js -->
 <!-- <script src="check_profile.js"></script> -->
</body>
</html>

