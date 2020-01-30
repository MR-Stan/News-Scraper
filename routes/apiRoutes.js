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
                    console.log(response.data);
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

                    db.Article.create(result)
                        .then(dbArticle => {
                            console.log(dbArticle);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
            }).catch(error => {
                console.log(error);
            })
        res.send('Scrape complete');
    });

    // Get all articles from db
    app.get("/display/scraped", (req, res) => {
        db.Article.find({}).sort('_id')
            .then(dbArticle => {
                console.log('Articles from db: ' + dbArticle);
                res.json(dbArticle);
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
    app.get('/display/saved', (req, res) => {
        db.Article.find({
            saved: true
        }).then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        });
    });
}