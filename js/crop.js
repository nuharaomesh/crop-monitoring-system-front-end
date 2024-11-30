
let cropUpdateBtn = $(".crop_update_btn")

cropUpdateBtn.css("display", "none")



$(document).ready( function() {
    $(".crop_item_card_body").hover(
        function() {
            $(this).find(".crop_update_btn").show();
            cropUpdateBtn.css({
                opacity: "1",
                transition: "opacity 0.6s ease",
            });
        },
        function() {
            $(this).find(".crop_update_btn").hide();
            cropUpdateBtn.css({
                opacity: "0",
                transition: "opacity 0.4s ease"
            });
        }
    );
});