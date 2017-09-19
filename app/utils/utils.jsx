import { TOKEN } from './settings'

export const checkIsAuthenticated = () => !!localStorage.getItem(TOKEN)


