import React, { useEffect, useState } from "react";
import { Title } from "../../components/admin/Title";
import { StarIcon, PencilIcon, Trash2Icon, SearchIcon } from "lucide-react";
import timeFormat from "../../lib/timeFormat";
import { useNavigate } from "react-router-dom";
import api from '../../lib/axios';
import toast from 'react-hot-toast';

export const ListMovies = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchMovies = async () => {
        try {
            const response = await api.get('/movie/list');
            if (response.data.success) {
                setMovies(response.data.movies);
            } else {
                toast.error("Failed to fetch movies");
            }
        } catch {
            toast.error("Error fetching movies");
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            try {
                const response = await api.delete('/movie/remove', { data: { id } });
                if (response.data.success) {
                    toast.success("Movie Deleted");
                    fetchMovies();
                } else {
                    toast.error("Failed to delete movie");
                }
            } catch {
                toast.error("Error deleting movie");
            }
        }
    };

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <Title text1="All" text2="Movies" />

                {/* Search Bar */}
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 bg-black/20 border border-white/10 rounded-full text-sm outline-none focus:border-primary/50 transition w-full md:w-64"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map((movie) => (
                    <div
                        key={movie._id}
                        className="group relative bg-[#1A1A1A] border border-white/5 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
                    >
                        {/* Poster */}
                        <div className="relative aspect-[2/3] overflow-hidden">
                            <img
                                src={movie.poster_path}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Rating Badge */}
                            <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg flex items-center gap-1 border border-white/10">
                                <StarIcon className="w-3 h-3 text-amber-400 fill-amber-400" />
                                <span className="text-xs font-bold text-white">{movie.vote_average.toFixed(1)}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="font-semibold text-white truncate mb-1" title={movie.title}>{movie.title}</h3>

                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                                <span>•</span>
                                <span>{timeFormat(movie.runtime)}</span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 mt-auto">
                                <button
                                    onClick={() => navigate(`/admin/update-movies/${movie._id}`)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium transition-colors text-gray-300 hover:text-white"
                                >
                                    <PencilIcon className="w-3.5 h-3.5" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(movie._id)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-xs font-medium transition-colors text-red-500"
                                >
                                    <Trash2Icon className="w-3.5 h-3.5" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredMovies.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p>No movies found matching "{searchTerm}"</p>
                </div>
            )}
        </div>
    );
};
