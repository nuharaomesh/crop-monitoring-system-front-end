const menuBtnList = document.querySelectorAll('.menu_btn');
const managementBtnList = document.querySelectorAll('.management_btn_list');

const dashboardSec = $('#dashboard_section')
const activitySec = $('#activity_section')
const reportsSec = $('#reports_section')

dashboardSec.css("display", "block")
activitySec.css("display", "none")
reportsSec.css("display", "none")

const displaySec = [dashboardSec, activitySec, reportsSec]

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

function reports() {
    changeDisplayState(reportsSec)
}

document.querySelector('#dashboard_btn').classList.add('active')

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

