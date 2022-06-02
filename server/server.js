import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes.js/post.js'
import userRouter from './routes.js/user.js'

const app = express()

app.use(bodyParser.json( { limit: '30mb', extended: true} ));
app.use(bodyParser.urlencoded( { limit: '30mb', extended: true} ));

dotenv.config()

app.use(cors())

app.use('/post', router)
app.use('/user', userRouter)

const PORT = process.env.PORT || 5000 

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`app listening at port ${PORT}`)))
.catch((error) => error.message)