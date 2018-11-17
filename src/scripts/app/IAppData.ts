import {IPageHomeData} from "./pages/home/IPageHomeData"
import {IPageProjectsData} from "./pages/projects/IPageProjectsData"
import {IPageAlumniData} from "./pages/alumni/IPageAlumniData"
import {IPageThesisData} from "./pages/thesis/IPageThesisData"
import {IPageContactData} from "./pages/contact/IPageContactData"
import {IAllProjects} from "../api/IAllProjects"

export interface IAppData {
    allPagesData: IAllPagesData,
    allProjects: IAllProjects,
}

export interface IAllPagesData {
    home: IPageHomeData,
    projects: IPageProjectsData,
    alumni: IPageAlumniData,
    contact: IPageContactData,
    thesis: IPageThesisData,
}