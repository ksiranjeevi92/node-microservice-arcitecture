const User = require('../models/user');
const jwt =  require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.userById = (req,res,next,id) => {
   User.findById(id).exec((err,user) => {
       if(err || !user){
          return res.status(400).send({err: "bad"})
       }
       req.profile = user
       next();
   });

};

exports.read = (req,res) => {
   req.hashed_password = undefined;
   req.salt = undefined;
   return res.status(200).json({data: req.profile}); 
};


exports.update = (req,res) => {
   User.findOneAndUpdate({_id: req.profile._id},{$set: req.body},{new: true},
      (err,user) => {
      if(err){
         res.status(400).json({error: 'error'});
      }
      req.hashed_password = undefined;
      req.salt = undefined;
      res.status(200).json({"user": user})
   })
};

