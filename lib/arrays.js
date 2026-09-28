import { isBetween } from "./math.js";

export const parseArrToInt = (arr) => {
    return arr.map(num => {
        const parsed = parseInt(num)
        if(isNaN(parsed)) {
            return undefined
        }
        return parsed
    });
}

export const splitAndParseInt = (str, splitStr = ',') => {
    return parseArrToInt(str.split(splitStr));
}

export const splitInputStringToArray = (inputStr) => {
    return inputStr.split('\n').map(row => row.split(''))
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

export const allAdjacentElementsFlattened = (arr, coords) => {
    const [i, j] = coords;
    const adjacentEls = [];

    for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
            if(!(di === 0 && dj === 0) && isBetween(i + di, -1, arr.length) && isBetween(j + dj, -1, arr[i].length)) {
                adjacentEls.push(arr[i + di][j + dj])
            }
        }
    }

    return adjacentEls
}

export const splitArrOnDelimiter = (arr, delimiter) => {
    return arr.reduce((acc, el) => {
        if (el === delimiter) {
            acc.push([]);
        } else {
            if (acc.length === 0) {
                acc.push([]);
            }
            acc[acc.length - 1].push(el);
        }
        return acc;
    }, []).filter(sub => sub.length > 0);
}

export const range = (length, start = 0) => [...Array(length).keys()].map(i => i + start)

export const isAllElementsEqual = arr => arr.every(el => el === arr[0])

export const reduceDigitsToOneNumber = arr => parseInt(arr.reduce((currentVal, digit) => currentVal + digit.toString(), ''))