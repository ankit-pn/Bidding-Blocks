const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId:{
        type:String,
        required: [true,'Please provide userId']
    },
    productName:{
        type:String,
        required: [true,'Please provide itemId']
    },
    productDescription:{
        type:String,
        required: [true,'Please provide itemId']
    },
    basePrice:{
        type:Number,
        required: [true,"Please provide base price"]
    },
    auctionId:{
        type:String ,
        required: [true,"Please provide Data"],
    },
    totalBid:{
        type:Array,
        require:[true,"Please provide Data"],
    },
    soldDetails:{
        type:Object,
        required: [true,"Please provide soldDetails"],
    }
})

module.exports = mongoose.model.Products || mongoose.model('Products',productSchema);