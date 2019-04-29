import {IProjectItem} from "../../../api/genericsApiTypesIntefaces"

export interface IPageHomeData {
    url?: string,
    project_to_show_in_home: IProjectItem[]
}
