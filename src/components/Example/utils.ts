import * as Prism from 'prismjs';
require('prismjs/components/prism-json');

export type Language = 'html' | 'css' | 'js' | 'json';

function highlightCode(code: string, lang: Language): string {
  const lines = code.split('\n');
  const firstLineIsEmpty = lines[0] === '';
  const linesToHighlight = firstLineIsEmpty ? lines.slice(1) : lines;
  const htmlLines = linesToHighlight.map(line => {
    return Prism.highlight(line, Prism.languages[lang]);
  });
  return htmlLines.join('<br/>');
}

export { highlightCode };
