import express from 'express'
import * as controller from '../controllers/userController.mjs'
import { checkSchema } from 'express-validator'
import { userValidation } from '../utils/userValidation.mjs'
import multer from 'multer'
const route = express()

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

export default route 