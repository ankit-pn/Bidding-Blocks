const mongoose = require('mongoose');

const trancactionDetails = new mongoose.Schema({
    transactionHash:{
        type:String,
        required: [true,'Please provide itemId']
    },
    productId:{
        type:String,
        require:[true,"Please provide Data"],
    },
    productName:{
        type:String,
        require: [true,"Please provide it"]
    },
    auctionId:{
        type:String,
        require:[true,"Provide auctionHost"]
    }  ,
    soldTo:{
        type:String,
        require:[true,'Please provide startDate']
    },
    soldBy:{
        type:String,
        require:[true,'Please provide endDate']
    },
    soldAt:{
        type:Number,
        require:[true,'Please Provide Approve Status']
    }

})

module.exports = mongoose.model.transactionDetails || mongoose.model('transactionDetails',trancactionDetails);