import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  resellerId: string;
  @IsNumber()
  value: number;
  @IsNotEmpty()
  code: string;
}
