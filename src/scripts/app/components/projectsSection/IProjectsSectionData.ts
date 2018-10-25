import {IProjectData} from "../project/IProjectData"

export interface IProjectsSectionData {
    title: {
        fr: string,
        en: string,
    }
    description: {
        fr: string,
        en: string,
    }
    projects: IProjectData[]
}