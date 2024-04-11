import express from 'express'
import {User} from '../models/user.mjs'

const route = express()
route.use(express.json())

route.post('/add_user', async(request, response)=>{
    const {body} = request
    const user = new User(body)
    try {
        const addedUser = await user.save()
        response.status(200).send(addedUser)
    } catch (error) { 
        console.log(error)
    }
})

export default route