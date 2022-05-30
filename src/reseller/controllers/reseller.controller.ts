import { Body, Controller, Post, Version } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/core/dto/api.response';
import { BaseController } from '../../core/controllers/base.controller';
import { CreateResellerCommand } from '../commands/create-reseller.command';
import { CreateResellerDto } from '../dto/create-reseller.dto';
import { CreateResellerResponseDto } from '../dto/create-reseller.response';

@ApiTags('Reseller')
@Controller('resellers')
export class ResellersController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }
  @Version('1')
  @Post()
  async createResellerHandler(
    @Body() dto: CreateResellerDto,
  ): Promise<ApiResponse<CreateResellerResponseDto>> {
    return await this.ok(
      this.commandBus.execute<CreateResellerCommand, CreateResellerResponseDto>(
        new CreateResellerCommand(
          dto.cpf,
          dto.firstName,
          dto.lastName,
          dto.password,
          dto.email,
        ),
      ),
    );
  }
}
