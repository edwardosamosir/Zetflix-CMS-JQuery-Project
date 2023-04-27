if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express()
const port = process.env.PORT || 3000;  
const mainRouter = require('./routes')
const cors = require("cors");

// cross origin resource sharing
app.use(cors())

// body parse
app.use(express.urlencoded({extended : false}))
app.use(express.json())

// main router
app.use('/', mainRouter)


app.listen(port, ()=> {
    console.log(`Listening to port ${port}`)
})