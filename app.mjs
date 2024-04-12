import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import route from './route/route.mjs'
import session from 'express-session'
import flash from 'express-flash-message'

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

mongoose.connect(process.env.MongoStringID).then(()=>{
    console.log('Database connected')
}).catch((err) =>{
    console.log(err)
})

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(session({
    secret:"ajika",
    saveUninitialized: true,
    resave: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}))

app.use(flash({sessionKeyName: 'express-flash-message'}))

app.use(route)

app.get('/', (request, response)=>{
    response.render('index')
})


app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
})