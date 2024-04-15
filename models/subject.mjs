import mongoose from "mongoose"

const subjectSchema = new mongoose.Schema({
    name:{
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    
    date:{
        type: mongoose.Schema.Types.String,
        required: true
    }
},
{
    timestamps: true
})

export const Subject = mongoose.model('Subject', subjectSchema)