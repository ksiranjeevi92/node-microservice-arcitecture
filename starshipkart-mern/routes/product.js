const express = require('express');

const router = express.Router();

const {create,read,productById, remove, update,list,listCategories,listBySearch,photo} = require('../controller/product');
const {
    userById
} = require('../controller/user.js');

const {
    requireSignin,
    isAuth,
    isAdmin
} = require('../controller/auth.js');

router.get('/product/:productId',read)
router.get('/products',list)
router.delete('product/:productId/:userId',requireSignin,isAuth,isAdmin,remove);
router.put('product/:productId/:userId',requireSignin,isAuth,isAdmin,update);
router.post("/product/create/:userId",requireSignin,isAuth,isAdmin,create);
router.post("/product/by/search", listBySearch);
router.get('products/categories',listCategories)
router.get('products/photo/:productId',photo)

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;