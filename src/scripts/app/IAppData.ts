import {IPageHomeData} from "./pages/home/IPageHomeData"
import {IPageProjectsData} from "./pages/projects/IPageProjectsData"
import {IPageAlumniData} from "./pages/alumni/IPageAlumniData"

export interface IAppData {
    home: IPageHomeData,
    projects: IPageProjectsData,
    alumni: IPageAlumniData,
}