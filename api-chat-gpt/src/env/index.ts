import { z } from 'zod'

const EnvSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
    PORT: z.coerce.number().default(4000),
    OPENAI_API_KEY: z.string(),
    OPENAI_API_ORGANIZATION: z.string(),
})

const _env = EnvSchema.safeParse(process.env)

if (_env.error) {
    console.error('Invalid environment variables', _env.error.format())
    throw new Error('Invalid environment variables')
}

export const env = _env.data
