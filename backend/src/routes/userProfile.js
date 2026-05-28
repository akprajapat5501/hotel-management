const express = require("express");
const multer = require("multer")
const profileModel = require("../model/profile")
const router = express.Router();


const storage = multer.diskStorage({
    destination:"profileUploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

router.post("/profile", upload.single("image"), async(req, res)=>{
    try {
        const {firstName, lastName, email, phone, address, country} = req.body || {};
        const image = req.file?.filename;
        if(!firstName || !lastName || !phone || !email || !address || !country || !image){
            return res.status(400).json({
                success:false,
                msg:"All field are required"
            })
        }
        const profileData = new profileModel({
            image:image,
            firstName:firstName,
            lastName:lastName,
            email:email,
            phone:phone,
            country:country,
            address:address
        })
        const data = await profileData.save();
        return res.status(201).json({
            success:true,
            msg:"Profile Saved Successfully",
            data,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            msg:error.message
        })
    }
})

router.get("/getprofile/:id", upload.single("image"), async(req, res)=>{
    try {
        const {id} = req.params;
        const fetchData = await profileModel.findById(id);
        res.status(200).json({
        success:true,
        msg:"fetch profile successfully",
        data:fetchData
    })
    } catch (error) {
        console.log(error);
    }
})

router.put("/edit/:id",upload.single("image"), async(req, res)=>{
    try {
        const {id} = req.params;
        const image = req.file?.filename;
        const {firstName, lastName, email, phone, country, address} = req.body || {};
        const editProfile = await profileModel.findByIdAndUpdate(
            id,
            {image, firstName, lastName, email, phone, country, address},
            {new:true});
            res.status(200).json({
                success:true,
                msg:"Updated Successfully",
                editProfile
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})



module.exports = router;