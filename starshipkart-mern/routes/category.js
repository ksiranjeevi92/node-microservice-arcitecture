const express = require('express');

const router = express.Router();

const {create,categoryById,read,update,remove,list} = require('../controller/category.js');
const {
    userById
} = require('../controller/user.js');

const {
    requireSignin,
    isAuth,
    isAdmin
} = require('../controller/auth.js');

router.post("/category/create",requireSignin,isAuth,isAdmin,create);
router.get("/category/:categoryId",read);
router.get("/categories",list);
router.put("/category/:categoryId/:userId",requireSignin,isAuth,isAdmin,update);
router.delete("/category/:categoryId/:userId",requireSignin,isAuth,isAdmin,remove);

router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;