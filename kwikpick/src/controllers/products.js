const productModel = require('../models/product')
const PdfPrinter = require('pdfmake');
const fs = require('fs');
const mongoose= require('mongoose');

const saveProduct = async (req,res)=> {
    try {
        
        const {name,sku,hsn,quantity,rate,discount,cgst,sgst} = req.body

       const savedProduct = await productModel.create({name,sku,hsn,quantity,rate,discount,cgst,sgst})

       res.status(201).send({status:'SUCCESS',data:savedProduct})

    } catch (error) {
        res.status(500).send({error:error})
    }
}

const getProducts = async (req,res)=> {
    try {
        const products = await productModel.find().lean()

        res.status(200).send({status:'SUCCESS',data:products})
    } catch (error) {
        res.status.send({error:error})
    }
}


const getPdf = async (req,res) => {
    try {
        //const {productIds} = req.query
        
       // const ids= productIds.split(',')
        //console.log('type',typeof ids,ids)
         const products = await productModel.find().lean()
        //const products = await productModel.find({_id:{$in:ids}}).lean()
        //console.log('products',products)
        const columns =['#','LineItem Name','SKU','HSN/SAC','Qty','Rate','Discount','cgst %','cgst Amount','sgst %','sgst Amount','Amount']

        const data =products.map((obj,index)=> {
            const cgst= (obj.rate - obj.discount)*obj.cgst/100;
            const sgst = (obj.rate - obj.discount)*obj.sgst/100;
            const amount = obj.rate-obj.discount
          return  [index+1,obj.name,obj.sku,obj.hsn,obj.quantity+' pcs',obj.rate,obj.discount,obj.cgst+'%',cgst,obj.sgst+'%',sgst,amount]
        })

        const fonts = {
            Roboto: {
              normal: appRoot+'/fonts/Roboto-Regular.ttf'
            }
        }

        var docDefinition = {
            content: [ { 
                table: {
                    headerRows: 1,
                widths: [ 30, 50, 30, 30,30, 30, 30, 30,30, 30, 30, 30 ],
                    body: [columns,...data] }  ,
                
                   
        } ]    
        }
        
        console.log(docDefinition.content[0].table.body)
        
          
        const printer = new PdfPrinter(fonts);

        const pdfDoc = printer.createPdfKitDocument(docDefinition);

        pdfDoc.pipe(fs.createWriteStream('document.pdf'));
        pdfDoc.end();
        const file='./document.pdf'
        return res.download(file)
    } catch (error) {
        console.log(error)
        res.status(500).send({error:error})
    }
}


module.exports = {saveProduct,getProducts,getPdf}