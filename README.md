# Headers-Generator
Generating funny headers using news

Based on korrespondent.net news
Generating algorithm - Markov Chains

## How to run
1) Create `config.env` file with contents:
```
token="TOKEN"
hideErrors="true"

rssLink="http://k.img.com.ua/rss/ru/"
pagesList="lifestyle,magnolia,kyiv,world,mainbyday,interview,business,good_news,strange,journal,showbiz,ukraine,tech,sport"
sentenceEndSymbols=".,!,?"
```
2) Insert your token from `@BotFather` instead of `TOKEN`
3) Run `bot.mjs`:
```bash
node bot.mjs
```

## Dependencies:
[Satanic](https://www.npmjs.com/package/satanic)
[Mongoose](https://www.npmjs.com/package/mongoose)
