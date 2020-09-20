import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/headers', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const simpleWordSchema = new mongoose.Schema({
    word: String
})
const wordSchema = new mongoose.Schema({
    word: String,
    next: Array
})

export const First = mongoose.model('First', simpleWordSchema)
export const Link = mongoose.model('Link', simpleWordSchema)
export const Word = mongoose.model('Word', wordSchema)