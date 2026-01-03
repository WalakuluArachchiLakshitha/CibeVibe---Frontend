import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CreditCardIcon, CalendarIcon, ClockIcon, TicketIcon } from 'lucide-react';
import { Title } from '../components/admin/Title';
import isoTimeFormat from '../lib/isoTimeFormat';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { movie, selectedSeats, selectedTime, totalPrice } = location.state || {}; // Expecting state from SeatLayout
    const [loading, setLoading] = useState(false);

    if (!location.state) {
        // Handle direct access or missing state
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">No Booking Details Found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-primary rounded-full hover:bg-primary-dull transition"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user._id) {
                toast.error("User not found. Please login again.");
                navigate('/login');
                return;
            }

            const bookingData = {
                userId: user._id,
                showId: location.state?.showId,
                seats: selectedSeats,
                amount: totalPrice
            };

            const response = await api.post('/booking/create', bookingData);
            if (response.data.success) {
                toast.success("Payment Successful! Booking Confirmed.");
                navigate('/booking-success', {
                    state: {
                        booking: response.data.booking,
                        ...location.state
                    }
                });
            } else {
                toast.error(response.data.message);
            }

        } catch {
            toast.error("Payment Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-6 md:px-16 lg:px-40 pb-20 text-white">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-8 text-gray-400 hover:text-white transition"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                {/* Booking Summary */}
                <div className="space-y-6">
                    <Title text1="Booking" text2="Summary" />

                    <div className="glass p-6 rounded-2xl border border-white/10 space-y-6">
                        <div className="flex gap-4">
                            <img
                                src={movie.poster_path}
                                alt={movie.title}
                                className="w-24 h-36 object-cover rounded-lg shadow-lg"
                            />
                            <div>
                                <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                                <p className="text-gray-400 text-sm mb-1">{movie.genres?.map(g => g.name).join(', ')}</p>
                                <p className="text-gray-400 text-sm">{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</p>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-4 space-y-3">
                            <div className="flex justify-between items-center text-gray-300">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4 text-primary" />
                                    <span>Date</span>
                                </div>
                                <span className="font-medium">{new Date().toLocaleDateString()}</span>
                                {/* Note: Ideally pass exact date from SeatLayout if available, else using today/dummy */}
                            </div>
                            <div className="flex justify-between items-center text-gray-300">
                                <div className="flex items-center gap-2">
                                    <ClockIcon className="w-4 h-4 text-primary" />
                                    <span>Time</span>
                                </div>
                                <span className="font-medium">{isoTimeFormat(selectedTime?.time)}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-300">
                                <div className="flex items-center gap-2">
                                    <TicketIcon className="w-4 h-4 text-primary" />
                                    <span>Seats</span>
                                </div>
                                <span className="font-medium">{selectedSeats.join(', ')} ({selectedSeats.length})</span>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xl font-bold">
                            <span>Total Amount</span>
                            <span className="text-primary">${totalPrice}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="space-y-6">
                    <Title text1="Payment" text2="Details" />

                    <div className="glass p-8 rounded-2xl border border-white/10">
                        <form onSubmit={handlePayment} className="space-y-6">

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Cardholder Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary/50 transition text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Card Number</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        maxLength="19"
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-12 pr-4 py-3 outline-none focus:border-primary/50 transition text-white"
                                    />
                                    <CreditCardIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Expiry Date</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary/50 transition text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">CVV</label>
                                    <input
                                        type="password"
                                        placeholder="123"
                                        maxLength="3"
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary/50 transition text-white"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-4 bg-primary hover:bg-primary-dull text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {loading ? 'Processing...' : `Pay $${totalPrice}`}
                            </button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Payment;
