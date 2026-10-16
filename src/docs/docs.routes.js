import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { openapiDocument } from './openapi.js';

export const docsRouter = Router();

// JSON crudo: se puede importar en Postman o usar para generar clientes.
docsRouter.get('/openapi.json', (_req, res) => {
  res.json(openapiDocument);
});

// persistAuthorization: el token pegado en "Authorize" sobrevive aunque se refresque la página.
docsRouter.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(openapiDocument, { swaggerOptions: { persistAuthorization: true } }),
);
