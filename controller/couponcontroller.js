const { query } = require("express");
const couponmangement = require("../models/couponmangement");

const create_coupon = async (req, res, next) => {
  try {
       let coupon = new couponmangement({
       offer_name: req.body.offer_name,
      coupon_name: req.body.coupon_name,
       start_date: req.body.start_date,
       end_date: req.body.end_date,
       discount_Percentage: req.body.discount_Percentage,
       discount_amount: req.body.discount_amount,
       isactive: req.body.isactive,
     });
     await coupon.save();
    console.log("KKKKKKKKK")
    res.json({
      message: "Uploaded successfully",
    });
  } catch (error) {
    console.log("ERRRRR",error);
    res.json({
      message: error?.message || "Something went wrong",
    });
  }
};

const update_coupon = async (req, res, next) => {
  try {
    let couponid = req.body.couponid;
    let update_coupon = {
      offer_name: req.body.offer_name,
      coupon_name: req.body.coupon_name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      discount_Percentage: req.body.discount_Percentage,
      discount_amount: req.body.discount_amount,
      isactive: req.body.isactive,
    };
    await couponmangement.findByIdAndUpdate(couponid, { $set: update_coupon });

    res.json({
      message: "coupon updated",
    });
  } catch (error) {
    res.json({
      message: "error",
    });
  }
};

const get_id = async (req, res, next) => {
  try {
    var byid = {
      _id: req.params.id,
    };
    let get = await couponmangement.findById(byid);
    res.json({ get });
  } catch (error) {
    res.json({
      message: "error",
    });
  }
};
const delete_id = async (req, res, next) => {
  try {
    let couponid = req.body.couponid;
    couponmangement.findByIdAndDelete(couponid);
    res.json({
      message: "coupon deleted successfully",
    });
  } catch (error) {
    res.json({
      message: "error",
    });
  }
};

const searchcoupon = async (req, res, next) => {
  try{ 
    const { search, isactive, page, limit} = req.query;
  let paramSearch = {};
  if (search) {
    paramSearch.$or = [
      {
        offer_name: {
          $regex: search,
          $options: "i"
        },
      },
      {
        coupon_name: {
          $regex: search,
          $options: "i"
        },
      },
    ];
  }
  if (req.query.hasOwnProperty(isactive)) paramSearch.isactive = isactive;
  let response = await couponmangement.find(paramSearch)
      .skip(limit * page - 1)
      .limit(limit);
    let total = await couponmangement.countDocuments();
    let pageMeta = {
      page: parseInt(page),
      limit: parseInt(limit),
      totalPage: Math.ceil(total / limit),
      total: parseInt(total),
    };
  return res.send({data:response,pageMeta,message:"success"});
} catch(err){
  
}
};
module.exports = {
  create_coupon,
  update_coupon,
  get_id,
  delete_id,
  searchcoupon,
};