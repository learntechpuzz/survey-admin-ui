import axios from "axios";
import { handleResponse } from 'src/helpers/handle-response';

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {

    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('currentUser', JSON.stringify(response.data));
                }
                return response.data;
            })
            .catch(handleResponse);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

}

export default new AuthService();