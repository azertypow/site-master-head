import {IPageHomeData} from "./pages/home/IPageHomeData"
import {IAppMenuData} from "./components/appMenu/IAppMenuData"
import {IPageProjectsData} from "./pages/projects/IPageProjectsData"

export interface IAppData {
    menu: IAppMenuData,
    home: IPageHomeData,
    projects: IPageProjectsData,
}