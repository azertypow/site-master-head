import {
    IAllAlumni, IAllContacts,
    IAllProjects,
    IAllThesis, IHomeData, IProjectItem,
    IProjectsAppearBottomBar,
    IProjectsAppearhome
} from "./api/genericsApiTypesIntefaces"

/*
* HOME and BOTTOM BAR
* */
export async function getHomeData(): Promise<IHomeData> {
    return await getJsonData("api/home") as IHomeData
}

export async function getBottomBarData(): Promise<IProjectsAppearBottomBar> {
    return await getJsonData("api/projects/appearbandeau") as IProjectsAppearBottomBar
}

/*
* GET ONE PROJECT
* */
export async function getProjectsByUri(uri: string): Promise<IProjectItem> {
    const encodedUri = encodeURIComponent(uri);
    return await getJsonData(`api/projects/uri=${encodedUri}`) as IProjectItem
}

/*
* ALL PROJECT
* */
export async function getAllProjects(): Promise<IAllProjects> {
    return await getJsonData("api/projects/") as IAllProjects
}

export async function getProjectsTags(): Promise<string[]> {
    return await getJsonData("api/projects/alltags") as string[]
}

/*
* ALL ALUMNI
* */
export async function getAllAlumni(): Promise<IAllAlumni> {
    return await getJsonData("api/alumnis") as IAllAlumni
}

/*
* ALL THESIS
* */
export async function getAllThesis(): Promise<IAllThesis> {
    return await getJsonData("api/thesis") as IAllThesis
}

/*
* ALL CONTACT
* */
export async function getAllContact(): Promise<IAllContacts> {
    return await getJsonData("api/contact/about") as IAllContacts
}

/*
*  ==========
* */
export function getJsonData(url: string) {
    return new Promise((resolve, reject) => {

        // //@todo remove time connection simulation
        // setTimeout(() => { // time connection simulation

            const request = new XMLHttpRequest()

            request.open("GET", url, true)

            request.addEventListener("load", function(e) {
                if (this.readyState === 4) {
                    if(this.status === 200) {
                        try {
                            resolve( JSON.parse(this.responseText))
                        } catch (e) {
                            reject(`can't format json on ${url}`)
                        }
                    } else {
                        reject(`XMLHttpRequest error on ${url}`)
                    }
                }
            })

            request.send(null)

        // }, 1000) // time connection simulation
    })
}