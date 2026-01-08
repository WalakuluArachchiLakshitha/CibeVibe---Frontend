import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlurCircle } from "../components/BlurCircle";
import { Heart, PlayIcon, StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import { MovieCard } from "../components/MovieCard";
import Loading from "../components/Loading";
import api from "../lib/axios";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [dateTimeData, setDateTimeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieAndShows = async () => {
      try {
      
        const movieResponse = await api.get(`/movie/single/${id}`);
        if (movieResponse.data.success) {
          setMovie(movieResponse.data.movie);
        } else {
          toast.error("Movie not found");
          navigate("/movies");
          return;
        }

      
        const showsResponse = await api.get(`/show/list?movieId=${id}`);
        if (showsResponse.data.success && showsResponse.data.shows.length > 0) {
          setShows(showsResponse.data.shows);

          
          const dateTimeMap = {};
          showsResponse.data.shows.forEach(show => {
            const dateObj = new Date(show.showDateTime);
            const dateStr = dateObj.toISOString().split('T')[0];

            if (!dateTimeMap[dateStr]) {
              dateTimeMap[dateStr] = [];
            }

            dateTimeMap[dateStr].push({
              time: show.showDateTime,
              showId: show._id,
              occupiedSeats: show.occupiedSeats || {},
              price: show.showPrice
            });
          });

          setDateTimeData(dateTimeMap);
        }

        
        const moviesResponse = await api.get('/movie/list');
        if (moviesResponse.data.success) {
          setRelatedMovies(moviesResponse.data.movies.filter(m => m._id !== id).slice(0, 4));
        }

        setLoading(false);
      } catch {
        toast.error("Error loading movie details");
        setLoading(false);
      }
    };

    fetchMovieAndShows();

   
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));
  }, [id, navigate]);

  return loading ? (
    <Loading />
  ) : movie ? (
    <div className="px-6 md:px-16 lg:px-36 py-10 min-h-[80vh]">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="mt-40 w-full md:w-1/3 rounded-lg shadow-lg object-cover "
        />

        <div className="relative flex flex-col gap-3 mt-40">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary pb-3 text-xl font-semibold">
            {movie.languages?.[0]?.toUpperCase() || 'ENGLISH'}
          </p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300 font-medium">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {movie.vote_average?.toFixed(1) || 'N/A'} User Rating
          </div>

          <p className="text-gray-400 mt-2 text-m leading-tight max-w-xl">
            {movie.overview}
          </p>
          <p>
            {timeFormat(movie.runtime)} •{" "}
            {Array.isArray(movie.genres) ? movie.genres.join(", ") : ''} •{" "}
            {new Date(movie.release_date).getFullYear()}
          </p>
          <div className="flex items-center flex-wrap gap-4 mt-6">
            {movie.trailer_url && (
              <a
                href={movie.trailer_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3 text-m bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95"
              >
                <PlayIcon className="w-5 h-5" />
                Watch Trailer
              </a>
            )}
            <a
              href="#dateSelect"
              className="px-7 py-3 text-m bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              Buy Tickets
            </a>
            <button
              onClick={() => {
                const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                if (isFavorite) {
                
                  const updated = favorites.filter(favId => favId !== id);
                  localStorage.setItem('favorites', JSON.stringify(updated));
                  setIsFavorite(false);
                  toast.success('Removed from favorites');
                } else {
                 
                  favorites.push(id);
                  localStorage.setItem('favorites', JSON.stringify(favorites));
                  setIsFavorite(true);
                  toast.success('Added to favorites');
                }
              }}
              className={`px-7 py-3 text-m transition rounded-md font-medium cursor-pointer active:scale-95 ${isFavorite
                ? 'bg-primary hover:bg-primary-dull text-white'
                : 'bg-gray-800 hover:bg-gray-900'
                }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {Object.keys(dateTimeData).length > 0 ? (
        <DateSelect dateTime={dateTimeData} id={id} />
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p>No shows available for this movie yet.</p>
        </div>
      )}

      {relatedMovies.length > 0 && (
        <>
          <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
          <div className="flex flex-wrap max-sm:justify-center gap-8">
            {relatedMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
          <div className="flex justify-center mt-20 mb-10">
            <button
              onClick={() => { navigate("/movies"); scrollTo(0, 0) }}
              className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
            >
              Show More
            </button>
          </div>
        </>
      )}
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <p>Movie not found</p>
    </div>
  );
};

export default MovieDetails;
