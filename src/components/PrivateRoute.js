import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticationService } from 'src/services/authentication.service';


export const PrivateRoute = ({ component: Component, role, ...rest }) => {
    const navigate = useNavigate();
    console.log("Role:" + role);
    const currentUser = authenticationService.currentUserValue;
    console.log("User Roles: " + currentUser.roles);
    if (!currentUser) {
        // not logged in so redirect to login page with the return url
        navigate("/login", { replace: true });
    }
    // check if route is restricted by role
    if (role && currentUser.roles && !currentUser.roles.includes(role)) {
        // role not authorised so redirect to home page
        authenticationService.logout();
        navigate("/login", { replace: true });
    }
    return (<Component {...rest} />);
}