import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateResellerCommand } from './create-reseller.command';
import { CreateResellerResponseDto } from '../dto/create-reseller.response';
import { ResellerService } from './../services/reseller.service';

@CommandHandler(CreateResellerCommand)
export class CreateResellerCommandHandler implements ICommandHandler {
  constructor(private readonly resellerService: ResellerService) {}

  async execute(
    cmd: CreateResellerCommand,
  ): Promise<CreateResellerResponseDto> {
    try {
      const reseller = await this.resellerService.create(cmd);
      return { resellerId: reseller.id };
    } catch (error) {
      throw error;
    }
  }
}
