import {
    First,
    Link,
    Word
} from './mongoose.mjs'

export function addFirst(word) {
    word = new First({ word })
    return word.save()
}

export function getFirst() {
    return First.find({}, { _id: 0, word: 1 })
}

export function addNextWord(word, next) {
    return Word.updateOne(
        { word },
        { $push: { next } },
        {
            upsert: true,
            new: true
        }
    )
}

export function getNextWords(word) {
    return Word.find({ word }, { _id: 0, next: 1 })
}

export function addLink(link) {
    link = new Link({ link })
    return link.save()
}

export async function linkNotExists(link) {
    link = await Link.find({ link })
    return link.isEmpty()
}