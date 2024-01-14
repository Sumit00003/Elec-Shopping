const express = require('express')
const { createCategory, UpdateCategory, DeleteCategory, GetCategory, GetallCategory } = require('../controller/prodcategoryctrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const { DeleteBlog } = require('../controller/blogcontroller')
const router = express.Router()

router.get('/:id',GetCategory)
router.get('/',GetallCategory)

router.post('/',authMiddleware,isAdmin,createCategory)

router.put('/:id',authMiddleware,isAdmin,UpdateCategory)

router.delete('/:id',authMiddleware,isAdmin,DeleteCategory)



module.exports = router