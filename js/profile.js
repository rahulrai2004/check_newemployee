$(document).ready(function() {
    $(document).on('focus', 'input[type="text"]', function() {
        $(this).closest('.data').css('outline', '1px solid #a1a1a1');
    }).on('blur', 'input[type="text"]', function() {
        $(this).closest('.data').css('outline', 'none');
    });

    $("#addQualification").click(function () {
        $(this).before(
            $('<div>')
            .addClass('data new-field')
            .append(
                $('<input>')
                .attr('type', 'text')
                .attr('name', "qualification")
                .attr('data-new', 'true') //Here Mark as a new record
            )
            .append(
                $('<i>')
                .addClass('fa fa-save save-icon')
                .css('font-size', '18px')
            )
            .append(
                $('<i>') // ✅ Yaha remove icon add kar rahe hain
                .addClass('icon remove')
                .html('&#10060') // Cross symbol
                .css({
                    'cursor': 'pointer',
                    'margin-left': '10px',
                    'color': 'red'
                })
            )
           
        );
        });
    
        
    $("#addExperience").click(function () {
        $(this).before(
            $('<div>')
            .addClass('data new-field')
            .append(
                $('<input>')
                .attr('type', 'text')
                .attr('name', "experience")
                .attr('data-new', 'true') // Mark as a new record
            )
            .append(
                $('<i>')
                .addClass('fa fa-save save-icon')
                .css('font-size', '18px')
            ));
        });


      

         // Enable editing on pencil icon click and change to save icon
        $(document).on('click', '.icon.pencil', function () {
            var inputField = $(this).siblings('input');
            inputField.prop('readonly', false).prop('disabled', false).focus();

            var saveIcon = $('<i>').addClass('fa fa-save save-icon').css({"font-size":"18px",});
            $(this).replaceWith(saveIcon);
        });
    


         //Save changes on save icon click
    $(document).on('click', '.save-icon', function () {
        var inputField = $(this).siblings('input');// Find the input field in this same label(particular same block)
        var fieldName = inputField.attr('name');//example fieldname="email"
        var fieldValue = inputField.val().trim();//example fieldvalue="rahul@gmail.com"
        var recordId = inputField.attr('id'); // Existing record ID //retrieve id
        var isNew = inputField.data('new'); // ("Retrieve the 'data-new' value")  Check if it's a new record then return true else false

        if (!fieldValue || !fieldName) {
            alert('Field value cannot be empty.');
            return;
        }

        // Define the URL for new or existing records
        var url = isNew ? 'save_new_record.php' : 'update_record.php';
        var data = { fieldName: fieldName, fieldValue: fieldValue };

        // Add record ID for existing entries
        if (!isNew) {
            data.id = recordId;
        }

        // AJAX call to save the updated or new value
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: function (response) {
                try {
                    response = JSON.parse(response);
                } catch (e) {
                    alert('Invalid server response.');
                    return;
                }

                if (response.status === 'success') {
                    alert('Field saved successfully.');
                    inputField.prop('readonly', true).prop('disabled', true);
                    // Change back to pencil icon
                    $(this).removeClass('fa-save save-icon').addClass('icon pencil').html('&#9998;');
                    // Remove new flag for new entries after saving
                    if (isNew) {
                        inputField.removeAttr('data-new').attr('id', response.id);
                    }

                } else {
                    alert(response.message || 'Failed to save the field.');
                }
            }.bind(this),
            error: function (xhr, status, error) {
                console.error('AJAX Error:', status, error);
                console.error('Server Response:', xhr.responseText);
                alert('An error occurred while saving the field. Check console for details.');
            }
        });
    });



    // Handle profile picture selection and preview
    // $(".icon.img").on("click", function () {
    //     $("#profile_picture").click(); // Trigger the file input dialog
    // });




    $(document).on("click", ".icon.img", function () {
        $("#profile_picture").click(); // Trigger the file input dialog
    });




    // Handle image preview and change the icon to save
    // $("#profile_picture").on("change", function () {
    //     const preview = $("#profile-pic"); // Profile picture for preview
    //     if ($("#profile_picture")[0].files && $("#profile_picture")[0].files[0]) {
    //         $(".icon.img").replaceWith('<i class="fa fa-save save-img"></i>'); // Replace pencil with save icon

    //         const reader = new FileReader();
    //         reader.onload = function (e) {
    //             preview.attr("src", e.target.result); // Set the preview image
    //         };
    //         reader.readAsDataURL($("#profile_picture")[0].files[0]);
    //     }
    // });


    // in jq image preview of profilepicture
     // Handle image preview and change the icon to save
 $('#profile_picture').on('change',function(){
    let file = this.files[0];
    if(file){
        $(".icon.img").replaceWith('<i class="fa fa-save save-img"></i>'); // Replace pencil with save icon
        let imageURL = URL.createObjectURL(file);
        
        $('#profile-pic').attr('src', imageURL);
    }
});


    // Handle file selection and upload through AJAX
    // Save profile picture on save icon click
    $(document).on("click", ".save-img", function () {
        var file = $("#profile_picture")[0].files[0]; // Get the selected file
        var formData = new FormData();
        formData.append("profile_picture", file);

        // AJAX to upload the profile picture
        $.ajax({
            url: 'update_profile_picture.php', // Server-side script for image upload
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                // const result = JSON.parse(response);
                // if (result.status === 'success') {
                //     $(".save-img").replaceWith('<i class="icon img">&#9998;</i>'); // Switch back to the pencil icon
                //     alert('Profile picture updated successfully!');
                // } else {
                //     alert('Failed to update profile picture.');
                // }

                console.log('AJAX Success raw response:', response); // Debug response
                let jsonResponse = (typeof response === "object") ? response : JSON.parse(response);
    console.log("Parsed JSON:", jsonResponse);

    if (jsonResponse.status === 'success') {
        console.log('Updating response find success.');
        $(".save-img").replaceWith('<i class="icon img">&#9998;</i>'); // Switch back to the pencil icon
        alert('Profile picture updated successfully!');
    } else {
        alert('Failed to update profile picture.');
    }


            },
            error: function () {
                alert('An error occurred while uploading the profile picture.');
            }
        });
    });



    //here update name of user in employee 
    $(document).on('click','.edit-name',function(){
        //    $('#profile-name').click();// trigger the user name
        let nameField= $('#profile-name');
        nameField.prop('contenteditable',true).focus();
        $(this).replaceWith('<i class="fa fa-save save-name"></i>');
    });
         
