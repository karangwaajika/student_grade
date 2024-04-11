import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import route from './route/route.mjs'

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()
mongoose.connect(process.env.MongoStringID).then(()=>{
    console.log('Database connected')
}).catch((err) =>{
    console.log(err)
})
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(route)
app.get('/', (request, response)=>{
    response.render('index')
})


app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
})