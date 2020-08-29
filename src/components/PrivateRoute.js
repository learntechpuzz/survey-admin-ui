import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from 'src/services/auth.service';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (<Navigate to="/login" replace={true} />);
    }
    // check if route is restricted by role
    if (currentUser && currentUser.roles && roles && !currentUser.roles.some(r => roles.includes(r)) === true) {
        // role not authorised so redirect to home page
        AuthService.logout();
        return (<Navigate to="/login" replace={true} />);
    }

    return (<Component {...rest} />);
}