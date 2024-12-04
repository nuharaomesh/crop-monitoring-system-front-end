$(document).ready(function () {
    // loadUncultivatedFields()
})


function loadUncultivatedFields() {
    $.ajax({
        url: "http://localhost:5050/pcmSystem/api/v1/fields",
        type: "GET",
        dataType: "json",
        success: function (data) {

            let container = $("#uncultivated_field_items")
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
                    <div class="uncultivated_field_card">   

                        <div class="field_card_head">
                            <div>
                                <img src="${imageUrl}" alt="" class="unCult_field_img">
                            </div>
                        </div>
                        <div class="field_card_body">
                            <h1 class="unCult_field_name">${field.fieldName}</h1>
                            <div>
                                <div>
                                    <div>
                                        <i class="fa-solid fa-expand"></i>
                                        <p class="unCult_field_size">${field.fieldSize} Sq.mt</p>
                                    </div>
                                    <div>
                                        <i class="fa-solid fa-location-dot"></i>
                                        <p class="unCult_field_address">${field.address}</p>
                                    </div>
                                </div>
                                <button id="addCultivationBtn" onclick="addCultivation()">+</button>
                            </div>
                        </div>
                    </div>
                `
                container.append(containerItem)
            })
        },
        error: function (err) {
            alert("ERR: ", err)
        }
    })
}

$(document).on('click', '.selectedFieldForCultivation', function() {
    const uncultivatedField = $(this).closest('.uncultivated_field_card')

    const unCultFieldImg = uncultivatedField.find('.unCult_field_img')
    const imgSrc = unCultFieldImg.attr('src')
    const unCultFieldName = uncultivatedField.find('.unCult_field_name').text().trim()
    const unCultFieldSize = uncultivatedField.find('.unCult_field_size').text().trim()
    const unCultFieldAddress = uncultivatedField.find('.unCult_field_address').text().trim()

    $('#unCultFieldImg').attr('src', imgSrc)
    $('#unCultFieldName').text(unCultFieldName)
    $('#unCultFieldSize').text(unCultFieldSize)
    $('#unCultFieldAddress').text(unCultFieldAddress)

    $("#activity_section").css("display", "none")
    $("#cultivation_process_handler").css("display", "block")
})