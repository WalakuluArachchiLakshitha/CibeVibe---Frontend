import React, { useEffect, useState, useCallback } from "react";
import { ArrowRight, CalendarIcon, ClockIcon, StarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import timeFormat from "../lib/timeFormat";

const HeroSection = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await api.get('/movie/list');
        if (response.data.success && response.data.movies.length > 0) {
          
          setMovies(response.data.movies.slice(0, 5));
        }
      } catch {
        // Error fetching featured movies
      }
    };
    fetchFeaturedMovies();
  }, []);

  const handleNext = useCallback(() => {
    if (isTransitioning || movies.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % movies.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, movies.length]);

  const handlePrev = useCallback(() => {
    if (isTransitioning || movies.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, movies.length]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, currentIndex]);

 
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length, handleNext]);

  if (movies.length === 0) {
    return (
      <div className="relative flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-gradient-to-br from-black via-gray-900 to-black bg-center h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/40 to-transparent"></div>
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-screen overflow-hidden">
   
      {movies.map((movie, index) => (
        <div
          key={movie._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            backgroundImage: `url(${movie.poster_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%'
          }}
        >
         
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/70 to-black/50"></div>
        </div>
      ))}

     
      <div className="relative z-10 h-full flex flex-col items-start justify-center gap-6 px-6 md:px-16 lg:px-36">
        <div
          key={currentIndex}
          className={`flex flex-col items-start gap-6 max-w-3xl transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
        >
          <h1 className="text-5xl md:text-[80px] font-bold leading-tight tracking-tight drop-shadow-2xl">
            {currentMovie.title.split(' ').map((word, i) =>
              i === 1 ? (
                <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500"> {word} </span>
              ) : word + ' '
            )}
          </h1>

          <div className="flex items-center gap-4 text-gray-200 text-sm md:text-base font-medium tracking-wide flex-wrap">
            {currentMovie.genres?.slice(0, 3).map((genre, i) => (
              <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full">{genre}</span>
            ))}

            <div className="flex items-center gap-1.5 text-primary ml-4">
              <CalendarIcon className="w-4 h-4" /> {new Date(currentMovie.release_date).getFullYear()}
            </div>
            <div className="flex items-center gap-1.5 text-primary">
              <ClockIcon className="w-4 h-4" /> {timeFormat(currentMovie.runtime)}
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <StarIcon className="w-4 h-4 fill-amber-400" /> {currentMovie.vote_average?.toFixed(1)}
            </div>
          </div>

          <p className="max-w-xl text-gray-300 text-lg leading-relaxed drop-shadow-md line-clamp-3">
            {currentMovie.overview}
          </p>

          <button
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary-dull transition-all duration-300 rounded-full font-semibold text-lg shadow-[0_0_20px_rgba(248,69,101,0.4)] hover:shadow-[0_0_30px_rgba(248,69,101,0.6)] hover:-translate-y-1"
            onClick={() => navigate("/movies")}
          >
            Explore Movies
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
          
          <div className="flex items-center gap-2">
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${index === currentIndex
                  ? 'w-8 h-2 bg-primary'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                  }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 border border-white/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 border border-white/10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
