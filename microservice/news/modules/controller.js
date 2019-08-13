const User = require('./model');
const JWT = require('./jwt');
const request = require('request');
const cheerio = require('cheerio');

const getNews = async (req,res) => {
    try{
        console.log(req.param.emiten);

        let searchTerm = String(req.params.emiten) ;
        console.log(searchTerm);
        const searchUrl = 'https://www.google.com/search?q=' + searchTerm + '&tbm=nws';
        let savedData = [];

        request(searchUrl, function(err, response, html) {
            // First we'll check to make sure no errors occurred when making the request
            if (err) {
                return res.status(500).send(err);
            }
            var $ = cheerio.load(html);
            // For each outer div with class g, parse the desired data
            $('div.g').each(function(i, element) {
                var title = $(this).find('.r').text();
                var link = $(this).find('.r').find('a').attr('href').replace('/url?q=', '').split('&')[0];
                var text = $(this).find('.st').text();
                var img = $(this).find('img.th').attr('src');
                var date = $(this).find('span.f').text();

                savedData.push({
                    title: title,
                    link: link,
                    text: text,
                    img: img,
                    date: date,
                });
            });

            return res.status(200).json({error:false, message: savedData});
        });

    }catch (err) {
        return res.status(500).json({error:true, message:err.message});
    }

}


exports.getNews = getNews;


