const Product = require('../models/productmodel')
const User  = require('../models/employeemodel')
const asynchandler = require('express-async-handler')
const slugify = require('slugify')
const validateMongoID = require('../utils/validatemongoid')
//const validateMongoID = require('../utils/validatemongoid')

//Create Product
const createproduct = asynchandler(async(req,res) => {
try{
    if (req.body.title){
        req.body.slug = slugify(req.body.title)
    }
    const newProduct =  await Product.create(req.body)
    res.json(newProduct)
}catch (error){
    throw new Error(error);
}
})

//get a product
const getaproduct = asynchandler(async(req,res) => {
    const { id } = req.params;
    validateMongoID(id);
    try{
        const findProduct = await Product.findById(id).populate("color");
        res.json(findProduct)

    }catch(error){
        throw new Error(error)   
     }

})

//get all product & filtering

const getallproduct = asynchandler(async (req,res) => {
    try{
        //Filtering
        const queryObj = {...req.query};
        const excludeFeilds = ['page','sort','limit','fields']
        excludeFeilds.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , (match) => `$${match}`);

        let query = Product.find(JSON.parse(queryStr))

        //sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        }else{
            query = query.sort("-createdAt")
        }

        //limiting the fields
        if(req.query.fields){
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        }else{
            //query = query.select("__v")
        }

        //pagination

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page){
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error("This page does not Exist..!!!")

        }

        const products = await query; 
        //const getproducts = await Product.find({brand : req.query.brand,category: req.query.category, });
        res.json(products);
    }catch(error){
        throw new Error(error);
    }
})

//updating product

const updateProduct = asynchandler(async(req,res) =>{
    const id = req.params;
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        
        const updateproduct = await Product.findOneAndUpdate({id}, req.body , {
            new:true,
        });
        res.json(updateproduct)
    }catch(error){
        throw new Error(error)
    }
})


//deleting a product
const deleteProduct = asynchandler(async(req,res) =>{
    const { id } = req.params;
    try{
        const deleteproduct = await Product.findByIdAndDelete(id);
        res.json({
            message :"Product is deletd",
        })
    }catch(error){
        throw new Error(error)
    }
})



const AddtoWishlist = asynchandler(async(req,res) =>{
    const {_id} = req.user;
    const {prodId} = req.body;
    try{
        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId.toString())
        if(alreadyAdded){
            let user = await User.findByIdAndUpdate(_id , {
                $pull : { wishlist : prodId },
            },{
                new : true,
            });
            res.json(user)
        }else{
            let user = await User.findByIdAndUpdate(_id , {
                $push : { wishlist : prodId },
            },{
                new : true,
            });
            res.json(user)
        }
    }catch(error){
        throw new Error(error)
    }
})

const rating = asynchandler ( async (req,res ) => {
    const {_id} = req.user;
    const {star , prodId , comment} = req.body;
    try{

        const product = await Product.findById(prodId);
    const alreadyrated = product.ratings.find(
        (userId) => userId.postedby.toString() === _id.toString());
        if(alreadyrated){
            const updateRating = await Product.updateOne({
                ratings : {$elemMatch : alreadyrated}
            },{
                $set : { "ratings.$.star": star , "ratings.$.comment": comment},
            },{
                new : true,
            })
            //res.json(updateRating)
        }
        else{
            const rateProduct = await Product.findByIdAndUpdate(prodId, {
                $push : {
                    ratings:{
                        star : star,
                        comment : comment,
                        postedby: _id,
                    }
                }
            },{
                new:true,
            })
            //res.json(rateProduct)
        }
        const getallratings = await Product.findById(prodId);
        let totalrating = getallratings.ratings.length;
        let ratingsum = getallratings.ratings.map((item) => item.star).reduce((prev , curr) => prev + curr , 0)//map func will pass an Array and reduce will give sum of that Array
        let Actualrating = Math.round(ratingsum / totalrating)
        let finalproduct = await Product.findByIdAndUpdate(prodId , {
            totalrating : Actualrating
        },{
            new : true,
        })
        res.json(finalproduct)
    }catch(error){
        throw new Error(error)
    }
})


  

module.exports = {createproduct , getaproduct , getallproduct , updateProduct , deleteProduct , AddtoWishlist , rating}