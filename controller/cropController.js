
const saveCrop = $("#cropSaveButton")
const updateCrop = $("#cropUpdateButton")
const deleteCrop = $("#cropDeleteButton")

const tempBtnID = $("#tempBtnID")

tempBtnID.click(function (e) {
    e.preventDefault()
    loadCropCards()
})

let loadedImg;

function loadCropCards() {


    $.ajax({
        url: "http://localhost:5050/pcmSystem/api/v1/crops",
        type: "GET",
        dataType: "json",
        success: function (data) {

            console.log("asdsad")
            let cropContainer = $("#crop_items")
            cropContainer.empty()

            data.forEach(function (crop) {

                const imageData = atob(crop.cropImg);
                const byteNumbers = new Array(imageData.length);
                for (let i = 0; i < imageData.length; i++) {
                    byteNumbers[i] = imageData.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust MIME type as needed
                const imageUrl = URL.createObjectURL(blob);
                loadedImg = imageUrl

                var cropCard = `
                    <div class="crop_item_card">

                                    <div class="crop_item_card_header">

                                        <img src="${imageUrl}" alt="" class="crop_img">
                                    </div>
                                    <div class="crop_item_card_body">
                                        <div class="crop_item_card_body_top">
                                            <div>
                                                <p class="crop_code" style="display: none">${crop.cropCode}</p>
                                                <h1 class="crop_scientific_name">${crop.cropScientificName} <span class="crop_name">(${crop.cropName})</span></h1>
                                                <p>category</p>
                                                <div>
                                                    <i class="fa-solid fa-seedling"></i>
                                                    <p class="crop_category">${crop.category}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <button type="button" class="crop_update_btn"  data-toggle="modal" data-target="#crop_update_modal"><i class="fa-regular fa-pen-to-square"></i></button>
                                            </div>
                                        </div>
                                        <div class="crop_item_card_body_bottom">
                                            <div>
                                                <p>season</p>
                                                <h1 class="crop_season">${crop.cropSeason}</h1>
                                            </div>
                                            <div>
                                                <p>time</p>
                                                <h1 class="crop_growth_time">${crop.cropTimeRange}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `
                cropContainer.append(cropCard)
            })
            $('[data-toggle="modal"]').on('click', function () {
                const target = $(this).data('target');
                $(target).modal('show');
            });
        },
        error: function (err) {
            alert("ERR: ", err)
        }
    })
}

let cropCode;

$(document).on("click", ".crop_update_btn", function () {
    
    const card = $(this).closest('.crop_item_card');

    cropCode = card.find('.crop_code').text().trim();

    const cropName = card.find('.crop_name').text().replace(/[()]/g, '').trim();
    const scientificName = card.find('.crop_scientific_name').clone()
        .children('.crop_name')
        .remove()
        .end()
        .text().trim();
    const cropCategory = card.find('.crop_category').text().trim();
    const cropSeason = card.find('.crop_season').text().trim();
    const cropGrowthTime = card.find('.crop_growth_time').text().trim();

    const cropImage = card.find('.crop_img');
    const imgSrc = cropImage.attr('src');

    $('#new_crop_img').attr('src', imgSrc);
    $('#new_crop_name').val(cropName);
    $('#new_crop_scientific_name').val(scientificName);
    $('#new_crop_season').val(cropSeason);
    $('#new_crop_category').val(cropCategory);
    $('#new_crop_growth_time').val(cropGrowthTime);
});

$('#new_crop_image').on('change', function() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        $('#new_crop_img').attr('src', e.target.result);
    };

    reader.readAsDataURL(file);
});

saveCrop.click(function (e) {
    e.preventDefault()
    
    let cropName = $("#crop_name").val()
    let cropScientificName = $("#crop_scientific_name").val()
    let cropImg = $("#crop_image")[0].files[0]
    let cropSeason = $("#crop_season").val()
    let cropCategory = $("#crop_category").val()
    let cropGrowthTime = $("#crop_growth_time").val()

    const cropData = new FormData()

    cropData.append("cropName", cropName)
    cropData.append("cropScientificName", cropScientificName)
    cropData.append("cropImg", cropImg)
    cropData.append("cropSeason", cropSeason)
    cropData.append("cropCategory", cropCategory)
    cropData.append("cropGrowthTime", cropGrowthTime)

    $.ajax({
        url: 'http://localhost:5050/pcmSystem/api/v1/crops/saveCrop',
        method: "POST",
        processData: false,
        contentType: false,
        data: cropData,
        success: function (res) {
            console.log("crop saved")
        },
        error: function(xhr, status, error) {
            console.log("crop not saved")
        }
    })
})

$("#crop_image").on("change", function () {
    const file = this.files[0];
    const reader = new FileReader();
  
    reader.onload = function (e) {
      $("#addedCropImg").attr("src", e.target.result);
    };
  
    reader.readAsDataURL(file);
});

updateCrop.click(async function (e) {
    e.preventDefault()

    let newCropName = $("#new_crop_name").val()
    let newCropScientificName = $("#new_crop_scientific_name").val()
    let newCropSeason = $("#new_crop_season").val()
    let newCropCategory = $("#new_crop_category").val()
    let newCropGrowthTime = $("#new_crop_growth_time").val()



    // converting img element src as a image object same as file input
    const cropImgElement = document.getElementById('new_crop_img');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = cropImgElement.naturalWidth;
    canvas.height = cropImgElement.naturalHeight;

    ctx.drawImage(cropImgElement, 0, 0);

    const file = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(new File([blob], "image_from_img_element.jpeg", { type: blob.type }));
            } else {
                reject(new Error("Failed to create file from canvas"));
            }
        }, 'image/jpeg');
    });

    const newCropData = new FormData()

    newCropData.append("cropName", newCropName)
    newCropData.append("cropScientificName", newCropScientificName)
    newCropData.append("cropImg", file);
    newCropData.append("cropSeason", newCropSeason)
    newCropData.append("category", newCropCategory)
    newCropData.append("cropGrowthTime", newCropGrowthTime)

    $.ajax({
        url: `http://localhost:5050/pcmSystem/api/v1/crops/${cropCode}`,
        method: "PUT",
        processData: false,
        contentType: false,
        data: newCropData,
        success: function (res) {
            console.log("crop Updated")
        },
        error: function(xhr, status, error) {
            console.log("crop not Updated")
        }
    })
})

$("#new_crop_image").on("change", function () {
    const file = this.files[0];
    const reader = new FileReader();
  
    reader.onload = function (e) {
      $("#new_crop_img").attr("src", e.target.result);
    };
  
    reader.readAsDataURL(file);
});

deleteCrop.click(function (e) {
    e.preventDefault()

    $.ajax({
        url: `http://localhost:5050/pcmSystem/api/v1/crops/${cropCode}`,  
        method: "DELETE",                        
        success: function(response) {
            alert("Crop Deleted!")
        },
        error: function(xhr, status, error) {
            alert("Crop Not Deleted!")
            console.error('Error:', error);
        }
    });
})