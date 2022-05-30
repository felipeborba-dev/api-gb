import { EntityManager } from '@mikro-orm/core';

export function InjectRepository(
  repositoryToken: string | any,
  entityName: string,
) {
  return {
    provide: repositoryToken,
    useFactory: (em: EntityManager) => em.getRepository(entityName),
    inject: [EntityManager],
  };
}
