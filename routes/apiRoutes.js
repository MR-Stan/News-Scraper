const axios = require('axios');

const cheerio = require('cheerio');

const db = require('../db');

module.exports = function (app) {

    axios.get('https://twitter.com/technews_today?lang=en')
        .then(function (response) {
            //console.log(response.data);
            const $ = cheerio.load(response.data);
            let results = [];
            $('.ProfileTweet').each(function (i, element) {
                results.push({
                    user: $(element).attr('data-screen-name'),
                    tweet_id: $(element).attr('data-tweet-id'),
                    tweet: $(element).find('.js-tweet-text').text()
                });
            });
            db.scraper.insert(results);
        })
        .catch(function (error) {
            console.log(error);
        })

    app.get("/all", function (req, res) {
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