function displayNotes() {

    var notesHtml = "";

    for (var i = 0; i < notes.length; i++) {
        notesHtml += '<div class="note" data-index="' + i + '"><button class="delete">X</button><textarea class="note-content">' + notes[i].content + '</textarea></div>';
    }

    $('#notes').html(notesHtml);

    var timeout;
    $('.note-content').on('input propertychange change', function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            $(".note").each(function (i) {
                notes[i].content = $($(this).children()[1]).val();
            });
            localStorage.notes = JSON.stringify(notes);
        }, 1000);
    });
}

$(document).ready(function () {
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

$(document).on('click', '.delete', function () {
    notes.splice($(this).parent().closest("div").attr("data-index"), 1);
    localStorage.notes = JSON.stringify(notes);
    displayNotes();
});