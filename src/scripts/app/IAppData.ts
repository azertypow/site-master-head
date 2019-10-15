import {IPageHomeData} from "./pages/home/IPageHomeData"
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
    projects:   pageData,
    thesis:     pageData,
    alumni:     pageData,
    contact:    pageData,
}

export interface pageData {
    url: "",
    title_fr: "",
    title_en: "",
}