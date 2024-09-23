import mongoose from 'mongoose'
import { env } from '@/env'

const { DATABASE_URI } = env
const connUrl = DATABASE_URI

async function main() {
    mongoose
        .connect(connUrl)
        .then(() => {
            console.log('Database connection estabilished.')
        })
        .catch(err => console.log(err))
}

main()
