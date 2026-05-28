import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AppContext } from "../context/AppContext"

export default function Login() {
    const { baseUrl } = useContext(AppContext)
    const admin = {
        email: "admin123@gmail.com",
        password: "5501"
    }
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            try {
                const admin = {
                    email: "admin123@gmail.com",
                    password: "5501"
                }
                if (
                form.email === admin.email &&
                form.password === admin.password
            ) {
                localStorage.setItem("isAdmin", "true");

                toast.success("Admin Login Successfully");

                navigate("/admin");

                return; // IMPORTANT
            }
                const res = await axios.post(`${baseUrl}/api/user/login`, {
                    email: form.email,
                    password: form.password
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                console.log("✅ Response:", res.data);
                if (res.status === 200) {
                    localStorage.setItem("token", JSON.stringify(res.data.token))
                    toast.success("Login Successfully");
                    navigate("/home")
                } else {
                    alert("Login failed. Please check your credentials.");
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const res = await axios.post(`${baseUrl}/api/user/register`, {
                    name: form.name,
                    email: form.email,
                    password: form.password
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                console.log("✅ Response:", res.data);
                if (res.status === 201) {
                    localStorage.setItem("name", res.data.user.name)
                    localStorage.setItem("email", res.data.user.email)
                    toast.success("Register Successfully");
                    setIsLogin(true)
                } else {
                    alert("Login failed. Please check your credentials.");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

                {/* Heading */}
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
                    {isLogin ? "Login" : "Signup"}
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    {isLogin
                        ? "Welcome back! Please login."
                        : "Create your account"}
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    {/* Signup Name */}
                    {!isLogin && (
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <input
                                onChange={handleChange}
                                value={form.name}
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                            />
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            onChange={handleChange}
                            value={form.email}
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={form.password}
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                        {isLogin ? "Login" : "Signup"}
                    </button>
                </form>

                {/* Toggle */}
                <p className="text-center text-gray-600 mt-5">
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}

                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 font-semibold ml-2"
                    >
                        {isLogin ? "Signup" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}