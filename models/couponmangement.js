const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const couponSchema = new Schema({
offer_name:{
         type:String,
        
},
coupon_name:{
        type:String,


},
start_date:{
        type:String

},
end_date:{
        type:String
},
discount_percentage:{
        type:String
},
discount_amount:{
       type:String
},
isactive:{
        type:Boolean
},
couponimage:{
        type:String,
        
},
xlsxfile:{
        
        type:String,
}   
},{timestamps:true})

couponSchema.plugin(mongoosePaginate)

const couponmangement= mongoose.model('couponmangment',couponSchema)

module.exports=couponmangement
