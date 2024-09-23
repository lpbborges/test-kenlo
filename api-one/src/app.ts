import express from 'express'
import swaggerUI from 'swagger-ui-express'
import { errorHandlerMiddleware } from './middlewares/error-handler'
import { routes } from './routes'

import swaggerFile from '../swagger-openapi.json'

const app = express()

app.use(express.json())
app.use(routes)
app.get('/health', async (_req, res) => {
    res.send('Ok')
})
app.use(
    '/docs',
    swaggerUI.serve,
    swaggerUI.setup(swaggerFile, { explorer: true })
)

app.use(errorHandlerMiddleware)

export { app }
