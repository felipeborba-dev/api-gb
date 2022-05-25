import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateResellerCommand } from './create-reseller.command';
import { ResellerService } from './../services/resellers.service';

@CommandHandler(CreateResellerCommand)
export class CreateResellerCommandHandler implements ICommandHandler {
  constructor(private readonly resellerService: ResellerService) {}

  async execute(cmd: CreateResellerCommand): Promise<string> {
    try {
      const reseller = await this.resellerService.create(cmd);
      return reseller.id;
    } catch (error) {
      throw error;
    }
  }
}
