const User = require('./model');
const JWT = require('./jwt');

const getAllUser = async (req,res) => {
    try{
        let result = await User.find({});
        return res.status(200).json({error:false, users: result})
    }catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
};

const BeginLogin = async (req,res) => {
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
                return res.status(200).json({error:false, isLogin:true, token: token, idUser:login._id})
            })
            .catch((err)=>{
                return res.status(500).json({error:true, message: err.message});
            })
        }
        if(user){
            await User.findOneAndUpdate({email:email},{
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
                return res.status(200).json({error:false, isLogin:true, token: token, idUser:login._id})
            })
            .catch((err)=>{
                return res.status(500).json({error:true, message: err.message});
            })

        }

    }catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
};

exports.getAllUser = getAllUser;
exports.BeginLogin = BeginLogin;


