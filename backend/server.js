import express from 'express'
import { config } from 'dotenv'
import connectDb from './config/db.js';
import userRouter from './routes/userRouter.js';
import cors from 'cors'
import courseRouter from './routes/courseRouter.js';
import lectureRouter from './routes/lectureRouter.js';
config()
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.use('/api/user',userRouter)
app.use('/api/course',courseRouter)
app.use('/api/lecture',lectureRouter)

app.get('/', (req, res) => {
    res.send("Working")
})

await connectDb()

app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`)
})