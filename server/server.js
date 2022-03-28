import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes/posts.js'

const app = express()



app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended:true }))

app.use(cors())

app.use('/posts', router)

const PORT = process.env.PORT || 5000

const MONGO_URL='mongodb+srv://ibeenoch:enoch@cluster0.nsfhj.mongodb.net/freecodecamp?retryWrites=true&w=majority'

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> app.listen(PORT, ()=> console.log(`app is listening on port: ${PORT}`))).catch((error) => console.log(error.message))

