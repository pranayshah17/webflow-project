// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ authenticated, children }) {
    return authenticated ? (
        { children }
    ) : (
        <Navigate to="/login" replace />
    );
}

export default PrivateRoute;
