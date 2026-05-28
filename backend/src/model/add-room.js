const mongoose = require("mongoose");

const addRoom = new mongoose.Schema({
    roomName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String
    },
    description:{
        type:String,
        required:true
    }
})

const addRooms = mongoose.model("Add-Room", addRoom);
module.exports = addRooms;