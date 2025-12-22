import React from 'react'
import { dummyShowsData } from '../assets/assets'
import {MovieCard} from '../components/MovieCard'
import { BlurCircle } from '../components/BlurCircle'

const Favorite = () => {
  // Currently using dummyShowsData as a placeholder
  // In a real app, you would filter this based on user favorites
  const favoriteMovies = dummyShowsData; 

  return favoriteMovies.length > 0 ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      {/* Background decoration matching your Movies page */}
      <BlurCircle top="100px" left="100px"/>
      <BlurCircle bottom="50px" right="100px"/>
      
      <h1 className='text-lg font-medium my-4'>Your Favorites</h1>
      
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {favoriteMovies.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="text-3xl font-medium flex items-center justify-center h-screen"> 
      <h1>No Favorite Movies Yet</h1>
    </div>
  )
}

export default Favorite