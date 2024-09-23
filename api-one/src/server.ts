import { app } from './app'
import { env } from './env'
import './config/database'

const port = env.PORT

app.listen(port, () => {
    console.log(`Server listening at port ${port} 🚀`)
})
