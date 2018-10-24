import {IProjectData} from "./components/project/IProjectData"
import {HOME_PROJECT_POSITIONS} from "../GLOBAL_ENUMS"

export interface IHomeProjectsData {
    workshops:  IProjectDataInHome[]
    seminars:   IProjectDataInHome[]
    events:     IProjectDataInHome[]
}

export interface IProjectDataInHome extends IProjectData {
    position: HOME_PROJECT_POSITIONS
}