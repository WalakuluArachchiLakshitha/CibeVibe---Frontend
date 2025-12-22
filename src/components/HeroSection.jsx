import React from "react";
import { assets } from "../assets/assets";
import {  ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url('/backgroundImage.png')] bg-cover bg-center h-screen">
      <img
        src={assets.marvelLogo}
        alt="Marvel Logo"
        className="max-h-11 lg:h-11 mt-20"
      />

      <h1 className="text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110">
        {" "}
        Guardians <br /> of the Galaxy
      </h1>

      <div className="flex items-center gap-4 text-gray-300">
        <span> Action | Adventure | Sci-Fi</span>

        <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4"/> 2018
        </div>
         <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4"/> 2h 8m
        </div>
      </div>
      <p className="max-w-md text-gray-300">
         a ragtag team of intergalactic outlaws—Peter Quill (Star-Lord), Gamora, Drax, Rocket (a raccoon), and Groot (a tree)—who reluctantly band together in the Marvel Cinematic Universe (MCU) to protect the cosmos from powerful threats, often after getting into trouble themselves, blending sci-fi action, humor, and heart with iconic soundtracks
      </p>
      <button className="flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dull transition rounded-full font-medium" onClick={() => navigate("/movies")}>
        Explore Movies
        <ArrowRight className="w-5 h-5 ml-2"/>
      </button>
    </div>
  );
};

export default HeroSection;
