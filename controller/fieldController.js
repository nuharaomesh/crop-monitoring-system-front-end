let newLat;
let newLng;
let address;

let updatedLat;
let updatedLng;
let updatedAddress;

let map;
let marker;

let showedMap;
let selectedMarker;

let updatedMap;
let updateMarker;

const saveBtn = $("#saveField")
const updateBtn = $("#fieldUpdateButton")
const deleteBtn = $("#fieldDeleteButton")

$(document).ready(function () {
    // loadCards()
})

$(document).on("click", "#cultivatedFields", function () {
    $.ajax({
        url: "http://localhost:5050/pcmSystem/api/v1/fields/cultivatedFields",
        type: "GET",
        dataType: "json",
        success: function (data) {

            let container = $("#fld_data_list")
            container.empty()

            data.forEach(function (field) {
                var containerItem = `
                                <li>
                                    <div class="field_data_component custom_card select_field">

                                        <div class="field_asset">
                                            <img src="src/assets/download%20(1).jpeg" alt="">
                                        </div>

                                        <div class="field_details">

                                            <div class="field_card_left">
                                                <p class="field_id" style="display: none">${field.id}</p>
                                                <p class="field_name">${field.fieldName}</p>
                                                <p class="field_size">${field.fieldSize} Sq.mt</p>
                                                <p class="field_address">${field.address}</p>
                                                <p class="growth_stat_tag">Crop</p>
                                                <p class="growth_stage">${field.cropName}</p>
                                                <p class="harvest_status">${field.harvestStatus}</p>
                                                <p class="field_location" style="display: none">${field.location}</p>
                                            </div>
                                            <div class="field_card_right">
                                                <div class="staff_stat">
                                                    <div class="staff_count">
                                                        <i class="fa-solid fa-users"></i>
                                                        <h1>${field.staffCount}</h1>
                                                    </div>
                                                    <div class="equipment_count">
                                                        <i class="fa-solid fa-wrench"></i>
                                                        <h1>${field.equipmentCount}</h1>
                                                    </div>
                                                </div>
                                                <div class="update_btn">
                                                    <button class="updateField" data-bs-toggle="modal" data-bs-target="#field_update_modal">
                                                        <i class="fa-regular fa-pen-to-square"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                `
                container.append(containerItem)
            })
        },
        error: function (err) {
            alert("ERR: ", err)
        }
    })
})

$(document).on("click", "#uncultivatedFields", function () {
    loadCards()
})

