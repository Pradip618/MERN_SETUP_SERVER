const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginlogs = require('./loginlogs/loginlogController');

const secretKey = require('../../config/keys').secret;
const User = require('./userSchema');

let userController = {};

userController.getAllUser = async(req,res,next) =>{
    // var user1 = new User({name:'pradip', age:24, Description:'My First write to mongodb database'});
    // user1.save((err,result)=>{
    //     if(err){
    //         console.log('Something went wrong',err)
    //     }else{
    //         console.log(result,'result')
    //     }
    //});
    User.findById({_id:'5e09976a897bfd5bd95dae9d'},(err,result)=>{
        if(err){
            console.log(error,'error')
        }else{
            console.log(result,'result')
        }
    })
    res.json({from:User})
};

userController.registerUser = async(req,res,next) =>{
    console.log(req.body,'req')
    const {name,email,password} = req.body
    const user = User.findOne({email});
    if(user){
        const errors = {Email: 'Email Already Exists!'};
        return res.status(400).send({errors});
    } else{
        const hashedPassword = bcrypt.hashSync(password,5);
        await User.create({
            name,
            email,
            password:hashedPassword
        }, async(err,user) =>{
            if(err) return res.status(500).send('Something went wrong while registering user.')
            var token = jwt.sign({id:user._id}, secretKey, {expiresIn: 36678769780000})

            await loginlogs.addLoginLogs(req,token,next);
            token = `Bearer ${token}`;

            res.status(200).send({auth: true, token})
        })
    }
}

userController.getDetail = async(req,res,next) =>{
    var token = req.headers['x-access-token'];
    console.log(req.body.token,'header')
    if(!token) return res.status(401).send({auth:false, message:'No Token Provided'})

    jwt.verify(token, secretKey, (err,decoded) => {
        if(err) return res.status(500).send({auth:false, message:'Failed authenticate token'})
        res.status(200).send(decoded);
    })
}

module.exports = userController; 