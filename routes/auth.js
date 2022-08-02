const router = require('express').Router();
const express = require("express");
const fs = require('fs');
const {parse}=require('json2csv');
const csvtojson=require('csvtojson');
const csvfilepath = "coupon.csv"
const csv = require('fast-csv');
const http = require('http');
const upload = require('../middleware/upload')

csvtojson()
.fromFile(csvfilepath)
.then((json)=>{
    console.log(json)
    fs.writeFileSync("output.json",JSON.stringify(json),'utf-8',
    function(err){console.log(err);});
})





router.post('/export', async (req,res)=>{
    couponmangement.find({},{_id:0,createdAt:0,updatedAt:0,__v:0},(err,coupon)=>{
        console.log('coupons',coupon)
        const fields =['offer_name','coupon_name','start_date','end_date','discount_percentage','discount_amount','isactive,couponimage']
        const options ={fields}
        try {
            const csv=parse(coupon,options)
            fs.writeFile("coupon.csv",csv,(error)=>{
                if (error)throw error
                res.json({message:"data exported successfully"});

            })
            console.log('data export successfully')
            console.log(csv)
        } catch (error) {
            console.log(error)
            
        }
    })
})



const Authcontroller =require('../controller/Authcontroller')
const couponController = require('../controller/couponController')
const productcontroller = require('../controller/productcontroller')

//const upload = require('../middleware/upload');
const couponmangement = require('../models/couponmangement');
//const productcontroller=require('../models/productmodel');
const { json } = require('body-parser');
router.post('/register',Authcontroller.register)
router.post('/login',Authcontroller.login)

//router.post('/add',productcontroller.)
//router.put('/updates',productcontroller.updateProduct)
router.put('/update',couponController.update_coupon)
router.get('/find/:id',couponController.get_id)
router.delete('/delete',couponController.delete_id)
router.get('/search',couponController.searchcoupon)
module.exports= router 