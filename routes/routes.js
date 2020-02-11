const axios = require('axios');

const cheerio = require('cheerio');

const db = require('../models');

module.exports = app => {

    // Scrape web and add articles to db
    app.get('/scrape', (req, res) => {
        axios.get('https://www.npr.org/sections/technology/')
            .then(response => {

                const $ = cheerio.load(response.data);
                $('article.item').each(function (i, element) {

                    let result = {};

                    // article date
                    result.date = $(this)
                        .children('div.item-info-wrap')
                        .children('div.item-info')
                        .children('p.teaser')
                        .children('a')
                        .children('time')
                        .text()
                        .trim()
                        .slice(0, -1)
                        .trim();

                    // article headline
                    result.headline = $(this)
                        .children('div.item-info-wrap')
                        .children('div.item-info')
                        .children('h2')
                        .text();

                    // removing time from a element
                    $(this)
                        .children('div.item-info-wrap')
                        .children('div.item-info')
                        .children('p.teaser')
                        .children('a')
                        .children('time')
                        .remove();

                    // article summary
                    result.summary = $(this)
                        .children('div.item-info-wrap')
                        .children('div.item-info')
                        .children('p.teaser')
                        .children('a')
                        .text();

                    // article link
                    result.link = $(this)
                        .children('div.item-image')
                        .children('div.imagewrap')
                        .children('a')
                        .attr('href');

                    // article image
                    result.image = $(this)
                        .children('div.item-image')
                        .children('div.imagewrap')
                        .children('a')
                        .children('img')
                        .attr('src');

                    db.Article.findOne(result, function (err, res) {
                        db.Article.create(result)
                    }).catch(err => {
                        res.json(err);
                    })
                });
            })
    });

    // Get all articles from db
    app.get("/", (req, res) => {
        db.Article.find({}).sort('_id')
            .then(dbArticle => {
                res.render('index', {
                    articles: dbArticle
                });
            }).catch(err => {
                res.json(err);
            });
    });

    // Add saved article to db
    app.put('/save/:articleId', (req, res) => {
        db.Article.findByIdAndUpdate(req.params.articleId, {
            $set: {
                saved: true
            }
        }).then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        });
    });

    // Remove saved article from db
    app.put('/remove/:articleId', (req, res) => {
        db.Article.findByIdAndUpdate(req.params.articleId, {
            $set: {
                saved: false
            }
        }).then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        });
    });

    // Get all saved articles from db
    app.get('/saved', (req, res) => {
        db.Article.find({
            saved: true
        }).then(data => {
            res.render('saved', {
                articles: data
            });
        }).catch(err => {
            res.json(err);
        });
    });

    // Display article notes
    app.get('/notes/display/:articleId', function (req, res) {
        db.Article.findById(req.params.articleId)
            .then(data => {
                res.json(data.note);
            })
            .catch(err => {
                res.json(err);
            })
    });

    // Add note to article
    app.post('/notes/new/:articleId', function (req, res) {
        const note = JSON.stringify(req.body.body);
        console.log('-------' + note)
        db.Note.create(note)
            .then(dbNote => {
                console.log('------------------');
                console.log(dbNote);
                return db.Article.findOneAndUpdate({
                    _id: dbNote.id
                },
                    {
                        $push: {
                            note: note
                        }
                    }
                )
            })
            .then(data => {
                //console.log(data);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // Remove note from article
    app.delete('/notes/remove/:noteId', function (req, res) {
        db.Note.findByIdAndRemove(req.params.noteId, (err, note) => {
            if (err) console.log(err);
        });
    });

    // 404
    app.get('*', (req, res) => {
        res.render('404');
    });
}