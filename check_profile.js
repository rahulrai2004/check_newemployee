// this is only used for practice .original was .js/profile.js and modified with delete new.js hai

$(document).ready(function() {
    // $(document).on('focus', 'input[type="text"]', function() {
    //     $(this).closest('.data').css('outline', '1px solid #a1a1a1');
    // }).on('blur', 'input[type="text"]', function() {
    //     $(this).closest('.data').css('outline', 'none');
    // });


    // only shows that value which is required means jo signup me input kiya hai (for example currentaddress line2) nhi input kiya to nhi dikhaye

    // $(".data").each(function() {
    //     if ($(this).find("input").val().trim() === "") {
    //         $(this).hide(); // Agar input ka value empty hai toh uska parent `div.data` hide kar do
    //     }
    // });





    $("#addQualification").click(function () {
        // Check if any existing input field is empty

        
    //     if ($('.data input[type="text"]').filter(function () { return this.value.trim() === ""; }).length > 0) {
    //     alert("Please fill the existing field before adding a new one.");
    //     return; // Stop execution not create new
    // }
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
            // .append(
            //     <i class="icon remove">&#10060</i>//here this is used remove icon when dynamically added box through add qualification
            // )
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

    //     $(".qualifications").on('click','.icon.remove',function(){ //here use icon remove in existing // yha jo class .qualification likha hai wha hm without "" only document bhi likh sakte hai
    //         let id=$(this).closest('.data').find('input').attr('id');
    //         console.log("Deleting ID: ", id);
    //        // $(this).parent('.data').remove();
       
           
    //     //here delete from database
    //     $.ajax({
    //      url : 'delete_qualification.php',
    //      type: 'POST',
    //      data: {id : id},
    //     //  var_dump("id");
    //      success: function(response){
    //           try{
    //             response=JSON.parse(response);
    //           }catch(e){
    //             alert('Invalid server response.');
    //                     return;
    //           }
    //           if(response.status === 'success'){
    //             $(this).closest('.data').remove();
    //           }else{
    //             alert(response.message || 'failed to delete the post');
    //           }
    //      },
    //      error: function () {
    //         alert('An error occurred while deleting the field.');
    //     }
    //     });
    // });
    
    $(".qualifications").on('click', '.icon.remove', function () {
        let $element = $(this).closest('.data'); // Store reference to the clicked element
        let id = $element.find('input').attr('id'); 
    
        console.log("Deleting ID:", id); // Debugging step
    
        if (!id) {
            alert("Invalid ID. Cannot delete.");
            return;
        }
    
        $.ajax({
            url: 'delete_qualification.php',
            type: 'POST',
            data: { id: id },
            success: function (response) {
               // console.log("Server Response:", response); // Debugging step
    
                try {
                    response = JSON.parse(response);
                } catch (e) {
                    alert('Invalid server response.');
                    return;
                }
    
                if (response.status === 'success') { 
                    console.log("Deleted successfully");
                    $element.remove(); // Correctly remove the element
                } else {
                    alert(response.message || 'Failed to delete.');
                }
            },
            error: function () {
                alert('An error occurred while deleting.');
            }
        });
    });
    //here give the dynamic updated box in which also include cross button(here this is used for only client side remove not from database)
    //  $('.experiences').on('click','.icon.remove',function(){
    //     $(this).closest('.data').remove();
    //  });  

    // $('.experience')
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
            ).append(
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
  $('.experiences').on('click','.icon.remove',function(){
      let $element=$(this).closest('.data');
      let id=$element.find('input').attr('id');

     console.log("deleted id is",id);// for debogging
       

        $.ajax({
            url:"delete_experience.php",
            type:'POST',
            data:{ id :id},
             success:function(response){
                console.log("server resopnse", response);
                try{
                    response=JSON.parse(response);
                }catch(e){
                    alert('invalid server response');
                    return;
                }
                if(response.status==='success'){
                    console.log("deleted successfully",id);
                    $element.remove();
                }else{
                    alert('failed to delete message');
                }
             },error: function () {
                alert('An error occurred while deleting.');
            }
        });

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
    $(".icon.img").on("click", function () {
        $("#profile_picture").click(); // Trigger the file input dialog
    });

    // // Handle image preview and change the icon to save
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


    // Handle file selection and upload through AJAX
    // Save profile picture on save icon click
    // $(document).on("click", ".save-img", function () {
    //     console.log("hi click on save icon of profile");// for debug
    //     var file = $("#profile_picture")[0].files[0]; // Get the selected file
    //     var formData = new FormData();
    //     formData.append("profile_picture", file);

    //     // AJAX to upload the profile picture
    //     $.ajax({
    //         url: 'update_profile_picture.php', // Server-side script for image upload
    //         type: 'POST',
    //         data: formData,
    //         contentType: false,
    //         processData: false,
    //         success: function (response) {
    //             console.log('AJAX Success raw response:', response); // Debug response
    //             //debug

    // //             let jsonResponse;
    // // try {
    // //     jsonResponse = (typeof response === "object") ? response : JSON.parse(response);
    // //     console.log("Parsed JSON:", jsonResponse);
    // // } catch (e) {
    // //     console.error("JSON Parse Error:", e);
    // //     alert('Invalid JSON response. Check Network tab.');
    // //     return; // Agar parsing fail ho jaye to aage code execute mat karo
    // // }

    //              let jsonResponse = (typeof response === "object") ? response : JSON.parse(response);
    //         console.log("Parsed JSON:", jsonResponse);

    //             // const result = JSON.parse(response);
    //             if (jsonResponse.status === 'success') {
    //                 console.log('Updating response find success...');

    //                 $(".save-img").replaceWith('<i class="icon img">&#9998;</i>'); // Switch back to the pencil icon
    //                 alert('Profile picture updated successfully!');
    //             } else {
    //                 alert('Failed to update profile picture.');
    //             }
    //         },
    //         error: function () {
    //             alert('An error occurred while uploading the profile picture.');
    //         }
    //     });
    // });
         

//     // Handle file selection and upload through AJAX
// $(document).on("click", ".save-img", function () {
//     console.log("Saving profile picture...");
//     var file = $("#profile_picture")[0].files[0];
//     var formData = new FormData();
//     formData.append("profile_picture", file);

//     $.ajax({
//         url: 'update_profile.php',
//         type: 'POST',
//         data: formData,
//         contentType: false,
//         processData: false,
//         success: function (response) {
//             console.log('Raw Server Response:', response);

           
//             try {
//                 response = typeof response === 'string' ? JSON.parse(response) : response;
//             } catch (e) {
//                 console.error("JSON Parse Error:", e);
//                 alert('Invalid server response. Check console for details.');
//                 return;
//             }

//             if (response.status === 'success') {
//                 console.log('Updating UI...');
//                 // Save icon को पेंसिल में बदलें
//                 $(".save-img").replaceWith('<i class="icon img">&#9998;</i>');
//                 // फ़ाइल इनपुट रीसेट (optional)
//                 $("#profile_picture").val('');
//                 alert('Profile picture updated successfully!');
//             } else {
//                 alert(response.message || 'Failed to update profile picture.');
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error('AJAX Error:', status, error);
//             alert('An error occurred while uploading. Check console.');
//         }
//     });
// });


 // Handle image preview and change the icon to save
 $('#profile_picture').on('change',function(){
    let file = this.files[0];
    if(file){
        $(".icon.img").replaceWith('<i class="fa fa-save save-img"></i>'); // Replace pencil with save icon
        let imageURL = URL.createObjectURL(file);
        
        $('#profile-pic').attr('src', imageURL);
    }
});


// Handle file selection and upload via AJAX

// $(document).on("click", ".save-img", function () {
//     var file = $("#profile_picture")[0].files[0]; // Get the selected file
//     var formData = new FormData();
//     formData.append("profile_picture", file);

//     // AJAX to upload the profile picture
//     $.ajax({
//         // url: 'update_profile_picture.php', // Server-side script for image upload
//         url: check_update_profile.php,
//         type: 'POST',
//         data: formData,
//         contentType: false,
//         processData: false,
//         success: function (response) {
//             // const result = JSON.parse(response);
//             if (response.status === 'success') {
//                 $(".save-img").replaceWith('<i class="icon img">&#9998;</i>'); // Switch back to the pencil icon
//                 alert('Profile picture updated successfully!');
//             } else {
//                 alert('Failed to update profile picture.');
//             }
//         },
//         error: function () {
//             alert('An error occurred while uploading the profile picture.');
//         }
//     });
// });
     
$(document).on("click", ".save-img", function () {
    var file = $("#profile_picture")[0].files[0];
    if (!file) {
        alert('Please select a file.');
        return;
    }

    var formData = new FormData();
    formData.append("profile_picture", file);

    $.ajax({
        url: 'check_update_profile.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
           // console.log('Server Response:', response);
            // try {
            //     const jsonResponse = JSON.parse(response);
            //     if (jsonResponse.status === 'success') {
            //         $(".save-img").replaceWith('<i class="icon img">&#9998;</i>');
            //         alert('Profile picture updated!');
            //     } else {
            //         alert(jsonResponse.message || 'Failed to update.');
            //     }
            // } catch (e) {
            //     console.error('JSON Parse Error:', e);
            //     alert('Invalid server response.');
            // }

                         try {
                                 response = typeof response === 'string' ? JSON.parse(response) : response;
                             } catch (e) {
                                 console.error("JSON Parse Error:", e);
                                 alert('Invalid server response. Check console for details.');
                                 return;
                             }

                             if (response.status === 'success') {
                                               console.log('Updating UI...');
                                                 // Save icon को पेंसिल में बदलें
                                                 $(".save-img").replaceWith('<i class="icon img">&#9998;</i>');
                                                 // फ़ाइल इनपुट रीसेट (optional)
                                                 $("#profile_picture").val('');
                                                 alert('Profile picture updated successfully!');
                                             } else {
                                                 alert(response.message || 'Failed to update profile picture.');
                                             }


        },
        error: function (xhr, status, error) {
          //  console.error('AJAX Error:', error);
            alert('Upload failed. Check console.');
        }
    });
});



// for updating address field when clicking on delete icon
$(document).on('click','.icon.edit',function(){
    console.log("button clicked");
//    let $element=$(this).closest('.data');
//    let $id=$element.find('input').attr('id');
 let inputFields=$(this).siblings('input');
 var fieldName=inputFields.attr('name');
 var fieldValue=inputFields.val().trim();
   $.ajax({
      url : 'delete_address.php',
      type : 'POST',
      dataType: 'json',
      data : {
        fieldName: fieldName,fieldValue:fieldValue
      },
      success:function(response){
        console.log("raw response",response);
        // try {
        //     response = JSON.parse(response);
        // } catch (e) {
        //     alert('Invalid server response.');
        //     return;
        // }
        if(response.status==='success'){
            inputFields.val('');
        }else{
            alert(response.message);
        }
      },
      error: function () {
        alert('Something went wrong!');
    }

   });
});



});

