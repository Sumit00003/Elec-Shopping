const express = require('express')
const { createBlog, UpdateBlog, GetBlog, getAllBlogs, DeleteBlog, LikeBlog, DislikeBlog } = require('../controller/blogcontroller')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
//const { productImgResize, uploadPhoto } = require('../middlewares/uploadimages')
const router = express.Router()


router.put('/likes',authMiddleware,LikeBlog)
router.put('/dislikes',authMiddleware,DislikeBlog)
//router.put('/upload/:id',authMiddleware,isAdmin,uploadPhoto.array('image',10), productImgResize , uploadImages)

router.post('/',authMiddleware,isAdmin,createBlog)


router.put('/:id',authMiddleware,isAdmin,UpdateBlog)


router.delete('/:id',authMiddleware,isAdmin,DeleteBlog)


router.get('/:id',GetBlog)
router.get('/',getAllBlogs)




module.exports = router;