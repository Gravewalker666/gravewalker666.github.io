$(document).ready(function () {
    $(".nav-item").click(function () {
        $(".nav-item").removeClass("text-5xl font-bold");
        $(".nav-item").addClass("text-sm");
        $(this).addClass("text-5xl font-bold");
        $(this).removeClass("text-sm");
        let sectionId = $(this).attr('id').split("-")[1];
        changeScene(sectionId);
    });
})

function changeScene(sectionId) {
    console.log(sectionId);
    $(".section-x").addClass("md:hidden");
    $("#" + sectionId).removeClass("md:hidden");
}
