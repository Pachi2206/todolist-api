import { jsonResponse } from '../../docs/helpers.js';

const status = {
  type: 'object',
  properties: {
    status: { type: 'string', example: 'ok' },
  },
};

export const healthDocs = {
  tags: [{ name: 'Health', description: 'Estado de la API y de la base de datos' }],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'La API está viva',
        responses: { 200: jsonResponse('La API responde', status) },
      },
    },
    '/health/db': {
      get: {
        tags: ['Health'],
        summary: 'La base de datos responde',
        responses: {
          200: jsonResponse('Supabase responde', status),
          503: jsonResponse('Supabase no responde', {
            type: 'object',
            properties: {
              status: { type: 'string', example: 'error' },
              error: { type: 'string' },
            },
          }),
        },
      },
    },
  },
};
