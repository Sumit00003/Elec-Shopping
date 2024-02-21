const fs = require("fs");
const asyncHandler = require("express-async-handler");
const {cloudinaryUploadImg , cloudinaryDeleteImg} = require('../utils/cloudinary');


const uploadImages = asyncHandler(async (req, res) => {
  try {
    //console.log(req.files);
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    //console.log(path);
    const urls = [];
    const files = req.files;
    //console.log(req.files);
    //console.log(files)
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      //console.log("1",newpath);
      urls.push(newpath);
      //fs.unlinkSync(path);
    }
    // console.log("url",file);

    const images = urls.map((file) => {
      //console.log(images)
      return file;
    });
    res.json(urls)
    //res.json(images);
  } catch (error) {
    //console.log(error)
    throw new Error(error);
  }
});
const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
