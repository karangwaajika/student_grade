import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    name:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    
    code:{
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    
    academicYear:{
        type: mongoose.Schema.Types.String,
        required: true
    },

    favoriteSubject: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }
},
{
    timestamps: true
})

export const Student = mongoose.model('Student', studentSchema)