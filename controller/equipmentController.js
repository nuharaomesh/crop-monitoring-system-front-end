const equipmentSaveBtn = $('#equipmentSaveButton')
const equipmentUpdateBtn = $('#equipmentUpdateButton')
const equipmentDeleteBtn = $('#equipmentDeleteButton')

const equipmentLoadTest = $('#equipmentLoadTest')

equipmentLoadTest.click(function (e) {
    loadEquipmentRows()
})

function loadEquipmentRows() {
    $.ajax({
        url: "http://localhost:5050/pcmSystem/api/v1/equipments",
        type: "GET",
        dataType: "json",
        success: function (data) {

            let container = $("#equipment_list_tbl_body")
            container.empty()

            data.forEach(function (equipment) {
                var containerItem = `
                    <tr class="equipment_row" data-bs-toggle="modal" data-bs-target="#update_equipments">
                        <td class="fixed-width equipment_id" style="display: none">${equipment.equipmentId}</td>
                        <td class="fixed-width equipment_name">${equipment.name}</td>
                        <td class="fixed-width equipment_type">${equipment.type}</td>
                        <td class="fixed-width equipment_status custom_status"> <p>${equipment.status}</p></td>
                        <td class="fixed-width equipment_list_count">${equipment.count}</td>
                    </tr>
                `
                container.append(containerItem)
            })
        },
        error: function (err) {
            alert("ERR: ", err)
        }
    })
}

equipmentSaveBtn.click(function (e) {
    e.preventDefault()

    let equipmentName = $('#modal_equipment_name').val()
    let equipmentType = $('#modal_equipment_type').val()
    let equipmentStatus = $('#modal_equipment_status').val()
    let equipmentCount = $('#modal_equipment_count').val()

    $.ajax({
        url: 'http://localhost:5050/pcmSystem/api/v1/equipments',
        method: "POST",
        contentType: "application/json",
        "data": JSON.stringify({
            "name": equipmentName,
            "type": equipmentType.toUpperCase(),
            "status": equipmentStatus.toUpperCase(),
            "count": equipmentCount
        }),
        success: function(response) {
            alert("Equipment saved!")
        },
        error: function(xhr, status, error) {
            alert("Equipment Not Saved!")
        }
    });
})

let equipmentId;
$(document).on("click", ".equipment_row", function () {
    const row = $(this).closest('.equipment_row')

    equipmentId = row.find('.equipment_id').text().trim()
    let equipmentName = row.find('.equipment_name').text().trim()
    let equipmentType = row.find('.equipment_type').text().trim()
    let equipmentStatus = row.find('.equipment_status').text().trim()
    let equipmentCount = row.find('.equipment_list_count').text().trim()

    $('#update_modal_equipment_name').val(equipmentName)
    $('#update_modal_equipment_type').val(equipmentType.toLowerCase())
    $('#update_modal_equipment_status').val(equipmentStatus.toLowerCase())
    $('#update_modal_equipment_count').val(equipmentCount)
})

equipmentUpdateBtn.click(function (e) {
    e.preventDefault()

    let newEquipmentName = $('#update_modal_equipment_name').val()
    let newEquipmentType = $('#update_modal_equipment_type').val()
    let newEquipmentStatus = $('#update_modal_equipment_status').val()
    let newEquipmentCount = $('#update_modal_equipment_count').val()

    $.ajax({
        url: `http://localhost:5050/pcmSystem/api/v1/equipments/${equipmentId}`,
        method: "PUT",
        contentType: "application/json",
        "data": JSON.stringify({
            "name": newEquipmentName,
            "type": newEquipmentType.toUpperCase(),
            "status": newEquipmentStatus.toUpperCase(),
            "count": newEquipmentCount
        }),
        success: function(response) {
            alert("Equipment Update!")
        },
        error: function(xhr, status, error) {
            alert("Equipment Not Update!")
        }
    });
})

equipmentDeleteBtn.click(function (e) {
    e.preventDefault()

    $.ajax({
        url: `http://localhost:5050/pcmSystem/api/v1/equipments/${equipmentId}`,
        method: "DELETE",
        success: function(response) {
            alert("Equipment Deleted!")
        },
        error: function(xhr, status, error) {
            alert("Equipment Not Deleted!")
        }
    });
})