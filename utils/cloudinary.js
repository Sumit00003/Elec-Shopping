const cloudinary = require("cloudinary").v2;
require('dotenv').config();
//console.log(process.env.CLOUD_NAME , process.env.API_KEY ,process.env.SECRET_KEY );
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const cloudinaryUploadImg = async (fileToUploads) => {
  console.log(fileToUploads);
  const options = {
    resource_type : "auto"
  }  
  //options.resource_type = "auto"

    const image = await cloudinary.uploader.upload(fileToUploads.tempFilePath, options)
    console.log(image);
  
  // return new Promise((resolve) => {
  //   cloudinary.uploader.upload(fileToUploads, (result) => {
  //     console.log(result);
  //     resolve(
  //       {
  //         url: result.secure_url,
  //         asset_id: result.asset_id,
  //         public_id: result.public_id,
  //       },
  //       {
  //         resource_type: "auto",
  //       }
  //     );
  //   });
  // });
};
const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
