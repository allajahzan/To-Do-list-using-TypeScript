import express from 'express'
import dotenv from 'dotenv'
import route from './router/route'
import path from 'path'

//env config
dotenv.config()

// make app
const app = express()

// set ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// set static files
app.use(express.static('src/public'))
app.use(express.static('dist/public'))
app.use(express.json())

// route
app.use('/', route)


// run server
app.listen(process.env.PORT, ()=>{
    console.log('server is running on port 3000 http://localhost:3000')
})