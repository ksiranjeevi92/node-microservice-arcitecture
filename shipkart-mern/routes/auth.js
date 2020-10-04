const express = require('express');

const router = express.Router();

const {signup,signin,signout, requireSignin} = require('../controller/auth.js');
const{userSignUpvalidator} = require('../validators/index');

router.post("/signup", userSignUpvalidator ,signup);
router.post("/signin",signin);
router.get("/signout",signout);

router.get("/hello",requireSignin,(req,res) => res.send("hello"));


module.exports = router;