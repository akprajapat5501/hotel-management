import React from 'react'

const footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

                {/* About */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Hotel Management
                    </h2>

                    <p className="text-gray-400">
                        Experience luxury, comfort, and premium hotel services with easy online booking.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Quick Links
                    </h3>

                    <ul className="space-y-2 text-gray-400">
                        <li>Home</li>
                        <li>Rooms</li>
                        <li>Booking</li>
                        <li>Contact</li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Services
                    </h3>

                    <ul className="space-y-2 text-gray-400">
                        <li>Luxury Rooms</li>
                        <li>Restaurant</li>
                        <li>Spa & Fitness</li>
                        <li>Free WiFi</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Contact
                    </h3>

                    <p className="text-gray-400">
                        Ahmedabad, Gujarat, India
                    </p>

                    <p className="text-gray-400">
                        +91 98765 43210
                    </p>

                    <p className="text-gray-400">
                        hotel@example.com
                    </p>
                </div>

            </div>

            <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-400">
                © 2026 Hotel Management System. All Rights Reserved.
            </div>

        </footer>
    )
}

export default footer