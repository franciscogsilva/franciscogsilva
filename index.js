const fs = require('fs').promises
const Parser = require('rss-parser')
const parser = new Parser()

const LATEST_ARTICLE_PLACEHOLDER = '%{{latest_article}}%'

;(async () => {
  const markdownTemplate = await fs.readFile('./README.md.template', { encoding: 'utf-8' })
  const {items} = await parser.parseURL('https://francgs.dev/rss.xml')
  const [{title, link}] = items //Obtener el elemento 0 del array y desestructuramos title y link
  const markdown = markdownTemplate.replace(LATEST_ARTICLE_PLACEHOLDER, `[${title}](${link})`)
  await fs.writeFile('./README.md', markdown)
})()


    