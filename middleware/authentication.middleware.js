const jwt = require('jsonwebtoken');
const loginLogs = require('../modules/user/loginlogs/loginlogSchema')
const secretKey = require('../config/keys').secret;
const middleware = {};

middleware.authorization = async (req,res,next) => {
    try{

        let token = req.body.token || req.headers['x-access-token'] || req.headers.token;
        if(token && token.length){
            token = token.replace('Bearer ','');
            const d = await jwt.verify(token,secretKey);

            let existingUser = await loginLogs.findOne({token,is_active:true});

            if(existingUser){
                return next();
            }else{
                res.status(401).send({auth:false,msg:'Session Expired'})
            }
        }
        return res.status(401).send({auth:false,message:' OOPS!! Token Not Found'})
    }
    catch(err){
        return next(err)
    }
};

module.exports = middleware;