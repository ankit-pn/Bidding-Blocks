const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    auctionId:{
        type:String,
        required: [true,'Please provide userId']
    },
    auctionName:{
        type:String,
        required: [true,'Please provide itemId']
    },
    auctionDescription:{
        type:String,
        required: [true,'Please provide itemId']
    },
    productIds:{
        type:Array,
        require:[true,"Please provide Data"],
    },
    auctionHost:{
        type:String,
        require:[true,"Provide auctionHost"]
    }  ,
    startDate:{
        type:String,
        require:[true,'Please provide startDate']
    },
    endDate:{
        type:String,
        require:[true,'Please provide endDate']
    },
    approveStatus:{
        type:Boolean,
        require:[true,'Please Provide Approve Status']
    },
    Status:{
        type:"String",
        required:[true,'Please provide curr status']
    }

})

module.exports = mongoose.model.Auctions || mongoose.model('Auctions',auctionSchema);