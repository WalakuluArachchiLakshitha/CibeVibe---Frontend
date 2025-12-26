import React, { useEffect, useState } from "react";
import { Title } from "../../components/admin/Title";
import { DateFormat } from "../../lib/DateFormat";
import Loading from "../../components/Loading";
import api from '../../lib/axios';
import { Trash2Icon, PencilIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getAllShows = async () => {
    try {
      const response = await api.get('/show/list');
      if (response.data.success) {
        setShows(response.data.shows);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleDelete = async (showId) => {
    if (window.confirm("Are you sure you want to delete this show?")) {
      try {
        const response = await api.delete(`/show/delete/${showId}`);
        if (response.data.success) {
          toast.success("Show Deleted Successfully");
          setShows(prevShows => prevShows.filter(show => show._id !== showId));
        } else {
          toast.error("Failed to delete show");
        }
      } catch {
        toast.error("Error deleting show");
      }
    }
  };

  const handleEdit = (showId) => {
    toast("Edit functionality coming soon!");
    // navigate(`/admin/update-show/${showId}`);
  };

  useEffect(() => {
    getAllShows();
  }, []);

  return !loading ? (
    <div className="w-full">
      <Title text1="List" text2="Shows" />
      <div className="max-w-6xl mt-8 overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-gray-300 border-b border-white/10">
              <th className="p-4 font-medium pl-6">Movie Name</th>
              <th className="p-4 font-medium">Show Time</th>
              <th className="p-4 font-medium text-center">Bookings</th>
              <th className="p-4 font-medium text-right">Earnings</th>
              <th className="p-4 font-medium text-center pr-6">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm font-light divide-y divide-white/5">
            {shows.map((show) => (
              <tr
                key={show._id}
                className="hover:bg-white/5 transition-colors duration-200"
              >
                <td className="p-4 pl-6 font-medium text-white">
                  {show?.movie?.title || (
                    <span className="text-red-500 italic">Movie Deleted</span>
                  )}
                </td>

                <td className="p-4 text-gray-300">
                  {show?.showDateTime ? DateFormat(show.showDateTime) : "N/A"}
                </td>

                <td className="p-4 text-center">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                    {Object.keys(show?.occupiedSeats || {}).length}
                  </span>
                </td>

                <td className="p-4 text-right font-medium text-white">
                  {currency}{" "}
                  {Object.keys(show?.occupiedSeats || {}).length *
                    (show?.showPrice || 0)}
                </td>

                <td className="p-4 text-center pr-6">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEdit(show._id)}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                      title="Edit Show"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(show._id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors"
                      title="Delete Show"
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};
