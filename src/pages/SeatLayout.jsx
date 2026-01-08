import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { ClockIcon, ArrowRightIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import { BlurCircle } from "../components/BlurCircle";
import { assets } from "../assets/assets";
import { toast } from "react-hot-toast";
import api from '../lib/axios';

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];
  const { id } = useParams(); 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedDate = searchParams.get('date');

  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const getshow = async () => {
    try {
      const response = await api.get(`/show/list?movieId=${id}`); 
      if (response.data.success && response.data.shows.length > 0) {
        const shows = response.data.shows;
        const movieData = shows[0].movie; 

      
        const dateTimeMap = {};

        shows.forEach(show => {
          const dateObj = new Date(show.showDateTime);
         
          const formattedDate = dateObj.toISOString().split('T')[0];

          if (!dateTimeMap[formattedDate]) {
            dateTimeMap[formattedDate] = [];
          }
          dateTimeMap[formattedDate].push({
            time: show.showDateTime, 
            showId: show._id,
            occupiedSeats: show.occupiedSeats || {},
            price: show.showPrice
          });
        });

        setShow({
          movie: movieData,
          dateTime: dateTimeMap,
          allShows: shows 
        });
      } else {
        toast.error("No shows found for this movie");
      }
    } catch {
      toast.error("Error fetching shows");
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first");
    }

  
    if (selectedTime.occupiedSeats && selectedTime.occupiedSeats[seatId]) {
      return toast("Seat already booked");
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("You can only select 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;

          let isOccupied = false;
          if (selectedTime && selectedTime.occupiedSeats && selectedTime.occupiedSeats[seatId]) {
            isOccupied = true;
          }

          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              disabled={isOccupied}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer 
                 ${selectedSeats.includes(seatId) ? "bg-primary text-white" : ""}
                 ${isOccupied ? "bg-gray-600 border-gray-600 cursor-not-allowed opacity-50" : ""}
              `}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  useEffect(() => {
    getshow();
  }, []);

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-8">Available Timings</p>
        <div className="mt-5 space-y-1">
          {show.dateTime[selectedDate] ? (
            show.dateTime[selectedDate].map((item) => (
              <div
                key={item.time}
                onClick={() => setSelectedTime(item)}
                className={`flex items-center gap-2 px-6 py-3 pl-10 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
                  }`}
              >
                <ClockIcon className="w-4 h-4" />
                <p className="text-sm">{isoTimeFormat(item.time)}</p>
              </div>
            ))
          ) : (
            <p className="px-8 text-sm text-gray-400">No shows available for this date.</p>
          )}
        </div>
      </div>

   
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />
        <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>
        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>{group.map((row) => renderSeats(row))}</div>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            if (selectedSeats.length === 0) return toast("Please select at least one seat");
            if (!selectedTime) return toast("Please select a time slot");
            const pricePerTicket = selectedTime.price;
            const totalPrice = selectedSeats.length * pricePerTicket;
            navigate("/payment", { state: { movie: show.movie, selectedSeats, selectedTime, totalPrice, showId: selectedTime.showId } });
          }}
          className="flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95"
        >
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
