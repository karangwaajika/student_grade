import express from 'express'
import {User} from '../models/user.mjs'
import {validationResult, checkSchema, matchedData} from 'express-validator'
import {userValidation} from '../utils/userValidation.mjs'
import {hashPassword} from '../utils/hashingPassword.mjs'

const route = express()
route.use(express.json())

route.post('/add_user', checkSchema(userValidation), async(request, response)=>{
    const result = validationResult(request)
    if(result.errors.length != 0){
        response.status(401).send({"errors":result.errors})
    }else{
        const data = matchedData(request)
        data.password = hashPassword(data.password)
        const user = new User(data)
        try{
            const savedUser = await user.save()
            response.status(200).send(savedUser)
        }
        catch(err){ 
            response.status(400).send({'error': err})
        }
    }
})

export default route