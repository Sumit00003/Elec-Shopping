const express=require('express');
const { getalluser, createuser, updateusr, singleuser, deleteuser, loginUserControl, blockUser, unblockUser, handleRefreshToken ,logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishlist, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus, getAllOrders, removeProductFromCart, updateProductQuantityFromCart, getMyOrders, getMonthwiseOrderIncome, getYearlyTotalOrders, getSingleOrders, updateOrder } = require('../controller/usercontroller');
const { authMiddleware ,isAdmin } = require('../middlewares/authMiddleware');
const { checkout, paymentVerification } = require('../controller/paymentCtrl');
const router=express.Router();


router.delete('/delete-product-cart/:cartItemId',authMiddleware,removeProductFromCart)
router.delete('/emptycart',authMiddleware,emptyCart)
router.delete('/update-product-cart/:cartItemId/:newQuantity',authMiddleware,updateProductQuantityFromCart)
router.get("/refresh",handleRefreshToken);
router.get('/logout',logout)
router.get('/allusers',getalluser)
router.get('/cart',authMiddleware,getUserCart)
router.get('/getMonthWiseOrderIncome',authMiddleware,getMonthwiseOrderIncome)
// router.get('/getMonthWiseOrderCount',authMiddleware,getMonthwiseOrderCount)
router.get('/getYearlyOrders',authMiddleware,getYearlyTotalOrders)

router.get('/getmyorder',authMiddleware,getMyOrders)
router.get('/getallorders',authMiddleware,isAdmin,getAllOrders)
router.get('/getaOrder/:id',authMiddleware,isAdmin ,getSingleOrders)
// router.get('/getallorders',authMiddleware,isAdmin,getAllOrders)

router.post('/cart',authMiddleware,userCart)
router.post('/order/paymentVerification',authMiddleware, paymentVerification) 
router.post('/order/checkout',authMiddleware, checkout)             

// router.post('/cart/applycoupon',authMiddleware,applyCoupon)
router.post('/cart/create-order',authMiddleware,createOrder)


router.get('/get-wishlist',authMiddleware,getWishlist)
router.get('/:id',authMiddleware,isAdmin,singleuser)



router.post('/login',loginUserControl)
router.post('/admin-login',loginAdmin)
router.post('/register',createuser)

router.post('/forgot-password-token',forgotPasswordToken)

router.delete('/:id',deleteuser)
// router.delete('/',deleteuser)


router.put('/reset-password/:token',resetPassword)
router.put('/edit-user',authMiddleware,updateusr)
router.put('/save-addr',authMiddleware,saveAddress)
router.put('/password',authMiddleware,updatePassword)
router.put('/block-user/:id',authMiddleware,isAdmin,blockUser)
router.put('/unblock-user/:id',authMiddleware,isAdmin,unblockUser)
router.put('/updateorder/:id',authMiddleware,isAdmin,updateOrder)




module.exports=router