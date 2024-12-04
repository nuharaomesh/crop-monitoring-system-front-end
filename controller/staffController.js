const staffSaveBtn = $("#staffSaveButton");
const staffUpdateBtn = $("#staffUpdateButton");
const staffDeleteBtn = $("#staffDeleteButton");

const newBtn = $("#addNewStaff");

newBtn.click(function (e) {
  e.preventDefault();
  loadStaffCard();
});

function loadStaffCard() {
  $.ajax({
    url: "http://localhost:5050/pcmSystem/api/v1/staffs",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log("asdsad");
      let staffContainer = $("#staff_list_tbl_body");
      staffContainer.empty();

      data.forEach(function (staff) {
        const imageData = atob(staff.staffImg);
        const byteNumbers = new Array(imageData.length);
        for (let i = 0; i < imageData.length; i++) {
          byteNumbers[i] = imageData.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);

        var staffCard = `
                    <tr class="staff_tbl_row" data-bs-toggle="modal" data-bs-target="#update_staff_modal">
                                            <th scope="row" class="staff_profile">
                                                <div class="staff_img">
                                                    <img src="${imageUrl}" alt="" class="staff_photo">
                                                </div>
                                            </th>
                                            <td class="fixed-width staff_id" style="display: none">${staff.staffId}</td>
                                            <td class="fixed-width staff_name">${staff.firstName} ${staff.lastName}</td>
                                            <td class="fixed-width staff_role">${staff.role.toLowerCase()}</td>
                                            <td class="fixed-width staff_status custom_status"><p>${staff.status}</p></td>
                                            <td class="fixed-width staff_phn_no">${staff.contactNo}</td>
                                            <td class="fixed-width staff_email">${staff.email}</td>
                                            <td class="fixed-width staff_dob" style="display: none">${staff.dob}</td>
                                            <td class="fixed-width staff_gender" style="display: none">${staff.gender}</td>
                                            <td class="fixed-width staff_joined_date" style="display: none">${staff.joinedDate}</td>
                                            <td class="fixed-width staff_address" style="display: none">${staff.addressLine1}</td>
                    </tr>
                `;
        staffContainer.append(staffCard);
      });
      $('[data-toggle="modal"]').on("click", function () {
        const target = $(this).data("target");
        $(target).modal("show");
      });
    },
    error: function (err) {
      alert("ERR: ", err);
    },
  });
}

staffSaveBtn.click(function (e) {
  e.preventDefault();

  let firstname = $("#modal_staff_first_name").val();
  let lastname = $("#modal_staff_last_name").val();
  let gender = $('input[name="gender-sl"]:checked').val();
  let staffMemPhoto = $("#modal_staff_profile")[0].files[0];
  let memberDob = $("#modal_staff_dob").val();
  let memberJoinedDate = $("#modal_staff_joined_date").val();
  let memberAddress = $("#modal_staff_address").val();
  let memberPhnNo = $("#modal_staff_contact").val();
  let memberEmail = $("#modal_staff_email").val();
  let memberRole = $("#modal_staff_role").val();

  const staffData = new FormData();

  staffData.append("firstname", firstname);
  staffData.append("lastname", lastname);
  staffData.append("gender", gender);
  staffData.append("staffImg", staffMemPhoto);
  staffData.append("dob", memberDob);
  staffData.append("joinedDate", memberJoinedDate);
  staffData.append("address", memberAddress);
  staffData.append("phnNo", memberPhnNo);
  staffData.append("email", memberEmail);
  staffData.append("role", memberRole.toUpperCase());

  $.ajax({
    url: "http://localhost:5050/pcmSystem/api/v1/staffs",
    method: "POST",
    processData: false,
    contentType: false,
    data: staffData,
    success: function (res) {
      alert("Staff saved");
    },
    error: function (xhr, status, error) {
      alert("Staff not saved");
    },
  });
});

$("#modal_staff_profile").on("change", function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    $("#new_staff_img").attr("src", e.target.result);
  };

  reader.readAsDataURL(file);
});

