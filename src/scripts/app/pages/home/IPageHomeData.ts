import {IHeaderWithImageData} from "../../components/header/IHeaderWithImageData"
import {IProjectData} from "../../components/project/IProjectData"

export interface IPageHomeData {
    header: IHeaderWithImageData
    content: {
        workshop: IProjectData[]
        seminary: IProjectData[]
        event: IProjectData[]
    }
}
