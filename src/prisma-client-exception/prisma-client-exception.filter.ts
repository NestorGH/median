import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError) // Catch excpetions of type PrismaClientKnownRequestError
export class PrismaClientExceptionFilter extends BaseExceptionFilter { // 2 extends BaseExceptionFilter (ensure a "internal server error" for the catch)
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {// 3 exception type Prisma know reques error
    console.error(exception.message);

    //default 500 error
    super.catch(exception, host);
  }
}
