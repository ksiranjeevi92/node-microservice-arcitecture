const User = require('../models/user');
const jwt =  require('jsonwebtoken');
const expressJwt = require('express-jwt');
const {errorHandler} = require('../helpers/dbErrorHandler');


exports.signup = (req,res) => {
    const user  = new User(req.body);
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        })
    });
}

exports.signin = (req,res) => {
    const {email,password}  = req.body;
    User.findOne({email}, (err,user) => {
        if(err || !user){
            return res.
            status(400).json({err: "not exist"})
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                err: 'Email and Password not matched'
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        //persist the toekn in cookie with expiry date
        res.cookie('t', token, {expiry: new Date() + 999})

        const {_id,name,email,role} = user;
        return res.json({token,user: {_id,email,name,role}})
    });
};
exports.signout = (req,res) => {
    console.log(req.cookie);
    res.clearCookie("t");
    res.json({"message": "Signout"})
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth',
});

exports.isAuth = (req,res,next) => {
    console.log('auth',req.auth)
    let user =  req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        return res.status(403).json({
            error: "Access Denied"
        });
    }
    next();
};

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "Admin resourse! Access denied"
        });
    }
    next();
}