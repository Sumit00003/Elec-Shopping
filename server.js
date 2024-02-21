//npm init
const express=require('express')
const dbConnect = require('./config/dbconection');
const Userrouter = require('./routes/UserRoute.js');
const productrouter = require('./routes/productRoute.js')
const blogRouter = require('./routes/blogroutes.js')
const categoryrouter = require('./routes/prodcategoryroute.js')
const blogcategoryrouter = require('./routes/blogCATroute.js')
const brandrouter = require('./routes/Brandroute.js')
const couponrouter = require('./routes/couponroute.js')
const colorrouter = require('./routes/colorRoute.js')
const enquiryrouter = require('./routes/enqRoute.js')
const uploadrouter = require('./routes/Uploadroute.js')
const bodyparser=require('body-parser')
const morgan=require('morgan');
const cookieParser = require('cookie-parser')
const { notFound, errorhandler } = require('./middlewares/errorhandler.js');
require('dotenv').config();
const cors = require("cors");
var app=express();

var port = process.env.PORT || 4000;
dbConnect();
app.use(morgan('dev'));
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
//app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

//app.use(express.json())
app.use('/api/user',Userrouter)
app.use('/api/product',productrouter)
app.use("/api/blog",blogRouter)
app.use("/api/category",categoryrouter)
app.use("/api/blogcategory",blogcategoryrouter)
app.use("/api/brand",brandrouter)
app.use("/api/coupon",couponrouter)
app.use('/api/color',colorrouter)
app.use('/api/enquiry',enquiryrouter)
app.use('/api/upload',uploadrouter)


//middleware should after route statement
app.use(notFound)
app.use(errorhandler)


app.listen(port,()=> {
    
    console.log(`Server is running on ${port}`)
});
