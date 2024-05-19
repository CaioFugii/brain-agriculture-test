import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError } from '../exceptions/exception';

@Catch(HttpException, DomainError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof DomainError) {
      return response.status(exception.statusCode).json({
        path: request.url,
        timestamp: new Date().toISOString(),
        errors: {
          message: exception.message,
          statusCode: exception.statusCode,
        },
      });
    }

    const status = exception?.getStatus();
    return response.status(status).json({
      path: request.url,
      timestamp: new Date().toISOString(),
      errors: {
        //@ts-ignore
        message: exception.getResponse()?.message,
        statusCode: status,
      },
    });
  }
}
