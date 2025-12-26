import React, { useEffect, useState } from 'react'
import { MovieCard } from '../components/MovieCard'
import { BlurCircle } from '../components/BlurCircle'
import api from '../lib/axios'
import Loading from '../components/Loading'

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await api.get('/movie/list');
      if (response.data.success) {
        setMovies(response.data.movies);
      }
      setLoading(false);
    } catch {
      // Error fetching movies
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return loading ? (
    <Loading />
  ) : movies.length > 0 ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="50px" right="100px" />
      <h1 className='text-lg font-medium my-4'>Now Showing</h1>
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="text-3xl font-medium flex items-center justify-center h-screen">
      <h1>No Movies Available</h1>
    </div>
  )
}

export default Movies