staffUpdateBtn.click(async function (e) {
  e.preventDefault();

  let staffNewFirstname = $("#update_modal_staff_first_name").val();
  let staffNewLastname = $("#update_modal_staff_last_name").val();
  let newGender = $('input[name="new-gender-sl"]:checked').val();
  let newMemberDob = $("#update_modal_staff_dob").val();
  let newMemberJoinedDate = $("#update_modal_staff_joined_date").val();
  let newMemberAddress = $("#update_modal_staff_address").val();
  let newMemberPhnNo = $("#update_modal_staff_contact").val();
  let newMemberEmail = $("#update_modal_staff_email").val();
  let newMemberRole = $("#update_modal_staff_role").val();

  // converting img element src as a image object same as file input
  const staffImgElement = document.getElementById("staff_profile_photo");
  const staffCanvas = document.createElement("canvas");
  const ctx = staffCanvas.getContext("2d");

  staffCanvas.width = staffImgElement.naturalWidth;
  staffCanvas.height = staffImgElement.naturalHeight;

  ctx.drawImage(staffImgElement, 0, 0);

  const staffFile = await new Promise((resolve, reject) => {
    staffCanvas.toBlob((blob) => {
      if (blob) {
        resolve(
          new File([blob], "image_from_img_element.jpeg", { type: blob.type })
        );
      } else {
        reject(new Error("Failed to create file from canvas"));
      }
    }, "image/jpeg");
  });

  const staffData = new FormData();

  staffData.append("firstname", staffNewFirstname);
  staffData.append("lastname", staffNewLastname);
  staffData.append("gender", newGender);
  staffData.append("staffImg", staffFile);
  staffData.append("dob", newMemberDob);
  staffData.append("joinedDate", newMemberJoinedDate);
  staffData.append("address", newMemberAddress);
  staffData.append("phnNo", newMemberPhnNo);
  staffData.append("email", newMemberEmail);
  staffData.append("role", newMemberRole.toUpperCase());

  $.ajax({
    url: `http://localhost:5050/pcmSystem/api/v1/staffs/${staffID}`,
    method: "PUT",
    processData: false,
    contentType: false,
    data: staffData,
    success: function (res) {
      console.log("crop Updated");
    },
    error: function (xhr, status, error) {
      console.log("crop not Updated");
    },
  });
});

let staffID;
$(document).on("click", ".staff_tbl_row", function () {
  const staffRow = $(this).closest(".staff_tbl_row");

  staffID = staffRow.find(".staff_id").text().trim();
  const fullName = staffRow.find(".staff_name").text().trim();

  // extract full name as firstname and lastname
  const [firstName, lastName] = fullName.split(" ");
  const gender = staffRow.find(".staff_gender").text().trim();

  const staffImg = staffRow.find(".staff_photo");
  const staffImgSrc = staffImg.attr("src");

  const dob = staffRow.find(".staff_dob").text().trim();
  const joinedDate = staffRow.find(".staff_joined_date").text().trim();
  const address = staffRow.find(".staff_address").text().trim();
  const phnNo = staffRow.find(".staff_phn_no").text().trim();
  const email = staffRow.find(".staff_email").text().trim();
  const role = staffRow.find(".staff_role").text().trim();

  $("#update_modal_staff_first_name").val(firstName);
  $("#update_modal_staff_last_name").val(lastName);
  // (gender === "Male") ? $('#staff_gender_male').prop('checked', true) : $('#staff_gender_female').prop('checked', true)
  if (gender === "MALE") {
    $("#staff_gender_male").prop("checked", true);
  } else {
    $("#staff_gender_female").prop("checked", true);
  }

  $("#staff_profile_photo").attr("src", staffImgSrc);
  $("#update_modal_staff_dob").val(dob);
  $("#update_modal_staff_joined_date").val(joinedDate);
  $("#update_modal_staff_address").val(address);
  $("#update_modal_staff_contact").val(phnNo);
  $("#update_modal_staff_email").val(email);
  $("#update_modal_staff_role").val(role);
});

staffDeleteBtn.click(function (e) {
  e.preventDefault();
  
  $.ajax({
    url: `http://localhost:5050/pcmSystem/api/v1/staffs/${staffID}`,
    method: "DELETE",
    success: function (response) {
      alert("Staff Deleted!");
    },
    error: function (xhr, status, error) {
      alert("Staff Not Deleted!");
      console.error("Error:", error);
    },
  });
});
