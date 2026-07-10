import fs from 'fs';
import path from 'path';

const llmsPath = path.join(process.cwd(), 'public', 'llms.txt');
const content = fs.readFileSync(llmsPath, 'utf-8');
const lines = content.split(/\r?\n/);
const h1Lines = lines.filter((line) => line.startsWith('# ') && !line.startsWith('## '));
const hasBlockquoteSummary = lines.some((line) => line.startsWith('> '));
const hasH2Section = lines.some((line) => line.startsWith('## '));
const hasMarkdownLinks = lines.some((line) => /^- \[[^\]]+\]\(https?:\/\/[^)]+\): .+/.test(line));

const errors = [
  !content.startsWith('# ') ? 'llms.txt must start with a single H1 heading.' : '',
  h1Lines.length !== 1 ? 'llms.txt must contain exactly one H1 heading.' : '',
  !hasBlockquoteSummary ? 'llms.txt must include a blockquote summary after the H1.' : '',
  !hasH2Section ? 'llms.txt must include H2 sections.' : '',
  !hasMarkdownLinks ? 'llms.txt must include Markdown links with descriptions.' : '',
].filter(Boolean);

if (errors.length) {
  throw new Error(errors.join('\n'));
}

console.log('llms.txt follows the recommended Markdown shape.');
