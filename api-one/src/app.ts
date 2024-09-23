import express from 'express'
import { routes } from './routes'
import { errorHandlerMiddleware } from './middlewares/error-handler'

const app = express()

app.use(express.json())
app.use(routes)
app.get('/health', async (_req, res) => {
    res.send('Ok')
})

app.use(errorHandlerMiddleware)

export { app }
