import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BlurCircle } from "./BlurCircle";
import { dummyShowsData } from "../assets/assets";
import { MovieCard } from "./MovieCard";

export const FeaturedSection = () => {
    const navigate = useNavigate();
  return (
    <div className="px-6 md:px-16 lg:px-36 py-10 flex flex-col gap-8 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-10">

        <BlurCircle top="0" right="-80px"/>
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
        <button className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer" onClick={()=>{navigate("/movies")}}>View All 
            <ArrowRight className="group-hover:traslate-x-0.5 trasition w-4.5 h-4.5"/>
        </button>
      </div>

     {/* This is the magic part for horizontal layout */}
      <div className="flex overflow-x-auto gap-6 no-scrollbar pb-4">
        {dummyShowsData.map((movie) => (
          <MovieCard key={movie._id} movie={movie} /> //
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer" onClick={()=>{navigate('/movies'); scrollTo(0,0)}}>
            Show More
            </button>



      </div>
    </div>
  );
};
