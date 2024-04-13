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

export default route 