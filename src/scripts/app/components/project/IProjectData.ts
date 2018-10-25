import {IImageData} from "../image/IImageData"

export interface IProjectData {
    authors: string[]
    title: string
    text: {
        fr: string
        en: string
    }
    // images: IImageData[]
}