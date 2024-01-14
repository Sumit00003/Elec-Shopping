const Brand = require('../models/BrandModels')
const asyncHandler = require('express-async-handler')
const validateMongoID = require('../utils/validatemongoid')

const createBrand = asyncHandler ( async (req,res) => {
    try{
        const newBrand = await Brand.create(req.body);
        res.json(newBrand)
    }catch(error){
        throw new Error(error)
    }
})

const UpdateBrand = asyncHandler ( async (req,res) => {
    const { id } = req.params;
    validateMongoID(id);
    try{
        const updateBrand = await Brand.findByIdAndUpdate(id,req.body,{
            new : true,
        });
        res.json(updateBrand)
    }catch(error){
        throw new Error(error)
    }
})

const DeleteBrand = asyncHandler ( async (req,res) => {
    const { id } = req.params;
    validateMongoID(id);
    try{
        const deleteBrand = await Brand.findByIdAndDelete(id);
        res.json({
            message : "Brand Deleted Successfully"
        })
    }catch(error){
        throw new Error(error)
    }
})

const GetBrand = asyncHandler ( async (req,res) => {
    const { id } = req.params;
    validateMongoID(id);
    try{
        const getBrand = await Brand.findById(id);
        res.json(getBrand)
    }catch(error){
        throw new Error(error)
    }
})

const GetallBrand = asyncHandler ( async (req,res) => {
    try{
        const getallBrand = await Brand.find();
        res.json(getallBrand)
    }catch(error){
        throw new Error(error)
    }
})
module.exports = { createBrand , UpdateBrand , DeleteBrand , GetBrand , GetallBrand}