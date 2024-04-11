import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (request, response)=>{
    response.render('index')
})


app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
})