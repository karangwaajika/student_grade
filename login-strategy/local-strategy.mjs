import passport from "passport";
import { Strategy } from "passport-local"; //class
import { User } from "../models/user.mjs"
import {comparedPassword} from '../utils/hashingPassword.mjs'

passport.serializeUser((user, done)=>{
    done(null, user.id); 
});
passport.deserializeUser(async (id, done)=>{
    try {
        
        const findUser = await User.findById(id);
        if(!findUser) {
            throw new Error("not found")
        }    
        done(null, findUser)
    } catch (error) {
        done(error, null)
    }
})


export default passport.use(
  new Strategy({usernameField:'email', passReqToCallback: true},
    async (request, username, password, done) => {
        
        try {
            const findUser = await User.findOne({email : username});
            if(!findUser){
                request.session.messages = []
                return done(null, false, { message: 'User not found.'})
            }
            if(!comparedPassword(password, findUser.password)){
                request.session.messages = []
                return done(null, false, { message: 'Invalid password.'})
            }

            done(null, findUser)

        } catch (error) {
            done(error, null)
        }
  
    })
  )