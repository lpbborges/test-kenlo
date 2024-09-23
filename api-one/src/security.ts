import { Router } from 'express'
import helmet from 'helmet'

const security = Router()

security.use(helmet())
security.use(helmet.frameguard({ action: 'deny' }))
security.use(helmet.hidePoweredBy())
security.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }))
security.use((_req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block')
    next()
})

export { security }
