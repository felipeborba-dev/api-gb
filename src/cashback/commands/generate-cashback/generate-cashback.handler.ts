import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CashbackService } from './../../services/cashback.service';
import { GenerateCashbackCommand } from './generate-cashback.command';

@CommandHandler(GenerateCashbackCommand)
export class GenerateCashBackCommandHandler implements ICommandHandler {
  constructor(private readonly cashbackService: CashbackService) {}
  async execute(command: GenerateCashbackCommand): Promise<void> {
    try {
      await this.cashbackService.generateCashback(command.orderId);
    } catch (error) {
      throw error;
    }
  }
}
