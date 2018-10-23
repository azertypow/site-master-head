import {IPageHomeData} from "./pages/home/IPageHomeData"
import {IAppMenuData} from "./components/appMenu/IAppMenuData"
import {IPageProjectsData} from "./pages/projects/IPageProjectsData"
import {IPageAlumniData} from "./pages/alumni/IPageAlumniData"

export interface IAppData {
    menu: IAppMenuData,
    home: IPageHomeData,
    projects: IPageProjectsData,
    alumni: IPageAlumniData,
}