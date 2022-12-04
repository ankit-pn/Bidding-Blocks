const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please Provide an Id"],
        unique: [true, "Id Exist"]
    },
    name: {
        type: String,
        required: [true, "Please provide an Name!"],
        // unique: [true, "Email Exist"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
    productIds:{
        type: Array
    },
    auctionIds:{
        type: Array
    }
})

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);

