import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext"

export default function EditProfile() {
    const { baseUrl } = useContext(AppContext)
    const [image, setImage] = useState(null)
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        address: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file)
    }

    const handleSave = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();

            formData.append("firstName", form.firstName);
            formData.append("lastName", form.lastName);
            formData.append("email", form.email);
            formData.append("phone", form.phone);
            formData.append("country", form.country);
            formData.append("address", form.address);
            if (image) {
                formData.append("image", image);
            }
            const res = await axios.post(
                `${baseUrl}/api/detail/profile`,
                formData
            );
            if(res.status === 201){
                localStorage.setItem("profileId",res.data.data._id)
            }
            toast.success("profile save successfully")
            navigate("/profile");

        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (e)=>{
        e.preventDefault();
        try {
            const id = localStorage.getItem("profileId")
            const formData = new FormData();

            formData.append("firstName", form.firstName);
            formData.append("lastName", form.lastName);
            formData.append("email", form.email);
            formData.append("phone", form.phone);
            formData.append("country", form.country);
            formData.append("address", form.address);
            if (image) {
                formData.append("image", image);
            }

            axios.put(`${baseUrl}/api/detail/edit/${id}`,formData)
            toast.success("profile edit successfully")
            navigate("/profile");
        } catch (error) {
            console.log(error);
        }
    }


    return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-8">

            {/* Heading */}
            <div className="text-center mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Edit Profile
                </h1>

                <p className="text-gray-500 mt-2">
                    Update your profile details
                </p>

            </div>

            {/* Profile Image */}
            <div className="flex flex-col items-center mb-8">

                {
                    image ? (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="preview"
                            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )
                }

                <label className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl cursor-pointer transition">

                    Upload Image

                    <input
                        type="file"
                        hidden
                        onChange={handleImage}
                    />

                </label>

            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* First Name */}
                <div>
                    <label className="block mb-2 text-gray-700 font-medium">
                        First Name
                    </label>

                    <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label className="block mb-2 text-gray-700 font-medium">
                        Last Name
                    </label>

                    <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-2 text-gray-700 font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block mb-2 text-gray-700 font-medium">
                        Phone
                    </label>

                    <input
                        type="number"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />
                </div>

                {/* Country */}
                <div>
                    <label className="block mb-2 text-gray-700 font-medium">
                        Country
                    </label>

                    <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        placeholder="Enter country"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block mb-2 text-gray-700 font-medium">
                        Address
                    </label>

                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />
                </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-5 mt-10">

                <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                >
                    Save
                </button>

                <button
                    onClick={handleEdit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                >
                    Edit & Save
                </button>

            </div>

        </div>

    </div>
)
}