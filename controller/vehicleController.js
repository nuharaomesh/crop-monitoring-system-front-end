const vehicleSaveBtn = $('#vehicleSaveButton')
const vehicleUpdateBtn = $('#vehicleUpdateButton')
const vehicleDeleteBtn = $('#vehicleDeleteButton')

const test = $('#testVehicleNew')

test.click(function (e) {
    e.preventDefault()
    loadVehicleRow()
})

function loadVehicleRow() {
    $.ajax({
        url: "http://localhost:5050/pcmSystem/api/v1/vehicles",
        type: "GET",
        dataType: "json",
        success: function (data) {

            let container = $("#vehicle_list_tbl_body")
            container.empty()

            data.forEach(function (vehicle) {
                var containerItem = `
                    <tr class="vehicle_row" data-bs-toggle="modal" data-bs-target="#update_vehicles">
                        <td class="fixed-width vehicle_id" style="display: none">${vehicle.vehicleCode}</td>
                        <td class="fixed-width vehicle_type">${vehicle.category}</td>
                        <td class="fixed-width vehicle_fuel_type">${vehicle.fuelType}</td>
                        <td class="fixed-width vehicle_status custom_status"><p>${vehicle.status}</p></td>
                        <td class="fixed-width vehicle_licence">${vehicle.licencePlateNumber}</td>
                        <td class="fixed-width vehicle_remarks" style="display: none">${vehicle.remarks}</td>
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

vehicleSaveBtn.click(function (e) {
    e.preventDefault()

    let vehicleCategory = $('#modal_vehicle_category').val()
    let vehicleFuelType = $('#modal_vehicle_fuel').val()
    let vehicleStatus = $('#modal_vehicle_status').val()
    let vehicleLicenceNum = $('#modal_vehicle_licence').val()
    let vehicleRemarks = $('#modal_vehicle_remarks').val()

    $.ajax({
        url: 'http://localhost:5050/pcmSystem/api/v1/vehicles',
        method: "POST",
        contentType: "application/json",
        "data": JSON.stringify({
            "category": vehicleCategory,
            "fuelType": vehicleFuelType,
            "status": vehicleStatus.toUpperCase(),
            "licencePlateNumber": vehicleLicenceNum,
            "remarks": vehicleRemarks
        }),
        success: function(response) {
            alert("Vehicle saved!")
        },
        error: function(xhr, status, error) {
            alert("Vehicle Not Saved!")
        }
    });
})

let vehicleCode;
$(document).on("click", ".vehicle_row", function () {
    const row = $(this).closest('.vehicle_row');

    vehicleCode = row.find('.vehicle_id').text().trim()
    const vehicleType = row.find('.vehicle_type').text().trim()
    const vehicleFuelType = row.find('.vehicle_fuel_type').text().trim()
    const vehicleStatus = row.find('.vehicle_status').text().trim()
    const vehicleLicenceNum = row.find('.vehicle_licence').text().trim()
    const vehicleRemarks = row.find('.vehicle_remarks').text().trim()

    $('#update_modal_vehicle_category').val(vehicleType)
    $('#update_modal_vehicle_fuel').val(vehicleFuelType)
    $('#update_modal_vehicle_status').val(vehicleStatus)
    $('#update_modal_vehicle_licence').val(vehicleLicenceNum)
    $('#update_modal_vehicle_remarks').val(vehicleRemarks)
})

vehicleUpdateBtn.click(function (e) {
    e.preventDefault()

    let newVehicleCategory = $('#update_modal_vehicle_category').val()
    let newVehicleFuelType = $('#update_modal_vehicle_fuel').val()
    let newVehicleStatus = $('#update_modal_vehicle_status').val()
    let newVehicleLicenceNum = $('#update_modal_vehicle_licence').val()
    let newVehicleRemarks = $('#update_modal_vehicle_remarks').val()

    console.log(vehicleCode);
    $.ajax({
        url: `http://localhost:5050/pcmSystem/api/v1/vehicles/${vehicleCode}`,
        method: "PUT",
        contentType: "application/json",
        "data": JSON.stringify({
            "category": newVehicleCategory,
            "fuelType": newVehicleFuelType,
            "status": newVehicleStatus.toUpperCase(),
            "licencePlateNumber": newVehicleLicenceNum,
            "remarks": newVehicleRemarks
        }),
        success: function(response) {
            alert("Vehicle Update!")
        },
        error: function(xhr, status, error) {
            alert("Customer Not Update!")
        }
    });
})

vehicleDeleteBtn.click(function (e) {
    e.preventDefault()

    $.ajax({
        url: `http://localhost:5050/pcmSystem/api/v1/vehicles/${vehicleCode}`,
        method: "DELETE",
        success: function(response) {
            alert("Vehicle Deleted!")
        },
        error: function(xhr, status, error) {
            alert("Vehicle Not Deleted!")
        }
    });
})