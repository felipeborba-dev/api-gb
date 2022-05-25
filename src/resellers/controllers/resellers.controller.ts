import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BaseController } from '../../core/controllers/base.controller';
import { CreateResellerCommand } from '../commands/create-reseller.command';
import { CreateResellerDto } from '../dto/create-reseller.dto';

@Controller('resellers')
export class ResellersController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

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
