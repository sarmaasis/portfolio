// filepath: /home/sarmaasis/projects/portfolio/server.js
import express from 'express'
import { renderToString } from 'react-dom/server'
import React from 'react'
import App from './src/App'

const app = express()

app.get('*', (req, res) => {
  const html = renderToString(<App />)
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Ashish Sharma | Portfolio</title>
        <meta name="description" content="Software Engineer portfolio" />
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `)
})

export default app