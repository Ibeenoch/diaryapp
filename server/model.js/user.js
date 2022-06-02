import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add your name ']
    },
    email: {
        type: String,
        required: [true, 'please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'please add your password'],
    }
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema)

export default User