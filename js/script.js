function displayNotes() {

    var notesHtml = "";

    for (var i = 0; i < notes.length; i++) {
        notesHtml += '<div class="note" data-index="' + i + '"><button class="delete">X</button><textarea class="note-content">' + notes[i].content + '</textarea></div>';
    }

    $('#notes').html(notesHtml);

    $('.note-content').on('input propertychange change', function () {
        $(".note").each(function (i) {
            notes[i].content = $($(this).children()[1]).val();
        });
        localStorage.notes = JSON.stringify(notes);
    });
}

$(document).ready(function () {
    // navigator.geolocation.getCurrentPosition(function(position) {
    //     alert(position.coords.latitude);
    // });

    if (localStorage.notes) {
        notes = JSON.parse(localStorage.notes);
    } else {
        notes = [];
    }
    displayNotes();
});

$(document).on('click', '#create', function () {
    notes.push({ content: "" });
    localStorage.notes = JSON.stringify(notes);
    displayNotes();
});

$(document).on('click', '#create_weather', function () {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log("hey:" + lat + " " + long);
        var url = "http://api.openweathermap.org/data/2.5/weather"
        var appid = "3ce4f757ffc5a84bf69043ffe726a392";
        var query = url + "?lat=" + lat + "&lon=" + long + "&appid=" + appid;
        $.getJSON( query, function(json) {
            var weather_content = json.weather[0].main + " " + json.weather[0].description;
            notes.push({content: weather_content});
            localStorage.notes = JSON.stringify(notes);
            displayNotes();
        });
    });
});

$(document).on('click', '.delete', function () {
    notes.splice($(this).parent().closest("div").attr("data-index"), 1);
    localStorage.notes = JSON.stringify(notes);
    displayNotes();
});