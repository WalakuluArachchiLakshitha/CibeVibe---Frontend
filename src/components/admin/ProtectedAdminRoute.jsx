import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoute = () => {
    
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    
    let user = null;
    try {
        user = userString ? JSON.parse(userString) : null;
    } catch {
        // Error parsing user data
    }

    
    const isAuthenticated = token && user;
    const isAdmin = user?.role === 'admin';

   
    if (!isAuthenticated) {
        
        return <Navigate to="/admin/login" replace />;
    }

    if (!isAdmin) {
        
        return <Navigate to="/" replace />;
    }

    
    return <Outlet />;
};

export default ProtectedAdminRoute;
