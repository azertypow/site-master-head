export function pushArrayInArray(arrayToAdd: Array<any>, arrayToExtend: Array<any>) {
    for(const value of arrayToAdd) {
        console.log(value)
        arrayToExtend.push(value);
    }
}