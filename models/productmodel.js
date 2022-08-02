const mongoose = require('mongoose')
const stringify = require('stringify')
const Schema = mongoose.Schema

const productSchema = new Schema({

    Product:{
       type:String
    },
    Productcode:{
       type:String,
       unique:true
    },
    Productprice:{
        type:String
    },
    available:{
        type:Boolean
    },
    weight:{
        type:String
    },
    quantity:{
        type:String
    }
},{timestamps:true})


const productmodel= mongoose.model('productmodel',productSchema)

module.exports=productmodel
