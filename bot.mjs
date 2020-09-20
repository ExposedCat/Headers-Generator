import tools from 'satanic'
import {
    fetchHeaders,
    generateHeader
} from './headers.mjs'

const {
    token,
    hideErrors
} = tools.readEnv()

const bot = tools.bot(token, hideErrors === 'true')

tools.doAtDate('0 */1 * * *', async () => {
    console.log('Fetching headers')
    await fetchHeaders()
    console.log('Done')
})

async function handleText(ctx) {
    const text = ctx.message.text

    switch (text.split(' ')[0]) {
        case '/start': {
            await ctx.replyWithHTML('Hi!\nUse /generate comand to generate news header')
            break
        }
        case '/generate': {
            const minWords = Number(text.split(' ')[1]) || 5

            await ctx.replyWithHTML(await generateHeader(minWords))
            break
        }
    }
}

bot.on('text', handleText)

bot.start()