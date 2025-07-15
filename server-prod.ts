import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  // Serve static files from the dist directory
  app.use(express.static(path.resolve(__dirname, 'dist/client'), {
    index: false
  }))

  app.use('*', async (req, res) => {
    const url = req.originalUrl

    try {
      // Read the index.html template
      let template = fs.readFileSync(
        path.resolve(__dirname, 'dist/client/index.html'),
        'utf-8'
      )

      // Load the server entry
      const { render } = await import('./dist/server/entry-server.js')

      // Render the app HTML
      const { html: appHtml } = await render(url)

      // Inject the app-rendered HTML into the template
      const html = template.replace(`<!--app-html-->`, appHtml)

      // Send the rendered HTML back
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      console.error(e)
      res.status(500).end(e.stack)
    }
  })

  app.listen(3000, () => {
    console.log('Production SSR server running at http://localhost:3000')
  })
}

createServer() 