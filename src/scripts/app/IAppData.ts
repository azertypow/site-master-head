import {IPageHomeData} from "./pages/home/IPageHomeData"
import {IPageProjectsData} from "./pages/projects/IPageProjectsData"
import {IPageThesisData} from "./pages/thesis/IPageThesisData"
import {IPageContactData} from "./pages/contact/IPageContactData"
import {IAllAlumni, IAllContacts, IAllProjects, IAllThesis} from "../api/genericsApiTypesIntefaces"

export interface IAppData {
    allPagesData:   IAllPagesData,
    allProjects:    IAllProjects,
    allAlumni:      IAllAlumni,
    allThesis:      IAllThesis,
    allContacts:    IAllContacts,
}

export interface IAllPagesData {
    home:       IPageHomeData,
    projects:   IPageProjectsData,
    contact:    IPageContactData,
    thesis:     IPageThesisData,
}