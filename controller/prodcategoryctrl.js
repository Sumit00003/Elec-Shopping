const Category = require('../models/prodcategorymodel')
const asyncHandler = require('express-async-handler')
const validateMongoID = require('../utils/validatemongoid')

const createCategory = asyncHandler ( async (req,res) => {
    try{
        const newCategory = await Category.create(req.body);
        res.json(newCategory)
    }catch(error){
        throw new Error(error)
    }
})

const UpdateCategory = asyncHandler ( async (req,res) => {
    const { id } = req.params;
    validateMongoID(id);
    try{
        const updateCategory = await Category.findByIdAndUpdate(id,req.body,{
            new : true,
        });
        res.json(updateCategory)
    }catch(error){
        throw new Error(error)
    }
})

const DeleteCategory = asyncHandler ( async (req,res) => {
    const { id } = req.params;
    validateMongoID(id);
    try{
        const deleteCategory = await Category.findByIdAndDelete(id);
        res.json({
            message : "Category Deleted Successfully"
        })
    }catch(error){
        throw new Error(error)
    }
})

const GetCategory = asyncHandler ( async (req,res) => {
    const { id } = req.params;
    validateMongoID(id);
    try{
        const getCategory = await Category.findById(id);
        res.json(getCategory)
    }catch(error){
        throw new Error(error)
    }
})

const GetallCategory = asyncHandler ( async (req,res) => {
    try{
        const getallCategory = await Category.find();
        res.json(getallCategory)
    }catch(error){
        throw new Error(error)
    }
})
module.exports = { createCategory , UpdateCategory , DeleteCategory , GetCategory , GetallCategory}