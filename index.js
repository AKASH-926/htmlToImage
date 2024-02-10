const express = require('express')
const bodyParser = require('body-parser')
const htmlToImageRouter = require('./services/htmlToImage')
const cors = require('cors')


const app = express()


app.use(bodyParser.json())
app.use(cors())

app.use('/api',htmlToImageRouter)

app.listen(8000,()=>console.log("server up at 8000"))