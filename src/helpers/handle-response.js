import { authenticationService } from 'src/services/authentication.service';

export const handleResponse = (error) => {
    if ([401, 403].indexOf(error.response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        authenticationService.logout();
    }
    const errorMessage = error.message || error.statusText;
    return Promise.reject(errorMessage);
}
