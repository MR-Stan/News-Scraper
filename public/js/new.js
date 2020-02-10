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

            //     for (let i = 0; i < response.length; i++) {

            //         // creating save button for each article
            //         const saveBtn = $('<button type="button">')
            //             .addClass('btn btn-primary saveBtn')
            //             .text('Save Article')
            //             .attr('id', response[i]._id);

            //         const noteBtn = $('<button type="button">')
            //             .addClass('btn btn-primary noteBtn')
            //             .text('Notes')
            //             .attr('id', response[i]._id);

            //         // adding results to article table
            //         $('#articleTable')
            //             .append('<tr/')
            //             .append('<td>' + response[i].date + '</td>')
            //             .append('<td>' + response[i].headline + '</td>')
            //             .append('<td>' + response[i].summary + '</td>')
            //             .append('<td>' + response[i].link + '</td>')
            //             .append(noteBtn)
            //             .append(saveBtn);

            //         if (response[i].saved) {
            //             $(saveBtn).toggleClass('btn-primary btn-success')
            //                 .text('Saved')
            //                 .attr('disabled', true);
            //         }
            //     }
                
                
            });
        }
    })
});

// Save article
$('#articleTable').on('click', '.saveBtn', function () {

    const articleId = $(this).attr('id');

    $(this).toggleClass('btn-primary btn-success')
        .text('Saved')
        .attr('disabled', true);

    $.ajax({
        type: 'PUT',
        url: '/save/' + articleId
    });
});

// Open notes modal on Notes button click
$('#articleTable').on('click', '.noteBtn', function () {

    $('#notesModal').modal({
        show: true,
        backdrop: 'static', // prevents closing by clicking out of modal
    });
});

// Hide modal on close button click
$('#modalCloseBtn').on('click', function () {

    $('#notesModal').modal('hide');
});
