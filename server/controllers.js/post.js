import mongoose from 'mongoose'
import PostMessageApps from '../model.js/post.js'
import User from '../model.js/user.js'

export const getPost = async (req, res) => {
    try {
        //find a post that matches the user id
        const userPost = await PostMessageApps.find({ user: req.user.id })
        res.status(200).json(userPost)
      
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const { title, diary, creator, tags, selectedFile, likeCount } = req.body;

    try {
        const newPost = await PostMessageApps.create({
            title,
            diary, 
            creator, 
            tags, 
            selectedFile, 
            likeCount,
            user: req.user.id
        })
       
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json( { message: error.message } )
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params
    const { title, diary, creator, tags, selectedFile, likeCount } = req.body
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status('no post with that id')

    const findPost = await PostMessageApps.findById(id)

    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }
    
    if(findPost.user.toString() !== req.user.id){
       res.status(401)
       throw new Error('user not authorized')
    }

        const postUpdate = await PostMessageApps.findByIdAndUpdate(id, {
            title,
            diary, 
            creator, 
            tags, 
            selectedFile, 
            likeCount,
        },
         { new: true }
         )
        res.status(204).json(postUpdate)
 
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status('no post with that id');

    const findPost = await PostMessageApps.findById(id)

    if(!req.user){
        res.status(401)
        throw new Error('user not found!')
    }

    if(findPost.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

     await PostMessageApps.findByIdAndRemove(id)
     res.status(201).json({ message: 'post is successfully deleted'})
}

export const likePost = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status('no post with that id');

    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    const post = await PostMessageApps.findById(id)

    if(post.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }
    const likes = await PostMessageApps.findByIdAndUpdate(id, {likeCount: post.likeCount + 1 }, { new: true} )
}