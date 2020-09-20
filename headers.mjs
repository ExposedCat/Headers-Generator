import tools from 'satanic'
import axios from 'axios'
import {
    addLink,
    addFirst,
    getFirst,
    addNextWord,
    getNextWords,
    linkNotExists,
} from './dbUtils.mjs'

const env = tools.readEnv()
const sentenceEndSymbols = env.sentenceEndSymbols.split(',')
const {
    pagesList,
    rssLink
} = env


export async function fetchHeaders() {
    for (const page of pagesList) {
        const uri = `${rssLink}/${page}.xml`
        const request = await axios.get(uri)
        const rss = request.data

        for (const item of rss.split('<item>').slice(1)) {
            const header = item
                .split('<title>')[1]
                .split('</title>')[0]
                .split('[')[2]
                .split(']')[0]

            const link = item
                .split('<link>')[1]
                .split('</link>')[0]
                .split('[')[2]
                .split(']')[0]

            if (await linkNotExists(link)) {
                await addLink(link)
                await saveHeader(header)
            }
        }
    }
}

export async function saveHeader(header) {
    const words = header.split(' ')

    words.push(null)

    for (let i = 0; i < words.length - 1; ++i) {
        const word = words[i]

        if (word) {
            const nextWord = words[i + 1]

            await saveWord({
                word,
                nextWord,
                first: i === 0
            })
        }
    }
}

export async function saveWord(wordData) {
    const { word, nextWord, first } = wordData

    if (first) {
        await addFirst(word)
    }
    await addNextWord(word, nextWord)
}

export async function generateHeader(minWords = 5) {
    let header = ''
    let wordsCount = 0

    while (wordsCount < minWords) {
        const firstWords = await getFirst()
        const firstWord = firstWords.randomElement().word
        let lastWord = firstWord

        header += firstWord

        while (true) {
            const nextWords = await getNextWords(lastWord)
            if (nextWords[0] === undefined || !nextWords[0].next === undefined) {
                return generateHeader(minWords)
            }
            const word = tools.random(nextWords[0].next)

            lastWord = word
            if (word === null) {
                break
            }
            header += ` ${word}`
            wordsCount++
        }

        const lastSymbol = header[header.length - 1]
        if (!sentenceEndSymbols.includes(lastSymbol)) {
            header += '. '
        }
    }

    return header
}