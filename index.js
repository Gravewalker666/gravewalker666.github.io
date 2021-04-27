$(document).ready(function () {
    const navIdArray = ["nav-projects", "nav-education", "nav-blogs", "nav-videos"];

    $("#left-arrow").click(function () {
        let sectionId = $(".nav-item.text-5xl.font-bold").attr('id');
        let nextSectionIdIndex = (navIdArray.indexOf(sectionId) + 1)%4;
        $(".nav-item").removeClass("text-5xl font-bold");
        $("#" + navIdArray[nextSectionIdIndex]).addClass("text-5xl font-bold");
        changeScene(navIdArray[nextSectionIdIndex]);
    });

    $("#right-arrow").click(function () {
        let sectionId = $(".nav-item.text-5xl.font-bold").attr('id');
        let nextSectionIdIndex = (navIdArray.indexOf(sectionId) + 3)%4;
        $(".nav-item").removeClass("text-5xl font-bold");
        $("#" + navIdArray[nextSectionIdIndex]).addClass("text-5xl font-bold");
        changeScene(navIdArray[nextSectionIdIndex]);
    });
})

function changeScene(navbarId) {
    let sectionId = navbarId.split("-")[1];
    $(".section-x").addClass("md:hidden");
    $("#" + sectionId).removeClass("md:hidden");
}
