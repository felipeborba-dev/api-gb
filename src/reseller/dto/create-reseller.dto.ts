import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateResellerDto {
  @IsNotEmpty()
  @MaxLength(14)
  cpf: string;
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;
  @IsNotEmpty()
  @MaxLength(16)
  password: string;
  @IsNotEmpty()
  @MaxLength(120)
  email: string;
}
