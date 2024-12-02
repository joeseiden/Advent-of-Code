export const parseArrToInt = (arr) => {
    return arr.map(num => parseInt(num));
}

export const splitAndParseInt = (str, splitStr = ',') => {
    return parseArrToInt(str.split(splitStr));
}

export const isAllAscending = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        if(arr[i] <= arr[i - 1]) {
            return false;
        }
    }
    return true;
}

export const isAllDescending = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        if(arr[i] >= arr[i - 1]) {
            return false;
        }
    }
    return true;
}