const fs = require('fs').promises;
const Parser = require('rss-parser');
const parser = new Parser();

const LATEST_ARTICLES_PLACEHOLDER = '%{{latest_articles}}%';

(async () => {
  try {
    const markdownTemplate = await fs.readFile('./README.md.template', { encoding: 'utf-8' });
    const { items } = await parser.parseURL('https://francgs.dev/rss.xml');

    // Obtener los últimos 5 artículos
    const latestArticles = items.slice(0, 5)
      .map(({ title, link }) => `- [${title}](${link})`)
      .join('\n');

    const markdown = markdownTemplate.replace(LATEST_ARTICLES_PLACEHOLDER, latestArticles);
    await fs.writeFile('./README.md', markdown);
    
    console.log('README.md actualizado con los últimos 3 artículos.');
  } catch (error) {
    console.error('Error actualizando README.md:', error);
  }
})();
