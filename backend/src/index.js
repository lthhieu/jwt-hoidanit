import express from "express"
import initWebRoutes from "./routes/web"
import viewEngine from "./configs/viewEngine"
require("dotenv").config()
const app = express()
viewEngine(app)
initWebRoutes(app)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`>>> Server in running on ${PORT}`)
})