$(document).on('click','.save-name',function(){
    let nameField=$('#profile-name');
    let newName=nameField.text().trim();
  $.ajax({
      url : "update_name.php",
      type : 'POST',
      data : { username: newName },
      dataType: 'JSON',
      success :function(response){
        let jsonResponse = (typeof response === "object") ? response : JSON.parse(response);
         if(jsonResponse.status==='success'){
           // if(response.status==='success'){
            console.log("raw responses",jsonResponse);
            nameField.prop("contenteditable",false);
            $(".save-name").replaceWith('<i class="icon img">&#9998;</i>');
            alert('Name updated successfully!');


        }else{
            alert('Failed to update name.');
        }
      },error:function(){
        alert('An error occurred while updating the name.');

      }
  });
});



//here remove from qualification when clicked on remove of qualification

$('.qualifications').on('click','.icon.remove',function(){
    console.log("clicked on remove icon");
    let inputField=$(this).closest('.data');
    let id=inputField.find('input').attr('id');
   // inputField.remove();
   $.ajax({
     url:'test_qualification.php',
     type:'POST',
     data:{id:id},
     dataType:'JSON',
     success:function(response){
        if(response.status==='success'){
            console.log("raw responses",response);
            inputField.remove();

        }else{
            alert(response.message);
        }
     }
     ,error:function(xhr,status,error){
        console.error('AJAX Error:', status, error);
        console.error('Server Response:', xhr.responseText);
        alert(response.message);
     }
   })
});


//here uses for delete experiences
$('.experiences').on('click','.icon.remove',function(){
    console.log("clicked on remove icon of experiences button");
  let inputField=$(this).closest('.data');
  let id=inputField.find('input').attr('id');
  console.log("id=",id);

  $.ajax({
     url: 'test_experiences.php',
     type: 'POST',
     data: {id:id},
     dataType: 'JSON',
     success:function(response){
        if(response.status==='success'){
            console.log("raw responses",response);
            inputField.remove();
        }else{
            alert(response.message);
        }
        
     },error:function(xhr,status,error){
        console.error('AJAX Error:', status, error);
        console.error('Server Response:', xhr.responseText);
        alert(response.message);
     }
  });

});


//here uses for update address section
// $('.address .permanent-address').on('click','.icon.edit',function(){
//     console.log("click on update address icon of addre field");
//     let inputField=$(this).closest('.data');
//     let id=inputField.find('input').attr('id');
// });



//here uses for address section edit softly not from db
// $('.details-section').on('click', '.icon.edit', function(){
//     console.log("Delete button clicked");
    
//     let inputField = $(this).closest('.data').find('input');
//     let fieldName = inputField.attr('name');

//     // Confirm before deleting
//     if(confirm("Kya aap is address ko delete karna chahte hain?")) {
//         inputField.val(''); // Input field empty karein
//     }
// });


$('.details-section').on('click', '.icon.edit', function(){
    console.log("click on edit icon");
    let inputField = $(this).closest('.data').find('input');
    console.log("inputField ",inputField);
    let fieldName = inputField.attr('name');
    console.log("fieldname ",fieldName);

   if(confirm("Kya aap is address ko delete karna chahte hain?")) {
        $.ajax({
            url: 'test_edit_address.php',
            type: 'POST',
            data: { field: fieldName },
            dataType:'JSON',
            success: function(response) {
                if(response.status === 'success') {
                    console.log("raw responses",response);
                    inputField.val('');
                } else {
                    console.log("Kuch galat ho gaya, dobara koshish karein");
                    alert(response.message);
                    //alert('Kuch galat ho gaya, dobara koshish karein.');
                }
            }
        });
    }
});





});

