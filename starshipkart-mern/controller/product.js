const formidable = require('formidable');
const _ = require('lodash');

const Product = require('../models/product');
const errorHandler = require('../helpers/dbErrorHandler');
const { response } = require('express');

exports.productById = (req,res,next,id) => {
    Product.findById(id).exec((err,product) => {
        if(err || !product){
            return res.status(400).json({error: "Product not found"});
        }
        req.product = product;
        next();
    });
}

exports.read = (req,res) => {
    req.product.photo = undefined;
    return res.status(200).json({'product': req.product});
}

exports.create = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files) => {
        if(err) {
            return res.status(400).json({error: "Image not upload"})
        }
       const  {name, description,category,price, quantity, shipping} = fields;
       if(!name || !description || !category || !price && !quantity && !shipping){
        return res.status(400).json({error: "All fields are required"})
       }
        let product = new Product(fields);
        if(files.photo){
            if(file.photo.size > 1000000){
                return res.status(400).json({error: 'image file  should be less than 1mb in size'})
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type;
        }

        product.save((err,result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            return res.status(200).json({data:result})
        })
    })
}

exports.remove = (req,res) => {
    product = req.product;
    product.remove((err,deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.status(200).json({message:'Product deleted sucessfully.'})
    });
}

exports.update = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files) => {
        if(err) {
            return res.status(400).json({error: "Image not upload"})
        }
       const  {name, description,category,price, quantity, shipping} = fields;
       if(!name || !description || !category || !price && !quantity && !shipping){
        return res.status(400).json({error: "All fields are required"})
       }
        let product = req.product;
        product = _.extends(product,fields)
        if(files.photo){
            if(file.photo.size > 1000000){
                return res.status(400).json({error: 'image file  should be less than 1mb in size'})
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type;
        }

        product.save((err,result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            return res.status(200).json({data:result})
        })
    });
}

exports.list = (req,res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    Product.find({}).
    select('-photo')
    .populate('category')
    .limit(limit)
    .sort([[sortBy, order]])
    .exec((err,product) => {
        if(err){
            return res.status(400).json({'error': 'Product not found'});
        }
        res.send(product);
    });

}

exports.listCategories = (req,res) => {
    Product.distinct('category', (err,{},categories) => {
        if(err){
            return res.status(400).json({'error': "product not found"});
        }
        return res.json(categories);
    })
}

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.photo = (req,res,next) => {
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}