// display scraped articles when page loads
$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: '/display/saved'
    }).then(response => {

        for (let i = 0; i < response.length; i++) {

            // creating save button for each article
            const saveBtn = $('<button type="button">')
                .addClass('btn')
                .addClass('btn-primary')
                .addClass('removeBtn')
                .text('Remove Saved Article')
                .attr('id', response[i]._id);

            // adding results to article table
            $('#savedTable')
                .append('<tr/')
                .append('<td>' + response[i].date + '</td>')
                .append('<td>' + response[i].headline + '</td>')
                .append('<td>' + response[i].summary + '</td>')
                .append('<td>' + response[i].link + '</td>')
                .append(saveBtn);
        }
    });
});

// Remove saved article
$('#savedTable').on('click', '.removeBtn', function () {

    const articleId = $(this).attr('id');
    // console.log(articleId);

    $.ajax({
        type: 'PUT',
        url: '/remove/' + articleId
    }).then(response => {
        // console.log(JSON.stringify(response));
        // location.reload();
    });
});