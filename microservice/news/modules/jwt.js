var jwt = require('jsonwebtoken');

const sign = (obj) => {
    return jwt.sign(obj, process.env.SECRET_TOKEN);
};

const verify = async (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).json({error: true, message:'Access denied'});
    }

    const authorization = req.headers.authorization.split(' ');
    const token = authorization[1];

    await jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
        if(err) {
            return res.status(403).json({error: true, err});
        }

        return next();
    });
};

exports.sign = sign;
exports.verify = verify;