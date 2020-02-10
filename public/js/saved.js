// display scraped articles when page loads
$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: '/display/saved'
    }).then(response => {


    });
});

// Remove saved article
$('#savedTable').on('click', '.removeBtn', function () {

    const articleId = $(this).attr('id');

    $.ajax({
        type: 'PUT',
        url: '/remove/' + articleId
    }).then(_ => {
        window.location.reload()
    });
});

// Open note modal
$('#savedTable').on('click', '.noteBtn', function () {

    // toggle modal

    const articleId = $(this).attr('id');

    $.ajax({
        type: 'PUT',
        url: '' + articleId
    }).then(_ => {
        window.location.reload()
    });
});