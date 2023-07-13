const express = require('express')
const cors = require('cors')
const bodyParser  = require('body-parser')
const connectDataBase = require('./database')
const seatRouter = require('./routes/seat.js')
const app = express()

app.use(express.json())
app.use(cors())
app.use( bodyParser.json());
app.use(logger)
app.use(seatRouter)

function logger(req,res,next){
     console.info(new Date() , req.method, req.path)
     next()
}

connectDataBase().then(() => {
    app.listen(3001 , () => {
        console.log("server is listening at http://localhost:3001")
    })
})

