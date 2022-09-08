import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    //TODO: 'GAAAJJ'
    response.status(status).json({
      statusCode: status,
      message: exception.message,
      response: exception.getResponse(),
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
