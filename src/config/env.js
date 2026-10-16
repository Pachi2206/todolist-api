import {z} from 'zod';

export const envSchema = z.object({
    SUPABASE_URL: z.url(),
    SUPABASE_SECRET_KEY: z.string().min(1),
    JWT_SECRET: z.string().min(32, 'Debe tener al menos 32 caracteres'),
    JWT_EXPIRES_IN: z.string().default('1h'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error('Invalid environment variables:', parsedEnv.error.format());
    process.exit(1);
}

export const env = parsedEnv.data;