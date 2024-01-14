const mongoose = require('mongoose')

const validateMongoID = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error("This id is not Valid or not Found")
};
module.exports = validateMongoID;