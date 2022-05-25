import { Body, Controller, Post, Version } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core/controllers/base.controller';
import { CreateResellerCommand } from '../commands/create-reseller.command';
import { CreateResellerDto } from '../dto/create-reseller.dto';

@ApiTags('Resellers')
@Controller('resellers')
export class ResellersController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }
  @Version('1')
  @Post()
  async create(@Body() dto: CreateResellerDto) {
    return await this.ok(
      Promise.resolve({
        resellerId: await this.commandBus.execute<CreateResellerCommand>(
          new CreateResellerCommand(dto.cpf, dto.firstName, dto.lastName),
        ),
      }),
    );
  }
}
