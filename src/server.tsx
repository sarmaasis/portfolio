import { renderToString } from 'react-dom/server';
import manifest from '../dist/client/.vite/manifest.json';
import App from './App';

export function render() {
  const clientEntry = manifest['src/client.tsx'].file;
  const cssFiles = manifest['src/client.tsx'].css || [];
  const cssLinks = cssFiles.map(
    (href) => `<link rel="stylesheet" href="/${href}">`
  ).join('\n');

  // SEO Meta Tags (customize as needed)
  const metaTags = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ashish Sharma - Full Stack Developer Portfolio</title>
    <meta name="description" content="Ashish Sharma (@sarmaasis) - Full Stack Developer building practical solutions that prioritize efficiency and simplicity. Explore my work with companies like Whydonate.com and Seezil Technology." />
    <meta name="keywords" content="Ashish Sharma, sarmaasis, full stack developer, React, TypeScript, portfolio, software engineer, web development" />
    <meta name="author" content="Ashish Sharma" />
    <meta name="robots" content="index, follow" />
    
    <!-- Open Graph Tags (for social sharing) -->
    <meta property="og:title" content="Ashish Sharma - Full Stack Developer Portfolio" />
    <meta property="og:description" content="Building practical solutions with efficiency and simplicity. Check out my projects and experience." />
    <meta property="og:image" content="https://your-domain.com/path-to-og-image.jpg" /> <!-- Replace with actual image URL -->
    <meta property="og:url" content="https://your-domain.com" />
    <meta property="og:type" content="website" />
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Ashish Sharma - Full Stack Developer Portfolio" />
    <meta name="twitter:description" content="Building practical solutions with efficiency and simplicity." />
    <meta name="twitter:image" content="https://your-domain.com/path-to-twitter-image.jpg" /> <!-- Replace with actual image URL -->
    
    <!-- Structured Data (JSON-LD) for rich snippets -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ashish Sharma",
      "url": "https://your-domain.com",
      "sameAs": [
        "https://x.com/sarmaasis",
        "https://www.linkedin.com/in/sarmaasis",
        "https://github.com/sarmaasis"
      ],
      "jobTitle": "Full Stack Developer",
      "description": "Full Stack Developer building practical solutions that prioritize efficiency and simplicity."
    }
    </script>
  `;

  return `<!DOCTYPE html>
<html lang="en">
 <head>
    ${metaTags}
    ${cssLinks}
  </head>
  <body>
    <div id="root">${renderToString(<App />)}</div>
    <script type="module" src="/${clientEntry}"></script>
  </body>
</html>`;
}