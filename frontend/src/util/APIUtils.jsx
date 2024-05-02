import { API_BASE_URL, ACCESS_TOKEN } from '../constants/index';
import '../css/Main.css';
const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function signIn(signInRequest) {

    return new Promise((resolve, reject) => {
        request({
            url: API_BASE_URL + "/signIn",
            method: 'POST',
            body: JSON.stringify(signInRequest)
        })
            .then(response => resolve(response))
            .catch(error => reject(error))
    });

}
export function signUp(signupRequest) {
    return request({
        url: API_BASE_URL + "/signUp",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function createQna(createQnaRequest){
    return request({
        url: API_BASE_URL + "/api/board",
        method: 'POST',
        body: JSON.stringify(createQnaRequest)
    })
}

export function readQna(keyword, viewNum, pageNum, boardNum) {
    const queryParams = new URLSearchParams({
        keyword: keyword,
        sortBy: viewNum,
        page: pageNum,
        size: boardNum,
    });

    const url = `${API_BASE_URL}/api/board?${queryParams.toString()}`;

    return request({
        url: url,
        method: 'GET'
    });
}

export function getQnaRead(id) {

    const url = `${API_BASE_URL}/api/board/${id}`;

    return request({
        url: url,
        method: 'GET'
    });
}



export function currentUser(){
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    })
}