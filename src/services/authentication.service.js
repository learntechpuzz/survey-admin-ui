import { BehaviorSubject } from 'rxjs';
import axios from "axios";
import { handleResponse } from 'src/helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
const API_URL = "http://localhost:8080/api/auth/";

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function login(username, password) {    
    return axios
        .post(API_URL + "signin", {
            username,
            password
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("currentUser", JSON.stringify(response.data));
                currentUserSubject.next(response.data);
            }
            return response.data;
        })
        .catch(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
