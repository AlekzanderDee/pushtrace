import { action } from './index'

export const HIDE_NAVBAR = 'HIDE_NAVBAR'
export const hideNavbarAC = (content) => action(HIDE_NAVBAR)

export const SHOW_NAVBAR = 'SHOW_NAVBAR'
export const showNavbarAC = () => action(SHOW_NAVBAR)


