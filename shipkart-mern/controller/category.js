const Category = require('../models/category');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.categoryById = (req,res,next,id) => {
    Category.findById(id).exec((err,category) => {
        if(err || !category){
            return res.status(400).json({error: "category not found"});
        }
        req.category = category;
        next();
    });
}

exports.read = (req,res) => {
    return res.status(200).json({'category': req.category});
}

exports.create = (req,res) => {
    const category  = new Category(req.body);
    category.save((err,data) => {
        if(err) return res.send.status(400).json({error: errorHandler(err)})
        else return res.send.status(200).json({data})
    })
}

exports.update = (req,res) => {
    const category  = req.category;
    category.name = req.body.name;
    category.save((err,data) => {
        if(err) return res.send.status(400).json({error: errorHandler(err)})
        else return res.send.status(200).json({data})
    })
}

exports.remove = (req,res) => {
    category = req.category;
    category.remove((err,deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.status(200).json({message:'Category deleted sucessfully.'})
    });
}

exports.list = (req,res) => {
    Category.find((err,list) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.status(200).json({data: list})
    })
}