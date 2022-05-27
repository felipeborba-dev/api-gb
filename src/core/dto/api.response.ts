import { HttpStatus } from '@nestjs/common';
export abstract class ApiResponse<T> {
  statusCode: HttpStatus;
  message: string;
  data: T;
}
