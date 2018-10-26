import {IPageHomeData} from "./pages/home/IPageHomeData"
import {IPageProjectsData} from "./pages/projects/IPageProjectsData"
import {IPageAlumniData} from "./pages/alumni/IPageAlumniData"
import {IPageThesisData} from "./pages/thesis/IPageThesisData"
import {IPageContactData} from "./pages/contact/IPageContactData"

export interface IAppData {
    home: IPageHomeData,
    projects: IPageProjectsData,
    alumni: IPageAlumniData,
    contact: IPageContactData,
    thesis: IPageThesisData,
}