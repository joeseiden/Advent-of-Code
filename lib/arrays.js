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

export const findMiddleElement = (arr) => {
    if(arr.length % 2 == 0) {
        throw new Error("Array has an even number of elements");
    } else {
        return arr[(arr.length - 1) / 2]
    }
}

export const includesSubArray = (bigArr, subArr) => {
    for (let i = 0; i < bigArr.length; i++) {
        if(isArraysEqual(bigArr[i], subArr)) {
            return true;
        }
    }
    return false;
}

export const isArraysEqual = (arr1, arr2) => {
    if(arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if(arr1[i] !== arr2[i]) {
            return false
        }
    }

    return true;
}

export const range = (length, start = 0) => [...Array(length).keys()].map(i => i + start)

export const isAllElementsEqual = arr => arr.every(el => el === arr[0])