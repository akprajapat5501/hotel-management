import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext"

export default function Profile() {
    const { baseUrl } = useContext(AppContext)
    const navigate = useNavigate();

    const [profile, setProfile] = useState({});
    if(profile === null){
        navigate("/edit-profile")
    }

    useEffect(() => {
        const fetchProfile = async () => {

            try {

                const id = localStorage.getItem("profileId");

                const res = await axios.get(
                    `${baseUrl}/api/detail/getprofile/${id}`
                );
                console.log(res.data);
                setProfile(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProfile();
    }, []);
    const handleEdit = () => {

        // navigate(`/edit-profile/${profile._id}`);
        navigate("/edit-profile/");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden">

                {/* Top */}
                <div className="bg-blue-600 h-28 relative">

                    <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">

                        <img
                            src={
                                profile.image
                                    ? encodeURI(`${baseUrl}/profileUploads/${profile.image}`)
                                    : "https://via.placeholder.com/150"
                            }
                            alt="profile"
                            className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                        />

                    </div>

                </div>

                {/* Content */}
                <div className="pt-16 pb-6 px-6">

                    {/* Name */}
                    <div className="text-center">

                        <h1 className="text-2xl font-bold text-gray-800">
                            {profile.firstName} {profile.lastName}
                        </h1>

                        <p className="text-gray-500 text-sm mt-1">
                            Hotel Customer
                        </p>

                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

                        {/* First Name */}
                        <div className="bg-gray-50 p-4 rounded-xl">

                            <p className="text-gray-500 text-sm">
                                First Name
                            </p>

                            <h3 className="text-lg font-semibold text-gray-800 mt-1">
                                {profile.firstName}
                            </h3>

                        </div>

                        {/* Last Name */}
                        <div className="bg-gray-50 p-4 rounded-xl">

                            <p className="text-gray-500 text-sm">
                                Last Name
                            </p>

                            <h3 className="text-lg font-semibold text-gray-800 mt-1">
                                {profile.lastName}
                            </h3>

                        </div>

                        {/* Email */}
                        <div className="bg-gray-50 p-4 rounded-xl">

                            <p className="text-gray-500 text-sm">
                                Email
                            </p>

                            <h3 className="text-base font-semibold text-gray-800 mt-1 break-all">
                                {profile.email}
                            </h3>

                        </div>

                        {/* Phone */}
                        <div className="bg-gray-50 p-4 rounded-xl">

                            <p className="text-gray-500 text-sm">
                                Phone
                            </p>

                            <h3 className="text-lg font-semibold text-gray-800 mt-1">
                                {profile.phone}
                            </h3>

                        </div>

                        {/* Country */}
                        <div className="bg-gray-50 p-4 rounded-xl">

                            <p className="text-gray-500 text-sm">
                                Country
                            </p>

                            <h3 className="text-lg font-semibold text-gray-800 mt-1">
                                {profile.country}
                            </h3>

                        </div>

                        {/* Address */}
                        <div className="bg-gray-50 p-4 rounded-xl">

                            <p className="text-gray-500 text-sm">
                                Address
                            </p>

                            <h3 className="text-base font-semibold text-gray-800 mt-1">
                                {profile.address}
                            </h3>

                        </div>

                    </div>

                    {/* Button */}
                    <div className="flex justify-center mt-8">

                        <button
                            onClick={handleEdit}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition"
                        >
                            Edit Profile
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}