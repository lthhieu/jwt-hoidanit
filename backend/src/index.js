import express from "express"
import initWebRoutes from "./routes/web"
import initApiRoutes from "./routes/api"
import viewEngine from "./config/viewEngine"
import bodyParser from 'body-parser'
import connectDB from './config/connectDB'
import configCors from './config/cors'
import cookieParser from 'cookie-parser'
require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 8080
configCors(app)
viewEngine(app)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
connectDB()
initWebRoutes(app)
initApiRoutes(app)
app.use((req, res) => {
    return res.send('404 not found')
})
app.listen(PORT, () => {
    console.log(`>>> Server in running on ${PORT}`)
})