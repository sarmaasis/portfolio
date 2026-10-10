/* A deliberately small Markdown subset for blog posts: ## and ### headings,
   paragraphs, - and 1. lists, fenced code (```lang title="file"), pipe tables
   and > notes. Inline markup (links, `code`, **bold**) is left in the text for
   RichText to render. */

export type MdBlock =
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'p'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'code'; lang: string; title?: string; code: string }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'note'; title?: string; text: string };

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/`|\*\*/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const splitRow = (line: string) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());

export function parseMarkdown(source: string): MdBlock[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: MdBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = /^```(\w+)?(?:\s+title="([^"]+)")?\s*$/.exec(line);
    if (fence) {
      const body: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith('```')) {
        body.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push({ type: 'code', lang: fence[1] ?? 'text', title: fence[2], code: body.join('\n') });
      continue;
    }

    if (line.startsWith('### ')) {
      const text = line.slice(4).trim();
      blocks.push({ type: 'h3', text, id: slugify(text) });
      index += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      const text = line.slice(3).trim();
      blocks.push({ type: 'h2', text, id: slugify(text) });
      index += 1;
      continue;
    }

    if (line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index]);
        index += 1;
      }
      const [head, , ...rows] = tableLines;
      blocks.push({ type: 'table', head: splitRow(head), rows: rows.map(splitRow) });
      continue;
    }

    if (line.startsWith('> ')) {
      const noteLines: string[] = [];
      while (index < lines.length && lines[index].startsWith('>')) {
        noteLines.push(lines[index].replace(/^>\s?/, ''));
        index += 1;
      }
      const titled = /^\*\*([^*]+)\*\*\s*(.*)$/.exec(noteLines[0] ?? '');
      blocks.push(titled
        ? { type: 'note', title: titled[1], text: [titled[2], ...noteLines.slice(1)].join(' ').trim() }
        : { type: 'note', text: noteLines.join(' ').trim() });
      continue;
    }

    const listMatch = /^(-|\d+\.)\s+/.exec(line);
    if (listMatch) {
      const ordered = listMatch[1] !== '-';
      const items: string[] = [];
      while (index < lines.length && /^(-|\d+\.)\s+/.test(lines[index])) {
        let item = lines[index].replace(/^(-|\d+\.)\s+/, '');
        index += 1;
        while (index < lines.length && /^\s{2,}\S/.test(lines[index])) {
          item += ` ${lines[index].trim()}`;
          index += 1;
        }
        items.push(item);
      }
      blocks.push({ type: ordered ? 'ol' : 'ul', items });
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length
      && lines[index].trim()
      && !/^(#{2,3} |```|> |\||-\s|\d+\.\s)/.test(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: 'p', text: paragraph.join(' ') });
  }

  return blocks;
}

/* Questions under a "## Frequently asked questions" heading become FAQPage
   schema: each ### is a question, the paragraphs after it the answer. */
export function extractFaqs(blocks: MdBlock[]) {
  const start = blocks.findIndex((block) => block.type === 'h2' && /frequently asked questions/i.test(block.text));
  if (start < 0) return [];

  const faqs: { question: string; answer: string }[] = [];
  for (let index = start + 1; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (block.type === 'h2') break;
    if (block.type === 'h3') faqs.push({ question: block.text, answer: '' });
    else if (block.type === 'p' && faqs.length) {
      const current = faqs[faqs.length - 1];
      current.answer = current.answer ? `${current.answer} ${block.text}` : block.text;
    }
  }
  return faqs;
}

export function countWords(source: string) {
  return source.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
}

/** Strips the inline markup RichText understands, for meta tags and JSON-LD. */
export function plainText(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1');
}
