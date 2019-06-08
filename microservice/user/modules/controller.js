const User = require('./model');

const getAllUser = async (req,res,nex) => {
    try{
        let result = await User.find({});
        return res.status(200).json({error:false, users: result})
    }catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

const registerUser = async (req,res,next) => {
    try{
        const { fullname } = req.body;
        let { email } = req.body;

        User.find({
            email: email
        },(err, previousUsers)=>{
            if(err){

                return res.status(500).json({error:true, message:err.message});

            }else if(previousUsers.length > 0){

                return res.status(200).json({error:true, message: 'email already exist.'})

            }

            const newUser = new User();
            newUser.email = email;
            newUser.fullname = fullname;

            newUser.save((err,user)=>{
                if(err){
                    return res.status(500).json({error:true, message:err.message});
                }

                return res.status(200).json({error: false, fullname: user.fullname, message: 'sign up success'});
            })

        })


    }catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

exports.getAllUser = getAllUser;
exports.registerUser = registerUser;