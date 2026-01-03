import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../components/Loading";
import { BlurCircle } from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat";
import { DateFormat } from "../lib/DateFormat";
import api from "../lib/axios";
import toast from "react-hot-toast";

import { QRCodeCanvas } from 'qrcode.react';
import { XIcon, QrCodeIcon } from 'lucide-react';

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBookingQr, setSelectedBookingQr] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);

  const getMyBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user._id) {
        toast.error("Please login to view bookings");
        setIsLoading(false);
        return;
      }

      const response = await api.post('/booking/my-bookings', { userId: user._id });
      if (response.data.success) {
        // Transform bookedSeats object to array for display
        const transformedBookings = response.data.bookings.map(booking => ({
          ...booking,
          bookedSeats: Object.keys(booking.bookedSeats)
        }));
        setBookings(transformedBookings);
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error("Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" />
      <div>
        <BlurCircle bottom="0px" left="600px" />
      </div>

      <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

      {bookings.length > 0 ? (
        bookings.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl"
          >
            <div className="flex flex-col md:flex-row">
              <img
                src={item.show?.movie?.poster_path || '/placeholder.jpg'}
                alt={item.show?.movie?.title || 'Movie'}
                className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded"
              />
              <div className="flex flex-col p-4">
                <p className="text-lg font-semibold">
                  {item.show?.movie?.title || 'Show Unavailable'}
                </p>
                {item.show?.movie?.runtime && (
                  <p className="text-gray-400 text-sm">
                    {timeFormat(item.show.movie.runtime)}
                  </p>
                )}
                {item.show?.showDateTime && (
                  <p className="text-gray-400 text-sm mt-auto">
                    {DateFormat(item.show.showDateTime)}
                  </p>
                )}
                {!item.show && (
                  <p className="text-red-400 text-sm mt-2">
                    This show has been removed
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:items-end md:text-right justify-between p-4">
              <div className="flex items-center gap-4">
                <p className="text-2xl font-semibold mb-3">
                  {currency}
                  {item.amount}
                </p>
              </div>
              <div className="text-sm">
                <p>
                  <span className="text-gray-400">Total Tickets:</span>{" "}
                  {item.bookedSeats.length}
                </p>
                <p>
                  <span className="text-gray-400">Seat Number:</span>{" "}
                  {item.bookedSeats.join(", ")}
                </p>
              </div>

              <button
                onClick={() => {
                  const user = JSON.parse(localStorage.getItem('user'));
                  const qrData = JSON.stringify({
                    bookingID: item._id,
                    email: user?.email || "N/A",
                    title: item.show?.movie?.title || "N/A",
                    showdatetime: item.show?.showDateTime ? DateFormat(item.show.showDateTime) : "N/A",
                    seatbooked: item.bookedSeats.join(', '),
                    amount: item.amount
                  });
                  setSelectedBookingQr(qrData);
                  setShowQrModal(true);
                }}
                className="mt-4 flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                <QrCodeIcon className="w-4 h-4" />
                View QR Ticket
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No bookings found</p>
          <p className="text-sm mt-2">Start booking your favorite movies!</p>
        </div>
      )}

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setShowQrModal(false)}>
          <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10 max-w-sm w-full relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <XIcon className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold mb-6 text-center">Ticket QR Code</h3>

            <div className="flex justify-center bg-white p-4 rounded-xl mb-4">
              <QRCodeCanvas
                value={selectedBookingQr}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
              />
            </div>

            <p className="text-center text-gray-400 text-sm">
              Show this QR code at the cinema entrance
            </p>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default MyBookings;
