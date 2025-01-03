
//  src/server/index.js

import express from "express"
import cors from "cors"
import { renderToString } from "react-dom/server"
import App from '../shared/App'
import React from "react"

const app = express()

app.use(cors())

//  serving up the public folder where client bundle.js will end up
app.use(express.static("public"))

app.get("*", (req, res, next) => {
    const markup = renderToString(
        <App />
    )

    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>JST</title>
                <script src="/bundle.js" defer></script>
            </head>

            <body>
                <div id="app">${markup}</div>
            </body>
        </html>
        `)
})

app.listen(3000, () => {
    console.log(`Server is listening on port: 3000`)
})

