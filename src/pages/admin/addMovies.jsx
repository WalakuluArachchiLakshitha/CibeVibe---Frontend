import React, { useState } from 'react';
import { Title } from '../../components/admin/Title';
import { CalendarIcon, ClockIcon, TypeIcon, ImageIcon, TextIcon, StarIcon } from 'lucide-react';
import api from '../../lib/axios';
import toast from 'react-hot-toast';

export const AddMovies = () => {
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
            // Transform data to match backend expectations
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

            const response = await api.post('/movie/add', apiData);
            if (response.data.success) {
                toast.success("Movie Added Successfully");
                setMovieData({
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
            } else {
                toast.error(response.data.message);
            }
        } catch {
            toast.error("Failed to add movie");
        }
    };

    return (
        <div className="w-full">
            <Title text1="Add" text2="New Movie" />

            <div className="mt-8 max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Title & Rating */}
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

                    {/* Overview */}
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

                    {/* Details Grid */}
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

                    {/* Extra Details: Languages & Country */}
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

                    {/* Trailer URL */}
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

                    {/* Poster URL */}
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

                    {/* Preview */}
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
                        Add Movie
                    </button>

                </form>
            </div >
        </div >
    );
};
