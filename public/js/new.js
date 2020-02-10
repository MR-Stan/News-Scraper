// display scraped articles when page loads
$(function () {

    $.ajax({
        type: 'GET',
        url: '/scrape',
        success: function () {

            $.ajax({
                type: 'GET',
                url: '/display/scraped'
            }).then(response => {

                
                
            });
        }
    })
});

// Save article
$('.saveBtn').on('click', function () {

    const articleId = $(this).attr('id');

    console.log(articleId);

    // $(this).toggleClass('btn-primary btn-success')
    //     .text('Saved')
    //     .attr('disabled', true);

    $.ajax({
        type: 'PUT',
        url: '/save/' + articleId
    });

    console.log('article saved')
});

// Open notes modal on Notes button click
$('.card-footer').on('click', '.noteBtn', function () {

    $('#notesModal').modal({
        show: true,
        backdrop: 'static', // prevents closing by clicking out of modal
    });
});

// Hide modal on close button click
$('#modalCloseBtn').on('click', function () {

    $('#notesModal').modal('hide');
});
