export const splitStringIntoEvenParts = (str, numParts) => {
    const totalLength = str.length
    const baseLength = Math.floor(totalLength / numParts)
    let remainder = totalLength % numParts

    const parts = []
    let startIndex = 0

    for (let i = 0; i < numParts; i++) {
        let currentPartLength = baseLength + (remainder > 0 ? 1 : 0)

        parts.push(str.slice(startIndex, startIndex + currentPartLength))

        startIndex += currentPartLength
        if(remainder > 0) {
            remainder--
        }
    }

    return parts
}