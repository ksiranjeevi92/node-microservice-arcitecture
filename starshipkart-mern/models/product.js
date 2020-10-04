const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    sold:{
        type: Number,
        default: 0
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number
    },
    photo: {
        type: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean,
        required: false
    }
},{timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);