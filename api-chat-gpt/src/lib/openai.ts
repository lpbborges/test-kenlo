import OpenAI from 'openai'
import { env } from '../env'

const organization = env.OPENAI_API_ORGANIZATION

const openai = new OpenAI({
    organization,
})

export async function chat(message: string) {
    const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'gpt-4o-mini',
    })

    return response.choices[0]?.message
}
