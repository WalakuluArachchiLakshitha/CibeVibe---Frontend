import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password,
            });

            if (response.data.success) {
                toast.success("Login Successful");
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch {
            toast.error("Login Failed");
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/google-login`,
                    { token: response.access_token }
                );

                toast.success("Login successful!");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                if (res.data.user.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } catch {
                toast.error("Google Login failed. Please try again");
            }
        },
        onError: () => {
            toast.error("Google Login canceled.");
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-md px-6">

                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/">
                        <img src={assets.logo} alt="CineVibe Logo" className="w-48 mx-auto" />
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to continue your movie journey</p>
                </div>

                {/* Form */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl text-white">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Email */}
                        <div>
                            <label className="text-sm">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Remember Me */}
                        <div className="flex justify-between text-sm text-gray-300">
                            <label className="flex items-center gap-2">
                                <input type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                />
                                Remember me
                            </label>
                            <Link to="/forgot-password" className="text-primary">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit */}
                        <button className="w-full py-3 bg-primary rounded-lg font-semibold text-white">
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="text-center my-6 text-gray-400 text-sm">OR</div>

                    {/* Google Login */}
                    <button
                        onClick={googleLogin}
                        className="w-full py-3 bg-white text-black rounded-lg flex items-center justify-center gap-2"
                    >
                        <span>Continue with Google</span>
                    </button>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        Don't have an account? <Link to="/register" className="text-primary">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
