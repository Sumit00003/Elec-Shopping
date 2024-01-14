const Coupon = require('../models/couponmodel')
const asynHandler = require("express-async-handler");
const validateMongoID = require('../utils/validatemongoid');

const createCoupon = asynHandler(async (req, res) => {
    try {
      const newCoupon = await Coupon.create(req.body);
      res.json(newCoupon);
    } catch (error) {
      throw new Error(error);
    }
});

const GetAllCoupons = asynHandler(async (req, res) => {
    try {
      const coupons = await Coupon.find();
      res.json(coupons);
    } catch (error) {
      throw new Error(error);
    }
});

const UpdateCoupon = asynHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoID(id);
    try {
      const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatecoupon);
    } catch (error) {
      throw new Error(error);
    }
});

const DeleteCoupon = asynHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoID(id);
    try {
      const deletecoupon = await Coupon.findByIdAndDelete(id);
      res.json(deletecoupon);
    } catch (error) {
      throw new Error(error);
    }
});

const GetaCoupon = asynHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoID(id);
    try {
      const getAcoupon = await Coupon.findById(id);
      res.json(getAcoupon);
    } catch (error) {
      throw new Error(error);
    }
  });




module.exports = { createCoupon , DeleteCoupon , UpdateCoupon , GetAllCoupons , GetaCoupon}