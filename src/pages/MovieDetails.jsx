import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyShowsData, dummyDateTimeData } from "../assets/assets";
import { BlurCircle } from "../components/BlurCircle";
import { Heart, PlayIcon, StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";
import { useState } from "react";
import DateSelect from "../components/DateSelect";
import { MovieCard } from "../components/MovieCard";
import Loading from "../components/Loading";



const MovieDetails = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    // Defining the function inside useEffect fixes the dependency error
    const getShowData = () => {
      // Renamed 'show' to 'foundMovie' to avoid variable shadowing
      const foundMovie = dummyShowsData.find(
        (item) => String(item._id) === String(id)
      );

      if (foundMovie) {
        setShow({
          movie: foundMovie,
          dateTime: dummyDateTimeData,
        });
      }
    };

    getShowData();
  }, [id]);

  return show ? (
    <div className="px-6 md:px-16 lg:px-36 py-10 min-h-[80vh]">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="mt-40 w-full md:w-1/3 rounded-lg shadow-lg object-cover "
        />

        <div className="relative flex flex-col gap-3 mt-40">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary  pb-3 text-xl font-semibold">ENGLISH</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {show.movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300 font-medium">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)}
            User Rating
          </div>

          <p className="text-gray-400 mt-2 text-m leading-tight max-w-xl">
            {show.movie.overview}
          </p>
          <p>
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")} •{" "}
            {show.movie.release_date.split("-")[0]}
          </p>
          <div className="flex items-center flex-wrap gap-4 mt-6">
            <button className="flex items-center gap-2 px-7 py-3 text-m bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
              <PlayIcon className="w-5 h-5" />
              Watch Trailer
            </button>
            <a
              href="#dateSelect"
              className="px-7 py-3 text-m bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              Buy Tickets
            </a>
            <button className="px-7 py-3 text-m bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <p classname="text-lg font-medium mt-20">Your Favorite Casts</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index}>
              <img
                src={cast.profile_path}
                alt={cast.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <p className="text-center  mt-2">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />
      <p className="text-lg font-medium mt-20 mb-8 ">You May Also Like</p>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {dummyShowsData.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center mt-20 mb-10">
        <button  onClick={() => {navigate("/movies"); scrollTo(0,0)}} className="px-10 py-3 text -sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"> Show More</button>
        </div>
    </div>
  ) : 
  <Loading />;
};

export default MovieDetails;
