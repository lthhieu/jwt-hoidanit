import express from "express"
import initWebRoutes from "./routes/web"
import viewEngine from "./config/viewEngine"
import bodyParser from 'body-parser'
import connectDB from './config/connectDB'
require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 3000
viewEngine(app)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
connectDB()
initWebRoutes(app)

app.listen(PORT, () => {
    console.log(`>>> Server in running on ${PORT}`)
})