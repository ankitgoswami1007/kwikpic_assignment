const express = require('express')
const router = express.Router()
const products = require('../controllers/products')


router.post('/products',products.saveProduct)
router.get('/products',products.getProducts)
router.get('/pdf',products.getPdf)

module.exports=router