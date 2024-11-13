#!/bin/bash

# Check if the user provided a directory and a day
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <directory> <day>"
    exit 1
fi

TARGET_DIR="$1"
DAY="$2"

# Validate that DAY is a number between 1 and 31
if ! [[ "$DAY" =~ ^[0-9]+$ ]] || [ "$DAY" -lt 1 ] || [ "$DAY" -gt 25 ]; then
    echo "Error: Day must be an integer between 1 and 25."
    exit 1
fi


# Create the inputs directory if it doesn't exist
mkdir -p "$TARGET_DIR/inputs"

# Create the files
touch "$TARGET_DIR/inputs/day${DAY}_example.txt"
touch "$TARGET_DIR/inputs/day${DAY}.txt"
touch "$TARGET_DIR/day${DAY}.js"

# Add boilerplate to the JavaScript file
cat <<EOL > "$TARGET_DIR/day${DAY}.js"
import { readFileSync } from "fs";

const exampleInput = readFileSync('./inputs/day${DAY}_example.txt', 'utf8');
const input = readFileSync('./inputs/day${DAY}.txt', 'utf8');

const part1 = (input) => {
    return true;
}

console.log(\`Part 1 example solution: \${part1(exampleInput)}\`);
console.log(\`Part 1 solution: \${part1(input)}\`);

const part2 = (input) => {
    return true;
}

console.log(\`Part 2 example solution: \${part2(exampleInput)}\`);
console.log(\`Part 2 solution: \${part2(input)}\`);
EOL

echo "Files created in $TARGET_DIR:"
echo " - inputs/day${DAY}_example.txt"
echo " - inputs/day${DAY}.txt"
echo " - day${DAY}.js"