import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext"

export default function Book() {
    const { baseUrl } = useContext(AppContext)
    const navigate = useNavigate();
    const [menu, setMenu] = useState([])

    useEffect(()=>{
        const fetchMenu = async()=>{
            const res = await axios.get(`${baseUrl}/api/add/get-menu`)
            console.log(res.data);
            setMenu(res.data.Menu)
        }
        fetchMenu()
    },[])

    return (
    <div className="bg-gray-100 min-h-screen py-10 px-5">

        {/* Heading */}
        <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
                Book Your Room
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
                Choose the perfect room for your comfortable stay.
            </p>

        </div>

        {/* Room Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

            {menu.map((room) => (
                <div
                    key={room._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >

                    {/* Image */}
                    <img
                        src={
                            room.image
                                ? encodeURI(`${baseUrl}/uploads/${room.image}`)
                                : "https://via.placeholder.com/150"
                        }
                        alt={room.name}
                        className="h-40 w-full object-cover"
                    />

                    {/* Content */}
                    <div className="p-4">

                        <h2 className="text-lg font-bold text-gray-800">
                            {room.roomName}
                        </h2>

                        <p className="text-yellow-600 font-semibold text-sm mt-1">
                            ₹ {room.price}
                        </p>

                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                            {room.description}
                        </p>

                        {/* Button */}
                        <button
                            onClick={() =>
                                navigate(`/booking/${room._id}`, {
                                    state: room
                                })
                            }
                            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm font-medium transition"
                        >
                            Book Now
                        </button>

                    </div>

                </div>
            ))}

        </div>

    </div>
);
}