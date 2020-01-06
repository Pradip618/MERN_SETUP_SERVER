const LoginLog = require('./loginlogSchema');
const jwt = require('jsonwebtoken');
const secretKey = require('../../../config/keys').secret;
const log = {};

log.addLoginLogs = async(req,token,next) =>{
    try{
        let jwtPayload = await jwt.verify(token,secretKey);
        let expires_in = new Date(jwtPayload.exp * 1000);
        let user_id = jwtPayload.id;
        const newLog = new LoginLog({user_id, token});
        return newLog.save()
    }
    catch(err){
        next(err);
    }
};

module.exports = log;