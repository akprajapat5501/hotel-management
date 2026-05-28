import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext"

export default function AddRoom() {
        const { baseUrl } = useContext(AppContext)
    const navigate = useNavigate();
    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");

        if (!isAdmin) {
            navigate("/");
        }
    })

    const [image, setImage] = useState(null);

    const [room, setRoom] = useState({
        name: "",
        price: "",
        description:""
    });

    // Handle Input
    const handleChange = (e) => {

        const { name, value } = e.target;

        setRoom({
            ...room,
            [name]: value
        });
    };

    // Handle Image
    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle Submit
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("roomName", room.name);
            formData.append("price", room.price);
            formData.append("description", room.description);
            if (image) {
                formData.append("image", image);
            }
            const res = await axios.post(`${baseUrl}/api/add/room`,formData)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
        toast.success("Room Added Successfully ✅");
        navigate("/admin")
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">

                {/* Heading */}
                <div className="text-center mb-6">

                    <h1 className="text-2xl font-bold text-gray-800">
                        Add Room
                    </h1>

                    <p className="text-gray-500 text-sm mt-1">
                        Add new room details
                    </p>

                </div>

                {/* Image Preview */}
                <div className="flex flex-col items-center mb-6">

                    {
                        image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="room"
                                className="w-28 h-28 rounded-xl object-cover border"
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                                No Image
                            </div>
                        )
                    }

                    <label className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer transition text-sm">

                        Upload Image

                        <input
                            type="file"
                            hidden
                            onChange={handleImage}
                        />

                    </label>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* Room Name */}
                    <div>

                        <label className="block mb-1 text-gray-700 text-sm font-medium">
                            Room Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={room.name}
                            onChange={handleChange}
                            placeholder="Enter room name"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* Price */}
                    <div>

                        <label className="block mb-1 text-gray-700 text-sm font-medium">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={room.price}
                            onChange={handleChange}
                            placeholder="Enter room price"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* description */}
                    <div>
                        <label className="block mb-1 text-gray-700 text-sm font-medium">
                            Description
                        </label>

                        <input
                            type="text"
                            name="description"
                            value={room.description}
                            onChange={handleChange}
                            placeholder="Enter room name"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition"
                    >
                        Add Room
                    </button>

                </form>

            </div>

        </div>
    );
}