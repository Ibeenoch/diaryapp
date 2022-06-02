import mongoose from 'mongoose'
import User from '../model.js/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//register User public
export const createUser = async (req, res) => {
const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('please add all fields')
    }

const userExist = await User.findOne({ email })

if(userExist){
    res.status(400)
    throw new Error('user already exist')
}
   
    //create salt
const salt = await bcrypt.genSalt(10)

// hashed password 
const hashPassword = await bcrypt.hash(password, salt)

const user = await User.create({
    name,
    email,
    password: hashPassword
})

if(user){
res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id)
})
}else{
    res.status(400)
    throw new Error('invalid User')
} 

}

//login User public
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  if( !email || !password ){
      res.status(400)
      throw new Error('please add all fields!')
  }

const user = await User.findOne({ email })

if(user && (await bcrypt.compare(password, user.password))){
    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id)
    })
}else{
    res.status(409)
    throw new Error('Invalid email or password')
}
  
}


//get User private
export const getUser = async (req, res) => {
    

    res.status(200).json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    })
}

//generate token
const generateToken = (id) => {
    return jwt.sign( {id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}