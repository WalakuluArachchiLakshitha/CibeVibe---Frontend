import React, { useEffect, useState } from "react";
import { Title } from "../../components/admin/Title";
import Loading from "../../components/Loading";
import { DeleteIcon, StarIcon, CheckIcon, CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react";
import { kConverter } from "../../lib/kConverter";
import toast from "react-hot-toast";
import api from '../../lib/axios';


export const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  const fetchNowPlayingMovies = async () => {
    try {
      const response = await api.get('/movie/list');
      if (response.data.success) {
        setNowPlayingMovies(response.data.movies);
      } else {
        toast.error("Failed to fetch movies");
      }
    } catch {
      toast.error("Error fetching movies");
    }
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;

    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];

      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
    setDateTimeInput("");
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);

      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  };

  const handleAddShow = async () => {
    if (!selectedMovie) return toast.error("Please select a movie");
    if (!showPrice) return toast.error("Please enter a price");
    if (Object.keys(dateTimeSelection).length === 0) return toast.error("Please add at least one show time");

    // Flatten logic: Backend expects array of shows or simple add per movie. 
    // The current backend 'addShow' expects single movieId, showDateTime, showPrice.
    // So we iterate and add multiple shows.
    try {
      let successCount = 0;
      for (const [date, times] of Object.entries(dateTimeSelection)) {
        for (const time of times) {
          // Construct Date object or string as expected by backend
          // Backend expects showDateTime.
          // We can send ISO string.
          const showDateTime = new Date(`${date}T${time}`);

          const response = await api.post('/show/add', {
            movieId: selectedMovie,
            showDateTime,
            showPrice
          });
          if (response.data.success) successCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`${successCount} Shows added successfully!`);
        // Reset
        setSelectedMovie(null);
        setShowPrice("");
        setDateTimeSelection({});
      } else {
        toast.error("Failed to add shows");
      }

    } catch {
      toast.error("Error adding shows");
    }
  }

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  return nowPlayingMovies.length > 0 ? (
    <div className="w-full">
      <Title text1="Add" text2="Shows" />

      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4 text-gray-300">1. Select Movie</h3>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 w-max">
            {nowPlayingMovies.map((movie) => (
              <div
                key={movie._id}
                className={`relative w-40 cursor-pointer transition-all duration-300 rounded-xl overflow-hidden border ${selectedMovie === movie._id ? 'border-primary scale-105 shadow-[0_0_15px_rgba(248,69,101,0.3)]' : 'border-white/5 hover:border-white/20'}`}
                onClick={() => setSelectedMovie(movie._id)}
              >
                <div className="relative aspect-[2/3]">
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-2">
                    <div className="w-full">
                      <p className="font-medium text-white truncate text-sm">{movie.title}</p>
                      <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
                        <span className="flex items-center gap-1"><StarIcon className="w-3 h-3 text-primary fill-primary" /> {movie.vote_average.toFixed(1)}</span>
                        <span>{movie.release_date.split('-')[0]}</span>
                      </div>
                    </div>
                  </div>
                  {selectedMovie === movie._id && (
                    <div className="absolute top-2 right-2 bg-primary rounded-full p-1 shadow-lg">
                      <CheckIcon className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

        {/* Show Price */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-gray-300">2. Set Price</h3>
          <div className="glass p-1 rounded-lg">
            <div className="flex items-center gap-3 px-4 py-3 bg-black/20 rounded-md">
              <DollarSignIcon className="text-gray-400 w-5 h-5" />
              {/* <span className="text-gray-400 text-sm">{currency}</span> */}
              <input
                min={0}
                type="number"
                value={showPrice}
                onChange={(e) => setShowPrice(e.target.value)}
                placeholder="Price per ticket"
                className="bg-transparent outline-none w-full text-white placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Date & Time Selection */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-gray-300">3. Select Schedule</h3>
          <div className="glass p-1 rounded-lg">
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-black/20 rounded-md items-center">
              <div className="flex-1 flex items-center gap-3 px-2 w-full">
                <CalendarIcon className="text-gray-400 w-5 h-5" />
                <input
                  type="datetime-local"
                  value={dateTimeInput}
                  onChange={(e) => setDateTimeInput(e.target.value)}
                  className="bg-transparent outline-none w-full text-white placeholder-gray-500 [color-scheme:white]"
                />
              </div>
              <button
                onClick={handleDateTimeAdd}
                className="w-full sm:w-auto px-6 py-2 bg-primary hover:bg-primary-dull text-white text-sm font-medium rounded-md transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Display Selected Times */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-4 text-gray-300">Selected Schedule</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <div key={date} className="glass rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-3 text-primary font-medium">
                  <CalendarIcon className="w-4 h-4" />
                  {date}
                </div>
                <div className="flex flex-wrap gap-2">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="group flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors border border-white/5"
                    >
                      <ClockIcon className="w-3 h-3 text-gray-400" />
                      <span>{time}</span>
                      <button
                        onClick={() => handleRemoveTime(date, time)}
                        className="ml-1 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <DeleteIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 flex justify-end">
        <button
          onClick={handleAddShow}
          className="px-8 py-3 bg-primary hover:bg-primary-dull text-white font-medium rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(248,69,101,0.3)] hover:shadow-[0_0_25px_rgba(248,69,101,0.5)] transform hover:-translate-y-0.5"
        >
          Publish Shows
        </button>
      </div>

    </div>
  ) : (
    <Loading />
  );
};
