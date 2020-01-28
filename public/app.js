$('#scrapeBtn').on('click', _ => {
    $.ajax({
        type: 'GET',
        url: '/articles'
    }).then(response => {
        
        for (let i = 0; i < response.length; i++) {

            const date = response[i].date;
            const headline = response[i].headline;
            const summary = response[i].summary;
            const link = response[i].link;

            // creating save button for each article
            const saveBtn = $('<button>')
                .addClass('saveBtn')
                .text('Save Article')
                .attr('id', response._id);
        }
    });
});