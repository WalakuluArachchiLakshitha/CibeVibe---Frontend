import { StarIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import timeFormat from "../lib/timeFormat";

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  const handleNavigate = () => {
    navigate(`/movie/${movie._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="group relative flex-col flex-shrink-0 w-60 cursor-pointer">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(248,69,101,0.3)] group-hover:-translate-y-2">
        <img
          onClick={handleNavigate}
          src={movie.poster_path}
          alt={movie.title}
          className="h-85 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <button
            onClick={(e) => { e.stopPropagation(); handleNavigate(); }}
            className="w-full py-2 bg-primary/90 text-white font-medium rounded-lg backdrop-blur-sm shadow-lg hover:bg-primary transition-colors"
          >
            Buy Tickets
          </button>
        </div>

        <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg flex items-center gap-1 border border-white/10">
          <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-white">{movie.vote_average?.toFixed(1) || 'N/A'}</span>
        </div>
      </div>

      <div className="mt-4 px-1">
        <h3 className="font-bold text-white text-lg truncate group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <span>•</span>
          <span className="truncate max-w-[100px]">
            {Array.isArray(movie.genres) ? movie.genres.slice(0, 2).join(", ") : ''}
          </span>
          <span>•</span>
          <span>{timeFormat(movie.runtime)}</span>
        </div>
      </div>
    </div>
  );
};
