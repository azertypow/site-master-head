export type BooleanInString = "true" | "false"

export type ImageOrientation = "landscape" | "portrait"

export type MediaType = "image" | "document" | "archive" | "code" | "video" | "audio"

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
    url: string;
    title_fr: string,
    title_en: string
}

export interface IGenericItem {
    year: "string",
}

/*
* HOME and BOTTOM BAR
* */
export interface IHomeData {
    url: string
    project_to_show_in_home: IProjectItem[]
}

export interface IProjectsAppearhome {
    project: IProjectItem[];
}

export interface IProjectsAppearBottomBar {
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
    uri: string;
    url: string;
    title: string;
    description_french: string;
    description_english: string;
    students: IStudentsItem[];
    tags: string;
    appear_bandeau: BooleanInString;
    text_bandeau_french: string;
    text_bandeau_english: string;
    appears_projects: BooleanInString;
    media: IMediaItemProject[];
    media_generated: IMediaItemProject[];
    images_multi_size: IMediaItemProject[];
}

export type Url = string;

export interface IMediaItemProject extends IMediaItem {
    meta: IMetaProject;
}

export interface IMedia_generatedItem {
    origin: IMediaItemProject,
    generated: {
        icon: Url,
        small: Url,
        regular: Url,
        large: Url,
    }
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
    info: IAllContentInfo;
    alumnis: IAlumnisItem[];
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

export interface IThesisItem extends IGenericItem {
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
export interface IMediaItemThesis extends IMediaItem{
    meta: IMetaThesis;
}
export interface IMetaThesis {
    caption: string;
}

/*
* CONTACT
* */
export interface IAllContacts {
    about: IAbout;
    team: ITeamItem[];
    links: ILinkItem[];
    intervenants: IIntervenantsItem[];
}
export interface IAbout {
    url: string;
    general_presentation_french: string;
    general_presentation_english: string;
    // etude_plan_french: string;
    // etude_plan_english: string;
    // general_informations_french: string;
    // general_informations_english: string;
    // external_link_about: string;
}
export interface ITeamItem {
    name_team: string;
    position_team: string;
    about_team: string;
    external_link_team: string;
    email_team: string;
}
export interface ILinkItem {
    title: string,
    link_value: string,
}

export interface IIntervenantsItem {
    intervenant_name: string;
}
