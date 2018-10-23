import {IImageData} from "../image/IImageData"

export interface IProjectData {
    author: string[]
    title: string
    text: {
        fr: string
        en: string
    }
    images: IImageData[]
}