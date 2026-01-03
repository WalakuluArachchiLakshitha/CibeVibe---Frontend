import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { Title } from '../components/admin/Title';
import { CheckCircleIcon, HomeIcon, TicketIcon } from 'lucide-react';
import isoTimeFormat from '../lib/isoTimeFormat';

const BookingSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { booking, movie, selectedSeats, selectedTime, totalPrice } = location.state || {};
    const [qrData, setQrData] = useState("");

    useEffect(() => {
        if (!location.state || !booking) {
            navigate('/');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            bookingID: booking._id,
            email: user?.email || "N/A",
            title: movie?.title || "N/A",
            showdatetime: `${location.state.date || new Date().toLocaleDateString()} ${selectedTime?.time ? isoTimeFormat(selectedTime.time) : ""}`,
            seatbooked: selectedSeats?.join(', ') || "N/A",
            amount: totalPrice
        };

        setQrData(JSON.stringify(data));
    }, [location.state, booking, navigate, movie, selectedTime, selectedSeats, totalPrice]);

    if (!location.state) return null;

    return (
        <div className="min-h-screen pt-24 px-6 md:px-16 lg:px-40 pb-20 text-white flex flex-col items-center justify-center">

            <div className="glass p-8 rounded-2xl border border-white/10 w-full max-w-md text-center space-y-6 animate-fade-in-up">
                <div className="flex justify-center">
                    <CheckCircleIcon className="w-20 h-20 text-green-500" />
                </div>

                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    Booking Confirmed!
                </h2>

                <p className="text-gray-300">
                    Your ticket has been successfully booked. Please show this QR code at the entrance.
                </p>

                <div className="flex justify-center bg-white p-4 rounded-xl mx-auto w-fit">
                    {qrData && (
                        <QRCodeCanvas
                            value={qrData}
                            size={200}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                            level={"H"}
                        />
                    )}
                </div>

                <div className="space-y-2 text-left bg-black/20 p-4 rounded-lg text-sm text-gray-300">
                    <div className="flex justify-between">
                        <span>Movie:</span>
                        <span className="font-medium text-white">{movie?.title}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Seats:</span>
                        <span className="font-medium text-white">{selectedSeats?.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Booking ID:</span>
                        <span className="font-mono text-xs text-white">{booking?._id}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate('/my-bookings')}
                        className="w-full bg-primary hover:bg-primary-dull text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
                    >
                        <TicketIcon className="w-5 h-5" />
                        View My Bookings
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
                    >
                        <HomeIcon className="w-5 h-5" />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;
