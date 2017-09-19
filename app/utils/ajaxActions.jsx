import request from 'superagent';
import { TOKEN } from './settings'
import {browserHistory} from 'react-router'
import urlMap from './urlManager'
import AuthTokenManager from './authTokenManager'


const _createHeaders = () => {
    let headers = {'Accept': 'application/json'}

    const token = localStorage.getItem(TOKEN)
    if (token) {
        headers['Authorization'] = 'JWT ' + token
    }
    return headers
}

const _updateTokenFromResponse = (token) => {
    localStorage.setItem(TOKEN, token)
}

const _processResponse = (response) => {
    if (!!response.body.token) {
        _updateTokenFromResponse(response.body.token)
    }
    return response
}

const _catchErrors = error => {
    if (error.response.statusCode == 401 || error.response.statusCode == 403){
        AuthTokenManager.deleteToken()
        browserHistory.push(urlMap.signIn)
    }
    throw error
}

export const ajaxPOST = (options) => {
    const headers = _createHeaders()
    return request
            .post(options.url)
            .set(headers)
            .send(options.data)
            .then(_processResponse)
            .catch(_catchErrors);
}

export const ajaxPUT = (options) => {
    const headers = _createHeaders()
    return request
            .put(options.url)
            .set(headers)
            .send(options.data)
            .then(_processResponse)
            .catch(_catchErrors);
}

export const ajaxGET = (options) => {
    const headers = _createHeaders()

        // dispatch(options.onRequest())
        return request
            .get(options.url)
            .set(headers)
            .query(options.query)
            .then(_processResponse)
            .catch(_catchErrors);
}



export const ajaxDELETE = (options) => {
    const headers = _createHeaders()

        // dispatch(options.onRequest())
        return request
            .del(options.url)
            .set(headers)
            .send(options.data)
            .then(_processResponse)
            .catch(_catchErrors);
}
