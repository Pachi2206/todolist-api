import { z } from 'zod';

// El pipe hace que se pierda el formato email en la documentación, por eso va en .meta().
export const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()).meta({ format: 'email', example: 'ana@test.com' }),
  password: z.string().min(8).max(72).meta({ example: 'supersecreta' }),
});
