const Blog = require('../models/blogmodel')
const User = require('../models/employeemodel')
const asyncHandler = require('express-async-handler')
const validateMongoID = require('../utils/validatemongoid')
const cloudinaryUploadImg = require('../utils/cloudinary')


const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json(newBlog)
    } catch (error) {
        throw new Error(error);
    }

})

const UpdateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoID(id)
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateBlog)
    } catch (error) {
        throw new Error(error);
    }
})

const GetBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoID(id)
    try {
        const getBlog = await Blog.findById(id).populate('likes').populate('dislikes');
        const updateViews = await Blog.findByIdAndUpdate(id,
            {
                $inc: { numViews: 1 },
            },
            {
                new: true,
            });
        res.json(getBlog)
    } catch (error) {
        throw new Error(error);
    }
});

const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        const getBlog = await Blog.find();
        res.json(getBlog)
    } catch (error) {
        throw new Error(error);
    }

})

const DeleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoID(id)
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json({
            message: "Successfully Deleted"
        })
    } catch (error) {
        throw new Error(error);
    }
})

const LikeBlog = asyncHandler(async (req, res) => {
    const { blogid } = req.body;
    console.log(blogid);
    validateMongoID(blogid)

    //find the blog which you want to be liked
    const blog = await Blog.findById(blogid);
    //find the login user
    const loginUserId = req?.user._id;
    //find if User has liked the blog
    const isliked = blog?.isLiked;
    //find if user disliked the blog
    const alreadydisliked = blog?.dislikes?.find(
        ((userId) => userId.toString() === loginUserId.toString()));
    if (alreadydisliked) {
        const blog = await Blog.findByIdAndUpdate(blogid, {
            $pull: { dislikes: loginUserId },
            isDisliked: false
        }, {
            new: true,
        })
        res.json(blog)
    }
    if (isliked) {
        const blog = await Blog.findByIdAndUpdate(blogid, {
            $pull: { likes: loginUserId },
            isLiked: false
        }, {
            new: true,
        })
        res.json(blog)

    }
    else {
        const blog = await Blog.findByIdAndUpdate(blogid, {
            $push: { likes: loginUserId },
            isLiked: true,
        }, {
            new: true,
        })
        res.json(blog)

    }


})

const DislikeBlog = asyncHandler(async (req, res) => {
    const { blogid } = req.body;
    console.log(blogid);
    validateMongoID(blogid)

    //find the blog which you want to be liked
    const blog = await Blog.findById(blogid);
    //find the login user
    const loginUserId = req?.user._id;
    //find if User has liked the blog
    const isDisliked = blog?.isDisliked;
    //find if user disliked the blog
    const alreadyliked = blog?.likes?.find(
        ((userId) => userId.toString() === loginUserId.toString())
    );
    if (alreadyliked) {
        const blog = await Blog.findByIdAndUpdate(blogid, {
            $pull: { likes: loginUserId },
            isLiked: false
        }, {
            new: true,
        })
        res.json(blog)
    }
    if (isDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogid, {
            $pull: { dislikes: loginUserId },
            isDisliked: false,
        }, {
            new: true,
        })
        res.json(blog)
    } else {
        const blog = await Blog.findByIdAndUpdate(blogid, {
            $push: { dislikes: loginUserId },
            isDisliked: true,
        }, {
            new: true,
        })
        res.json(blog)
    }
})

// const uploadImages = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     validateMongoID(id);
//     try {
//       const uploader = (path) => cloudinaryUploadImg(path, "images");
//       const urls = [];
//       const files = req.files;
//       for (const file of files) {
//         const { path } = file;
//         const newpath = await uploader(path);
//         console.log(newpath);
//         urls.push(newpath);
//         fs.unlinkSync(path);
//       }
//       const findBlog = await Blog.findByIdAndUpdate(
//         id,
//         {
//           images: urls.map((file) => {
//             return file;
//           }),
//         },
//         {
//           new: true,
//         }
//       );
//       res.json(findBlog);
//     } catch (error) {
//       throw new Error(error);
//     }
//   });
  


module.exports = { createBlog, UpdateBlog, GetBlog, getAllBlogs, DeleteBlog, LikeBlog, DislikeBlog }