const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        requried: [true, "Please Provide an Id"],
        unique: [true, "Id Exist"]
    },
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
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

