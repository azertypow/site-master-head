export function getArrayOfNumbersBetweenTwoNumbers(from: number, to: number) {
    const arrayOfDates: number[] = []
    const diff = to - from
    for(let i = 0; i <= diff; i++) {
        arrayOfDates.push(from + i)
    }
    return arrayOfDates
}