import {IAppData} from "./app/IAppData"
import {ITagsData} from "./app/ITagsData"
import {IDatesData} from "./app/IDatesData"
import {IHomeProjectsData} from "./app/IHomeProjectsData"
import {IBottomBarData} from "./app/components/bottomBar/IBottomBarData"

export async function getAppData(): Promise<IAppData> {
    return await getJsonData("http://localhost:8090/appData.json") as IAppData
}

export async function getProjectsTags(): Promise<string[]> {
    return (await getJsonData("http://localhost:8090/tagsData.json") as ITagsData).projects
}

export async function getProjectsDataFromTo(): Promise<number[]> {

    const projectsDataFromTo = await getJsonData("http://localhost:8090/datesData.json") as IDatesData

    const from = parseInt(projectsDataFromTo.projects.from)
    const to   = parseInt(projectsDataFromTo.projects.to)

    return (() => {
        const arrayOfDates: number[] = []
        const diff = to - from
        for(let i = 0; i <= diff; i++) {
            arrayOfDates.push(from + i)
        }
        return arrayOfDates
    })()
}

export async function getAlumniDataFromTo(): Promise<number[]> {

    const alumniDataFromTo = await getJsonData("http://localhost:8090/datesData.json") as IDatesData

    const from = parseInt(alumniDataFromTo.alumni.from)
    const to   = parseInt(alumniDataFromTo.alumni.to)

    return (() => {
        const arrayOfDates: number[] = []
        const diff = to - from
        for(let i = 0; i <= diff; i++) {
            arrayOfDates.push(from + i)
        }
        return arrayOfDates
    })()
}

export async function getHomeProjectsData(): Promise<IHomeProjectsData> {
    return await getJsonData("http://localhost:8090/homeProjectsData.json") as IHomeProjectsData
}

export async function getBottomBarData(): Promise<IBottomBarData> {
    return await getJsonData("http://localhost:8090/bottomBarData.json") as IBottomBarData
}

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