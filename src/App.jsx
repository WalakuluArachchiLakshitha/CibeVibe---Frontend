import React from "react";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Movies from "./pages/Movies.jsx";
import SeatLayout from "./pages/SeatLayout.jsx";
import Favorite from "./pages/Favorite.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Payment from "./pages/Payment.jsx";
import BookingSuccess from "./pages/BookingSuccess.jsx";
import Theaters from "./pages/Theaters.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import { Toaster } from 'react-hot-toast';
import Footer from "./components/Footer.jsx";
import { AddShows } from "./pages/admin/AddShows.jsx";
import { ListBookings } from "./pages/admin/ListBookings.jsx";
import { ListShows } from "./pages/admin/ListShows.jsx";
import { Layout } from "./pages/admin/Layout.jsx";
import { Dashboard } from "./pages/admin/Dashboard.jsx";
import { AddMovies } from "./pages/admin/addMovies.jsx";
import { ListMovies } from "./pages/admin/ListMovies.jsx";
import { UpdateMovies } from "./pages/admin/updateMovies.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute.jsx";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <div className='min-h-screen bg-black text-white font-outfit'>
      <Toaster />
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/theaters" element={<Theaters />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/seat-layout/:id" element={<SeatLayout />} />

       
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking-success" element={<BookingSuccess />} />

        
        <Route path="/admin/login" element={<AdminLogin />} />

        
        <Route element={<ProtectedAdminRoute />}>
          <Route path='/admin/*' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-movies" element={<AddMovies />} />
            <Route path="list-movies" element={<ListMovies />} />
            <Route path="add-shows" element={<AddShows />} />
            <Route path="list-shows" element={<ListShows />} />
            <Route path="list-bookings" element={<ListBookings />} />
            <Route path="update-movies/:id" element={<UpdateMovies />} />
          </Route>
        </Route>

      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
