const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect = async () => {
    await mongoose.connect(process.env.DB_URL);
    console.log('Successfully connected to MongoDB Atlas!');
};
dbConnect().catch(err => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.log(err)
});



module.exports = dbConnect;