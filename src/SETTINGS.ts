import {LANG_LIST} from "./scripts/GLOBAL_ENUMS"

export const DEFAULT_SITE_LANG = LANG_LIST.FR

export enum PAGES_PATHNAME {
    ALUMNI = "/alumni",
    CONTACT = "/contact",
    HOME = "/home",
    PROJECT = "/project",
    THESIS = "/thesis",
}

export const PAGE_SETTINGS: IPageSettings = {
    [PAGES_PATHNAME.ALUMNI]: {
        backgroundIsDark: true,
        pathname: PAGES_PATHNAME.ALUMNI,
    },
    [PAGES_PATHNAME.CONTACT]: {
        backgroundIsDark: false,
        pathname: PAGES_PATHNAME.CONTACT,
    },
    [PAGES_PATHNAME.HOME]: {
        backgroundIsDark: true,
        pathname: PAGES_PATHNAME.HOME,
    },
    [PAGES_PATHNAME.PROJECT]: {
        backgroundIsDark: true,
        pathname: PAGES_PATHNAME.PROJECT,
    },
    [PAGES_PATHNAME.THESIS]: {
        backgroundIsDark: true,
        pathname: PAGES_PATHNAME.THESIS,
    },
}

export interface IPageSettings {
    [key: string]: {
        pathname: PAGES_PATHNAME,
        backgroundIsDark: boolean
    }
}