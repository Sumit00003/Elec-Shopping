const express = require('express')
const { createBrand, UpdateBrand, DeleteBrand, GetBrand, GetallBrand } = require('../controller/brandctrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const { DeleteBlog } = require('../controller/blogcontroller')
const router = express.Router()

router.get('/:id',GetBrand)
router.get('/',GetallBrand)

router.post('/',authMiddleware,isAdmin,createBrand)

router.put('/:id',authMiddleware,isAdmin,UpdateBrand)

router.delete('/:id',authMiddleware,isAdmin,DeleteBrand)



module.exports = router
