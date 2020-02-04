// display scraped articles when page loads
$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: '/display/saved'
    }).then(response => {

        for (let i = 0; i < response.length; i++) {

            // creating save button for each article
            const removeBtn = $('<button type="button">')
                .addClass('btn')
                .addClass('btn-danger')
                .addClass('removeBtn')
                .text('Remove Article')
                .attr('id', response[i]._id);

            // adding results to article table
            $('#savedTable')
                .append('<tr/')
                .append('<td>' + response[i].date + '</td>')
                .append('<td>' + response[i].headline + '</td>')
                .append('<td>' + response[i].summary + '</td>')
                .append('<td>' + response[i].link + '</td>')
                .append(removeBtn);
        }
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