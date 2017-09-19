export const TOGGLE_SIDE_MENU = 'TOGGLE_SIDE_MENU'
export const OPEN_SIDE_MENU_STATE = 'OPEN_SIDE_MENU_STATE'
export const CLOSE_SIDE_MENU_STATE = 'CLOSE_SIDE_MENU_STATE'

export const TOGGLE_PINNED_MODE = 'TOGGLE_PINNED_MODE'

export const SET_MENU_CONTENT = 'SET_MENU_CONTENT'
export const REMOVE_MENU_CONTENT = 'REMOVE_MENU_CONTENT'

export function toggleSideMenu() {
    return {
        type: TOGGLE_SIDE_MENU,
    }
}

export function openSideMenu() {
    return {
        type: OPEN_SIDE_MENU_STATE,
    }
}

export function closeSideMenu() {
    return {
        type: CLOSE_SIDE_MENU_STATE,
    }
}

export function togglePinnedMode() {
    return {
        type: TOGGLE_PINNED_MODE,
    }
}


export function setMenuContent(newTitle, newItems) {
    return {
        type: SET_MENU_CONTENT,
        title: newTitle,
        items: newItems
    }
}


export function removeMenuContent() {
    return {
        type: REMOVE_MENU_CONTENT,
    }
}
