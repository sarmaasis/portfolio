import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render() {
  const html = renderToString(<App />);
  return `
<!DOCTYPE html>
<html>
  <head><title>SSR</title></head>
  <body>
    <div id="root">${html}</div>
    <script type="module" src="/src/client.tsx"></script>
  </body>
</html>`;
}
