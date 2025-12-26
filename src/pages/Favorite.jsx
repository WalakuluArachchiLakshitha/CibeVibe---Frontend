import React, { useState, useEffect, useCallback } from 'react';
import { MovieCard } from '../components/MovieCard';
import { BlurCircle } from '../components/BlurCircle';
import { Heart } from 'lucide-react';
import api from '../lib/axios';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavoriteMovies = useCallback(async () => {
    try {
      // Get favorite movie IDs from localStorage
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

      if (favorites.length === 0) {
        setLoading(false);
        return;
      }

      // Fetch all movies and filter by favorites
      const response = await api.get('/movie/list');
      if (response.data.success) {
        const favMovies = response.data.movies.filter(movie =>
          favorites.includes(movie._id)
        );
        setFavoriteMovies(favMovies);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavoriteMovies();
  }, [fetchFavoriteMovies]);

  const removeFavorite = (movieId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updated = favorites.filter(id => id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(updated));
    setFavoriteMovies(prev => prev.filter(movie => movie._id !== movieId));
    toast.success('Removed from favorites');
  };

  return loading ? (
    <Loading />
  ) : favoriteMovies.length > 0 ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="50px" right="100px" />

      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-primary fill-primary" />
        <h1 className='text-2xl font-bold'>Your Favorites</h1>
        <span className="text-sm text-gray-400">({favoriteMovies.length} movies)</span>
      </div>

      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {favoriteMovies.map((movie) => (
          <div key={movie._id} className="relative group">
            <MovieCard movie={movie} />
            <button
              onClick={() => removeFavorite(movie._id)}
              className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg z-10"
              title="Remove from favorites"
            >
              <Heart className="w-4 h-4 fill-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <Heart className="w-16 h-16 text-gray-600 mb-4" />
      <h1 className="text-3xl font-bold mb-2">No Favorite Movies Yet</h1>
      <p className="text-gray-400 mb-6">Start adding movies to your favorites by clicking the heart icon!</p>
      <a href="/movies" className="px-6 py-3 bg-primary hover:bg-primary-dull transition rounded-full font-medium">
        Browse Movies
      </a>
    </div>
  );
};

export default Favorite;
