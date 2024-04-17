import mongoose from 'mongoose'

const marksSchema = new mongoose.Schema({
    marks:{
        type: mongoose.Schema.Types.Number,
        required: true
    },

    subjectId: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },

    studentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
},
{
    timestamps: true
})

export const Marks = mongoose.model('Mark', marksSchema)