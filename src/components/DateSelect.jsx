import React, { useState } from "react";
import { BlurCircle } from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const onBookHandler = () => {
    // Corrected logic: trigger toast if NOTHING is selected
    if (!selected) {
      return toast.error("Please select a date");
    }
    navigate(`/seat-layout/${id}?date=${selected}`);
    window.scrollTo(0, 0);
  };

  return (
    <div id="dateSelect" className="pt-20 px-6 md:px-16 lg:px-36">
      {/* Main Container with Glassmorphism effect */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-10 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">

        {/* Decorative Blurs */}
        <div className="absolute inset-0 overflow-hidden rounded-xl -z-10">
          <BlurCircle top="-50px" right="-50px" />
        </div>

        <div className="w-full md:w-auto">
          <p className="text-xl font-bold tracking-tight text-white mb-6">Choose Date</p>

          <div className="flex items-center gap-8 text-sm">
            {/* Left Navigation */}
            <ChevronLeftIcon className="cursor-pointer text-gray-400 hover:text-white transition-colors" width={24} />

            {/* Date Selection Strip */}
            <div className="flex items-center gap-6">
              {Object.keys(dateTime).map((date) => {
                const dateObj = new Date(date);
                const isSelected = selected === date;

                return (
                  <button
                    onClick={() => setSelected(date)}
                    key={date}
                    className={`flex flex-col items-center justify-center min-w-[60px] py-2 rounded-lg transition-all duration-300 border ${isSelected
                        ? "bg-primary border-primary shadow-[0_0_15px_rgba(255,74,108,0.4)]"
                        : "bg-transparent border-transparent hover:border-white/20"
                      }`}
                  >
                    <span className={`text-lg font-bold transition-colors ${isSelected ? "text-white" : "text-white group-hover:text-primary"}`}>
                      {dateObj.getDate()}
                    </span>
                    <span className={`text-[12px] font-medium uppercase tracking-wider ${isSelected ? "text-white/90" : "text-gray-400"}`}>
                      {dateObj.toLocaleString("en-US", { month: "short" })}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Right Navigation */}
            <ChevronRightIcon className="cursor-pointer text-gray-400 hover:text-white transition-colors" width={24} />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onBookHandler}
          className="px-10 py-3.5 bg-primary hover:bg-primary/90 text-white transition-all rounded-lg font-bold text-lg shadow-lg active:scale-95"
        >
          Book Now
        </button>

      </div>
    </div>
  );
};

export default DateSelect;