function loadCards() {
    $.ajax({
        url: "http://localhost:5050/pcmSystem/api/v1/fields",
        type: "GET",
        dataType: "json",
        success: function (data) {

            let container = $("#fld_data_list")
            container.empty()

            data.forEach(function (field) {

                const imageData = atob(field.img1);
                const byteNumbers = new Array(imageData.length);
                for (let i = 0; i < imageData.length; i++) {
                    byteNumbers[i] = imageData.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust MIME type as needed
                const imageUrl = URL.createObjectURL(blob);
                loadedImg = imageUrl

                var containerItem = `
                                <li>
                                    <div class="field_data_component custom_card select_field">

                                        <div class="field_asset">
                                            <img src="${imageUrl}" alt="" class="current_field_image">
                                        </div>

                                        <div class="field_details">

                                            <div class="field_card_left">
                                                <p class="field_id" style="display: none">${field.fieldCode}</p>
                                                <p class="field_name">${field.fieldName}</p>
                                                <p class="field_size">${field.fieldSize} Sq.mt</p>
                                                <p class="field_address">${field.address}</p>
                                                <p class="growth_stat_tag">Crop</p>
                                                <p class="field_location" style="display: none">${field.location}</p>
                                                <p>Uncultivated</p>
                                            </div>
                                            <div class="field_card_right">
                                                <div class="staff_stat">
                                                    <div class="staff_count">
                                                        <i class="fa-solid fa-users"></i>
                                                        <h1>0</h1>
                                                    </div>
                                                    <div class="equipment_count">
                                                        <i class="fa-solid fa-wrench"></i>
                                                        <h1>0</h1>
                                                    </div>
                                                </div>
                                                <div class="update_btn">
                                                    <button class="updateField" data-bs-toggle="modal" data-bs-target="#field_update_modal">
                                                        <i class="fa-regular fa-pen-to-square"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                `
                container.append(containerItem)
            })
        },
        error: function (err) {
            alert("ERR: ", err)
        }
    })
}

saveBtn.click(function(e) {
    e.preventDefault()

    let fieldName = $("#field_name").val()
    let fieldImg = $("#field_image")[0].files[0];
    let fieldSize = $("#field_size").val()
    let fieldCoordinate = newLat + "," + newLng;

    const fieldData = new FormData();

    fieldData.append("fieldName", fieldName)
    fieldData.append("fieldImg1", fieldImg)
    fieldData.append("fieldImg2", fieldImg)
    fieldData.append("fieldSize", fieldSize)
    fieldData.append("fieldLocation", fieldCoordinate)
    fieldData.append("address", address)

    $.ajax({
        url: 'http://localhost:5050/pcmSystem/api/v1/fields/saveField',
        method: "POST",
        processData: false,
        contentType: false,
        data: fieldData,
        success: function (res) {
            console.log("field saved")
        },
        error: function(xhr, status, error) {
            console.log("field not saved")
        }
    });

});

$("#field_image").on("change", function () {
    const file = this.files[0];
    const reader = new FileReader();
  
    reader.onload = function (e) {
      $("#addedFieldImg").attr("src", e.target.result);
    };
  
    reader.readAsDataURL(file);
});

let fieldCode;
$(document).on("click", ".updateField", function () {
    const fieldCard = $(this).closest('.field_data_component')

    fieldCode = fieldCard.find('.field_id').text().trim()
    let fieldName = fieldCard.find('.field_name').text().trim()
    let fieldSize = fieldCard.find('.field_size').text().trim()
    const fieldImg = fieldCard.find(".current_field_image");
    const fieldImgSrc = fieldImg.attr("src");


    $("#modalCurrentFieldImg").attr("src", fieldImgSrc);
    $('#new_field_name').val(fieldName)
    $('#new_field_size').val(fieldSize)
})

updateBtn.click(async function(e) {
    e.preventDefault()

    let newFieldName = $("#new_field_name").val();
    let fullFieldSize = $("#new_field_size").val();

    // converting img element src as a image object same as file input
    const FieldImgElement = document.getElementById("modalCurrentFieldImg");
    const fieldCanvas = document.createElement("canvas");
    const ctx = fieldCanvas.getContext("2d");
    let fieldLocation = updatedLat + "," + updatedLng;

    fieldCanvas.width = FieldImgElement.naturalWidth;
    fieldCanvas.height = FieldImgElement.naturalHeight;

    ctx.drawImage(FieldImgElement, 0, 0);

    const fieldFile = await new Promise((resolve, reject) => {
        fieldCanvas.toBlob((blob) => {
            if (blob) {
                resolve(
                    new File([blob], "image_from_img_element.jpeg", { type: blob.type })
                );
            } else {
                reject(new Error("Failed to create file from canvas"));
            }
        }, "image/jpeg");
    });

    const updatedFieldData = new FormData();

    console.log(fullFieldSize.split(" ")[0])

    updatedFieldData.append("fieldName", newFieldName)
    updatedFieldData.append("img1", fieldFile)
    updatedFieldData.append("img2", fieldFile)
    updatedFieldData.append("fieldSize", fullFieldSize.split(" ")[0])
    updatedFieldData.append("fieldLocation", fieldLocation)
    updatedFieldData.append("address", updatedAddress)

    $.ajax({
        url: `http://localhost:5050/pcmSystem/api/v1/fields/${fieldCode}`,
        method: "PUT",
        processData: false,
        contentType: false,
        data: updatedFieldData,
        success: function (res) {
            console.log("field Updated")
        },
        error: function(xhr, status, error) {
            console.log("field not Updated")
        }
    })
})

$("#new_field_image").on("change", function () {
    const file = this.files[0];
    const reader = new FileReader();
  
    reader.onload = function (e) {
      $("#modalCurrentFieldImg").attr("src", e.target.result);
    };
  
    reader.readAsDataURL(file);
});

deleteBtn.click(function (e) {
    e.preventDefault()

    $.ajax({
        url: `http://localhost:5050/pcmSystem/api/v1/fields/${fieldCode}`,
        method: "DELETE",
        success: function(response) {
            alert("Field Deleted!")
        },
        error: function(xhr, status, error) {
            alert("Field Not Deleted!")
        }
    });
})

// New Map

$(document).on('click', '#addNewField', function() {

    const lat = 6.697456353448815;
    const lng = 80.15355606198128;

    setTimeout(() => {
        initializeNewMap(lat, lng);
    }, 200);
});

function initializeNewMap(lat, lng) {
    if (map) {
        map.remove();
    }

    map = L.map('add_field_map').setView([lat, lng], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

    }).addTo(map);

    setTimeout(() => {
        map.invalidateSize();
    }, 200);

    map.on('click', async function(event) {
        const { lat, lng } = event.latlng;

        if (marker) {
            marker.setLatLng([lat, lng]);
        } else {
            marker = L.marker([lat, lng]).addTo(map);
        }

        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await response.json();

        newLat = lat
        newLng = lng

        console.log(`Coordinates: Latitude: ${lat}, Longitude: ${lng}`);
        console.log(`Address: ${data.display_name}`);
        address = data.display_name.split(", ")[0]
    });
}

