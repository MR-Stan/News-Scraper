const axios = require('axios');

const cheerio = require('cheerio');

const db = require('../models');

module.exports = function (app) {
    app.get('scrape', function (req, res) {
        axios.get('https://www.npr.org/sections/technology/')
            .then(function (response) {
                const $ = cheerio.load(response.data);

                let results = [];
                $('article.item').each(function (i, element) {
                    // results.push({
                    //     headline
                    //     summary
                    //     url
                    //     additional information
                    //     user: $(element).attr('data-screen-name'),
                    //     tweet_id: $(element).attr('data-tweet-id'),
                    //     tweet: $(element).find('.js-tweet-text').text()
                    // });
                    console.log(element);
                });

            })
            .catch(function (error) {
                console.log(error);
            })
    });

    app.get("/", function (req, res) {
        db.scraper.find({}, function (error, found) {
            if (error) {
                console.log(error);
            }
            else {
                res.json(found);
            }
        });
    });


}