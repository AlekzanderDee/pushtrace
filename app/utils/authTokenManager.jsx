import { TOKEN } from './settings'

export default class AuthTokenManager {

    static getToken = () => localStorage.getItem(TOKEN)

    static deleteToken = () => localStorage.removeItem(TOKEN)

    static getTokenPayload = () => {
        const token = AuthTokenManager.getToken()
        if (!!token){
            return JSON.parse(atob(token.split('.')[1]))
        } else {
            return null
        }
    }

}
