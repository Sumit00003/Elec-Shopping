const express = require('express')
const { createproduct , getaproduct, getallproduct, updateProduct, deleteProduct, AddtoWishlist, rating  } = require('../controller/productcontroller')
const router = express.Router()
const {isAdmin , authMiddleware} = require('../middlewares/authMiddleware')

router.post('/',authMiddleware,isAdmin,createproduct)

router.put('/wishlist',authMiddleware,AddtoWishlist)
router.put('/rating',authMiddleware,rating)
router.put('/:id',authMiddleware,isAdmin,updateProduct)


router.get('/:id',getaproduct)
router.get('/',getallproduct)

router.delete('/:id',authMiddleware,isAdmin,deleteProduct)




module.exports = router