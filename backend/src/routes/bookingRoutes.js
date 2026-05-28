const express = require("express")
const Booking = require("../model/booking.model")
const router = express.Router()

router.post("/form",async(req, res)=>{
    const {roomName, price, userName, email, guest} = req.body || {};
    if(!roomName || !email || !price || !userName || !guest){
        res.status(400).json({
            success:false,
            msg:"All fields are required "
        })
    }
    const data = new Booking({
        roomName,
        price,
        userName,
        email,
        guest,
    })
    const saveBooking = await data.save();
    return res.status(201).json({
        success:true,
        msg:"Booking Successfully",
        detail:saveBooking
    })
})
router.get("/details",async(req, res)=>{
    const data = await Booking.find()
    res.status(200).json({
        success:true,
        msg:"fetch data successfully",
        data:data
    })
})

router.put("/update/:id",async(req, res)=>{
    try {
        const {id} = req.params;
    const {status} = req.body;
    const booking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        res.status(200).json({
            success: true,
            booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

router.get("/total-revenue",async(req, res)=>{
    try {
        const revenue = await Booking.aggregate([
            {
                $group:{
                    _id:null,
                    totalRevenue:{
                        $sum:"$price"
                    }
                }
            }
        ])
        res.status(200).json({
            success:true,
            totalRevenue:revenue.length > 0 ? revenue[0].totalRevenue : 0
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            msg: "Server Error"
        });
    }
})


module.exports = router