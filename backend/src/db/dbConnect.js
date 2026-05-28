const mongoose = require("mongoose");

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is Connected ✅");
    } catch (error) {
        console.log("Database is not connected ❌", error);
    }

}

module.exports =  connectDB;