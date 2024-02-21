const Razorpay = require('razorpay')
const razorpay = require('razorpay')
const instance = new Razorpay({
    key_id:"rzp_test_RLYqmXcdjneUbB",key_secret:"KeRyUL3ufAKpplYpmiXVo1wz"
})

const checkout = async (req , res ) =>{
    const option = {
        amount: 5000,
        currency:"INR"
    }
    const order= await instance.orders.create(option)
    res.json({
        success : true , 
        order
    })
}

const paymentVerification = async (req , res ) =>{
    const {razorpayOrderId , raazorpayPaymentId} = req.body;
    res.json({
        razorpayOrderId , raazorpayPaymentId
    })
}

module.exports = {
    checkout , paymentVerification
}