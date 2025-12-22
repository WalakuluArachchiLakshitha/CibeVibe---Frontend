import { StarIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import timeFormat from "../lib/timeFormat";

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  const handleNavigate = () => {
    navigate(`/movies/${movie._id}`);
    window.scrollTo(0, 0);
  };

  return (
    // "flex-shrink-0" ensures the card doesn't squish when inside a horizontal flex container
    <div className="flex flex-col flex-shrink-0 justify-between p-3 bg-slate-900/50 rounded-2xl hover:-translate-y-1 transition duration-300 w-64">
      <img
        onClick={handleNavigate}
        src={movie.poster_path} // Using poster_path for the vertical look in your SS
        alt={movie.title}
        className="rounded-xl h-80 w-full object-cover cursor-pointer"
      />

      <div className="mt-3">
        <p className="font-semibold text-white truncate text-lg">
          {movie.title}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(movie.release_date).getFullYear()} •{" "}
          {movie.genres
            ?.slice(0, 2)
            .map((g) => g.name)
            .join(" | ")}{" "}
          • {timeFormat(movie.runtime)}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleNavigate}
          className="px-4 py-1.5 bg-[#FF4D67] hover:bg-[#e6455d] transition rounded-full text-sm font-medium cursor-pointer text-white"
        >
          Buy Tickets
        </button>
        <p className="flex items-center gap-1 text-gray-300 text-sm">
          <StarIcon className="w-4 h-4 text-[#FF4D67] fill-[#FF4D67]" />
          {movie.vote_average?.toFixed(1)}
        </p>
      </div>
    </div>
  );
};
