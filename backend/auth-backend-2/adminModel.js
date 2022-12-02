const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: [true, "Plese provide host Name"],
        unique: [true, "host Name Exists"]
    },
    adminId: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    }
})

module.exports = mongoose.model.admin || mongoose.model("admin",adminSchema);
