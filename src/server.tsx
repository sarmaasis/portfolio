import { renderToString } from 'react-dom/server';
import manifest from '../dist/client/.vite/manifest.json';
import App from './App';

export function render() {
  const clientEntry = manifest['src/client.tsx'].file;
  const cssFiles = manifest['src/client.tsx'].css || [];
  const cssLinks = cssFiles.map(
    (href) => `<link rel="stylesheet" href="/${href}">`
  ).join('\n');
  return `<!DOCTYPE html>
<html>
 <head>
    <title>@sarmaasis</title>
    ${cssLinks}
  </head>
  <body>
    <div id="root">${renderToString(<App />)}</div>
    <script type="module" src="/${clientEntry}"></script>
  </body>
</html>`;
}