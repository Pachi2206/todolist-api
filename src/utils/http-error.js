// Error con código HTTP: el servicio lo lanza y el middleware de errores lo convierte en respuesta.
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }

  static notFound(message = 'Recurso no encontrado') {
    return new HttpError(404, message);
  }

  static unauthorized(message = 'No autenticado') {
    return new HttpError(401, message);
  }

  static conflict(message) {
    return new HttpError(409, message);
  }
}
