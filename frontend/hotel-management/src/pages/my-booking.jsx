import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext"

export default function MyBookings() {
    const { baseUrl } = useContext(AppContext)
    const [data, setData] = useState([])

    // const bookings =
    //     JSON.parse(localStorage.getItem("bookings")) || [];
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(
                    `${baseUrl}/api/booking/details`
                );
                console.log(res.data);
                setData(res.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchBookings();
    }, []);
    return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">

        {/* Heading */}
        <div className="text-center mb-8">

            <h1 className="text-2xl font-semibold text-gray-800">
                My Bookings
            </h1>

            <p className="text-gray-500 text-sm mt-1">
                Your booked rooms
            </p>

        </div>

        {/* Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {data.map((booking, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
                >

                    {/* Room Name */}
                    <div className="flex justify-between items-center mb-3">

                        <h2 className="text-base font-semibold text-gray-800">
                            {booking.roomName}
                        </h2>

                        <span
                            className={`px-2 py-1 rounded-full text-[10px] font-medium
                            ${booking.status === "Confirmed"
                                    ? "bg-green-100 text-green-700"
                                    : booking.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                        >
                            {booking.status}
                        </span>

                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">

                        <div className="flex justify-between">
                            <p className="text-gray-500">Price</p>
                            <p className="font-medium text-gray-700">
                                ₹ {booking.price}
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-gray-500">Name</p>
                            <p className="font-medium text-gray-700">
                                {booking.userName}
                            </p>
                        </div>

                        <div className="flex justify-between gap-2">
                            <p className="text-gray-500">Email</p>
                            <p className="font-medium text-gray-700 text-xs break-all text-right">
                                {booking.email}
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-gray-500">Guests</p>
                            <p className="font-medium text-gray-700">
                                {booking.guest}
                            </p>
                        </div>

                    </div>

                </div>
            ))}

        </div>

    </div>
);
}