import { action } from './index'

export const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT'
export const setModalContentAC = (content) => action(SET_MODAL_CONTENT, {content})

export const OPEN_MODAL = 'OPEN_MODAL'
export const openModalAC = () => action(OPEN_MODAL)


export const CLOSE_MODAL = 'CLOSE_MODAL'
export const closeModalAC = () => action(CLOSE_MODAL)
