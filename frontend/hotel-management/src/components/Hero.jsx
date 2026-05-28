import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section className="bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945')] bg-cover bg-center h-screen flex items-center">

            <div className="bg-black/60 w-full h-full flex items-center">

                <div className="max-w-7xl mx-auto px-6 text-white">

                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Welcome to Luxury Hotel Management
                    </h1>

                    <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-200">
                        Manage bookings, rooms, customers, and hotel services easily with our smart hotel management system.
                    </p>

                    <div className="flex gap-4">
                        <Link to={"/explore-menu"} class="text-white">
                        <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg font-semibold">
                            Book Room
                        </button></Link>

                        <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition">
                            Explore Services
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Hero