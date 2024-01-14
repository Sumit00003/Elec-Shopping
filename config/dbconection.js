const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const dbConnect = () => {
    try{
        const conn = mongoose.connect(process.env.MONGO_CONNECT)
        console.log("connection established")
    }
    catch(error){
        console.log("ERROR Haiiiii")
    }
}
module.exports = dbConnect