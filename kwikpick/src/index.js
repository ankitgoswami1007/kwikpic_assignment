const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
global.appRoot = path.resolve(__dirname)
const productRouter = require('./router/route')

const cors = require('cors');
const app = express()

app.use(cors({
  origin: 'http://localhost:3000'
})
);


app.use(express.json())
app.use('/api/v1/',productRouter)


mongoose.connect("mongodb+srv://Murlidhar1999:O4n7QkIgSx4LYyAG@cluster0.vghet.mongodb.net/group63Database", {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))




app.listen(7000,()=>console.log('app is runing on port 7000'))