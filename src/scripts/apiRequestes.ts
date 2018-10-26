import {IAppData} from "./app/IAppData"
import {ITagsData} from "./app/ITagsData"
import {IDatesData} from "./app/IDatesData"
import {IHomeProjectsData} from "./app/IHomeProjectsData"
import {IBottomBarData} from "./app/components/bottomBar/IBottomBarData"
import {getArrayOfNumbersBetweenTwoNumbers} from "./getArrayIntBetweenTwoNumbers"

export async function getAppData(): Promise<IAppData> {
    return await getJsonData("http://localhost:8090/appData.json") as IAppData
}

export async function getProjectsTags(): Promise<string[]> {
    return (await getJsonData("http://localhost:8090/tagsData.json") as ITagsData).projects
}

export async function getProjectsDataFromTo(): Promise<number[]> {

    const dataFromTo = await getJsonData("http://localhost:8090/datesData.json") as IDatesData

    const from = parseInt(dataFromTo.projects.from)
    const to   = parseInt(dataFromTo.projects.to)

    return getArrayOfNumbersBetweenTwoNumbers(from, to)}

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