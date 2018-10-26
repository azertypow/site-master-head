export function pushArrayInArray(arrayToAdd: Array<any>, arrayToExtend: Array<any>) {
    for(const value of arrayToAdd) {
        arrayToExtend.push(value);
    }
}