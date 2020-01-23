const axios = require('axios');

const cheerio = require('cheerio');

const db = require('../models');

module.exports = function (app) {

    // Scrape web and add articles to db
    app.get('/scrape', function (req, res) {
        axios.get('https://www.npr.org/sections/technology/')
            .then(function (response) {
                const $ = cheerio.load(response.data);
                $('article.item').each(function (i, element) {
                    let result = {};
                    // result.headline = $(this)
                    //     .children('whatever element')
                    //     .text();
                    // result.summary = $(this)
                    //     .children()
                    //     .text()
                    result.link = $(this)
                        .children('div.item-image')
                        .children('div.imagewrap')
                        .children('a')
                        .attr('href')

                    // db.Article.create(result)
                    //     .then(function (dbArticle) {
                    //         console.log(dbArticle);
                    //     })
                    //     .catch(function (err) {
                    //         console.log(err);
                    //     });
                });
            })
            .catch(function (error) {
                console.log(error);
            })
        res.send('Scrape complete');
    });

    // Get all articles from db
    app.get("/articles", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });


}