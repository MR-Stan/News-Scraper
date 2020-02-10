module.exports = app => {

    // displays scraped articles
    app.get('/', (req, res) => {
        res.render('index');
    });

    // displays saved articles
    app.get('/saved', (req, res) => {
        res.render('saved');
    });

    // 404
    app.get('*', (req, res) => {
        res.render('404');
    });
}