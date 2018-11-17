import {IAllPagesData} from "./app/IAppData"
import {IBottomBarData} from "./app/components/bottomBar/IBottomBarData"
import {IAllAlumni, IAllProjects, IAllThesis, IProjectsAppearhome} from "./api/genericsApiTypesIntefaces"

export async function getAllPagesData(): Promise<IAllPagesData> {
    return await getJsonData("http://localhost:8090/allPagesData.json") as IAllPagesData
}

/*
* HOME and BOTTOM BAR
* */
export async function getHomeProjectsData(): Promise<IProjectsAppearhome> {
    return await getJsonData("api/projects/appearhome") as IProjectsAppearhome
}

export async function getBottomBarData(): Promise<IBottomBarData> {
    return await getJsonData("http://localhost:8090/bottomBarData.json") as IBottomBarData
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
*  ==========
* */
export function getJsonData(url: string) {
    return new Promise((resolve, reject) => {

        //@todo remove time connection simulation
        setTimeout(() => { // time connection simulation

            const request = new XMLHttpRequest()

            request.open("GET", url, true)

            request.addEventListener("load", function(e) {
                if (this.readyState === 4) {
                    if(this.status === 200) {
                        resolve( JSON.parse(this.responseText))
                    } else {
                        reject(`XMLHttpRequest error on ${url}`)
                    }
                }
            })

            request.send(null)

        }, 1000) // time connection simulation
    })
}