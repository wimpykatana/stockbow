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


exports.getAllUser = getAllUser;
exports.getUser = getUser;
exports.beginLogin = beginLogin;



