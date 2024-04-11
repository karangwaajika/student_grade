import express from 'express'
import userRoute from './userRoute.mjs'

const route = express()
route.use(userRoute)

export default route