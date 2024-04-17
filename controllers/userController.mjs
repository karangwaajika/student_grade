import {User} from '../models/user.mjs'
import {Subject} from '../models/subject.mjs'
import {Student} from '../models/student.mjs'
import {Marks} from '../models/marks.mjs'
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

export const updateSubject = async(request, response)=>{
    const {body:{name, id}} = request
    try{
        await Subject.findByIdAndUpdate(id, {name})
        await response.flash('update', 'Subject Successfully updated')
        response.redirect("/addSubject")
    }catch(err){
        console.log(err)
    }
}

export const deleteSubject = async(request, response)=>{
    const {params:{id}} = request
    try{
        await Subject.findOneAndDelete({_id:id})
    }catch(err){
        console.log(err)
    }
}

export const studentPage = async(request, response)=>{
    const user = request.user
    try{
        const subjects = await Subject.find({})
        response.render('add-student', {user, subjects})
    }catch(err){ 
        console.log(err)
    }
}

export const addStudent = async(request, response)=>{
    const {body} = request
    const student = new Student(body)
    const studentCode = body.code 
    console.log(body)
    try{
        const findStudent = await Student.findOne({code:studentCode})
        if(!findStudent){ 
            await Student.create(student)
            await response.flash('success', 'Student successfully added')
            response.redirect('/addStudent')
        }else{
            await response.flash('error', 'Student exist already!!!')
            response.redirect('/addStudent')
        }
        
    }catch(err){
        console.log(err)
    }
    
}

export const viewStudent = async(request, response)=>{
    const user = request.user
    try{
        const students = await Student.find({}).
        populate('favoriteSubject').
        exec()                               
        response.render('view-student', {user, students})
    }catch(err){ 
        console.log(err)
    } 
}
export const marksPage = async(request, response)=>{
    const user = request.user
    const {query:{id}} = request
    try{
        if(id){
            const subjects = await Subject.find({})   
            const student = await Student.findById(id).exec()                      
            response.render('marks', {user, subjects, student})
        }else{
            const subjects = await Subject.find({}) 
            const student = {}                   
            response.render('marks', {user, subjects, student})
        }
        
    }catch(err){ 
        console.log(err) 
    } 
}
export const retrieveStudent = async(request, response)=>{
    const user = request.user
    const {query:{name}} = request
    try{
        let students = await Student.find({name:{$regex:''+name+'',$options: 'i'}}) 
        if(name != ''){
            response.render('retrieve-student', {students})
        }else{
            students=[]
            response.render('retrieve-student', {students})
        }
        
    }catch(err){ 
        console.log(err)
    } 
}

export const insertMarks = async(request, response) =>{
    const {body}= request
    //const marks = new Marks(body)
    try{
        // await Marks.create(marks)
        const studentMarks = await Marks.find({studentId:body.studentId}).
        populate('studentId').
        populate('subjectId').
        exec() 
        response.render('inserted-marks', {studentMarks})
    }catch(err){ 
        console.log(err)
    }
    
} 