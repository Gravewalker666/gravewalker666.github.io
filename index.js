$(document).ready(function () {
    const navIdArray = ["nav-projects", "nav-education", "nav-blogs", "nav-videos"];

    $("#left-arrow").click(function () {
        $("#left-arrow-wrapper").removeClass("animate-bounce");
        $("#right-arrow-wrapper").removeClass("animate-bounce");
        let sectionId = $(".nav-item.text-5xl.font-bold").attr('id');
        let nextSectionIdIndex = (navIdArray.indexOf(sectionId) + 1)%4;
        $(".nav-item").removeClass("text-5xl font-bold");
        $("#" + navIdArray[nextSectionIdIndex]).addClass("text-5xl font-bold");
        changeScene(navIdArray[nextSectionIdIndex]);
    });

    $("#right-arrow").click(function () {
        $("#left-arrow-wrapper").removeClass("animate-bounce");
        $("#right-arrow-wrapper").removeClass("animate-bounce");
        let sectionId = $(".nav-item.text-5xl.font-bold").attr('id');
        let nextSectionIdIndex = (navIdArray.indexOf(sectionId) + 3)%4;
        $(".nav-item").removeClass("text-5xl font-bold");
        $("#" + navIdArray[nextSectionIdIndex]).addClass("text-5xl font-bold");
        changeScene(navIdArray[nextSectionIdIndex]);
    });

    getPlaylist();
})

function changeScene(navbarId) {
    let sectionId = navbarId.split("-")[1];
    $(".section-x").addClass("md:hidden");
    $("#" + sectionId).removeClass("md:hidden");
}

function getPlaylist() {
    let videoIds = []
    $.ajax({
        type: 'get',
        url: 'https://grave-youtube-niffler.herokuapp.com/playlist?playlistId=PLX0-W_Oj50O53wYM5gVyUqdo2jz47a_QQ',
        dataType: 'json',
        success: function (data) {
            data.items.forEach(item => {
                videoIds.push(item.snippet.resourceId.videoId);
            });
            renderVideos(videoIds);
        }
    });
}

function renderVideos(videoIds) {
    let ids = videoIds[0];
    for (let i = 1; i < videoIds.length; i++) {
        ids += "," + videoIds[i];
    }
    $.ajax({
        type: 'get',
        url: 'https://grave-youtube-niffler.herokuapp.com/videos?videoIds=' + ids,
        dataType: 'json',
        success: function (data) {
            data.items.forEach(item => {
                item.snippet.upSince = getUpSinceTimePeriod(item.snippet.publishedAt);
                item.snippet.thumbnailUrl = getMaxResThumbnail(item.snippet.thumbnails);
                item.contentDetails.duration = getDuration(item.contentDetails.duration);
            })
            let items = Mustache.render($("#video-card").html(), {item: data.items});
            $("#video-container").html(items);
        }
    })
}

function getUpSinceTimePeriod (publishedAt) {
    let publishedDate = new Date(publishedAt);
    let currentDate = new Date();
    let diffInDays = Math.ceil((currentDate - publishedDate)/(1000*24*60*60));
    if (diffInDays < 30) {
        return diffInDays.toString() + " days ago";
    }
    else if (diffInDays > 30 && diffInDays < 365) {
        return Math.floor(diffInDays/30).toString() + " month(s) ago";
    } else {
        return Math.ceil(diffInDays/365).toString() + " year(s) ago";
    }
}

function getMaxResThumbnail (thumbnails) {
    let keyList = Object.keys(thumbnails);
    return thumbnails[keyList[keyList.length - 1]].url;
}

function getDuration (duration) {
    let durationStr = duration.toString();
    durationStr = durationStr.replace("PT", "");
    durationStr = durationStr.replace("H", ".");
    durationStr = durationStr.replace("M", ".");
    durationStr = durationStr.replace("S", "");
    durationStr = durationStr.split(".");
    let processedDurationStr = "";
    durationStr.forEach(n => {
        if (parseInt(n) < 10) {
            n = "0" + n;
        }
        if (n !== durationStr[durationStr.length - 1]
            && n !== "0" + durationStr[durationStr.length - 1]) {
            n += ".";
        }
        processedDurationStr += n;
    })
    return processedDurationStr;
}
