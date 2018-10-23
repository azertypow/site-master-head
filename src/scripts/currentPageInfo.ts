import {PAGE_SETTINGS, PAGES_PATHNAME} from "../SETTINGS"

export function getWindowPageInfo(window: Window): IWindowPageInfo {
    let pathname: PAGES_PATHNAME
    let backgroundIsDark: boolean

    try {
        pathname = PAGE_SETTINGS[window.location.pathname].pathname
        backgroundIsDark = PAGE_SETTINGS[window.location.pathname].backgroundIsDark
    } catch (e) {
        console.error("can't get window page info: ", e)
        window.history.pushState(PAGES_PATHNAME.HOME, PAGES_PATHNAME.HOME, PAGES_PATHNAME.HOME)
        pathname = PAGE_SETTINGS[PAGES_PATHNAME.HOME].pathname
        backgroundIsDark = PAGE_SETTINGS[PAGES_PATHNAME.HOME].backgroundIsDark
    }

    return {
        pathname: pathname,
        backgroundIsDark: backgroundIsDark
    }
}

export interface IWindowPageInfo {
    pathname: PAGES_PATHNAME,
    backgroundIsDark: boolean,
}