
const uncultivatedFieldList = $("#uncultivated_field_list")

const cultivationProcess = $("#cultivation_process_handler")
const activitySection = $("#activity_section")

addCul
cultivationProcess.css("display", "none")

function addCultivation() {
    activitySection.css("display", "none")
    cultivationProcess.css("display", "block")
}

function cultivationProcessBackBtn() {
    activitySection.css("display", "block")
    cultivationProcess.css("display", "none")
}