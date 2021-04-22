$(document).ready(function () {
    $(".nav-item").click(function () {
        $(".nav-item").removeClass("text-5xl font-bold");
        $(this).addClass("text-5xl font-bold");
        let sectionId = $(this).attr('id').split("-")[1];
        changeScene(sectionId);
    });
})

function changeScene(sectionId) {
    $(".section-x").addClass("md:hidden");
    $("#" + sectionId).removeClass("md:hidden");
}
