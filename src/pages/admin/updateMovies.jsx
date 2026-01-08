import React, { useState, useEffect } from 'react';
import { Title } from '../../components/admin/Title';
import { CalendarIcon, ClockIcon, TypeIcon, ImageIcon, TextIcon, StarIcon, ArrowLeftIcon } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../lib/axios';
import toast from 'react-hot-toast';

export const UpdateMovies = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState({
        title: '',
        overview: '',
        releaseDate: '',
        runtime: '',
        genres: '',
        languages: '',
        country: '',
        trailerUrl: '',
        posterPath: '',
        voteAverage: 0
    });

    const fetchMovieData = async () => {
        try {
            const response = await api.get(`/movie/single/${id}`);
            if (response.data.success) {
                const movieToEdit = response.data.movie;
                setMovieData({
                    title: movieToEdit.title,
                    overview: movieToEdit.overview || "",
                    releaseDate: movieToEdit.release_date?.split('T')[0] || '',
                    runtime: movieToEdit.runtime || 0,
                    genres: movieToEdit.genres?.join(', ') || '', 
                    languages: movieToEdit.languages?.join(', ') || '',
                    country: movieToEdit.country || '',
                    trailerUrl: movieToEdit.trailer_url || '',
                    posterPath: movieToEdit.poster_path,
                    voteAverage: movieToEdit.vote_average || 0
                });
            } else {
                toast.error("Failed to fetch movie data");
            }
        } catch {
            toast.error("Error fetching movie data");
        }
    }

    useEffect(() => {
        if (id) {
            fetchMovieData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
            const apiData = {
                title: movieData.title,
                overview: movieData.overview,
                release_date: movieData.releaseDate,
                runtime: Number(movieData.runtime),
                poster_path: movieData.posterPath,
                trailer_url: movieData.trailerUrl,
                genres: movieData.genres.split(',').map(g => g.trim()).filter(g => g),
                languages: movieData.languages.split(',').map(l => l.trim()).filter(l => l),
                country: movieData.country,
                vote_average: Number(movieData.voteAverage)
            };

            const response = await api.put(`/movie/update/${id}`, apiData);
            if (response.data.success) {
                toast.success("Movie updated successfully");
                navigate('/admin/list-movies');
            } else {
                toast.error(response.data.message);
            }
        } catch {
            toast.error("Failed to update movie");
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center gap-4 mb-4">
                <button onClick={() => navigate('/admin/list-movies')} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition">
                    <ArrowLeftIcon className="w-5 h-5 text-white" />
                </button>
                <Title text1="Update" text2="Movie" />
            </div>

            <div className="mt-8 max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-6">

                   
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass p-1 rounded-lg">
                            <div className="flex items-center gap-3 px-4 py-3 bg-black/20 rounded-md">
                                <TypeIcon className="text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="title"
                                    value={movieData.title}
                                    onChange={handleChange}
                                    placeholder="Movie Title"
                                    className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="glass p-1 rounded-lg">
                            <div className="flex items-center gap-3 px-4 py-3 bg-black/20 rounded-md">
                                <StarIcon className="text-gray-400 w-5 h-5" />
                                <input
                                    type="number"
                                    name="voteAverage"
                                    min="0" max="10" step="0.1"
                                    value={movieData.voteAverage}
                                    onChange={handleChange}
                                    placeholder="Rating (0-10)"
                                    className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    
                    <div className="glass p-1 rounded-lg">
                        <div className="flex items-start gap-3 px-4 py-3 bg-black/20 rounded-md">
                            <TextIcon className="text-gray-400 w-5 h-5 mt-1" />
                            <textarea
                                name="overview"
                                value={movieData.overview}
                                onChange={handleChange}
                                placeholder="Movie Description / Overview"
                                rows="4"
                                className="bg-transparent outline-none w-full text-white placeholder-gray-500 resize-none"
                                required
                            />
                        </div>
                    </div>

               
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass p-1 rounded-lg">
                            <div className="flex items-center gap-3 px-4 py-3 bg-black/20 rounded-md">
                                <CalendarIcon className="text-gray-400 w-5 h-5" />
                                <input
                                    type="date"
                                    name="releaseDate"
                                    value={movieData.releaseDate}
                                    onChange={handleChange}
                                    className="bg-transparent outline-none w-full text-white placeholder-gray-500 [color-scheme:dark]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="glass p-1 rounded-lg">
                            <div className="flex items-center gap-3 px-4 py-3 bg-black/20 rounded-md">
                                <ClockIcon className="text-gray-400 w-5 h-5" />
                                <input
                                    type="number"
                                    name="runtime"
                                    value={movieData.runtime}
                                    onChange={handleChange}
                                    placeholder="Duration (min)"
                                    className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="glass p-1 rounded-lg">
                            <div className="flex items-center gap-3 px-4 py-3 bg-black/20 rounded-md">
                                <TypeIcon className="text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="genres"
                                    value={movieData.genres}
                                    onChange={handleChange}
                                    placeholder="Genres (e.g. Action)"
                                    className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass p-1 rounded-lg">
                            <div className="flex items-center gap-3 px-4 py-3 bg-black/20 rounded-md">
                                <TextIcon className="text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="languages"
                                    value={movieData.languages}
                                    onChange={handleChange}
                                    placeholder="Languages (e.g. English, Hindi)"
                                    className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="glass p-1 rounded-lg">
                            <div className="flex items-center gap-3 px-4 py-3 bg-black/20 rounded-md">
                                <TextIcon className="text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="country"
                                    value={movieData.country}
                                    onChange={handleChange}
                                    placeholder="Country (e.g. USA)"
                                    className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                  
                    <div className="glass p-1 rounded-lg">
                        <div className="flex items-center gap-3 px-4 py-3 bg-black/20 rounded-md">
                            <TextIcon className="text-gray-400 w-5 h-5" />
                            <input
                                type="url"
                                name="trailerUrl"
                                value={movieData.trailerUrl}
                                onChange={handleChange}
                                placeholder="Trailer URL (YouTube/Vimeo)"
                                className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                            />
                        </div>
                    </div>

               
                    <div className="glass p-1 rounded-lg">
                        <div className="flex items-center gap-3 px-4 py-3 bg-black/20 rounded-md">
                            <ImageIcon className="text-gray-400 w-5 h-5" />
                            <input
                                type="url"
                                name="posterPath"
                                value={movieData.posterPath}
                                onChange={handleChange}
                                placeholder="Poster Image URL"
                                className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                                required
                            />
                        </div>
                    </div>

                    
                    {movieData.posterPath && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-400 mb-2">Poster Preview:</p>
                            <img src={movieData.posterPath} alt="Poster Preview" className="w-32 h-48 object-cover rounded-lg shadow-lg border border-white/10" />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary-dull text-white font-medium rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(248,69,101,0.3)] hover:shadow-[0_0_25px_rgba(248,69,101,0.5)] transform hover:-translate-y-0.5"
                    >
                        Update Movie
                    </button>

                </form>
            </div>
        </div>
    );
};
