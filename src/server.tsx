import { renderToString } from 'react-dom/server'
import App from './App'
import manifest from '../dist/client/.vite/manifest.json' // <-- Add this

export function render() {
  // Find the client entry file in the manifest
  const clientEntry = manifest['src/client.tsx'].file
  return `<!DOCTYPE html>
<html>
  <head><title>My SSR App</title></head>
  <body>
    <div id="root">${renderToString(<App />)}</div>
    <script type="module" src="/assets/${clientEntry}"></script>
  </body>
</html>`
}