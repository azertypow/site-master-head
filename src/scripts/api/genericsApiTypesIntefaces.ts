export type BooleanInString = "true" | "false"

export type PertinenceStatue = "false" | "header_position" | "middle_position" | "bottom_position"

export type ImageOrientation = "landscape" | "portrait"

export type MediaType = "image" | "document" | "archive" | "code" | "video" | "audio"

export enum PERTINENCE_SECTION_NAME {
    EVENT    = "event_pertinence",
    WORKSHOP = "workshop_pertinence",
    SEMINAR  = "seminar_pertinence",
}

export interface IProjectItem {
    url: string;
    title: string;
    year: string;
    description_french: string;
    description_english: string;
    students: IStudentsItem[];
    tags: string;
    appear_homepage: BooleanInString;
    [PERTINENCE_SECTION_NAME.EVENT]: PertinenceStatue;
    [PERTINENCE_SECTION_NAME.WORKSHOP]: PertinenceStatue;
    [PERTINENCE_SECTION_NAME.SEMINAR]: PertinenceStatue;
    appear_bandeau: BooleanInString;
    text_bandeau_french: string;
    text_bandeau_english: string;
    appears_projects: BooleanInString;
    media: IMediaItem[];
}

export interface IStudentsItem {
    students_name: string;
}

export interface IMediaItem {
    root: string;
    url: string;
    hash: string;
    dir: string;
    filename: string;
    name: string;
    safeName: string;
    extension: string;
    size: number;
    niceSize: string;
    modified: string;
    mime: string;
    type: MediaType;
    dimensions: IMediaDimensions;
    isWritable: boolean;
    isReadable: boolean;
    isExecutable: boolean;
    header: string;
    meta: IMeta;
}

export interface IMediaDimensions {
    width: number;
    height: number;
    ratio: number;
    orientation: ImageOrientation;
}

export interface IMeta {
    image_description: string;
    copyright: string;
    sort?: string;
    imagedescription?: string;
}
