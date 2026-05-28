import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext"

export default function Admin() {
    const { baseUrl } = useContext(AppContext)
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [totalPrice, setTotalPrice] = useState([])
    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");

        if (!isAdmin) {
            navigate("/");
        }

        const getTotalPrice = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/booking/total-revenue`)
                setTotalPrice(res.data.totalRevenue)
            } catch (error) {
                console.log(error);
            }
        }
        getTotalPrice()
    }, []);
    const logout = () => {
        localStorage.removeItem("isAdmin");
        navigate("/");
    };
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

    const handleChange = async (e, id) => {
        const value = e.target.value;
        console.log(id);
        console.log("Selected Status:", value);
        try {

            await axios.put(
                `${baseUrl}/api/booking/update/${id}`,
                {
                    status: value
                }
            );
            toast.success("Status Updated ✅");
        } catch (error) {
            console.log(error);
        }
    }

    const stats = [
        {
            title: 'Total Rooms',
            value: 120,
            icon: '🏨',
            color: 'bg-blue-100 text-blue-600'
        },
        {
            title: 'Booked Rooms',
            value: data.length,
            icon: '🛏️',
            color: 'bg-green-100 text-green-600'
        },
        {
            title: 'Available Rooms',
            value: 35,
            icon: '✅',
            color: 'bg-yellow-100 text-yellow-600'
        },
        {
            title: 'Total Revenue',
            value: totalPrice,
            icon: '💰',
            color: 'bg-red-100 text-red-600'
        }
    ];
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-72 bg-gray-900 text-white p-6">
                <h1 className="text-3xl font-bold mb-10 text-center">
                    Hotel Admin
                </h1>

                <ul className="space-y-4">
                    <li className="bg-blue-600 p-4 rounded-xl cursor-pointer font-medium">
                        Dashboard
                    </li>

                    <li className="hover:bg-gray-800 p-4 rounded-xl cursor-pointer transition font-medium">
                        <button onClick={() => navigate("/add-room")}>Room Management</button>
                    </li>

                    <li className="hover:bg-gray-800 p-4 rounded-xl cursor-pointer transition font-medium">
                        Bookings
                    </li>

                    <li className="hover:bg-gray-800 p-4 rounded-xl cursor-pointer transition font-medium">
                        Customers
                    </li>

                    <li className="hover:bg-gray-800 p-4 rounded-xl cursor-pointer transition font-medium">
                        Payments
                    </li>

                    <li className="hover:bg-gray-800 p-4 rounded-xl cursor-pointer transition font-medium">
                        Reviews
                    </li>

                    <li className="hover:bg-gray-800 p-4 rounded-xl cursor-pointer transition font-medium">
                        Settings
                    </li>
                </ul>

                <button onClick={logout} className="mt-10 w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition">
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm p-5 flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Hotel Dashboard
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Welcome back, Admin
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="border border-gray-300 px-4 py-2 rounded-xl outline-none focus:border-blue-500"
                        />

                        <img
                            src="https://i.pravatar.cc/45"
                            alt="admin"
                            className="w-12 h-12 rounded-full"
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-sm p-6"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 font-medium">
                                        {item.title}
                                    </p>

                                    <h3 className="text-3xl font-bold mt-3 text-gray-800">
                                        {item.value}
                                    </h3>
                                </div>

                                <div
                                    className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${item.color}`}
                                >
                                    {item.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Recent Bookings
                        </h2>

                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition">
                            View All
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b text-left text-gray-600">
                                    <th className="py-4">Customer Name</th>
                                    <th>Room Type</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((booking, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="py-5 font-medium text-gray-700">
                                            {booking.userName}
                                        </td>

                                        <td>{booking.roomName}</td>

                                        <td>{booking.price}</td>

                                        <td>
                                            <span
                                                className={`px-4 py-1 rounded-full text-sm font-medium ${booking.status === 'Confirmed'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-yellow-100 text-yellow-600'
                                                    }`}
                                            >
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                name="status"
                                                value={booking.status}
                                                onChange={(e) => handleChange(e, booking._id)}
                                                className={`
        px-4 py-2 rounded-lg border outline-none font-medium cursor-pointer transition
        ${booking.status === "Confirmed"
                                                        ? "bg-green-100 text-green-600 border-green-300"
                                                        : booking.status === "Rejected"
                                                            ? "bg-red-100 text-red-600 border-red-300"
                                                            : "bg-yellow-100 text-yellow-600 border-yellow-300"
                                                    }
    `}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
