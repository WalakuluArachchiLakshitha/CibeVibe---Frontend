import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoute = () => {
    // 1. Get token and user from localStorage
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    // 2. Parse user safely
    let user = null;
    try {
        user = userString ? JSON.parse(userString) : null;
    } catch {
        // Error parsing user data
    }

    // 3. Check Authorizations
    // Condition A: Must have a token
    // Condition B: Must have a user object
    // Condition C: User role must be 'admin'
    const isAuthenticated = token && user;
    const isAdmin = user?.role === 'admin';

    // 4. Handle Redirections
    if (!isAuthenticated) {
        // Not logged in -> Go to Admin Login
        return <Navigate to="/admin/login" replace />;
    }

    if (!isAdmin) {
        // Logged in but not admin -> Go to Home (or show 403 Forbidden)
        return <Navigate to="/" replace />;
    }

    // 5. Authorized -> Render Child Routes
    return <Outlet />;
};

export default ProtectedAdminRoute;
