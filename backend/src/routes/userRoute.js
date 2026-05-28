const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const Authentication = require("../middleware/Auth")

router.post("/register",async(req, res)=>{
    const {name, email, password} = req.body || {};
    if(!name || !email || !password){
        res.status(400).json({
            success:false,
            msg:"All fields are required "
        })
    }
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400).json({
            success:false,
            msg:"user already exist"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashPassword
    })
const savedUser = await newUser.save();
    res.status(201).json({
        success:true,
        msg:"User Register Successfully",
        user:savedUser
    })
})
router.post("/login",async(req, res)=>{
    const {email, password} = req.body || {};
    if(!email || !password){
        return res.status(400).json({
            success:false,
            msg:"All fields are required "
        })
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,
            msg:"user not exist"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {

        return res.status(400).json({
            success: false,
            msg: "Invalid Password"
        });
    }
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"});
    res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })

    return res.status(200).json({
        success:true,
        msg:"User Login Successfully",
        token,
        userId:user._id
    })
})

module.exports = router;