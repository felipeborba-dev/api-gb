import { randomUUID } from 'crypto';
export abstract class Entity {
  id: string = randomUUID();
  createdAt: Date;
  updatedAt: Date;
}
