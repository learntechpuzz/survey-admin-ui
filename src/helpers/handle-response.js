import AuthService from 'src/services/auth.service';

export const handleResponse = (error) => {
    if ([401, 403].indexOf(error.response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        AuthService.logout();
    }
    const errorMessage = error.message || error.statusText;
    return Promise.reject(errorMessage);
}
