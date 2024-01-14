const express=require('express');
const { getalluser, createuser, updateusr, singleuser, deleteuser, loginUserControl, blockUser, unblockUser, handleRefreshToken ,logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishlist, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus } = require('../controller/usercontroller');
const { authMiddleware ,isAdmin } = require('../middlewares/authMiddleware');
const router=express.Router();


router.delete('/emptycart',authMiddleware,emptyCart)
router.get("/refresh",handleRefreshToken);
router.get('/logout',logout)
router.get('/users',getalluser)
router.get('/cart',authMiddleware,getUserCart)
router.get('/getOrder',authMiddleware,getOrders)

router.post('/addcart',authMiddleware,userCart)
router.post('/cart/applycoupon',authMiddleware,applyCoupon)
router.post('/cart/createOrder',authMiddleware,createOrder)

router.get('/wishlist',authMiddleware,getWishlist)
router.get('/:id',authMiddleware,isAdmin,singleuser)



router.post('/login',loginUserControl)
router.post('/admin',loginAdmin)
router.post('/register',createuser)

router.post('/forgot-password-token',forgotPasswordToken)

router.delete('/:id',deleteuser)


router.put('/reset-password/:token',resetPassword)
router.put('/edit-user',authMiddleware,updateusr)
router.put('/save-addr',authMiddleware,saveAddress)
router.put('/password',authMiddleware,updatePassword)
router.put('/block-user/:id',authMiddleware,isAdmin,blockUser)
router.put('/unblock-user/:id',authMiddleware,isAdmin,unblockUser)
router.put('/order/update-order/:id',authMiddleware,isAdmin,updateOrderStatus)



module.exports=router