import jwt from "jsonwebtoken";
import User from "../model.js/user.js";

const protect = async(req, res, next) => {
let token

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
   try {
    token = req.headers.authorization.split(' ')[1]

    const decode = jwt.verify(token, process.env.JWT_SECRET)

req.user = await User.findById(decode.id).select('-password')

next()

   } catch (error) {
       res.status(401)
       throw new Error('Not Authorized')
   }
}

if(!token){
    res.status(401)
    throw new Error('Not Authorized')
}

}

export default protect;