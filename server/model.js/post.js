import mongoose from 'mongoose'

const post = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: String,
    diary: String,
    creator: String,
    tags: String,
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
}, {
    timestamps: true
})

const PostMessageApps = mongoose.model('PostMessageApps', post)

export default PostMessageApps;