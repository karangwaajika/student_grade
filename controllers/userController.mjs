import {User} from '../models/user.mjs'
import {Subject} from '../models/subject.mjs'
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
    const user = request.user
    response.render('dashboard', {user})  
} 

export const logout = (request, response)=>{
    request.logout((err)=>{
        if(err){
            response.sendStatus(400)
        }else{
            response.redirect('/') 
        }
    });
    
}

export const viewSubject = async(request, response)=>{
    const user = request.user
    try{
        const subjects = await Subject.find({})
        response.render('add-subject', {user, subjects})
    }catch(err){ 
        console.log(err)
    } 
    
}

export const addSubject = async(request, response)=>{
    const {body} = request
    const sub = new Subject(body)
    const name = body.name
    console.log(body)
    try{
        const findSubject = await Subject.findOne({name})
        if(!findSubject){
            await Subject.create(sub)
            await response.flash('success', 'Subject successfully added')
            response.redirect('/addSubject')
        }else{
            await response.flash('error', 'Subject exist already!!!')
            response.redirect('/addSubject')
        }
        
    }catch(err){
        await response.flash('error', err)
        response.redirect('/addSubject')  
    }
    
}
