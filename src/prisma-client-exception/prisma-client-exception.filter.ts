import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError) // Catch excpetions of type PrismaClientKnownRequestError
export class PrismaClientExceptionFilter extends BaseExceptionFilter {// 2 extends BaseExceptionFilter (ensure a "internal server error" for the catch)
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {// 3 exception type Prisma know reques error
    
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    //Define especific excpetions
    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      default:
        //default 500 error for everything else
        super.catch(exception, host);
        break;
    }
  }
}
