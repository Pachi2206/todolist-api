import { z } from 'zod';

// Funciones pequeñas para no repetir JSON en cada *.docs.js.
// Viven separadas de openapi.js para evitar un import circular (openapi.js importa los *.docs.js).

// Convierte un schema de zod en JSON Schema: el mismo schema que valida la entrada documenta la API.
export function toSchema(zodSchema) {
  const { $schema, ...schema } = z.toJSONSchema(zodSchema);
  return schema;
}

export function jsonBody(schema) {
  return { required: true, content: { 'application/json': { schema } } };
}

export function jsonResponse(description, schema) {
  return { description, content: { 'application/json': { schema } } };
}

export function errorResponse(description) {
  return jsonResponse(description, { $ref: '#/components/schemas/Error' });
}

export const idParam = {
  name: 'id',
  in: 'path',
  required: true,
  description: 'Id de la tarea',
  schema: { type: 'integer', minimum: 1, example: 1 },
};

// Marca todas las operaciones como protegidas y les agrega la respuesta 401: es el requireAuth de la documentación.
export function secure(paths) {
  const result = {};
  for (const [path, item] of Object.entries(paths)) {
    result[path] = {};
    for (const [key, value] of Object.entries(item)) {
      result[path][key] =
        key === 'parameters'
          ? value
          : {
              ...value,
              security: [{ bearerAuth: [] }],
              responses: { ...value.responses, 401: errorResponse('Token faltante, inválido o expirado') },
            };
    }
  }
  return result;
}
