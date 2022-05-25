import { AggregateRoot } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
export abstract class Aggregate extends AggregateRoot {
  id: string = randomUUID();
  createdAt: Date;
  updatedAt: Date;
}
