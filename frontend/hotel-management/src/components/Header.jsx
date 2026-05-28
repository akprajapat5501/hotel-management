import React from 'react'
import {Link, useNavigate} from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const logout = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    navigate("/")

  }
 return (
  <nav className="bg-white shadow-md px-8 py-4 sticky top-0 z-50">

    <div className="flex justify-between items-center">

      {/* Logo */}
      <div>
        <button
          onClick={() => navigate("/home")}
          className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          Hotel
        </button>
      </div>

      {/* Menu */}
      <ul className="flex items-center gap-6">

        <Link to="/explore-menu">
          <li className="hover:text-blue-600 font-medium transition cursor-pointer">
            Booking
          </li>
        </Link>

        <Link>
          <li className="hover:text-blue-600 font-medium transition cursor-pointer">
            Contact
          </li>
        </Link>

        <Link to="/my-bookings">
          <li className="hover:text-blue-600 font-medium transition cursor-pointer">
            View Booking
          </li>
        </Link>

      </ul>

      {/* Buttons */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate("/profile")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition shadow-sm"
        >
          Profile
        </button>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium transition shadow-sm"
        >
          Logout
        </button>

      </div>

    </div>

  </nav>
)
}

export default Header