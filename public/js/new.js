// display scraped articles when page loads
$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: '/scrape',
        success: function () {

            $.ajax({
                type: 'GET',
                url: '/display/scraped'
            }).then(response => {

                for (let i = 0; i < response.length; i++) {

                    // creating save button for each article
                    const saveBtn = $('<button type="button">')
                        .addClass('btn')
                        .addClass('btn-primary')
                        .addClass('saveBtn')
                        .text('Save Article')
                        .attr('id', response[i]._id);

                    // adding results to article table
                    $('#articleTable')
                        .append('<tr/')
                        .append('<td>' + response[i].date + '</td>')
                        .append('<td>' + response[i].headline + '</td>')
                        .append('<td>' + response[i].summary + '</td>')
                        .append('<td>' + response[i].link + '</td>')
                        .append(saveBtn);

                    if (response[i].saved) {
                        $(saveBtn).toggleClass('btn-primary btn-success')
                            .text('Saved')
                            .attr('disabled', true);
                    }
                }
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


