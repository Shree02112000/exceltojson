const express  = require('express');
const app =express()
const mongoose = require('mongoose')
const morgan   = require('morgan')
const bodyparser = require('body-parser')
const { Db } = require('mongodb')
const { connected } = require('process')
const path = require('path')
const authroute = require('./routes/auth')
const products= require('./models/productmodel')
const fs = require('fs');
const XLSX = require('xlsx');
const upload = require('./middleware/upload')


app.get('/product/export',(req,res)=>{
    // res.json({message:"mes"})
    let wb = XLSX.utils.book_new();
    products.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            let value= JSON.stringify(data);
            value=JSON.parse(value);
            let ws=XLSX.utils.json_to_sheet(value);
            let down =__dirname+'/discount/datasheet.xlsx'
            XLSX.utils.book_append_sheet(wb,ws,"discount");
            XLSX.writeFile(wb,down);
            res.download(down)
        }
    })
})

app.post('/', upload.single('xlsxfile'), (req, res) => {
    var workbook = XLSX.readFile(req.file.path);
    var sheetName = workbook.SheetNames;
    sheetName.forEach(async()=> {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName[0]]);
       
        const productExist = await products.find({});
        for (let i = 0; i < xlData.length; i++) {
            if (!xlData[i]._id) {
              await   products.create(xlData[i]) ;
                console.log(xlData[i],"No Id");
            } else {
                const productExist = await products.findById(xlData[i]._id) ;

                if (!(JSON.stringify(productExist) === JSON.stringify(xlData[i]))) {
                    await   products.updateOne({_id:xlData[i]._id},{$set:xlData[i]},{new:true});
                    console.log(xlData[i], "Not match");
                }
            }
        }
res.json(xlData)
});
});
mongoose.connect('mongodb://localhost:27017/registerdb',{useNewUrlParser:true , useUnifiedTopology:true})

const db = mongoose.connection
db.on('error',(err)=>{
        console.log(err)
})
db.once('open',()=>{
    console.log('database is connected')
})


app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use("/uploads", express.static( "uploads"));
const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})

app.use('/api',authroute)
