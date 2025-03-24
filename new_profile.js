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
            ));
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
    $(".icon.img").on("click", function () {
        $("#profile_picture").click(); // Trigger the file input dialog
    });

    // Handle image preview and change the icon to save
    $("#profile_picture").on("change", function () {
        const preview = $("#profile-pic"); // Profile picture for preview
        if ($("#profile_picture")[0].files && $("#profile_picture")[0].files[0]) {
            $(".icon.img").replaceWith('<i class="fa fa-save save-img"></i>'); // Replace pencil with save icon

            const reader = new FileReader();
            reader.onload = function (e) {
                preview.attr("src", e.target.result); // Set the preview image
            };
            reader.readAsDataURL($("#profile_picture")[0].files[0]);
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
                const result = JSON.parse(response);
                if (result.status === 'success') {
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
    
    



    $(document).ready(function() {
    $(document).on('focus', 'input[type="text"]', function() {
        $(this).closest('.data').css('outline', '1px solid #a1a1a1');
    }).on('blur', 'input[type="text"]', function() {
        $(this).closest('.data').css('outline', 'none');
    });

    function addDeleteIcon(parentDiv) {
        parentDiv.append(
            $('<i>').addClass('fa fa-trash delete-icon').css('font-size', '18px')
        );
    }

    $("#addQualification").click(function () {
        let newField = $('<div>').addClass('data new-field')
            .append($('<input>').attr('type', 'text').attr('name', "qualification").attr('data-new', 'true'))
            .append($('<i>').addClass('fa fa-save save-icon').css('font-size', '18px'));
        addDeleteIcon(newField);
        $(this).before(newField);
    });
    
    $("#addExperience").click(function () {
        let newField = $('<div>').addClass('data new-field')
            .append($('<input>').attr('type', 'text').attr('name', "experience").attr('data-new', 'true'))
            .append($('<i>').addClass('fa fa-save save-icon').css('font-size', '18px'));
        addDeleteIcon(newField);
        $(this).before(newField);
    });

    $('.data').each(function() {
        addDeleteIcon($(this));
    });

    $(document).on('click', '.delete-icon', function () {
        let parentDiv = $(this).closest('.data');
        let inputField = parentDiv.find('input');
        let recordId = inputField.attr('id');
        let isNew = inputField.data('new');

        if (isNew) {
            parentDiv.remove();
        } else {
            $.ajax({
                url: 'delete_record.php',
                type: 'POST',
                data: { id: recordId },
                success: function (response) {
                    try {
                        response = JSON.parse(response);
                    } catch (e) {
                        alert('Invalid server response.');
                        return;
                    }
                    if (response.status === 'success') {
                        parentDiv.remove();
                    } else {
                        alert(response.message || 'Failed to delete the field.');
                    }
                },
                error: function () {
                    alert('An error occurred while deleting the field.');
                }
            });
        }
    });
});





// $(document).ready(function() {
//     $(document).on('focus', 'input[type="text"]', function() {
//         $(this).closest('.data').css('outline', '1px solid #a1a1a1');
//     }).on('blur', 'input[type="text"]', function() {
//         $(this).closest('.data').css('outline', 'none');
//     });

//     function addDeleteIcon(parentDiv) {
//         parentDiv.append(
//             $('<i>').addClass('fa fa-trash delete-icon').css('font-size', '18px')
//         );
//     }

//     $("#addQualification").click(function () {
//         let newField = $('<div>').addClass('data new-field')
//             .append($('<input>').attr('type', 'text').attr('name', "qualification").attr('data-new', 'true'))
//             .append($('<i>').addClass('fa fa-save save-icon').css('font-size', '18px'));
//         addDeleteIcon(newField);
//         $(this).before(newField);
//     });
    
//     $("#addExperience").click(function () {
//         let newField = $('<div>').addClass('data new-field')
//             .append($('<input>').attr('type', 'text').attr('name', "experience").attr('data-new', 'true'))
//             .append($('<i>').addClass('fa fa-save save-icon').css('font-size', '18px'));
//         addDeleteIcon(newField);
//         $(this).before(newField);
//     });

//     $('.data').each(function() {
//         addDeleteIcon($(this));
//     });

//     $(document).on('click', '.delete-icon', function () {
//         let parentDiv = $(this).closest('.data');
//         let inputField = parentDiv.find('input');
//         let recordId = inputField.attr('id');
//         let isNew = inputField.data('new');

//         if (isNew) {
//             parentDiv.remove();
//         } else {
//             $.ajax({
//                 url: 'delete_record.php',
//                 type: 'POST',
//                 data: { id: recordId },
//                 success: function (response) {
//                     try {
//                         response = JSON.parse(response);
//                     } catch (e) {
//                         alert('Invalid server response.');
//                         return;
//                     }
//                     if (response.status === 'success') {
//                         parentDiv.remove();
//                     } else {
//                         alert(response.message || 'Failed to delete the field.');
//                     }
//                 },
//                 error: function () {
//                     alert('An error occurred while deleting the field.');
//                 }
//             });
//         }
//     });
// });








});

