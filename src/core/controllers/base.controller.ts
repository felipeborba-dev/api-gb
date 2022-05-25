import { BadRequestException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

export abstract class BaseController {
  async ok(fn: Promise<any>) {
    try {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: await fn,
      };
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
  async created(fn: Promise<any>) {
    try {
      return {
        statusCode: HttpStatus.CREATED,
        message: 'CREATED',
        data: await fn,
      };
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
