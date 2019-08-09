const User = require('./model');
const JWT = require('./jwt');
const request = require('request');
const cheerio = require('cheerio');

const getAllUser = async (req,res) => {
    try{
        let result = await User.find({});
        return res.status(200).json({error:false, users: result})
    }catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
};

const beginLogin = async (req,res) => {
    try{
        let { fullname } = req.body;
        let { email } = req.body;
        let { token } = req.body;
        let { provider_pic } = req.body;
        let { provider_id } = req.body;
        let { provider } = req.body;

        let user = await User.findOne({email: email});

        if(!user) {
            await User.create({
                email: email,
                fullname: fullname,
                token: token,
                user_pic: provider_pic,
                provider_id: provider_id,
                provider: provider,
                lastLoginDate: Date.now()
            })
            .then( async () => {
                const login = await User.findOne({email: email, isDeleted:false });

                let obj = {
                    _id: login._id,
                    token: login.token
                };

                const token = JWT.sign(obj);
                return res.status(200).json({error:false, isLogin:true, token: token, id: login._id })
            })
            .catch((err)=>{
                return res.status(500).json({error:true, message: err.message});
            })
        }
        if(user){
            await User.findOneAndUpdate({email:email, isDeleted:false },{
                $set:{
                    email: email,
                    fullname: fullname,
                    token: token,
                    user_pic: provider_pic,
                    provider_id: provider_id,
                    provider: provider,
                    lastLoginDate: Date.now()
                }
            })
            .then(async () => {
                const login = await User.findOne({email: email, isDeleted:false });

                let obj = {
                    _id: login._id,
                    token: login.token
                };

                const token = JWT.sign(obj);
                return res.status(200).json({error:false, isLogin:true, token: token, id: login._id })
            })
            .catch((err)=>{
                return res.status(500).json({error:true, message: err.message, token:"DELETED"});
            })

        }

    }catch(err){

        return res.status(500).json({error:true, message:err.message});
    }
};

const getUser = async (req,res) =>{
    try {
        const id = String(req.params.id);
        let user = await User.findById(id,{ "token":0 });
        return res.status(200).json({error:false, message: user});

    }catch (err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

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

exports.getAllUser = getAllUser;
exports.getUser = getUser;
exports.beginLogin = beginLogin;
exports.getNews = getNews;


