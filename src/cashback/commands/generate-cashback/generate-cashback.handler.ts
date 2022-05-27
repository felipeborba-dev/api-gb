import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { GenerateCashBackCommand } from './generate-cashback.command';

@CommandHandler(GenerateCashBackCommand)
export class GenerateCashBackCommandHandler implements ICommandHandler {
  execute(command: GenerateCashBackCommand): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
