import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPost= async (req, res) => {
   try {
       // postMessage represent the whole search of each group of data in PostMessage
       const postMessage = await PostMessage.find()
       res.status(200).json(postMessage)
       //res.json send it to the frontend
   } catch (error) {
       res.status(404).json({message: error.message})
       //if there's an error it send back a error message
   }
}

export const createPost= async (req, res) => {
    const post = req.body
    // post is the data send from the frontend from the form data
    const newPost =  new PostMessage(post)
    // newPost says make a new model of Postmessage with the post data gotten from the frontend
try {
   await newPost.save() //.save() now save the new post data
   res.status(201).json(newPost)
   // res.json send the newly create Postmessage back to the frontend
} catch (error) {
    res.status(409).json({message: error.message})
}
 }

 export const updatePost = async (req, res) => {
     const { id:_id } = req.params; 
     // the post id was destructured from all the id of all the models of PostMessage in the mongodbData base and renamed as _id
     const  post  = req.body
     // post is the data from the Form/input being send from the frontend

         if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with that id') //checks if the id is among those in the database, if not it send a message
         // if id is correct use the findByIdAndUpdate() method to update that particular post
         const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
         //res.json send that updated post data back to the frontend
         res.json(updatedPost)
     
 }

 export const deletePost = async (req, res) => {
     const { id } = req.params;
     // the post id was destructured from all the id of all the models of PostMessage in the mongodbData base
     console.log(id)     
     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with that id')
      await PostMessage.findByIdAndRemove(id)
  
 }

 export const likePost = async (req, res) => { 
        const { id } = req.params; 
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with that id')
        // post represent the PostMessage model with that id
        const post = await PostMessage.findById(id)
        //like.likeCount means the likeCoumt property value in that post with that id  in PostMessage
        const likedPost  = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })
       // likeCount was destructured from PostMessage in the above code
        res.json(likedPost)

 }