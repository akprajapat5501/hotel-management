import './App.css'
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom"
import Header from './pages/Home'
import Login from "./pages/Login"
import Book from "./pages/Book"
import BookingForm from "./pages/BookingForm"
import MyBookings from './pages/my-booking'
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectRoutes";
import Profile from "./pages/profile"
import EditProfile from "./pages/editProfile"
import Admin from './pages/Admin'
import AddRoom from "./pages/AddRoom"
import Navbar from './components/Header.jsx'
import Footer from './components/footer.jsx'


function Layout(){
  const location = useLocation();
  const hideNavbar = [
    "/",
    "/admin",
    "/add-room"
  ]
  return(
    <>
    {!hideNavbar.includes(location.pathname)&&(
      <Navbar />
    )}
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Header />} />
      <Route path='/explore-menu' element={<ProtectedRoute><Book /></ProtectedRoute>} />
      <Route path='/booking/:id' element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
      <Route path='/my-bookings' element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
      <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path='/edit-profile' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/add-room' element={<AddRoom />} />
    </Routes>
    </>
  )
}

export default function App() {

  return (
    <>
    <Toaster position="top-right" />
    <BrowserRouter>
    <Layout />
    </BrowserRouter>
    </>
  )
}

