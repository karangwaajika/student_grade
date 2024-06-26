import express from 'express'
import * as controller from '../controllers/userController.mjs'
import { checkSchema } from 'express-validator'
import { userValidation } from '../utils/userValidation.mjs'
import multer from 'multer'
import passport from 'passport'
import '../login-strategy/local-strategy.mjs'

const route = express()
route.use(passport.initialize())
route.use(passport.session())
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{ 
      cb(null, './public/img')
    },
    filename: (req, file, cb)=>{
      cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
  })  
const upload = multer({ storage: storage })

route.post('/add_user', upload.single('image') ,controller.addUser)
route.post('/login_user', upload.none() ,passport.authenticate('local',{ failureRedirect: '/' ,failureMessage: true}), controller.loginUser)
route.get('/dashboard', controller.userHomePage)
route.get('/logout', controller.logout)
route.get('/addSubject', controller.viewSubject)
route.post('/addSubject', upload.none(), controller.addSubject)
route.post('/updateSubject', upload.none(), controller.updateSubject)
route.get('/deleteSubject/:id', controller.deleteSubject)
route.get('/addStudent', controller.studentPage)
route.post('/addStudent', upload.none(), controller.addStudent)
route.get('/viewStudent', controller.viewStudent)
route.get('/giveMarks', controller.marksPage)
route.get('/retrieveStudent', controller.retrieveStudent)
route.post('/insertMarks', controller.insertMarks)
route.get('/viewMarks', controller.viewMarks)

export default route 