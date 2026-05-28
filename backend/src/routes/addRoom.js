const express = require("express")
const addRoom = require("../model/add-room.js")
const multer = require("multer")

const router = express.Router();

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

router.post("/room", upload.single("image"), async(req, res)=>{
    try {
        const {roomName, price, description} = req.body || {};
        const image = req.file?.filename;
        if(!roomName || !price || !image || !description){
            return res.status(400).json({
                success:false,
                msg:"All field are required"
            })
        }
        const rooms = new addRoom({
            roomName:roomName,
            price:price,
            image:req.file.filename,
            description:description
        })
        const data = await rooms.save();
        return res.status(201).json({
            success:true,
            msg:"Add room successfully",
            data
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            msg:error.message
        })
    }
})

router.get("/get-menu", upload.single("image"), async(req, res)=>{
    const Menu = await addRoom.find();
    res.status(200).json({
        success:true,
        msg:"fetch menu successfully",
        Menu
    })
})

module.exports = router;