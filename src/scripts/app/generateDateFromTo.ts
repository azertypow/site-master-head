import {getArrayOfNumbersBetweenTwoNumbers} from "../getArrayIntBetweenTwoNumbers"
import {YEAR} from "../GLOBAL_ENUMS"
import {IProjectItem} from "../api/genericsApiTypesIntefaces"

export function generateDateFromTo(projects: IProjectItem[]): number[] {

    let from: number | undefined
    let to:   number | undefined

    for(const project of projects) {

        const projectDate = parseInt(project.year)

        if(from === undefined || Number.isNaN(from)) from = projectDate
        if(to   === undefined || Number.isNaN(to  )) to   = projectDate

        if(projectDate < from) from = projectDate
        if(projectDate > to  ) to   = projectDate
    }

    if(from === undefined   || Number.isNaN(from)) from = YEAR.MIN_FROM
    if(to   === undefined   || Number.isNaN(to  )) to   = YEAR.MAX_TO

    return getArrayOfNumbersBetweenTwoNumbers(from, to)
}