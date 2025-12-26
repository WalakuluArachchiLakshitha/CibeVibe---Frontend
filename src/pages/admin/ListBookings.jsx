import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Title } from "../../components/admin/Title";
import { DateFormat } from "../../lib/DateFormat";
import api from '../../lib/axios';
import { PencilIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

export const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    try {
      const response = await api.get('/booking/list');
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const handleEdit = (id) => {
    toast.info("Edit functionality coming soon!");
    // TODO: Implement edit booking functionality
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await api.delete('/booking/delete', { data: { id } });
        if (response.data.success) {
          toast.success("Booking Deleted");
          getAllBookings();
        } else {
          toast.error("Failed to delete booking");
        }
      } catch {
        toast.error("Error deleting booking");
      }
    }
  };

  return !isLoading ? (
    <div className="w-full">
      <Title text1="List" text2="Bookings" />
      {/* Add horizontal scroll container for mobile */}
      <div className="mt-8 overflow-x-auto">
        <div className="min-w-[640px] rounded-xl border border-white/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-300 border-b border-white/10">
                <th className="p-4 font-medium pl-6">User</th>
                <th className="p-4 font-medium">Movie Name</th>
                <th className="p-4 font-medium">Show Time</th>
                <th className="p-4 font-medium">Seats</th>
                <th className="p-4 font-medium text-right pr-6">Amount</th>
                <th className="p-4 font-medium text-center pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light divide-y divide-white/5">
              {bookings.length > 0 ? (
                bookings.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="p-4 pl-6 font-medium text-white">
                      {item.user?.firstName && item.user?.lastName
                        ? `${item.user.firstName} ${item.user.lastName}`
                        : item.user?.firstName || 'Unknown User'}
                    </td>
                    <td className="p-4 text-gray-300">{item.show?.movie?.title || 'Unknown Movie'}</td>
                    <td className="p-4 text-gray-400">{item.show?.showDateTime ? DateFormat(item.show.showDateTime) : 'N/A'}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(item.bookedSeats)
                          ? item.bookedSeats.map((seat, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white/10 rounded text-xs">
                              {seat}
                            </span>
                          ))
                          : Object.keys(item.bookedSeats || {}).map(key => (
                            <span key={key} className="px-2 py-0.5 bg-white/10 rounded text-xs">
                              {item.bookedSeats[key]}
                            </span>
                          ))
                        }
                      </div>
                    </td>
                    <td className="p-4 text-right pr-6 font-medium text-primary">
                      {currency} {item.amount}
                    </td>
                    <td className="p-4 text-center pr-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item._id)}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                          title="Edit Booking"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors"
                          title="Delete Booking"
                        >
                          <Trash2Icon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    No bookings found. Check the browser console for API details.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};
