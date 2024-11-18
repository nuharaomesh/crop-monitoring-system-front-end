const menuBtnList = document.querySelectorAll('.menu_btn');
const managementBtnList = document.querySelectorAll('.management_btn_list');

const dashboardSec = $('#dashboard_section')
const activitySec = $('#activity_section')
const fieldSec = $('#field_section')
const cropSec = $('#crop_section')
const staffSec = $('#staff_section')
const reportsSec = $('#reports_section')

document.querySelector('#staff_btn').classList.add('active')

dashboardSec.css("display", "none")
activitySec.css("display", "none")
fieldSec.css("display", "none")
cropSec.css("display", "none")
staffSec.css("display", "block")
reportsSec.css("display", "none")

const displaySec = [dashboardSec, activitySec, fieldSec, cropSec, reportsSec]

function changeDisplayState(section) {
    for (let i = 0; i < displaySec.length; i++) {
        if (displaySec[i] === section) {
            displaySec[i].css("display", "block")
        } else {
            displaySec[i].css("display", "none")
        }
    }
}

function dashboard() {
    changeDisplayState(dashboardSec)
}

function activity() {
    changeDisplayState(activitySec)
}

function field() {
    changeDisplayState(fieldSec)
}

function crop() {
    changeDisplayState(cropSec)
}

function staff() {
    changeDisplayState(staffSec)
}

function reports() {
    changeDisplayState(reportsSec)
}

menuBtnList.forEach(button => {

    button.addEventListener('click', () => {
        menuBtnList.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

managementBtnList.forEach(button => {
    button.addEventListener('click', () => {
        managementBtnList.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
