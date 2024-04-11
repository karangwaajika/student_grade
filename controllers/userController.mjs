import {User} from '../models/user.mjs'
import {validationResult, matchedData} from 'express-validator'
import {hashPassword} from '../utils/hashingPassword.mjs'

export const addUser = async(request, response)=>{
    const result = validationResult(request)
    if(result.errors.length != 0){
        response.status(401).send({"errors":result.errors})
    }else{
        const data = matchedData(request)
        console.log(data)
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
}
