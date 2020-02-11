// Display scraped articles when page loads
$(function () {
    $.ajax({
        type: 'GET',
        url: '/scrape',
        success: function () {
            $.ajax({
                type: 'GET',
                url: '/display/scraped'
            });
        }
    })
});

// Save article
$('.saveBtn').click(function (e) {
    e.preventDefault();
    const articleId = $(this).attr('data-id');
    $.ajax({
        type: 'PUT',
        url: '/save/' + articleId
    });
    $(this)
        .removeClass('btn-success saveBtn')
        .addClass('btn-danger unsaveBtn')
        .html('<i class="far fa-window-close"></i> Unsave');
});

// Remove saved article
$('.unsaveBtn').click(function (e) {
    e.preventDefault();
    const articleId = $(this).attr('data-id');
    $.ajax({
        type: 'PUT',
        url: '/remove/' + articleId
    });
    $(this)
        .removeClass('btn-danger unsaveBtn')
        .addClass('btn-success saveBtn')
        .html('<i class="far fa-bookmark"></i> Save');
});

// Open note modal and display notes
$('.noteBtn').click(function (e) {
    e.preventDefault();
    console.log('click');

    const articleId = $(this).attr('data-id');
    currentArticle = articleId;
    $.ajax({
        type: 'GET',
        url: '/notes/display/' + articleId,
        success: function (response) {
            $('#noteModal').modal();
            if (!response.length) {
                $('#modalBody')
                    .append('<h5/>').text('There are no notes associated with this article.');
            }
            else {
                for (let i = 0; i < data.length; i++) {
                    $('.modal-body')
                        .append('<div class="card"/>')
                        .append('<div class="card-body"/>')
                        .append('<p class="card-text"/>')
                        .text(data.body);
                }
            }
        }

    })
});

var currentArticle = '';

$('.addNoteBtn').click(function () {
    const articleId = currentArticle;
    console.log(articleId);
    $.ajax({
        type: 'GET',
        url: '/notes/new/' + articleId,
    });
    // after save btn click clear fields 
});

