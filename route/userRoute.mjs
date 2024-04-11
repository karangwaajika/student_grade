import express from 'express'
import * as controller from '../controllers/userController.mjs'
import { checkSchema } from 'express-validator'
import { userValidation } from '../utils/userValidation.mjs'
const route = express()

route.post('/add_user', checkSchema(userValidation), controller.addUser)

export default route