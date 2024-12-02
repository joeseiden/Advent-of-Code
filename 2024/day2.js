import { readFileSync } from "fs";
import { splitAndParseInt, isBetween, isAllAscending, isAllDescending } from "../lib/index.js";

const exampleInput = readFileSync('./inputs/day2_example.txt', 'utf8');
const input = readFileSync('./inputs/day2.txt', 'utf8');

const parseInput = (input) => input.split('\n').map(report => splitAndParseInt(report, ' '));

const part1 = (input) => {
    const reports = parseInput(input);
    let safeCount = 0;
    reports.forEach((report) => {
        safeCount += isReportSafe(report, report[0] < report[1])
    })

    return safeCount;
}

const isReportSafe = (report, isAscending) => {
    if(report.length <= 1) {
        return 1;
    }

    const curr = report[0];
    const next = report[1];

    const isAscendingBoolMatch = (isAscending && curr < next) || (!isAscending && curr > next)

    if(isAscendingBoolMatch && isSafeDistance(curr, next)) {
        return isReportSafe(report.slice(1), isAscending);
    } else {
        return 0;
    }
}

const isSafeDistance = (a, b) => {
    const distance = Math.abs(a - b);
    return isBetween(distance, 0, 4);
}

console.log(`Part 1 example solution: ${part1(exampleInput)}`);
console.log(`Part 1 solution: ${part1(input)}`);

const part2 = (input) => {
    const reports = parseInput(input);
    let safeCount = 0;
    reports.forEach((report) => {
        if(isReportSafe(report, report[0] < report[1]) || isReportCanBeMadeSafe(report)) {
            safeCount++
        }
    })

    return safeCount;
}

const isReportCanBeMadeSafe = (report) => {
    for (let i = 0; i < report.length; i++) {
        const newReport = report.slice(0, i).concat(report.slice(i + 1));
        if(isReportSafe(newReport, newReport[0] < newReport[1])) {
            return true;
        }
    }
    return false;
}

console.log(`Part 2 example solution: ${part2(exampleInput)}`);
console.log(`Part 2 solution: ${part2(input)}`);
