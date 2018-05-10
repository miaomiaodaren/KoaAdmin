export const isEmptyObject = (obj: any) => {
    for(let name in obj) {
        return false;
    }
    return true;
}