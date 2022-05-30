import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/application/auth/jwt-auth.guard';
import { ApiResponse } from 'src/core/dto/api.response';
import { BaseController } from '../../core/controllers/base.controller';
import { CreateResellerCommand } from '../commands/create-reseller.command';
import { CreateResellerDto } from '../dto/create-reseller.dto';
import { CreateResellerResponseDto } from '../dto/create-reseller.response';
import { GetTotalCashbackQuery } from './../../cashback/queries/get-total-cashback/get-total-cashback.query';

@ApiTags('Reseller')
@Controller('resellers')
export class ResellersController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
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
  @UseGuards(JwtAuthGuard)
  @Version('1')
  @Get(':id/cashback')
  async totalCashbackHandler(
    @Param('id') resellerId: string,
  ): Promise<ApiResponse<CreateResellerResponseDto>> {
    return await this.ok(
      this.queryBus.execute<GetTotalCashbackQuery>(
        new GetTotalCashbackQuery(resellerId),
      ),
    );
  }
}
