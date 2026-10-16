import { healthDocs } from '../modules/health/health.docs.js';
import { authDocs } from '../modules/auth/auth.docs.js';
import { tasksDocs } from '../modules/task/task.docs.js';

// Cada módulo documenta sus rutas; aquí solo se juntan en un único documento OpenAPI 3.1.
const modules = [healthDocs, authDocs, tasksDocs];

export const openapiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'To-Do List API',
    version: '1.0.0',
    description: 'API REST de tareas con Node, Express y Supabase.',
  },
  servers: [{ url: '/api' }],
  tags: modules.flatMap((m) => m.tags),
  paths: Object.assign({}, ...modules.map((m) => m.paths)),
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      // Forma común de todas las respuestas de error (ver middlewares/error-handler.js y validate.js).
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'La tarea 5 no existe' },
          errors: {
            type: 'array',
            description: 'Solo en errores de validación (400)',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string', example: 'title' },
                message: { type: 'string', example: 'Too small: expected string to have >=1 characters' },
              },
            },
          },
        },
      },
      ...Object.assign({}, ...modules.map((m) => m.schemas ?? {})),
    },
  },
};
