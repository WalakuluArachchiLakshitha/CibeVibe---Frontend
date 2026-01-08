import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import api from '../../lib/axios';
import toast from 'react-hot-toast';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/admin', {
                email: formData.email,
                password: formData.password
            });
            if (response.data.success) {
                toast.success("Admin Login Successful");
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/admin');
            } else {
                toast.error(response.data.message);
            }
        } catch {
            toast.error("Admin Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
                </div>
            </div>

       
            <div className="relative z-10 w-full max-w-md px-6">
              
                <div className="text-center mb-8">
                    <Link to="/">
                        <img src={assets.logo} alt="CineVibe Logo" className="w-48 h-auto mx-auto mb-4" />
                    </Link>
                    <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
                    <p className="text-gray-400">Sign in to access the admin dashboard</p>
                </div>

               
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Admin Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition placeholder-gray-500"
                                placeholder="admin@cinevibe.com"
                            />
                        </div>

                      
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition placeholder-gray-500"
                                placeholder="••••••••"
                            />
                        </div>

                      
                        <button
                            type="submit"
                            className="w-full py-3 bg-primary hover:bg-primary-dull transition rounded-lg font-semibold text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:scale-[1.02] transition-all duration-200"
                        >
                            Sign In as Admin
                        </button>
                    </form>

                   
                    <p className="mt-6 text-center text-sm text-gray-400">
                        Not an admin?{' '}
                        <Link to="/login" className="text-primary hover:text-primary-dull font-semibold transition">
                            User login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
