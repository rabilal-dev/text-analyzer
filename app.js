#!/usr/bin/env node
import fs from 'node:fs/promises';

const filePath = process.argv[2];

if (!filePath) {
    console.error('Please provide a file path as an argument.');
    process.exit(1);
}

const analysisOfText = {}
const content = await fs.readFile(filePath, 'utf8');
const totalWords = content.split(/[\W]/).filter(wrd => wrd.length > 0);
const wordRepetitions = {};

totalWords.map(word => {
    if (wordRepetitions[word]) {
        wordRepetitions[word] += 1;
    } else {
        wordRepetitions[word] = 1;
    }
})

let mostRepeatedWord = '';
Object.keys(wordRepetitions).map(word => {
    if (mostRepeatedWord === '' || wordRepetitions[word] > wordRepetitions[mostRepeatedWord]) {
        mostRepeatedWord = word;
    }
})
analysisOfText.mostRepeatedWord = mostRepeatedWord;
analysisOfText.totalUseWords = Object.keys(wordRepetitions).length
analysisOfText.totalWordsCount = totalWords.length;
analysisOfText.totalLine = content.split('\n').length;
analysisOfText.totalCharacters = totalWords.join('').length;
analysisOfText.totalSpaces = content.split(' ').length - 1;
analysisOfText.totalSentences = content.split('.').length - 1;

console.log(analysisOfText);

