import {User} from '../models/user.mjs'
import {validationResult, matchedData} from 'express-validator'
import {hashPassword} from '../utils/hashingPassword.mjs'

export const addUser = async(request, response)=>{
    // console.log(request.body)
    // console.log(request.file.filename) 
    // const result = validationResult(request)
    // if(result.errors.length != 0){
    //     response.status(401).send({"errors":result.errors})
    // }else{
        //const data = matchedData(request)
        const {body, file} = request
        console.log(body.email, file.filename)
        body.password = hashPassword(body.password)
        const user = new User({
            email: body.email,
            password: body.password,
            image: file.filename
        })
        try{
            await User.create(user) 
            await response.flash('success', 'Successfuly added')
            response.redirect('/') 
        }
        catch(err){ 
            await response.flash('error', err)
            response.redirect('/') 
        }
    //}
}

export const loginUser = (request, response)=>{
    response.redirect('/dashboard')
}
export const userHomePage = (request, response)=>{
    response.render('dashboard')
}
