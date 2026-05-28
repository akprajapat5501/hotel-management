import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../context/AppContext"

export default function BookingForm() {
    const { baseUrl } = useContext(AppContext)
    const location = useLocation();
    const navigate = useNavigate();

    const room = location.state;

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        guest: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    //     e.preventDefault();

    //     const bookingData = {
    //         roomName: room.name,
    //         price: room.price,
    //         ...formData,
    //     };

    //     const oldBookings =
    //         JSON.parse(localStorage.getItem("bookings")) || [];

    //     oldBookings.push(bookingData);

    //     const res = await axios.post("http://localhost:9000/api/booking/form", bookingData,
    //         {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         }
    //     )
    //     console.log("✅ Response:", res.data);

    //     if (res.status === 201) {
    //         localStorage.setItem("bookings",JSON.stringify(oldBookings));
    //         toast.success("Booking Confirm");
    //         navigate("/my-bookings");
    //     }else{
    //         toast.error("Booking Failed")
    //     }
    // };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
        roomName: room.roomName,
        price: room.price,
        ...formData,
    };

    try {

        const res = await axios.post(
            `${baseUrl}/api/booking/form`,
            bookingData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("✅ Response:", res.data);

        if (res.data.success) {
            const oldBookings =
                JSON.parse(
                    localStorage.getItem("bookings")
                ) || [];

            oldBookings.push(bookingData);
            localStorage.setItem(
                "bookings",
                JSON.stringify(oldBookings)
            );
            toast.success("Booking Confirm");
            navigate("/my-bookings");
        }

    } catch (error) {
        console.log(error);
        toast.error("Booking Failed");
    }
};
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

                <h1 className="text-3xl font-bold mb-6">
                    Booking Form
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* Room Name */}
                    <div>
                        <label className="block mb-2">
                            Room Name
                        </label>

                        <input
                            type="text"
                            value={room.roomName}
                            readOnly
                            name="roomName"
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block mb-2">
                            Price
                        </label>

                        <input
                            type="number"
                            value={room.price}
                            readOnly
                            name="price"
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block mb-2">
                            Your Name
                        </label>

                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            placeholder="Enter name"
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    {/* Guests */}
                    <div>
                        <label className="block mb-2">
                            Guests
                        </label>

                        <input
                            type="number"
                            name="guest"
                            value={formData.guest}
                            placeholder="Guests"
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-white py-3 rounded-lg"
                    >
                        Confirm Booking
                    </button>

                </form>
            </div>
        </div>
    );
}