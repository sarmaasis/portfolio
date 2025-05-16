import { renderToString } from 'react-dom/server';
import App from './App';

export function render() {
  return `<!DOCTYPE html>
<html>
  <head><title>My SSR App</title></head>
  <body>
    <div id="root">${renderToString(<App />)}</div>
  </body>
</html>`;
}