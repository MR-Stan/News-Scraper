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
$('.noteBtn').click(function () {    
    const articleId = $(this).attr('data-id');
    $.ajax({
        type: 'GET',
        url: '/notes/display/' + articleId  
    })
});

$('.addNoteBtn').click(function (e) {
    e.preventDefault();
    console.log('add note click');


    // const articleId = $(this).attr('data-id');
    // $.ajax({
    //     type: 'GET',
    //     url: '/notes/display/' + articleId  
    // })
});

