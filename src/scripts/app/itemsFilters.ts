import {IGenericItem, IProjectItem} from "../api/genericsApiTypesIntefaces"

export function getItemsFilterByDates<T extends IGenericItem>(arrayOfItems: T[], filterDate: IFilterDate): T[] {
    const listToReturn: T[] = []

    for(const item of arrayOfItems) {
        let itemYear = parseInt(item.year)
        if(Number.isNaN(itemYear)) itemYear = filterDate.from

        const projectYearIsInSelection = itemYear >= filterDate.from && itemYear <= filterDate.to

        if(projectYearIsInSelection) listToReturn.push(item)
    }

    return listToReturn
}

export interface IFilterDate {
    from: number,
    to: number,
}
