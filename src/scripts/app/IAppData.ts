import {IPageHomeData} from "./pages/home/IPageHomeData"
import {IPageProjectsData} from "./pages/projects/IPageProjectsData"
import {IPageAlumniData} from "./pages/alumni/IPageAlumniData"
import {IPageThesisData} from "./pages/thesis/IPageThesisData"
import {IPageContactData} from "./pages/contact/IPageContactData"
import {IAllAlumni, IAllProjects} from "../api/genericsApiTypesIntefaces"

export interface IAppData {
    allPagesData:   IAllPagesData,
    allProjects:    IAllProjects,
    allAlumni:      IAllAlumni,
}

export interface IAllPagesData {
    home:       IPageHomeData,
    projects:   IPageProjectsData,
    alumni:     IPageAlumniData,
    contact:    IPageContactData,
    thesis:     IPageThesisData,
}