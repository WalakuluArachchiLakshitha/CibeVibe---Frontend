import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import api from "../lib/axios";

const Navbar = () => {

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [profileOpen, setProfileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const navigate = useNavigate();

  // Listen for localStorage changes (e.g., after Google login)
  useEffect(() => {
    const syncUserState = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        setUser(parsedUser);
      } catch {
        // Error syncing user data
      }
    };

    // Listen for storage events from other tabs/windows
    window.addEventListener('storage', syncUserState);

    // Also check on component mount/update (in case of same-tab navigation)
    syncUserState();

    return () => {
      window.removeEventListener('storage', syncUserState);
    };
  }, [navigate]);

  // Fetch all movies for search
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movie/list');
        if (response.data.success) {
          setAllMovies(response.data.movies);
        }
      } catch {
        // Error fetching movies
      }
    };
    fetchMovies();
  }, []);

  // Filter movies based on search query using useMemo
  const searchResults = useMemo(() => {
    if (searchQuery.trim() === "") {
      return [];
    }

    return allMovies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.overview?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genres?.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, allMovies]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    setProfileOpen(false);
  };

  const handleMovieClick = (movieId) => {
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      
      <nav className="fixed top-0 left-0 z-50 w-full backdrop-blur-md bg-black/30 border-b border-white/10 shadow-lg">
        <div className="flex relative items-center justify-between px-6 md:px-16 lg:px-36 py-5">

        
          <Link to="/" onClick={() => scrollTo(0, 0)} className="shrink-0">
            <img src={assets.logo} alt="CineVibe" className="h-28 w-auto  absolute top-2 left-20" />
          </Link>

         
          <div className="hidden md:flex items-center gap-10 text-white text-base">
            <Link
              to="/"
              onClick={() => scrollTo(0, 0)}
              className="hover:text-yellow-400 transition-colors text-xl"
            >
              Home
            </Link>
            <Link
              to="/movies"
              onClick={() => scrollTo(0, 0)}
              className="hover:text-yellow-400 transition-colors  text-xl"
            >
              Movies
            </Link>
            <Link
              to="/theaters"
              onClick={() => scrollTo(0, 0)}
              className="hover:text-yellow-400 transition-colors text-xl"
            >
              Theaters
            </Link>
            <Link
              to="/about"
              onClick={() => scrollTo(0, 0)}
              className="hover:text-yellow-400 transition-colors text-xl"
            >
              About Us
            </Link>
            <Link
              to="/favorites"
              onClick={() => scrollTo(0, 0)}
              className="hover:text-yellow-400 transition-colors text-xl"
            >
              Favorites
            </Link>
          </div>

        
          <div className="flex items-center gap-8 relative">
           
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:block text-white hover:text-yellow-400 transition-colors text-4xl gap-10 absolute left-70"
            >
              <SearchIcon className="w-6 h-6" />
            </button>

           
            {user ? (
              <div className="relative hidden md:block">
                <div
                  className="flex items-center gap-2 cursor-pointer text-xl "
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.firstName || 'User'}
                      className="w-9 h-9 rounded-full object-cover border border-yellow-500/50"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/50 text-white font-semibold">
                      {user.firstName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <span className="hidden lg:block font-medium text-sm text-white">{user.firstName || 'User'}</span>
                </div>

                {profileOpen && (
                  <div className="absolute right-0 top-12 w-55 bg-[#0B1120] border border-white/10 rounded-xl shadow-xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-sm font-medium text-white">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/my-bookings"
                      className="block px-4 py-2 text-m text-gray-300 hover:bg-white/5 hover:text-white transition"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Bookings
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition mt-1"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden md:block">
                <button className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-md transition-all text-base">
                  Sign In
                </button>
              </Link>
            )}

           
            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon className="w-7 h-7" />
            </button>
          </div>
        </div>

       
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-[#0B1120] border-b border-white/5 overflow-y-auto transition-all duration-300 ${isOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="flex flex-col py-4 px-6 gap-4">
            <Link
              to="/"
              onClick={() => { scrollTo(0, 0); setIsOpen(false); }}
              className="text-white hover:text-yellow-400 transition-colors font-medium py-2"
            >
              Home
            </Link>
            <Link
              to="/movies"
              onClick={() => { scrollTo(0, 0); setIsOpen(false); }}
              className="text-white hover:text-yellow-400 transition-colors font-medium py-2"
            >
              Movies
            </Link>
            <Link
              to="/"
              onClick={() => { scrollTo(0, 0); setIsOpen(false); }}
              className="text-white hover:text-yellow-400 transition-colors font-medium py-2"
            >
              Theaters
            </Link>
            <Link
              to="/"
              onClick={() => { scrollTo(0, 0); setIsOpen(false); }}
              className="text-white hover:text-yellow-400 transition-colors font-medium py-2"
            >
              About Us
            </Link>
            <Link
              to="/favorites"
              onClick={() => { scrollTo(0, 0); setIsOpen(false); }}
              className="text-white hover:text-yellow-400 transition-colors font-medium py-2"
            >
              Favorites
            </Link>

            {user ? (
              <>
                <div className="border-t border-white/10 pt-4 mt-2">
                  <Link
                    to="/my-bookings"
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-300 hover:text-white py-2"
                  >
                    My Bookings
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="block text-gray-300 hover:text-white py-2"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="text-red-500 hover:text-red-400 py-2 w-full text-left"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition-all mt-2">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      
      {searchOpen && (
        <div className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-2xl bg-[#1A1A1A] rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4">
         
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <SearchIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                  autoFocus
                />
                <XIcon
                  className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                />
              </div>
            </div>

         
            <div className="max-h-125 overflow-y-auto">
              {searchQuery.trim() === "" ? (
                <div className="p-8 text-center text-gray-400">
                  <p>Start typing to search for movies...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="p-2">
                  {searchResults.map((movie) => (
                    <div
                      key={movie._id}
                      onClick={() => handleMovieClick(movie._id)}
                      className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition group"
                    >
                      <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white group-hover:text-primary transition">
                          {movie.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(movie.release_date).getFullYear()} � {movie.genres?.slice(0, 2).join(", ")}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {movie.overview}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <p>No movies found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
