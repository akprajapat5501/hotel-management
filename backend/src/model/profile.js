const mongoose = require("mongoose");

const profile = new mongoose.Schema({
image:{
    type:String,
},
firstName:{
    type:String,
    required:true
},
lastName:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
phone:{
    type:Number,
    required:true
},
country:{
    type:String,
    required:true
},
address:{
    type:String,
    required:true
},
})

const userProfile = mongoose.model("Profile", profile);

module.exports = userProfile;