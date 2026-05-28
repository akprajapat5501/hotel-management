const mongoose = require("mongoose");

const Bookings = new mongoose.Schema({
    roomName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    guest:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending", "Confirmed", "Rejected"],
        default:"Pending"
    }
})

const Book = mongoose.model("Booking", Bookings);
module.exports = Book;