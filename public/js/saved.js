// Remove saved article
$('.removeBtn').on('click', function () {

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