// Map Updated location

$(document).on('click', '.updateField', function() {
    const lat = 6.697456353448815;
    const lng = 80.15355606198128;

    setTimeout(() => {
        initializeUpdateMap(lat, lng);
    }, 200);
});

function initializeUpdateMap(lat, lng) {
    if (updatedMap) {
        updatedMap.remove();
    }

    updatedMap = L.map('update_field_map').setView([lat, lng], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

    }).addTo(updatedMap);

    setTimeout(() => {
        updatedMap.invalidateSize();
    }, 200);

    updatedMap.on('click', async function(event) {
        const { lat, lng } = event.latlng;

        if (updateMarker) {
            updateMarker.setLatLng([lat, lng]);
        } else {
            updateMarker = L.marker([lat, lng]).addTo(updatedMap);
        }

        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await response.json();

        updatedLat = lat
        updatedLng = lng

        console.log(`Coordinates: Latitude: ${lat}, Longitude: ${lng}`);
        console.log(`Address: ${data.display_name}`);
        updatedAddress = data.display_name.split(", ")[0]
    });
}

// Main map

window.onload = function() {
    const lat = 6.697456353448815;
    const lng = 80.15355606198128;
    initializeMainMap(lat, lng);
};

$(document).on('click', '#field_btn', function() {
    const lat = 6.697456353448815;
    const lng = 80.15355606198128;

    setTimeout(() => {
        initializeMainMap(lat, lng);
    }, 200);
})

function initializeMainMap(lat, lng) {
    showedMap = L.map('field_map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

    }).addTo(showedMap);

    selectedMarker = L.marker([lat, lng]).addTo(showedMap);
}

// Navigate to the field location
$(document).on('click', '.select_field', function() {
    const fieldCard = $(this).closest('.field_data_component')

    const fieldLocation = fieldCard.find('.field_location').text().trim()
    const [lat, lng] = fieldLocation.split(", ")
    navigateToLocation(lat, lng);
});

function navigateToLocation(lat, lng) {
    if (showedMap) {
        console.log("awa")
        showedMap.setView([lat, lng], 15);

        if (selectedMarker) {
            selectedMarker.setLatLng([lat, lng]);
        } else {
            selectedMarker = L.marker([lat, lng]).addTo(showedMap);
        }
    }
}
