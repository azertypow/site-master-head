import {IAllPagesData} from "./app/IAppData"
import {IDatesData} from "./app/IDatesData"
import {IBottomBarData} from "./app/components/bottomBar/IBottomBarData"
import {getArrayOfNumbersBetweenTwoNumbers} from "./getArrayIntBetweenTwoNumbers"
import {IProjectsAppearhome} from "./api/IProjectsAppearhome"
import {IAllAlumni, IAllProjects} from "./api/genericsApiTypesIntefaces"

export async function getAllPagesData(): Promise<IAllPagesData> {
    return await getJsonData("http://localhost:8090/allPagesData.json") as IAllPagesData
}

export async function getAllProjects(): Promise<IAllProjects> {
    return await getJsonData("api/projects/") as IAllProjects
}

export async function getProjectsTags(): Promise<string[]> {
    return await getJsonData("api/projects/alltags") as string[]
}

export async function getAllAlumni(): Promise<IAllAlumni> {
    return await getJsonData("api/alumnis") as IAllAlumni
}

export async function getAlumniDataFromTo(): Promise<number[]> {

    const dataFromTo = await getJsonData("http://localhost:8090/datesData.json") as IDatesData

    const from = parseInt(dataFromTo.alumni.from)
    const to   = parseInt(dataFromTo.alumni.to)

    return getArrayOfNumbersBetweenTwoNumbers(from, to)
}

export async function getThesisDataFromTo(): Promise<number[]> {

    const dataFromTo = await getJsonData("http://localhost:8090/datesData.json") as IDatesData

    const from = parseInt(dataFromTo.thesis.from)
    const to   = parseInt(dataFromTo.thesis.to)

    return getArrayOfNumbersBetweenTwoNumbers(from, to)}

export async function getHomeProjectsData(): Promise<IProjectsAppearhome> {
    return await getJsonData("api/projects/appearhome") as IProjectsAppearhome
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