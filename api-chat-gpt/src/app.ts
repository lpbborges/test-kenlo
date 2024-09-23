import cors from 'cors'
import express from 'express'
import { chatController } from './controller/chat-controller'

const app = express()

app.use(cors())
app.use(express.json())
app.get('/ping', (req, res) => {
    res.send('Pong')
})
app.post('/chat', chatController)

export { app }
