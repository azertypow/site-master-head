export type BooleanInString = "true" | "false"

export type PertinenceStatue = "false" | "header_position" | "middle_position" | "bottom_position"

export type ImageOrientation = "landscape" | "portrait"

export type MediaType = "image" | "document" | "archive" | "code" | "video" | "audio"

export enum PERTINENCE_SECTION_NAME {
    EVENT    = "event_pertinence",
    WORKSHOP = "workshop_pertinence",
    SEMINAR  = "seminar_pertinence",
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
}

export interface IMediaDimensions {
    width: number;
    height: number;
    ratio: number;
    orientation: ImageOrientation;
}

export interface IAllContentInfo {
    title: string;
    text_description_french: string;
    text_description_english: string;
}

export interface IGenericItem {
    year: "string",
}

/*
* HOME and BOTTOM BAR
* */
export interface IProjectsAppearhome {
    project: IProjectItem[];
}

/*
* PROJECTS
* */

export interface IAllProjects {
    info: IAllContentInfo;
    project: IProjectItem[];
}

export interface IProjectItem extends IGenericItem {
    url: string;
    title: string;
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
    media: IMediaItemProject[];
}

export interface IMediaItemProject extends IMediaItem {
    meta: IMetaProject;
}

export interface IMetaProject {
    image_description: string;
    copyright: string;
    sort?: string;
    imagedescription?: string;
}

/*
* ALUMNI
* */

export interface IAllAlumni {
    info: IAllAlumniInfos;
    alumnis: IAlumnisItem[];
}

export interface IAllAlumniInfos extends IAllContentInfo{
    url: string;
}

export interface IAlumnisItem extends IGenericItem {
    url: string;
    prenom_alumni: string;
    nom_alumni: string;
    actual_post_alumni: string;
    related_pp_alumni: string;
    related_thesis_alumni: string;
    website_perso_alumni: string;
    email_perso_alumni: string;
    external_link_alumni: string;
}

/*
* THESIS
* */

export interface IAllThesis {
    info: IAllContentInfo;
    thesis: IThesisItem[];
    pages: number;
    page: number;
}

interface IThesisItem extends IGenericItem {
    url: string;
    title_thesis_french: string;
    title_thesis_english: string;
    description_thesis_french: string;
    description_thesis_english: string;
    students_thesis: string;
    tuteurs_thesis: string;
    tags_thesis: string;
    media: IMediaItemThesis[];
}
interface IMediaItemThesis extends IMediaItem{
    meta: IMetaThesis;
}
interface IMetaThesis {
    caption: string;
}
