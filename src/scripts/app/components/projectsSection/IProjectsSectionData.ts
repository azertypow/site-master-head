import {IProjectItem} from "../../../api/genericsApiTypesIntefaces"

export interface IProjectsSectionData {
    title: {
        fr: string,
        en: string,
    }
    description: {
        fr: string,
        en: string,
    }
    projects: IProjectsPositionInSection
}

export interface IProjectsPositionInSection {
    header_position: IProjectItem | null,
    middle_position: IProjectItem | null,
    bottom_position: IProjectItem | null,
}
