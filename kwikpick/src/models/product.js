const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
name: String,
sku: String,
hsn:Number,
quantity: Number,
rate:Number,
discount: Number,
cgst:Number,
sgst:Number
},{timestamps:true})



module.exports = mongoose.model('Product',productSchema)