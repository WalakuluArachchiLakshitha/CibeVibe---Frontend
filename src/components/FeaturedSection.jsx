import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BlurCircle } from "./BlurCircle";
import { MovieCard } from "./MovieCard";
import api from "../lib/axios";

export const FeaturedSection = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await api.get('/movie/list');
      if (response.data.success) {
        // Show first 6 movies
        setMovies(response.data.movies.slice(0, 6));
      }
    } catch {
      // Error fetching movies
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-36 py-10 flex flex-col gap-8 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-10">

        <BlurCircle top="0" right="-80px" />
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
        <button className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer" onClick={() => { navigate("/movies") }}>View All
          <ArrowRight className="group-hover:traslate-x-0.5 trasition w-4.5 h-4.5" />
        </button>
      </div>

      {/* This is the magic part for horizontal layout */}
      <div className="flex overflow-x-auto gap-6 no-scrollbar pb-4">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} /> //
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer" onClick={() => { navigate('/movies'); scrollTo(0, 0) }}>
          Show More
        </button>



      </div>
    </div>
  );
};
