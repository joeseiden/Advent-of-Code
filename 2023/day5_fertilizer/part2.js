import { readFileSync } from 'fs';

const largeInput = readFileSync('./input.txt', 'utf8');
const exampleInput = readFileSync('./example.txt', 'utf8');

const calculateLowestLocationValue = (input) => {
    const inputArray = input.split('\n\n');
    
    const parseRange = (row) => {
        const [destStart, sourceStart, range] = row.split(' ').map(num => parseInt(num));
        
        return {
            start: sourceStart, 
            end: sourceStart + range - 1, 
            offset: destStart - sourceStart
        }
    };

    // const range = (start, stop, step=1) => {
    //     return Array.from(
    //         {
    //             length: (stop - start) / step + 1
    //         }, (value, index) => start + index * step
    //     );
    // }

    const range = (start, stop) => {
        return {
            start,
            stop
        }
    }
    // const rangeOfLength = (start, length, step=1) => {
    //     return range(start, start+length -1, step);
    // }

    const parseSeedRanges = () => {
        return [...inputArray[0].matchAll(/\d+\s\d+/g)].map((seedPair) => {
            const [start, length] = seedPair[0].split(' ').map(num => parseInt(num));
            return {
                start,
                end: start + length - 1
            }
        });
    }

    const parseMapBlock = (mapBlock) => {    
        return mapBlock.split('\n').slice(1).map(row => parseRange(row)).sort((a, b) => a.sourceStart - b.sourceStart);
    }

    const seeds = parseSeedRanges();
    const mapBlocks = inputArray.slice(1).map(block => parseMapBlock(block));

    
    const isRangeOverlap = (rangeA, rangeB) => {
        return rangeA.start < rangeB.end && rangeB.start < rangeA.end
    }

    const shiftRange = (range, offset) => {
        return {
            start: range.start + offset,
            end: range.end + offset
        }
    }

  

    const applyTransformations = (base, transformations) => {
        for(let i = 0; i < transformations.length; i++) {
            const transformation = transformations[i];
            if(!isRangeOverlap(base, {start: transformation.start, end: transformation.end })) {
                continue;
            } else if(transformation.start <= base.start && base.end <= transformation.end) { 
                return [
                    shiftRange(base, transformation.offset)
                ];
            } else if (base.start <= transformation.start && transformation.end <= base.end) {
                return [
                    range(base.start, transformation.start),
                    shiftRange(transformation, transformation.offset ),
                    ...applyTransformations(range(transformation.end, base.end), transformations)
                ];
            } else if (transformation.start <= base.start && transformation.stop <= base.stop) {
                return [
                    shiftRange(range(base.start, transformation.stop), transformation.offset),
                    ...applyTransformations(range(transformation.stop, base.stop), transformations)
                ];
            } else if (base.start <= transformation.start && base.stop <= transformation.stop) {
                return [
                    range(base.start, transformation.start),
                    shiftRange(range(transformation.start, base.stop), transformation.offset)
                ];
            } else {
                continue;
            }
        }
        return [base];
    }

    const results = [];
    seeds.forEach((seedRange) => {
        let ranges = [seedRange];
        mapBlocks.forEach((transformations) => {
            ranges = ranges.flatMap((range) => applyTransformations(range, transformations));
            })
            results.push(ranges.sort((a, b) => a.start - b.start)[0].start);
    });

    console.log(results);
    return Math.min(...results);
        
    // return true;
}

// console.log(calculateLowestLocationValue(largeInput));
console.log(calculateLowestLocationValue(exampleInput));





