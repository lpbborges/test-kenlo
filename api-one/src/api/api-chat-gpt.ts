import { env } from '@/env'

const apiUrl = env.API_CHAT_GPT_BASE_URL

export async function createChat(message: string) {
    const response = await fetch(`${apiUrl}/chat`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ message }),
    })
    const json = await response.json()

    return json as { response: string }
}
