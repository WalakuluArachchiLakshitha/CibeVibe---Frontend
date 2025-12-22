import React from "react";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Movies from "./pages/Movies.jsx";
import SeatLayout from "./pages/SeatLayout.jsx";
import Favorite from "./pages/Favorite.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import {Toaster} from 'react-hot-toast';
import Footer from "./components/Footer.jsx";
import { AddShows } from "./pages/admin/AddShows.jsx";
import { ListBookings } from "./pages/admin/ListBookings.jsx";
import { ListShows } from "./pages/admin/ListShows.jsx";
import { Layout } from "./pages/admin/Layout.jsx";
import { Dashboard } from "./pages/admin/Dashboard.jsx";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <div>
      <>
      <Toaster />
        {!isAdminRoute && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id/:date" element={<SeatLayout />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          
          <Route path='/admin/*' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-shows" element={<AddShows />} />
            <Route path="list-bookings" element={<ListBookings />} />
            <Route path="list-shows" element={<ListShows />} />
          </Route>
        </Routes>

        {!isAdminRoute && <Footer />}
      </>
    </div>
  );
};

export default App;
