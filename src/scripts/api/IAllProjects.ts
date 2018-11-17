import {IProjectItem} from "./genericsApiTypesIntefaces"

export interface IAllProjects {
    info: IAllProjectsInfo;
    project: IProjectItem[];
}

export interface IAllProjectsInfo {
    title: string;
    text_description_french: string;
    text_description_english: string;
}
